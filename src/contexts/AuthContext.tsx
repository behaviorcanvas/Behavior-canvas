import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import { LearnerProfileRecord } from '../types';

export const BOOTSTRAPPED_ADMIN_EMAIL = 'info@behaviorcanvas.com';

interface AuthContextValue {
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  isVerifiedUser: boolean;
  learnerProfile: LearnerProfileRecord | null;
  authError: string | null;
  signInWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  updateLearnerProfile: (fields: {
    displayName?: string;
    background?: string;
    city?: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfileRecord | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthError(null);

      if (!currentUser) {
        setIsAdmin(false);
        setLearnerProfile(null);
        setAuthReady(true);
        return;
      }

      const verified = Boolean(currentUser.emailVerified);
      let adminStatus =
        verified &&
        currentUser.email?.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase();

      if (!adminStatus && verified) {
        try {
          const adminSnap = await getDoc(doc(db, 'admins', currentUser.uid));
          if (adminSnap.exists()) {
            adminStatus = true;
          }
        } catch (error) {
          console.warn('Admin role lookup note:', error);
        }
      }

      setIsAdmin(adminStatus);

      if (verified && currentUser.email) {
        const learnerPath = `learners/${currentUser.uid}`;
        try {
          const learnerRef = doc(db, 'learners', currentUser.uid);
          const snap = await getDoc(learnerRef);
          if (snap.exists()) {
            setLearnerProfile(snap.data() as LearnerProfileRecord);
          } else {
            const newProfile: LearnerProfileRecord = {
              uid: currentUser.uid,
              displayName: currentUser.displayName || 'Learner',
              email: currentUser.email,
              background: '',
              city: '',
              createdAt: new Date().toISOString(),
            };
            await setDoc(learnerRef, newProfile);
            setLearnerProfile(newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, learnerPath);
        }
      } else {
        setLearnerProfile(null);
      }

      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      const msg = error?.message || 'Sign-in was cancelled or blocked.';
      setAuthError(msg);
      return null;
    }
  };

  const logout = async () => {
    setAuthError(null);
    await firebaseSignOut(auth);
  };

  const updateLearnerProfile = async (fields: {
    displayName?: string;
    background?: string;
    city?: string;
  }) => {
    if (!user || !user.emailVerified || !user.email) return;
    const learnerPath = `learners/${user.uid}`;
    const updated: LearnerProfileRecord = {
      uid: user.uid,
      email: user.email,
      displayName: (fields.displayName ?? learnerProfile?.displayName ?? user.displayName ?? 'Learner').slice(0, 120),
      background: (fields.background ?? learnerProfile?.background ?? '').slice(0, 160),
      city: (fields.city ?? learnerProfile?.city ?? '').slice(0, 100),
      createdAt: learnerProfile?.createdAt || new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'learners', user.uid), updated);
      setLearnerProfile(updated);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, learnerPath);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authReady,
        isAdmin,
        isVerifiedUser: Boolean(user && user.emailVerified),
        learnerProfile,
        authError,
        signInWithGoogle,
        logout,
        updateLearnerProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}

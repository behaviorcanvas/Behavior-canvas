import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  LogIn,
  LogOut,
  BookOpen,
  Download,
  Award,
  User,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../contexts/PlatformContext';
import { RoutePath } from '../types';

interface StudentPortalPageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
}

export const StudentPortalPage: React.FC<StudentPortalPageProps> = ({ onNavigate }) => {
  const { user, learnerProfile, signInWithGoogle, logout, updateLearnerProfile, authError } =
    useAuth();
  const { enrolments, orders, certificates, products } = usePlatform();

  const [displayName, setDisplayName] = useState('');
  const [background, setBackground] = useState('');
  const [city, setCity] = useState('');
  const [savedNotice, setSavedNotice] = useState('');

  useEffect(() => {
    if (learnerProfile) {
      setDisplayName(learnerProfile.displayName || '');
      setBackground(learnerProfile.background || '');
      setCity(learnerProfile.city || '');
    }
  }, [learnerProfile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateLearnerProfile({ displayName, background, city });
    setSavedNotice('Learner profile saved.');
    setTimeout(() => setSavedNotice(''), 2500);
  };

  if (!user) {
    return (
      <div className="bg-[#F8F5EF] py-16 lg:py-24">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl border border-[#514458]/10 p-8 sm:p-10 text-center space-y-5 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-[#F4E4ED] text-[#514458] flex items-center justify-center mx-auto">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#514458]">
              Student & Learner Portal
            </h1>
            <p className="text-sm text-[#6E6474] leading-relaxed">
              Sign in with Google to view your enrolled Academy programmes, upcoming workshops, verified digital study downloads, and certificates.
            </p>
            {authError && <p className="text-xs text-rose-600">{authError}</p>}
            <button
              onClick={() => signInWithGoogle()}
              className="w-full py-3 px-5 bg-[#514458] hover:bg-[#3f3445] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In with Google</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#514458]/10 shadow-xs">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6474]">
              Student & Learner Account
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#514458]">
              Welcome, {learnerProfile?.displayName || user.displayName}
            </h1>
            <p className="text-xs text-[#6E6474]">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('programmes')}
              className="px-4 py-2 text-xs font-semibold text-[#514458] bg-[#F4E4ED] rounded-xl cursor-pointer"
            >
              Browse Academy
            </button>
            <button
              onClick={() => logout()}
              className="px-4 py-2 text-xs font-medium text-[#6E6474] border border-[#514458]/15 rounded-xl inline-flex items-center gap-1.5 hover:text-[#514458] cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrolled Programmes & Workshops */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#514458]/10 space-y-4">
              <div className="flex items-center gap-2 text-[#514458]">
                <BookOpen className="w-5 h-5" />
                <h2 className="font-serif text-xl font-semibold">
                  Enrolled Programmes & Workshops
                </h2>
              </div>

              {enrolments.length === 0 ? (
                <p className="text-sm text-[#6E6474]">
                  You have no active programme or workshop enrolments yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {enrolments.map((enr) => (
                    <div
                      key={enr.id}
                      className="p-4 rounded-xl bg-[#F8F5EF]/70 border border-[#514458]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#6E6474]">
                          {enr.itemType} · {enr.attendanceStatus}
                        </span>
                        <h3 className="text-sm font-semibold text-[#514458]">{enr.itemTitle}</h3>
                      </div>
                      <div className="text-xs font-semibold text-[#514458]">
                        Progress: {enr.completionPercent ?? 0}%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Digital Store Downloads */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#514458]/10 space-y-4">
              <div className="flex items-center gap-2 text-[#514458]">
                <Download className="w-5 h-5" />
                <h2 className="font-serif text-xl font-semibold">
                  Purchased Resources & Orders
                </h2>
              </div>
              {orders.length === 0 ? (
                <p className="text-sm text-[#6E6474]">No digital orders recorded yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-[#F8F5EF]/70 border border-[#514458]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[11px] font-mono text-[#6E6474]">
                          {ord.orderCode} · Status: {ord.paymentStatus}
                        </span>
                        <h3 className="text-sm font-semibold text-[#514458]">{ord.itemTitle}</h3>
                        <p className="text-xs text-[#6E6474]">
                          {ord.currency} {ord.amount}
                        </p>
                      </div>
                      {ord.downloadToken && ord.paymentStatus !== 'refunded' && (() => {
                        const matchedProduct = products.find((p) => p.id === ord.itemId);
                        const fileUrlParam = matchedProduct?.downloadPath?.startsWith('https://')
                          ? `&fileUrl=${encodeURIComponent(matchedProduct.downloadPath)}`
                          : '';
                        return (
                          <a
                            href={`/api/downloads/resource?token=${encodeURIComponent(ord.downloadToken)}&title=${encodeURIComponent(ord.itemTitle)}${fileUrlParam}`}
                            className="px-4 py-2 bg-[#514458] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-1.5 shrink-0"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </a>
                        );
                      })()}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Certificates */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#514458]/10 space-y-4">
              <div className="flex items-center gap-2 text-[#514458]">
                <Award className="w-5 h-5" />
                <h2 className="font-serif text-xl font-semibold">My Certificates</h2>
              </div>
              {certificates.length === 0 ? (
                <p className="text-sm text-[#6E6474]">
                  Certificates issued upon workshop or Academy completion will appear here.
                </p>
              ) : (
                <div className="space-y-3">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl bg-[#E9E1F4]/40 border border-[#514458]/10 flex items-center justify-between gap-3"
                    >
                      <div>
                        <p className="text-xs font-mono text-[#6E6474]">{cert.certificateId}</p>
                        <h3 className="text-sm font-semibold text-[#514458]">{cert.programmeTitle}</h3>
                        <p className="text-xs text-[#6E6474]">
                          {cert.certificateType} · Issued {cert.issueDate}
                        </p>
                      </div>
                      <button
                        onClick={() => onNavigate('verify-certificate')}
                        className="px-3 py-1.5 text-xs font-semibold bg-white border border-[#514458]/15 rounded-lg text-[#514458] cursor-pointer"
                      >
                        Verify
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Learner Profile Card */}
          <div>
            <form
              onSubmit={handleSaveProfile}
              className="bg-white p-6 rounded-2xl border border-[#514458]/10 space-y-4"
            >
              <div className="flex items-center gap-2 text-[#514458]">
                <User className="w-5 h-5" />
                <h2 className="font-serif text-xl font-semibold">Learner Profile</h2>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#514458] mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#514458]/15"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#514458] mb-1">
                  Role / Academic Background
                </label>
                <input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  placeholder="e.g. Special Educator / Parent / Student"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#514458]/15"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#514458] mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-[#514458]/15"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#514458] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Save Profile
              </button>
              {savedNotice && (
                <p className="text-xs text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {savedNotice}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

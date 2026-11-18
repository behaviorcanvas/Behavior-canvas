import React from 'react';
import { Edit3, LayoutDashboard, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../contexts/PlatformContext';
import { RoutePath } from '../types';

interface AdminBarProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath, param?: string) => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({ currentRoute, onNavigate }) => {
  const { user, isVerifiedUser, isAdmin, logout } = useAuth();
  const { requestAdminEdit } = usePlatform();

  // Strictly visible ONLY to verified administrator accounts — public visitors never see this bar
  if (!isVerifiedUser || !isAdmin || !user) {
    return null;
  }

  const handleEditCurrentPage = () => {
    if (
      currentRoute === 'home' ||
      currentRoute === 'about' ||
      currentRoute === 'meet-the-founder' ||
      currentRoute === 'our-philosophy'
    ) {
      requestAdminEdit('pages', currentRoute);
    } else if (
      currentRoute === 'services' ||
      currentRoute === 'service-detail' ||
      currentRoute === 'parent-training' ||
      currentRoute === 'behaviour-consultation'
    ) {
      requestAdminEdit('services');
    } else if (
      currentRoute === 'academy' ||
      currentRoute === 'programmes' ||
      currentRoute === 'programme-detail'
    ) {
      requestAdminEdit('programmes');
    } else if (currentRoute === 'workshops' || currentRoute === 'workshop-detail') {
      requestAdminEdit('workshops');
    } else if (currentRoute === 'resources' || currentRoute === 'product-detail') {
      requestAdminEdit('products');
    } else if (currentRoute === 'research') {
      requestAdminEdit('research');
    } else if (currentRoute === 'articles' || currentRoute === 'article-detail') {
      requestAdminEdit('articles');
    } else {
      requestAdminEdit('overview');
    }
    onNavigate('admin');
  };

  return (
    <div className="bg-[#342A3A] text-[#F8F5EF] border-b border-white/15 px-4 py-2 text-xs relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4E4ED] text-[#514458] font-semibold text-[10px] uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3" />
            <span>Admin Mode</span>
          </span>
          <span className="text-[#F8F5EF]/80 hidden sm:inline">
            Signed in as <strong className="text-white">{user.email}</strong> (Public visitors do not see this bar)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleEditCurrentPage}
            className="px-3 py-1 rounded-lg bg-white text-[#514458] hover:bg-[#F4E4ED] font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit This Page / Section</span>
          </button>

          <button
            onClick={() => {
              requestAdminEdit('overview');
              onNavigate('admin');
            }}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Admin Portal</span>
          </button>

          <button
            onClick={() => logout()}
            className="px-2.5 py-1 rounded-lg text-[#F4E4ED] hover:bg-white/10 inline-flex items-center gap-1 transition-colors cursor-pointer"
            title="Sign out of Admin Mode"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

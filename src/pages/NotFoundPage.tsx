import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { RoutePath } from '../types';

interface NotFoundPageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="inline-block p-4 rounded-3xl bg-[#F6EEF5] border border-[#EDE2EB]">
        <span className="font-serif text-5xl font-bold text-[#583256]">404</span>
      </div>
      <h1 className="text-3xl font-bold text-[#2A182C]">
        Page Not Found
      </h1>
      <p className="text-sm text-[#5C4A60] leading-relaxed max-w-md mx-auto">
        The page you are looking for may have been moved or does not exist. Please return to the homepage or explore our services and educational resources.
      </p>
      <div className="pt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-2.5 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-colors shadow-xs flex items-center gap-2"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </button>
        <button
          onClick={() => onNavigate('services')}
          className="px-6 py-2.5 text-xs font-semibold text-[#2A182C] bg-white border border-[#DACFDB] hover:bg-[#FAF6F8] rounded-xl transition-colors"
        >
          Explore Services
        </button>
      </div>
    </div>
  );
};

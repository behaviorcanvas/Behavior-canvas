import React, { useState } from 'react';
import { X, Globe } from 'lucide-react';
import { usePlatform } from '../contexts/PlatformContext';

interface AnnouncementBarProps {
  currency: 'USD' | 'INR';
  onCurrencyToggle: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  currency,
  onCurrencyToggle,
}) => {
  const { siteSettings } = usePlatform();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !siteSettings.announcementEnabled || !siteSettings.announcementText) {
    return null;
  }

  return (
    <div className="bg-[#514458] text-[#F8F5EF] text-xs py-2 px-4 border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <p className="text-[11px] sm:text-xs font-normal tracking-wide text-[#F4E4ED] truncate">
          {siteSettings.announcementText}
        </p>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onCurrencyToggle}
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#F8F5EF] hover:text-[#F4E4ED] transition-colors cursor-pointer"
            title="Switch currency"
          >
            <Globe className="w-3.5 h-3.5 opacity-80" />
            <span>{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-[#F8F5EF]/60 hover:text-white p-0.5 cursor-pointer"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

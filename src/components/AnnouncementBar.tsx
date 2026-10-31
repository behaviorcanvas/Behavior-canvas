import React, { useState } from 'react';
import { Sparkles, Copy, Check, X, ShieldCheck, Globe } from 'lucide-react';

interface AnnouncementBarProps {
  currency: 'USD' | 'INR';
  onCurrencyToggle: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  currency,
  onCurrencyToggle
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('GLOBALSTUDY');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-[#3D213B] text-white text-xs py-2 px-4 border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] sm:text-xs">
          <span className="font-semibold text-[#E8BCD5] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>International Candidate Study Season:</span>
          </span>
          <span className="text-[#F1E5EE]">
            Use code <span className="font-mono font-bold text-white bg-white/20 px-1.5 py-0.5 rounded">GLOBALSTUDY</span> for 15% off all study bundles & question banks.
          </span>
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#E8BCD5] hover:text-white underline ml-1 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#E0D3E3]">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">256-Bit SSL Stripe & PayPal Gateway</span>
          </div>
          <button
            onClick={onCurrencyToggle}
            className="flex items-center gap-1 font-semibold text-white hover:text-[#E8BCD5] transition-colors"
            title="Toggle between USD ($) and INR (₹)"
          >
            <Globe className="w-3 h-3" />
            <span>{currency === 'USD' ? 'USD ($)' : 'INR (₹)'}</span>
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/60 hover:text-white p-0.5"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

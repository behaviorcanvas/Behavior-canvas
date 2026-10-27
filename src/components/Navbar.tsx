import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { brandConfig } from '../data/brand';
import { RoutePath } from '../types';

interface NavbarProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
  currency: 'USD' | 'INR';
  onCurrencyToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenEnquiry,
  currency,
  onCurrencyToggle
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { label: string; route: RoutePath }[] = [
    { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Services', route: 'services' },
    { label: 'Resources', route: 'resources' },
    { label: 'Workshops', route: 'workshops' },
    { label: 'Articles', route: 'articles' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleLinkClick = (route: RoutePath) => {
    onNavigate(route);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE3EB] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Zone 1: Brand Zone with Uploaded Official Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3.5 text-left group shrink-0 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#583256] rounded-lg"
            aria-label="The Behavior Canvas - Home"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-0.5 border border-[#EBE3EB] shadow-xs overflow-hidden flex items-center justify-center shrink-0 group-hover:scale-102 transition-transform">
              <img
                src={brandConfig.logoPath}
                alt="The Behavior Canvas Official Logo"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#2A182C] leading-none group-hover:text-[#583256] transition-colors whitespace-nowrap">
                The Behavior Canvas
              </span>
              <span className="text-[11px] font-medium text-[#7A677D] tracking-wide mt-1 hidden sm:block whitespace-nowrap">
                {brandConfig.tagline}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#5C4A60]"
          >
            {navLinks.map((link) => {
              const isActive =
                currentRoute === link.route ||
                (link.route === 'services' && currentRoute === 'service-detail') ||
                (link.route === 'resources' && currentRoute === 'product-detail') ||
                (link.route === 'articles' && currentRoute === 'article-detail');
              return (
                <button
                  key={link.route}
                  onClick={() => handleLinkClick(link.route)}
                  className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#2A182C] font-semibold'
                      : 'hover:text-[#2A182C]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#583256] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Currency Switcher & Action CTA */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Currency Switcher */}
            <button
              onClick={onCurrencyToggle}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#583256] bg-[#FAF5F9] hover:bg-[#F2EBF3] border border-[#EDE2EB] rounded-lg transition-colors whitespace-nowrap"
              title="Click to switch currency"
              aria-label={`Current currency: ${currency}. Click to switch.`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currency === 'USD' ? '$ USD' : '₹ INR'}</span>
            </button>

            <button
              onClick={() => onOpenEnquiry()}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-all shadow-xs hover:shadow-md active:scale-98 whitespace-nowrap shrink-0"
            >
              <span>Make an Enquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#5C4A60] hover:text-[#2A182C] hover:bg-[#F6EEF5] transition-colors focus-visible:outline-hidden"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Collapsible Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EBE3EB] bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleLinkClick(link.route)}
                  className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F6EEF5] text-[#3B223D] font-bold'
                      : 'text-[#5C4A60] hover:bg-[#FAF6F8] hover:text-[#2A182C]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#EBE3EB] mt-2 flex flex-col gap-2">
              <div className="flex items-center justify-between px-2 py-1 text-xs text-[#5C4A60]">
                <span>Preferred Currency:</span>
                <button
                  onClick={onCurrencyToggle}
                  className="px-2.5 py-1 bg-[#FAF5F9] font-bold text-[#583256] border border-[#EDE2EB] rounded-md"
                >
                  {currency === 'USD' ? '$ USD (Global)' : '₹ INR (India)'} (Tap to change)
                </button>
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-colors shadow-xs"
              >
                Make an Enquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

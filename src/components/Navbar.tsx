import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Search,
  GraduationCap,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { brandConfig } from '../data/brand';
import { RoutePath } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  currentRoute: RoutePath;
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
  onOpenSearch: () => void;
  currency: 'USD' | 'INR';
  onCurrencyToggle: () => void;
}

interface NavDropdownItem {
  label: string;
  route: RoutePath;
  description?: string;
}

interface NavGroup {
  id: string;
  label: string;
  route: RoutePath;
  matchRoutes: RoutePath[];
  items?: NavDropdownItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  currency,
  onCurrencyToggle,
}) => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const navGroups: NavGroup[] = [
    {
      id: 'home',
      label: 'HOME',
      route: 'home',
      matchRoutes: ['home'],
    },
    {
      id: 'about',
      label: 'ABOUT US',
      route: 'about',
      matchRoutes: ['about', 'meet-the-founder', 'our-philosophy'],
      items: [
        { label: 'About The Behavior Canvas', route: 'about' },
        { label: 'Meet the Founder', route: 'meet-the-founder' },
        { label: 'Our Philosophy', route: 'our-philosophy' },
      ],
    },
    {
      id: 'services',
      label: 'SERVICES',
      route: 'services',
      matchRoutes: ['services', 'parent-training', 'behaviour-consultation', 'service-detail'],
      items: [
        { label: 'All Behavioural Services', route: 'services' },
        { label: 'Parent Training', route: 'parent-training' },
        { label: 'Behaviour Consultation', route: 'behaviour-consultation' },
      ],
    },
    {
      id: 'academy',
      label: 'ACADEMY',
      route: 'academy',
      matchRoutes: ['academy', 'programmes', 'programme-detail', 'student', 'verify-certificate'],
      items: [
        { label: 'Academy of Behavioural Science', route: 'academy' },
        { label: 'All Programmes', route: 'programmes' },
        { label: 'Student & Learner Portal', route: 'student' },
        { label: 'Verify Certificate', route: 'verify-certificate' },
      ],
    },
    {
      id: 'workshops',
      label: 'WORKSHOPS',
      route: 'workshops',
      matchRoutes: ['workshops', 'workshop-detail'],
    },
    {
      id: 'resources',
      label: 'RESOURCES',
      route: 'resources',
      matchRoutes: ['resources', 'product-detail'],
    },
    {
      id: 'research',
      label: 'RESEARCH & BLOG',
      route: 'articles',
      matchRoutes: ['research', 'articles', 'article-detail'],
      items: [
        { label: 'Research & Publications', route: 'research' },
        { label: 'Educational Blog & Articles', route: 'articles' },
        { label: 'FAQs', route: 'faq' },
      ],
    },
    {
      id: 'contact',
      label: 'CONTACT',
      route: 'contact',
      matchRoutes: ['contact'],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (route: RoutePath) => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#514458]/10 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-20">
          {/* Official Brand Logo + Positioning */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group shrink-0 cursor-pointer"
            aria-label="The Behavior Canvas Home"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 border border-[#514458]/15 shadow-xs overflow-hidden flex items-center justify-center shrink-0">
              <img
                src={brandConfig.logoPath}
                alt="The Behavior Canvas Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-semibold tracking-tight text-[#514458] leading-tight whitespace-nowrap">
                The Behavior Canvas
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#6E6474] tracking-wide hidden xl:block whitespace-nowrap">
                Academy of Behavioural Science
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-4 xl:gap-5 text-[11px] xl:text-xs font-medium tracking-[0.06em] text-[#514458]/80"
          >
            {navGroups.map((group) => {
              const isActive = group.matchRoutes.includes(currentRoute);
              const hasDropdown = Boolean(group.items && group.items.length > 0);
              const isDropdownOpen = openDropdown === group.id;

              return (
                <div
                  key={group.id}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(group.id)}
                  onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
                >
                  <button
                    onClick={() => handleLinkClick(group.route)}
                    className={`flex items-center gap-1 py-2 whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#514458] font-semibold'
                        : 'hover:text-[#514458]'
                    }`}
                  >
                    <span>{group.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${
                          isDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>
                  {isActive && (
                    <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-[#514458] rounded-full" />
                  )}

                  {hasDropdown && isDropdownOpen && (
                    <div className="absolute left-0 top-full pt-1 w-64 z-50">
                      <div className="bg-white rounded-xl border border-[#514458]/10 shadow-lg py-2">
                        {group.items!.map((sub) => (
                          <button
                            key={sub.route}
                            onClick={() => handleLinkClick(sub.route)}
                            className={`w-full text-left px-4 py-2.5 text-xs tracking-normal transition-colors cursor-pointer ${
                              currentRoute === sub.route
                                ? 'bg-[#F4E4ED]/70 text-[#514458] font-semibold'
                                : 'text-[#514458]/85 hover:bg-[#F8F5EF] hover:text-[#514458]'
                            }`}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Controls: Search + Student Portal icon + Prominent CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-[#514458] bg-[#F8F5EF] hover:bg-[#F4E4ED] border border-[#514458]/10 rounded-xl transition-colors cursor-pointer"
              title="Search programmes, workshops, resources, articles (⌘K)"
              aria-label="Search Website"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden 2xl:inline">Search</span>
            </button>

            <button
              onClick={() => handleLinkClick('student')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-[#514458] bg-[#F8F5EF] hover:bg-[#E9E1F4] border border-[#514458]/10 rounded-xl transition-colors cursor-pointer"
              title="Student & Learner Portal"
              aria-label="Student Portal"
            >
              {user ? (
                <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <GraduationCap className="w-3.5 h-3.5" />
              )}
              <span className="hidden xl:inline">Learner Portal</span>
            </button>

            <button
              onClick={() => handleLinkClick('programmes')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 text-[11px] xl:text-xs font-semibold tracking-wider text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl transition-all shadow-xs whitespace-nowrap cursor-pointer"
            >
              <span>EXPLORE PROGRAMMES</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#514458] hover:bg-[#F4E4ED] transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#514458]/10 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[82vh] overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex-1 py-2.5 px-3 text-left text-xs text-[#6E6474] bg-[#F8F5EF] border border-[#514458]/10 rounded-xl flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-[#514458]" />
              <span>Search academy, resources, guides...</span>
            </button>
            <button
              onClick={onCurrencyToggle}
              className="px-3 py-2.5 text-xs font-semibold bg-[#F4E4ED] text-[#514458] rounded-xl"
            >
              {currency === 'INR' ? '₹ INR' : '$ USD'}
            </button>
          </div>

          <div className="space-y-1">
            {navGroups.map((group) => (
              <div key={group.id} className="border-b border-[#514458]/5 pb-1">
                <button
                  onClick={() => handleLinkClick(group.route)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                    group.matchRoutes.includes(currentRoute)
                      ? 'bg-[#F4E4ED] text-[#514458] font-semibold'
                      : 'text-[#514458]/85 hover:bg-[#F8F5EF]'
                  }`}
                >
                  {group.label}
                </button>
                {group.items && (
                  <div className="pl-4 pb-1 space-y-0.5">
                    {group.items.map((sub) => (
                      <button
                        key={sub.route}
                        onClick={() => handleLinkClick(sub.route)}
                        className="w-full text-left px-3 py-1.5 rounded-md text-xs text-[#6E6474] hover:text-[#514458] hover:bg-[#F8F5EF]"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleLinkClick('verify-certificate')}
              className="py-2.5 px-3 text-xs font-medium text-[#514458] bg-[#E9E1F4]/60 rounded-xl flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Certificate</span>
            </button>
            <button
              onClick={() => handleLinkClick('student')}
              className="py-2.5 px-3 text-xs font-medium text-[#514458] bg-[#F4E4ED] rounded-xl flex items-center justify-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Learner Portal</span>
            </button>
          </div>

          <button
            onClick={() => handleLinkClick('programmes')}
            className="mt-3 w-full py-3 px-4 text-center text-xs font-semibold tracking-wider text-white bg-[#514458] rounded-xl"
          >
            EXPLORE PROGRAMMES
          </button>
        </div>
      )}
    </header>
  );
};

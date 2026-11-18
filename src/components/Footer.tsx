import React from 'react';
import {
  Mail,
  Instagram,
  Youtube,
  Linkedin,
  Lock,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { brandConfig } from '../data/brand';
import { usePlatform } from '../contexts/PlatformContext';
import { RoutePath } from '../types';

interface FooterProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  const { siteSettings, services, products } = usePlatform();

  return (
    <footer className="bg-[#514458] text-[#F8F5EF] border-t border-[#514458]/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-white p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={brandConfig.logoPath}
                  alt="The Behavior Canvas Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-white tracking-tight">
                  {siteSettings.brandName}
                </h3>
                <p className="text-xs text-[#F4E4ED] mt-0.5">
                  Academy of Behavioural Science · {siteSettings.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#F8F5EF]/80 leading-relaxed max-w-sm">
              Founded and directed by {brandConfig.founder.name} ({brandConfig.founder.credentialsLine}). Making behavioural science accessible, compassionate, ethical, and practically meaningful for families, learners, educators, practitioners, and researchers.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F4E4ED] hover:text-[#514458] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram @thebehaviorcanvas"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteSettings.youtubeUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F4E4ED] hover:text-[#514458] text-white flex items-center justify-center transition-colors"
                aria-label="YouTube @behaviorcanvas"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.linkedin.url}
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F4E4ED] hover:text-[#514458] text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn Reema Singh"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteSettings.email}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F4E4ED] hover:text-[#514458] text-white flex items-center justify-center transition-colors"
                aria-label={`Email ${siteSettings.email}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-[#F4E4ED]/90">
              Email:{' '}
              <a href={`mailto:${siteSettings.email}`} className="underline hover:text-white">
                {siteSettings.email}
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4E4ED] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F5EF]/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('meet-the-founder')} className="hover:text-white cursor-pointer">
                  Meet the Founder
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('our-philosophy')} className="hover:text-white cursor-pointer">
                  Our Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('research')} className="hover:text-white cursor-pointer">
                  Research & Publications
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('articles')} className="hover:text-white cursor-pointer">
                  Blog & Articles
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-white cursor-pointer">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services & Academy */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4E4ED] mb-4">
              Services & Academy
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F5EF]/80">
              <li>
                <button onClick={() => onNavigate('academy')} className="hover:text-white font-medium text-[#E9E1F4] cursor-pointer">
                  Academy Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('programmes')} className="hover:text-white cursor-pointer">
                  All Programmes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshops')} className="hover:text-white cursor-pointer">
                  Workshops & Events
                </button>
              </li>
              {services.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('service-detail', s.slug)}
                    className="hover:text-white text-left line-clamp-1 cursor-pointer"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
              <li className="pt-1">
                <button
                  onClick={() => onNavigate('verify-certificate')}
                  className="inline-flex items-center gap-1.5 text-[#F4E4ED] hover:text-white cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify Certificate</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('student')}
                  className="inline-flex items-center gap-1.5 text-[#E9E1F4] hover:text-white cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Learner Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Learning Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F4E4ED] mb-4">
              Learning Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F5EF]/80">
              {products.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onNavigate('product-detail', p.slug)}
                    className="hover:text-white text-left line-clamp-1 cursor-pointer"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => onOpenEnquiry('Institutional Training')}
                  className="text-[#F4E4ED] hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Enquire About Training
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Policies & Copyright Bar */}
        <div className="pt-8 border-t border-white/15 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#F8F5EF]/75">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <button onClick={() => onNavigate('privacy-policy')} className="hover:text-white cursor-pointer">
                Privacy Policy
              </button>
              <button onClick={() => onNavigate('terms-and-conditions')} className="hover:text-white cursor-pointer">
                Terms & Conditions
              </button>
              <button
                onClick={() => onNavigate('refund-and-cancellation-policy')}
                className="hover:text-white cursor-pointer"
              >
                Cancellation & Refund Policy
              </button>
              <button
                onClick={() => onNavigate('professional-disclaimer')}
                className="hover:text-white cursor-pointer"
              >
                Professional Disclaimer
              </button>
              <button
                onClick={() => onNavigate('educational-disclaimer')}
                className="hover:text-white cursor-pointer"
              >
                Educational Disclaimer
              </button>
              <button
                onClick={() => onNavigate('digital-product-terms')}
                className="hover:text-white cursor-pointer"
              >
                Digital Product Terms
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span>© {new Date().getFullYear()} The Behavior Canvas. All rights reserved.</span>
              <button
                onClick={() => onNavigate('admin-login')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#F4E4ED] text-[11px] font-medium transition-colors cursor-pointer"
                title="Owner & Admin Sign In"
                aria-label="Admin Portal Login"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Portal</span>
              </button>
            </div>
          </div>

          <p className="text-[11px] text-[#F8F5EF]/60 leading-relaxed">
            Disclaimer: Content, Academy courses, and digital study resources on behaviorcanvas.com are published for educational and professional development purposes. They do not constitute medical, psychiatric, or emergency clinical care. Independent certificates issued by The Behavior Canvas do not imply QABA approval, statutory licensure, or university accreditation unless explicitly authorised.
          </p>
        </div>
      </div>
    </footer>
  );
};

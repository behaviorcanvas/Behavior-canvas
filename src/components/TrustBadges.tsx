import React from 'react';
import {
  Award,
  ShieldCheck,
  Globe,
  CreditCard,
  FileCheck,
  Linkedin,
  CheckCircle2,
  ExternalLink,
  Lock,
  Clock,
  Sparkles,
} from 'lucide-react';
import { trustBadgesData } from '../data/trustBadges';
import { brandConfig } from '../data/brand';
import { RoutePath } from '../types';

interface TrustBadgesProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, context?: string) => void;
}

export const TrustBadges: React.FC<TrustBadgesProps> = ({ onNavigate, onOpenEnquiry }) => {
  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award':
        return <Award className="w-5 h-5 text-[#583256]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-indigo-600" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-emerald-600" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-amber-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'Linkedin':
        return <Linkedin className="w-5 h-5 text-[#0077B5]" />;
      default:
        return <Award className="w-5 h-5 text-[#583256]" />;
    }
  };

  return (
    <section className="relative overflow-hidden py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF4F8]/70 via-[#FDFBFC] to-[#FAF4F8]/50 border-y border-[#EDE2EB]">
      {/* Decorative watercolor ambient accents */}
      <div className="absolute top-0 right-10 w-80 h-80 rounded-full bg-[#E8BCD5]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#D4E2F4]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#DACFDB] text-xs font-semibold text-[#583256] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#583256]" />
              <span>International Credibility & Accreditations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A182C] tracking-tight">
              Trust Badges & Certifications
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
              The Behavior Canvas is built upon certified board credentials, rigorous behavior science ethics, and internationally trusted partnerships. Here is how we safeguard educational excellence and privacy for clients across the globe.
            </p>
          </div>

          {/* Direct LinkedIn Credential Quick Link */}
          <div className="shrink-0">
            <a
              href={brandConfig.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border border-[#0077B5]/30 text-xs font-semibold text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all shadow-xs group"
            >
              <Linkedin className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
              <span>Verify Founder on LinkedIn (QASP-S)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Global Confidence Metric Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#EDE2EB] shadow-xs">
          <div className="space-y-1 text-center md:text-left border-r border-[#EDE2EB] last:border-r-0 pr-2">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-[#583256]">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>QASP-S® Certified</span>
            </div>
            <div className="text-[11px] text-[#6B5A6E]">QABA® International Board</div>
          </div>

          <div className="space-y-1 text-center md:text-left border-r border-[#EDE2EB] last:border-r-0 pr-2">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-[#2A182C]">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>5 Global Timezones</span>
            </div>
            <div className="text-[11px] text-[#6B5A6E]">US, UK, UAE, India, Australia</div>
          </div>

          <div className="space-y-1 text-center md:text-left border-r border-[#EDE2EB] last:border-r-0 pr-2">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-[#2A182C]">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>256-Bit SSL Checkout</span>
            </div>
            <div className="text-[11px] text-[#6B5A6E]">Stripe & PayPal Global Gateways</div>
          </div>

          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold text-[#2A182C]">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>100% Confidential</span>
            </div>
            <div className="text-[11px] text-[#6B5A6E]">Protected Candidate Logs</div>
          </div>
        </div>

        {/* 6 Trust Badges Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustBadgesData.map((badge) => (
            <div
              key={badge.id}
              className="p-6 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs hover:border-[#583256]/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Badge Header with Icon and Category Tag */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF4F8] border border-[#EDE2EB] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getBadgeIcon(badge.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-[#7A5B79]">
                    {badge.badge}
                  </span>
                </div>

                {/* Badge Titles */}
                <div>
                  <h3 className="text-base font-bold text-[#2A182C] group-hover:text-[#583256] transition-colors leading-snug">
                    {badge.title}
                  </h3>
                  <div className="text-[11px] font-medium text-[#7A5B79] mt-0.5">
                    {badge.issuer}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#5C4A60] leading-relaxed">
                  {badge.description}
                </p>

                {/* Key Bullet Highlights */}
                <div className="space-y-1.5 pt-1">
                  {badge.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-[#2A182C]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action / Verification Footer */}
              <div className="pt-5 mt-5 border-t border-[#F2EBF1] flex items-center justify-between">
                {badge.verificationUrl?.startsWith('http') ? (
                  <a
                    href={badge.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#0077B5] hover:underline flex items-center gap-1"
                  >
                    <span>{badge.verificationLabel || 'Verify Online'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : badge.verificationUrl === '#services' ? (
                  <button
                    onClick={() => onNavigate('service-detail', 'professional-mentoring-and-supervision')}
                    className="text-xs font-semibold text-[#583256] hover:underline flex items-center gap-1"
                  >
                    <span>{badge.verificationLabel}</span>
                  </button>
                ) : badge.verificationUrl === '#about' ? (
                  <button
                    onClick={() => onNavigate('about')}
                    className="text-xs font-semibold text-[#583256] hover:underline flex items-center gap-1"
                  >
                    <span>{badge.verificationLabel}</span>
                  </button>
                ) : badge.verificationUrl === '#privacy-policy' ? (
                  <button
                    onClick={() => onNavigate('privacy-policy')}
                    className="text-xs font-semibold text-[#583256] hover:underline flex items-center gap-1"
                  >
                    <span>{badge.verificationLabel}</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-medium text-[#7A5B79] flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>{badge.verificationLabel}</span>
                  </span>
                )}

                <button
                  onClick={() => onOpenEnquiry('Verification & Supervision', `Trust Badge: ${badge.title}`)}
                  className="text-[11px] text-[#583256] hover:underline font-medium"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Supervision & Credential Guarantee Note */}
        <div className="p-5 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#FAF2F8] text-[#583256] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-[#583256]" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2A182C]">
                Need Independent Verification or a Formal Supervision Contract?
              </div>
              <div className="text-[11px] text-[#5C4A60]">
                We provide signed supervisory agreements and monthly verification forms compliant with QABA® and international credentialing boards.
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenEnquiry('Supervision Verification Contract', 'Formal Supervision Agreement Request')}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-colors shrink-0 shadow-xs"
          >
            Request Supervision Agreement
          </button>
        </div>
      </div>
    </section>
  );
};

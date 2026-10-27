import React, { useState } from 'react';
import { Mail, Instagram, Youtube, Linkedin, ArrowUpRight, ShieldCheck, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { brandConfig } from '../data/brand';
import { servicesData } from '../data/services';
import { productsData } from '../data/products';
import { RoutePath } from '../types';

interface FooterProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterInterest, setNewsletterInterest] = useState<'All' | 'Exam Prep' | 'Parenting' | 'Educators'>('All');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterError('Please provide a valid email address.');
      return;
    }
    setNewsletterError('');
    setIsSubscribing(true);

    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
    }, 600);
  };

  return (
    <footer className="bg-[#1F1422] text-[#E0D5E3] border-t border-[#342438] mt-20">
      {/* Top Banner / Trust note */}
      <div className="border-b border-[#2F1F33] py-5 px-4 sm:px-6 lg:px-8 bg-[#180E1A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#B5A1B8]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Ethical, neurodiversity-affirming behavior science, study notes & parent education worldwide.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span>Direct Email: <a href={`mailto:${brandConfig.email}`} className="text-white hover:underline">{brandConfig.email}</a></span>
            <button
              onClick={() => onOpenEnquiry()}
              className="text-white hover:text-[#E8BCD5] font-semibold underline underline-offset-4"
            >
              Make an Enquiry
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-16">
        {/* NEW: Newsletter Signup Section with Soft Watercolor Ambient Glow */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#2B1B2F] via-[#352139] to-[#2B1B2F] border border-[#4A324E] p-8 sm:p-10 shadow-xl overflow-hidden">
          {/* Subtle Watercolor Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#E8BCD5]/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[#8E75A6]/10 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side: Heading & Value proposition */}
            <div className="lg:col-span-6 space-y-3">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#E8BCD5] bg-[#422A47]/80 px-3 py-1 rounded-full border border-[#5A3B60]">
                <Sparkles className="w-3.5 h-3.5 text-[#E8BCD5]" />
                <span>Behavior Science Digest</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Stay Updated with New Resources
              </h3>
              <p className="text-xs sm:text-sm text-[#C8B6CB] leading-relaxed max-w-lg">
                Join our community of parents, educators, and behavior trainees. Receive monthly evidence-informed articles, new QASP-S study guide releases, free templates, and workshop announcements.
              </p>
            </div>

            {/* Right side: Interactive Form or Success Confirmation */}
            <div className="lg:col-span-6">
              {isSubscribed ? (
                <div className="p-6 rounded-2xl bg-[#221326] border border-emerald-500/30 text-center space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    You're Subscribed!
                  </h4>
                  <p className="text-xs text-[#C8B6CB] leading-relaxed">
                    A confirmation welcome note has been sent to <span className="text-white font-semibold">{newsletterEmail}</span>. You will receive our monthly behavior science digest and early access to new study materials.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubscribed(false);
                      setNewsletterEmail('');
                    }}
                    className="text-[11px] text-[#E8BCD5] hover:underline pt-1 inline-block"
                  >
                    Register another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  {/* Category Interest Filter (Clean unboxed single-line options) */}
                  <div className="flex items-center gap-2 text-xs text-[#B5A1B8]">
                    <span className="text-[11px] text-[#A691A9]">Primary Interest:</span>
                    {(['All', 'Exam Prep', 'Parenting', 'Educators'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setNewsletterInterest(cat)}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium transition-colors ${
                          newsletterInterest === cat
                            ? 'bg-[#E8BCD5] text-[#2B1B2F] font-semibold'
                            : 'bg-[#3D2644] text-[#C8B6CB] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Input field + Button row */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-[#8C7590] absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-[#221326] border border-[#523758] text-white placeholder-[#8C7590] focus:outline-hidden focus:border-[#E8BCD5] focus:ring-1 focus:ring-[#E8BCD5] transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="px-6 py-2.5 text-xs font-semibold text-[#2B1B2F] bg-[#E8BCD5] hover:bg-white rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 disabled:opacity-50"
                    >
                      {isSubscribing ? (
                        <span>Subscribing...</span>
                      ) : (
                        <>
                          <span>Subscribe Free</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                  {newsletterError && (
                    <p className="text-xs text-rose-400">{newsletterError}</p>
                  )}

                  <p className="text-[11px] text-[#9E8B9F]">
                    🔒 Respectful & spam-free. Unsubscribe with 1 click at any time.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-white p-0.5 border border-[#48334D] shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                <img
                  src={brandConfig.logoPath}
                  alt="The Behavior Canvas Official Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white tracking-tight">
                  The Behavior Canvas
                </h3>
                <p className="text-xs text-[#C8B6CB] tracking-wide mt-0.5 font-medium">
                  {brandConfig.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#B5A1B8] leading-relaxed max-w-sm">
              Founded by Reema Singh. Bringing together behavior science, parent education, inclusive learning, and international professional development to help families, educators, and professionals build meaningful understanding.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <a
                href={brandConfig.instagram.url}
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-[#2F1F33] hover:bg-[#583256] text-[#E0D5E3] hover:text-white flex items-center justify-center transition-colors border border-[#422D47]"
                aria-label="Instagram @thebehaviorcanvas"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.youtube.url}
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-[#2F1F33] hover:bg-[#583256] text-[#E0D5E3] hover:text-white flex items-center justify-center transition-colors border border-[#422D47]"
                aria-label="YouTube @behaviorcanvas"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={brandConfig.linkedin.url}
                target="_blank"
                rel="noreferrer noopener"
                className="w-9 h-9 rounded-full bg-[#2F1F33] hover:bg-[#0077B5] text-[#E0D5E3] hover:text-white flex items-center justify-center transition-colors border border-[#422D47]"
                aria-label="LinkedIn Reema Singh (QASP-S)"
                title="LinkedIn Reema Singh (QASP-S)"
              >
                <Linkedin className="w-4 h-4 fill-current" />
              </a>
              <a
                href={`mailto:${brandConfig.email}`}
                className="w-9 h-9 rounded-full bg-[#2F1F33] hover:bg-[#583256] text-[#E0D5E3] hover:text-white flex items-center justify-center transition-colors border border-[#422D47]"
                aria-label="Email info@behaviorcanvas.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5A1B8]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About The Behavior Canvas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors"
                >
                  All Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-white transition-colors"
                >
                  Digital Study Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshops')}
                  className="hover:text-white transition-colors"
                >
                  Workshops & Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-white transition-colors"
                >
                  Articles & Learning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Enquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Services direct links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5A1B8]">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onNavigate('service-detail', s.slug)}
                    className="hover:text-white transition-colors text-left line-clamp-1"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Digital Resources links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Digital Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5A1B8]">
              {productsData.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onNavigate('product-detail', p.slug)}
                    className="hover:text-white transition-colors text-left line-clamp-1"
                  >
                    {p.title}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => onOpenEnquiry('Workshop Enquiry')}
                  className="text-[#E8BCD5] hover:text-white transition-colors flex items-center gap-1 font-medium"
                >
                  <span>Request Custom Training</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Policies & Disclaimers */}
        <div className="pt-12 mt-12 border-t border-[#2F1F33] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#9E8B9F]">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <button
                onClick={() => onNavigate('privacy-policy')}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate('terms-and-conditions')}
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </button>
              <button
                onClick={() => onNavigate('refund-and-cancellation-policy')}
                className="hover:text-white transition-colors"
              >
                Refund Policy
              </button>
              <button
                onClick={() => onNavigate('professional-disclaimer')}
                className="hover:text-white transition-colors"
              >
                Professional Disclaimer
              </button>
              <button
                onClick={() => onNavigate('copyright-policy')}
                className="hover:text-white transition-colors"
              >
                Copyright & Licensing
              </button>
            </div>
            <p className="tabular-nums">
              © {new Date().getFullYear()} The Behavior Canvas. All rights reserved.
            </p>
          </div>

          {/* Transparent Ethical Footnote */}
          <p className="text-[11px] text-[#7E6A80] leading-relaxed border-t border-[#2A1B2D] pt-4">
            Disclaimer: Content on this platform is published for educational and skill-building purposes. The Behavior Canvas does not provide medical or psychiatric diagnoses. In acute behavioral or medical emergencies, please contact your nearest local hospital emergency service immediately. QASP-S and other credential titles are referenced for descriptive educational identification and do not imply official board endorsement.
          </p>
        </div>
      </div>
    </footer>
  );
};

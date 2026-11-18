import React from 'react';
import { Printer, ArrowRight } from 'lucide-react';
import { policiesData } from '../data/policies';
import { RoutePath } from '../types';

interface PolicyPageProps {
  policySlug: string;
  onNavigate: (route: RoutePath, param?: string) => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ policySlug, onNavigate }) => {
  const policy = policiesData[policySlug] || policiesData['privacy-policy'];

  const policyLinks: { label: string; slug: RoutePath }[] = [
    { label: 'Privacy Policy', slug: 'privacy-policy' },
    { label: 'Terms and Conditions', slug: 'terms-and-conditions' },
    { label: 'Cancellation & Refund Policy', slug: 'refund-and-cancellation-policy' },
    { label: 'Professional Disclaimer', slug: 'professional-disclaimer' },
    { label: 'Educational Programme Disclaimer', slug: 'educational-disclaimer' },
    { label: 'Digital Product Terms', slug: 'digital-product-terms' },
    { label: 'Copyright Policy', slug: 'copyright-policy' },
  ];

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-[#514458]/10 p-6 shadow-xs space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6E6474]">
            Legal & Ethical Governance
          </span>
          <nav className="space-y-1">
            {policyLinks.map((link) => {
              const isActive = link.slug === policySlug;
              return (
                <button
                  key={link.slug}
                  onClick={() => onNavigate(link.slug)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#514458] text-white'
                      : 'text-[#514458]/80 hover:bg-[#F8F5EF]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                </button>
              );
            })}
          </nav>
          <button
            onClick={() => window.print()}
            className="w-full py-2.5 px-4 text-xs font-medium text-[#514458] bg-[#F8F5EF] border border-[#514458]/15 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Document</span>
          </button>
        </aside>

        <article className="lg:col-span-8 bg-white rounded-3xl border border-[#514458]/10 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="space-y-3 border-b border-[#514458]/10 pb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6474]">
              Last Updated: {policy.lastUpdated}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458]">
              {policy.title}
            </h1>
            <p className="text-xs bg-[#F4E4ED]/60 text-[#514458] p-3 rounded-xl">
              {policy.draftNotice}
            </p>
            <p className="text-sm sm:text-base text-[#6E6474] leading-relaxed pt-2">
              {policy.introduction}
            </p>
          </div>

          <div className="space-y-6">
            {policy.sections.map((sec) => (
              <section key={sec.heading} className="space-y-2.5">
                <h2 className="font-serif text-xl font-semibold text-[#514458]">{sec.heading}</h2>
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-sm text-[#6E6474] leading-relaxed">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

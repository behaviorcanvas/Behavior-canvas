import React from 'react';
import { Printer, ShieldCheck, ArrowRight, FileText } from 'lucide-react';
import { policiesData } from '../data/policies';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RoutePath } from '../types';

interface PolicyPageProps {
  policySlug: string;
  onNavigate: (route: RoutePath, param?: string) => void;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ policySlug, onNavigate }) => {
  const policy = policiesData[policySlug] || policiesData['privacy-policy'];

  const policyLinks: { label: string; slug: string }[] = [
    { label: 'Privacy Policy', slug: 'privacy-policy' },
    { label: 'Terms and Conditions', slug: 'terms-and-conditions' },
    { label: 'Refund & Cancellation Policy', slug: 'refund-and-cancellation-policy' },
    { label: 'Professional Disclaimer', slug: 'professional-disclaimer' },
    { label: 'Copyright & Licensing Policy', slug: 'copyright-policy' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: policy.title }]} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Sidebar Nav between policies */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-[#EDE2EB] p-6 shadow-xs space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A677D]">
            Legal & Professional Policies
          </span>
          <nav className="space-y-1">
            {policyLinks.map((link) => {
              const isActive = link.slug === policySlug;
              return (
                <button
                  key={link.slug}
                  onClick={() => onNavigate(link.slug as RoutePath)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#583256] text-white shadow-xs'
                      : 'text-[#5C4A60] hover:bg-[#FAF6F8] hover:text-[#2A182C]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <ArrowRight className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-[#EDE2EB]">
            <button
              onClick={handlePrint}
              className="w-full py-2 px-3 rounded-lg border border-[#DACFDB] text-xs font-medium text-[#5C4A60] hover:text-[#2A182C] hover:bg-[#FAF6F8] transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print or Save as PDF</span>
            </button>
          </div>
        </aside>

        {/* Policy Content */}
        <main className="lg:col-span-8 bg-white rounded-3xl border border-[#EDE2EB] p-8 sm:p-12 shadow-xs space-y-8">
          <div className="space-y-2 border-b border-[#EDE2EB] pb-6">
            <span className="text-xs font-semibold text-[#583256] uppercase tracking-wider">
              Official Policy Documentation
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2A182C]">
              {policy.title}
            </h1>
            <p className="text-xs text-[#7A677D]">
              Last Updated: {policy.lastUpdated} · The Behavior Canvas (behaviorcanvas.com)
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#5C4A60] leading-relaxed italic bg-[#FAF8FA] p-4 rounded-xl border border-[#F0E6EF]">
            {policy.introduction}
          </p>

          <div className="space-y-8 text-xs sm:text-sm text-[#2A182C] leading-relaxed">
            {policy.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-base sm:text-lg font-bold text-[#2A182C] tracking-tight">
                  {section.heading}
                </h2>
                <div className="space-y-2.5 text-[#5C4A60]">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-[#EDE2EB] text-xs text-[#7A677D] flex items-center justify-between">
            <span>The Behavior Canvas · Founded by Reema Singh</span>
            <span>Queries: info@behaviorcanvas.com</span>
          </div>
        </main>
      </div>
    </div>
  );
};

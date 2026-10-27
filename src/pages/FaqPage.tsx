import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';
import { faqsData, FAQItem } from '../data/faqs';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RoutePath } from '../types';

interface FaqPageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIds, setOpenIds] = useState<string[]>(['faq-what-is', 'faq-pan-india']);

  const categories = ['All', 'General', 'Services', 'Digital Shop', 'Workshops', 'Ethics & Disclaimers'];

  const toggleItem = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const filteredFaqs = faqsData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />

      {/* Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
          Clear & Honest Answers
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2A182C]">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-[#5A475D] leading-relaxed">
          Find answers about our consultations, online service delivery across India, digital study notes, and ethical standards.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 text-[#8C7A8F] absolute left-3.5 top-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. online, refund, QASP-S)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DACFDB] bg-white text-[#2A182C] placeholder-[#9E8E9F] focus:outline-hidden focus:border-[#583256] shadow-xs"
          />
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#583256] text-white shadow-xs'
                : 'bg-white text-[#5C4A60] border border-[#EDE2EB] hover:text-[#2A182C]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-[#EDE2EB] space-y-2">
            <p className="text-sm font-semibold text-[#2A182C]">No matching questions found.</p>
            <p className="text-xs text-[#5C4A60]">Please feel free to ask your question directly through our enquiry form.</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-[#EDE2EB] overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF6F8] transition-colors focus-visible:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#2A182C]">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#FAF6F8] border border-[#EDE2EB] flex items-center justify-center shrink-0 text-[#583256]">
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C4A60] leading-relaxed border-t border-[#F5EDF4] bg-[#FAF8FA]">
                    <p>{faq.answer}</p>
                    <div className="mt-3 pt-2 border-t border-[#EDE2EB] flex items-center justify-between text-[11px] text-[#7A677D]">
                      <span>Category: {faq.category}</span>
                      <button
                        onClick={() => onOpenEnquiry('General Guidance', `FAQ Query: ${faq.question}`)}
                        className="text-[#583256] font-medium hover:underline"
                      >
                        Still have questions? Enquire here
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still have questions CTA */}
      <div className="p-8 rounded-3xl bg-[#FAF6F8] border border-[#EDE2EB] text-center space-y-4">
        <h3 className="text-xl font-bold text-[#2A182C]">
          Have a question that is not covered here?
        </h3>
        <p className="text-xs sm:text-sm text-[#5C4A60] max-w-md mx-auto">
          We are here to help. Reach out with your query and Reema Singh or our team will get back to you promptly.
        </p>
        <button
          onClick={() => onOpenEnquiry('General Guidance')}
          className="px-6 py-2.5 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-colors shadow-xs"
        >
          Send Us Your Question
        </button>
      </div>
    </div>
  );
};

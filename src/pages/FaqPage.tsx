import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { faqsData } from '../data/faqs';
import { RoutePath } from '../types';

interface FaqPageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onOpenEnquiry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIds, setOpenIds] = useState<string[]>(['faq-what-is', 'faq-pan-india']);

  const categories = [
    'All',
    'General',
    'Services',
    'Digital Shop',
    'Workshops',
    'Ethics & Disclaimers',
  ];

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filtered = faqsData.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchQ =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
            Frequently Asked Questions
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#514458]">
            Clarity on Programmes, Services & Ethics
          </h1>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6E6474] absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-white border border-[#514458]/15"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#514458] text-white'
                    : 'bg-white text-[#514458] border border-[#514458]/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((item) => {
            const open = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-[#514458]/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-serif text-lg font-medium text-[#514458]">
                    {item.question}
                  </span>
                  {open ? (
                    <ChevronUp className="w-4 h-4 text-[#514458] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#514458] shrink-0" />
                  )}
                </button>
                {open && (
                  <div className="px-5 pb-5 text-sm text-[#6E6474] leading-relaxed border-t border-[#514458]/5 pt-3">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white p-8 rounded-2xl border border-[#514458]/10 text-center space-y-3">
          <h2 className="font-serif text-xl font-semibold text-[#514458]">Still Have Questions?</h2>
          <button
            onClick={() => onOpenEnquiry('General Guidance')}
            className="px-6 py-2.5 bg-[#514458] text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Ask Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

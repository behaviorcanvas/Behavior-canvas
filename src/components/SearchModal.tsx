import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  BookOpen,
  Briefcase,
  FileText,
  Calendar,
  HelpCircle,
  GraduationCap,
  Microscope,
  ChevronRight,
} from 'lucide-react';
import { ProductItem } from '../data/products';
import { faqsData } from '../data/faqs';
import { usePlatform } from '../contexts/PlatformContext';
import { RoutePath } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: RoutePath, param?: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onPreviewProduct: (product: ProductItem) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
  currency: 'USD' | 'INR';
}

type SearchCategory =
  | 'all'
  | 'programmes'
  | 'products'
  | 'services'
  | 'workshops'
  | 'research'
  | 'articles'
  | 'faqs';

interface SearchResultItem {
  id: string;
  type: Exclude<SearchCategory, 'all'>;
  title: string;
  subtitle: string;
  description: string;
  label: string;
  route: RoutePath;
  param?: string;
}

const POPULAR_SEARCHES = [
  'ABA Notes',
  'Foundations of Applied Behaviour Analysis',
  'Parent Training',
  'Functional Behaviour Assessment',
  'Assent',
  'Question Bank',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currency,
}) => {
  const { programmes, products, services, workshops, research, articles } = usePlatform();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 40);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  const allResults = useMemo<SearchResultItem[]>(() => {
    const trimmed = query.trim().toLowerCase();
    const results: SearchResultItem[] = [];

    programmes.forEach((p) => {
      if (
        !trimmed ||
        p.title.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.description.toLowerCase().includes(trimmed)
      ) {
        results.push({
          id: `prog-${p.id}`,
          type: 'programmes',
          title: p.title,
          subtitle: `${p.category} · ${p.enrolmentStatus}`,
          description: p.description,
          label: 'Academy Programme',
          route: 'programme-detail',
          param: p.slug,
        });
      }
    });

    products.forEach((p) => {
      if (
        !trimmed ||
        p.title.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.shortDescription.toLowerCase().includes(trimmed)
      ) {
        const priceDisplay =
          currency === 'INR'
            ? `₹${p.priceINR.toLocaleString('en-IN')}`
            : `$${p.priceUSD}`;
        results.push({
          id: `prod-${p.id}`,
          type: 'products',
          title: p.title,
          subtitle: `${p.category} · ${priceDisplay}`,
          description: p.shortDescription,
          label: 'Learning Resource',
          route: 'product-detail',
          param: p.slug,
        });
      }
    });

    services.forEach((s) => {
      if (
        !trimmed ||
        s.title.toLowerCase().includes(trimmed) ||
        s.shortDescription.toLowerCase().includes(trimmed)
      ) {
        results.push({
          id: `svc-${s.id}`,
          type: 'services',
          title: s.title,
          subtitle: s.audience,
          description: s.shortDescription,
          label: 'Service',
          route: 'service-detail',
          param: s.slug,
        });
      }
    });

    workshops.forEach((w) => {
      if (
        !trimmed ||
        w.title.toLowerCase().includes(trimmed) ||
        w.shortDescription.toLowerCase().includes(trimmed)
      ) {
        results.push({
          id: `wk-${w.id}`,
          type: 'workshops',
          title: w.title,
          subtitle: `${w.dateTime} · ${w.eventStatus || w.status}`,
          description: w.shortDescription,
          label: 'Workshop',
          route: 'workshop-detail',
          param: w.slug,
        });
      }
    });

    research.forEach((r) => {
      if (
        !trimmed ||
        r.title.toLowerCase().includes(trimmed) ||
        r.abstract.toLowerCase().includes(trimmed)
      ) {
        results.push({
          id: `res-${r.id}`,
          type: 'research',
          title: r.title,
          subtitle: `${r.type} · ${r.venueOrJournal || ''}`,
          description: r.abstract,
          label: 'Research',
          route: 'research',
        });
      }
    });

    articles.forEach((a) => {
      if (
        !trimmed ||
        a.title.toLowerCase().includes(trimmed) ||
        a.summary.toLowerCase().includes(trimmed)
      ) {
        results.push({
          id: `art-${a.id}`,
          type: 'articles',
          title: a.title,
          subtitle: `${a.category} · ${a.readTime}`,
          description: a.summary,
          label: 'Article',
          route: 'article-detail',
          param: a.slug,
        });
      }
    });

    faqsData.forEach((f) => {
      if (
        !trimmed ||
        f.question.toLowerCase().includes(trimmed) ||
        f.answer.toLowerCase().includes(trimmed)
      ) {
        results.push({
          id: `faq-${f.id}`,
          type: 'faqs',
          title: f.question,
          subtitle: f.category,
          description: f.answer,
          label: 'FAQ',
          route: 'faq',
        });
      }
    });

    return results;
  }, [query, programmes, products, services, workshops, research, articles, currency]);

  const filteredResults = useMemo(() => {
    if (activeCategory === 'all') return allResults;
    return allResults.filter((r) => r.type === activeCategory);
  }, [allResults, activeCategory]);

  if (!isOpen) return null;

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    onNavigate(item.route, item.param);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#514458]/55 backdrop-blur-xs flex items-start justify-center p-4 md:pt-16"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#514458]/10 overflow-hidden flex flex-col max-h-[82vh]">
        <div className="p-4 sm:p-5 border-b border-[#514458]/10 bg-[#F8F5EF]">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-[#6E6474]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') onClose();
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  setSelectedIndex((p) => Math.min(p + 1, filteredResults.length - 1));
                }
                if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  setSelectedIndex((p) => Math.max(p - 1, 0));
                }
                if (e.key === 'Enter' && filteredResults[selectedIndex]) {
                  e.preventDefault();
                  handleSelect(filteredResults[selectedIndex]);
                }
              }}
              placeholder="Search Academy programmes, resources, services, workshops, research..."
              className="w-full pl-12 pr-10 py-3 bg-white border border-[#514458]/15 rounded-xl text-sm text-[#514458] focus:outline-hidden focus:border-[#514458]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 text-[#6E6474] hover:text-[#514458] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto text-xs">
            {(
              [
                ['all', 'All'],
                ['programmes', 'Academy'],
                ['services', 'Services'],
                ['workshops', 'Workshops'],
                ['products', 'Resources'],
                ['research', 'Research'],
                ['articles', 'Blog'],
                ['faqs', 'FAQs'],
              ] as [SearchCategory, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === key
                    ? 'bg-[#514458] text-white'
                    : 'bg-white text-[#514458]/80 border border-[#514458]/10 hover:bg-[#F4E4ED]/60'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#514458]/10">
          {filteredResults.length === 0 ? (
            <div className="py-10 text-center space-y-3">
              <p className="text-sm font-medium text-[#514458]">No matching results found</p>
              <div className="flex flex-wrap justify-center gap-2">
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-3 py-1 text-xs bg-[#F8F5EF] text-[#514458] rounded-lg border border-[#514458]/10 cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            filteredResults.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                  selectedIndex === idx ? 'bg-[#F4E4ED]/50' : 'hover:bg-[#F8F5EF]'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-[#E9E1F4]/60 text-[#514458] shrink-0 mt-0.5">
                    {item.type === 'programmes' && <GraduationCap className="w-4 h-4" />}
                    {item.type === 'products' && <BookOpen className="w-4 h-4" />}
                    {item.type === 'services' && <Briefcase className="w-4 h-4" />}
                    {item.type === 'workshops' && <Calendar className="w-4 h-4" />}
                    {item.type === 'research' && <Microscope className="w-4 h-4" />}
                    {item.type === 'articles' && <FileText className="w-4 h-4" />}
                    {item.type === 'faqs' && <HelpCircle className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-[#6E6474] mb-0.5">
                      {item.label} · {item.subtitle}
                    </div>
                    <h4 className="text-sm font-semibold text-[#514458] truncate">{item.title}</h4>
                    <p className="text-xs text-[#6E6474] line-clamp-1 mt-0.5">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#514458]/60 shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

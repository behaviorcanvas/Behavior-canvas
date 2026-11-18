import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { usePlatform } from '../contexts/PlatformContext';
import { RoutePath } from '../types';

interface ArticlesPageProps {
  selectedSlug?: string;
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  selectedSlug,
  onNavigate,
  onOpenEnquiry,
}) => {
  const { articles } = usePlatform();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const activeArticle = selectedSlug
    ? articles.find((a) => a.slug === selectedSlug || a.id === selectedSlug) || null
    : null;

  if (activeArticle) {
    return (
      <div className="bg-[#F8F5EF] py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <button
            onClick={() => onNavigate('articles')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#514458] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog & Articles</span>
          </button>

          <article className="bg-white rounded-3xl border border-[#514458]/10 p-8 sm:p-12 shadow-xs space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6E6474]">
                {activeArticle.category} · {activeArticle.readTime}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458] leading-tight">
                {activeArticle.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#6E6474] pt-1">
                <span>
                  By <strong className="text-[#514458]">{activeArticle.author}</strong>
                </span>
                <span>·</span>
                <span>{activeArticle.publishedDate}</span>
              </div>
              <p className="text-base text-[#6E6474] leading-relaxed border-l-2 border-[#514458]/25 pl-4">
                {activeArticle.summary}
              </p>
            </div>

            <div className="space-y-6">
              {activeArticle.sections.map((sec, idx) => (
                <section key={idx} className="space-y-3">
                  {sec.heading && (
                    <h2 className="font-serif text-2xl font-semibold text-[#514458]">
                      {sec.heading}
                    </h2>
                  )}
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm sm:text-base text-[#514458]/85 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {activeArticle.keyTakeaways?.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#F8F5EF] border border-[#514458]/10 space-y-3">
                <h3 className="font-serif text-lg font-semibold text-[#514458]">Key Takeaways</h3>
                <ul className="space-y-2">
                  {activeArticle.keyTakeaways.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#514458]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeArticle.references?.length > 0 && (
              <div className="pt-4 border-t border-[#514458]/10 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#6E6474]">
                  Academic References
                </h3>
                <ul className="space-y-1 text-xs text-[#6E6474]">
                  {activeArticle.references.map((ref) => (
                    <li key={ref}>{ref}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 rounded-xl bg-[#F4E4ED]/50 border border-[#514458]/10 flex items-start gap-3 text-xs text-[#514458]">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                Educational note: Articles are authored for behavioural literacy and reflection and do not constitute clinical diagnosis.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('programmes')}
                className="px-5 py-2.5 bg-[#514458] text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Explore Related Academy Programmes
              </button>
              <button
                onClick={() => onOpenEnquiry('Consultation', activeArticle.title)}
                className="px-5 py-2.5 bg-[#F4E4ED] text-[#514458] text-xs font-semibold rounded-xl cursor-pointer"
              >
                Enquire With Our Team
              </button>
            </div>
          </article>
        </div>
      </div>
    );
  }

  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category)))];
  const filtered = articles.filter((a) => {
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQ =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
              Editorial Blog & Knowledge Hub
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#514458]">
              Research & Blog Articles
            </h1>
            <p className="text-base text-[#6E6474] leading-relaxed">
              Accessible reflections on behavioural functions, caregiver support, inclusive classrooms, and ethical practice.
            </p>
          </div>
          <button
            onClick={() => onNavigate('research')}
            className="px-4 py-2 text-xs font-semibold text-[#514458] bg-white border border-[#514458]/15 rounded-xl self-start md:self-auto cursor-pointer"
          >
            View Research & Publications
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#514458] text-white'
                    : 'bg-white text-[#514458] border border-[#514458]/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#6E6474] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#514458]/15"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((art) => (
            <div
              key={art.id}
              onClick={() => onNavigate('article-detail', art.slug)}
              className="p-7 rounded-2xl bg-white border border-[#514458]/10 shadow-xs hover:border-[#514458]/25 transition-all flex flex-col justify-between space-y-5 cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#6E6474]">
                  <span className="font-semibold text-[#514458]">{art.category}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-[#514458] leading-snug">
                  {art.title}
                </h2>
                <p className="text-sm text-[#6E6474] leading-relaxed">{art.summary}</p>
              </div>
              <div className="pt-4 border-t border-[#514458]/10 flex items-center justify-between text-xs text-[#6E6474]">
                <span>{art.publishedDate}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#514458]">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

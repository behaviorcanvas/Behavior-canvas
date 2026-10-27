import React, { useState } from 'react';
import { Search, ArrowRight, ArrowLeft, BookOpen, Clock, Calendar, User, Share2, CheckCircle2, ShieldAlert } from 'lucide-react';
import { articlesData, ArticleItem } from '../data/articles';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { brandConfig } from '../data/brand';
import { RoutePath } from '../types';

interface ArticlesPageProps {
  selectedSlug?: string;
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  selectedSlug,
  onNavigate,
  onOpenEnquiry
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedLink, setCopiedLink] = useState(false);

  const activeArticle = selectedSlug
    ? articlesData.find((a) => a.slug === selectedSlug) || null
    : null;

  const categories = [
    'All',
    'ABA & Behavior Science',
    'Parenting & Caregiver Education',
    'Special Education & Inclusive Classrooms',
    'Professional Development & QASP-S Prep'
  ];

  const filteredArticles = articlesData.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // 1. ARTICLE FULL READER VIEW
  if (activeArticle) {
    const relatedArticles = articlesData
      .filter((a) => a.id !== activeArticle.id)
      .slice(0, 2);

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <Breadcrumbs
          items={[
            { label: 'Articles & Learning Hub', onClick: () => onNavigate('articles') },
            { label: activeArticle.title }
          ]}
        />

        <button
          onClick={() => onNavigate('articles')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#583256] hover:text-[#2A182C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Articles</span>
        </button>

        {/* Article Header */}
        <header className="space-y-4 border-b border-[#EDE2EB] pb-8">
          <div className="flex items-center gap-2 text-xs text-[#7A677D]">
            <span className="font-semibold text-[#583256]">{activeArticle.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeArticle.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{activeArticle.publishedDate}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#2A182C] leading-tight">
            {activeArticle.title}
          </h1>

          <p className="text-base sm:text-lg text-[#5A475D] leading-relaxed italic">
            "{activeArticle.summary}"
          </p>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#583256]/10 text-[#583256] flex items-center justify-center font-bold font-serif text-sm">
                RS
              </div>
              <div>
                <p className="text-xs font-bold text-[#2A182C]">{activeArticle.author}</p>
                <p className="text-[11px] text-[#7A677D]">{activeArticle.authorRole}</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg border border-[#DACFDB] text-xs font-medium text-[#5C4A60] hover:text-[#2A182C] hover:bg-[#FAF6F8] transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-slate max-w-none space-y-8 text-sm sm:text-base text-[#2A182C] leading-relaxed">
          {activeArticle.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              {sec.heading && (
                <h2 className="text-xl sm:text-2xl font-bold text-[#2A182C] tracking-tight">
                  {sec.heading}
                </h2>
              )}
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[#4A384D] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </article>

        {/* Key Takeaways Box */}
        <div className="p-6 sm:p-8 bg-[#FAF6F8] rounded-2xl border border-[#EDE2EB] space-y-3">
          <h3 className="text-base font-bold text-[#2A182C] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#583256]" />
            <span>Key Practical Takeaways</span>
          </h3>
          <ul className="space-y-2">
            {activeArticle.keyTakeaways.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2A182C]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* References */}
        {activeArticle.references.length > 0 && (
          <div className="p-6 bg-white rounded-2xl border border-[#EDE2EB] space-y-3 text-xs text-[#6B5A6E]">
            <h4 className="font-bold text-[#2A182C] uppercase tracking-wider text-[11px]">
              Scientific References & Academic Sources
            </h4>
            <ul className="space-y-1.5 list-disc list-inside">
              {activeArticle.references.map((ref, i) => (
                <li key={i} className="italic leading-relaxed">{ref}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Educational Disclaimer */}
        <div className="p-4 bg-[#FAF8FA] rounded-xl border border-[#EDE2EB] text-xs text-[#6B5A6E] flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#8E75A6] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Educational Disclaimer: This article is intended strictly for general informational and educational purposes. It does not replace individualized behavioral consultation, psychiatric assessment, or medical diagnosis.
          </p>
        </div>

        {/* Related Articles */}
        <div className="pt-10 border-t border-[#EDE2EB] space-y-6">
          <h3 className="text-xl font-bold text-[#2A182C]">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onNavigate('article-detail', rel.slug)}
                className="p-5 rounded-2xl bg-white border border-[#EDE2EB] hover:border-[#DACFDB] hover:shadow-md transition-all cursor-pointer space-y-2.5"
              >
                <span className="text-[11px] font-semibold text-[#583256] uppercase tracking-wider">
                  {rel.category}
                </span>
                <h4 className="text-sm font-bold text-[#2A182C] line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#5C4A60] line-clamp-2">
                  {rel.summary}
                </p>
                <span className="text-xs font-semibold text-[#583256] inline-flex items-center gap-1 pt-1">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. ARTICLES REPOSITORY OVERVIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Articles & Learning Hub' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EDE2EB] pb-8">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
            Educational Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2A182C]">
            Articles & Learning Hub
          </h1>
          <p className="text-sm sm:text-base text-[#5A475D] leading-relaxed">
            Evidence-informed essays and practical guides on understanding behavior, positive reinforcement, neurodiversity-affirming inclusion, and QASP-S exam strategies.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-[#8C7A8F] absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-[#DACFDB] bg-white text-[#2A182C] placeholder-[#9E8E9F] focus:outline-hidden focus:border-[#583256]"
          />
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
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

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.length === 0 ? (
          <div className="col-span-full p-12 text-center bg-white rounded-3xl border border-[#EDE2EB] space-y-2">
            <h3 className="text-base font-bold text-[#2A182C]">No articles found matching your query</h3>
            <p className="text-xs text-[#5C4A60]">Try clearing your search terms or selecting another category.</p>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="p-7 rounded-3xl bg-white border border-[#EDE2EB] shadow-xs hover:border-[#DACFDB] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-[#7A677D]">
                  <span className="font-semibold text-[#583256]">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-lg font-bold text-[#2A182C] line-clamp-2 leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs text-[#5C4A60] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F2EBF1] flex items-center justify-between text-xs">
                <span className="text-[#8C7A8F]">{article.publishedDate}</span>
                <button
                  onClick={() => onNavigate('article-detail', article.slug)}
                  className="font-semibold text-[#583256] hover:text-[#2A182C] flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

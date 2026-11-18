import React, { useState } from 'react';
import { Microscope, BookOpen, Presentation, ExternalLink, ArrowRight } from 'lucide-react';
import { usePlatform } from '../contexts/PlatformContext';
import { RoutePath } from '../types';

interface ResearchPageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  const { research, articles } = usePlatform();
  const [filter, setFilter] = useState<'All' | 'Interest Area' | 'Publication' | 'Conference Presentation'>('All');

  const filtered =
    filter === 'All' ? research : research.filter((r) => r.type === filter);

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-[#514458]/10 shadow-xs">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
              Scholarship & Clinical Psychology Research
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#514458] leading-tight">
              Research, Publications & Academic Dialogue
            </h1>
            <p className="text-base text-[#6E6474] leading-relaxed">
              The Behavior Canvas actively engages with empirical literature, assent-centred methodologies, inclusive pedagogy research, and practitioner scholarship led by Reema Singh (Clinical Psychology Researcher & QASP-S).
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onOpenEnquiry('Research & Academic Collaboration')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl cursor-pointer"
              >
                Propose Academic Collaboration
              </button>
              <button
                onClick={() => onNavigate('articles')}
                className="px-5 py-2.5 text-xs font-semibold text-[#514458] bg-[#F4E4ED] hover:bg-[#E9E1F4] rounded-xl cursor-pointer"
              >
                Read Educational Articles
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[#514458]/10">
              <img
                src="/assets/images/research_journal_editorial_1794989153921.jpg"
                alt="Behavioural Science Research Journal Editorial"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['All', 'Interest Area', 'Publication', 'Conference Presentation'] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                  filter === tab
                    ? 'bg-[#514458] text-white'
                    : 'bg-white text-[#514458] border border-[#514458]/15'
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-2xl bg-white border border-[#514458]/10 space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between text-xs text-[#6E6474]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#514458]">
                  {item.type === 'Interest Area' && <Microscope className="w-3.5 h-3.5" />}
                  {item.type === 'Publication' && <BookOpen className="w-3.5 h-3.5" />}
                  {item.type === 'Conference Presentation' && (
                    <Presentation className="w-3.5 h-3.5" />
                  )}
                  {item.type}
                </span>
                <span>{item.year}</span>
              </div>
              <h2 className="font-serif text-xl font-semibold text-[#514458]">{item.title}</h2>
              {item.authors && (
                <p className="text-xs text-[#6E6474] font-medium">{item.authors}</p>
              )}
              {item.venueOrJournal && (
                <p className="text-xs italic text-[#6E6474]">{item.venueOrJournal}</p>
              )}
              <p className="text-sm text-[#6E6474] leading-relaxed">{item.abstract}</p>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#514458] hover:underline pt-1"
                >
                  <span>View Publication Reference</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#514458]/10 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold text-[#514458]">
              Evidence-Based Educational Articles
            </h2>
            <button
              onClick={() => onNavigate('articles')}
              className="text-xs font-semibold text-[#514458] inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>All Blog Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {articles.slice(0, 4).map((a) => (
              <button
                key={a.id}
                onClick={() => onNavigate('article-detail', a.slug)}
                className="text-left p-5 rounded-xl bg-[#F8F5EF]/70 hover:bg-[#F4E4ED]/40 border border-[#514458]/10 transition-colors cursor-pointer space-y-1.5"
              >
                <span className="text-[11px] font-medium text-[#6E6474]">
                  {a.category} · {a.readTime}
                </span>
                <h3 className="font-serif text-lg font-medium text-[#514458]">{a.title}</h3>
                <p className="text-xs text-[#6E6474] line-clamp-2">{a.summary}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

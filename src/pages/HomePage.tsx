import React from 'react';
import {
  ArrowRight,
  GraduationCap,
  HeartHandshake,
  Calendar,
  BookOpen,
  Microscope,
  FileText,
  CheckCircle2,
  Mail,
  Edit3,
} from 'lucide-react';
import { brandConfig } from '../data/brand';
import { DEFAULT_CMS_PAGES } from '../data/cmsDefaults';
import { ProductItem } from '../data/products';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../contexts/PlatformContext';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { RoutePath } from '../types';

interface HomePageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
  onOpenSearch?: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onPreviewProduct?: (product: ProductItem) => void;
  currency: 'USD' | 'INR';
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenEnquiry,
  currency,
}) => {
  const { isAdmin, isVerifiedUser } = useAuth();
  const { cmsPages, programmes, workshops, research, articles, requestAdminEdit } = usePlatform();
  const showAdminEdit = isVerifiedUser && isAdmin;

  const homeCms = cmsPages['home'] || DEFAULT_CMS_PAGES['home'];
  const defaultHome = DEFAULT_CMS_PAGES['home'];

  const findSection = (id: string) =>
    homeCms?.sections?.find((s) => s.id === id) ||
    defaultHome.sections.find((s) => s.id === id);

  const introSec = findSection('home-intro');
  const pillarsSec = findSection('home-pillars');
  const academySec = findSection('home-academy-highlight');
  const workshopsSec = findSection('home-workshops');
  const founderSec = findSection('home-founder');
  const philSec = findSection('home-philosophy');
  const researchSec = findSection('home-research');
  const ctaSec = findSection('home-cta');

  const symbol = currency === 'INR' ? '₹' : '$';
  const pillarIcons = [HeartHandshake, GraduationCap, Calendar, BookOpen];

  const fourAreas = (pillarsSec?.items && pillarsSec.items.length > 0
    ? pillarsSec.items
    : defaultHome.sections.find((s) => s.id === 'home-pillars')?.items || []
  ).map((item, idx) => ({
    title: item.title,
    description: item.description,
    image: item.imageUrl || '/src/assets/images/hero_behaviour_canvas_calm_1794989127767.jpg',
    cta: item.ctaLabel || 'Explore',
    route: (item.link as RoutePath) || 'services',
    icon: pillarIcons[idx % pillarIcons.length],
  }));

  const philosophyItems =
    philSec?.items && philSec.items.length > 0
      ? philSec.items
      : brandConfig.philosophyPrinciples;

  const founderHighlights =
    founderSec?.items && founderSec.items.length > 0
      ? founderSec.items.map((i) => i.title)
      : brandConfig.founder.approachHighlights;

  const editSectionButton = (sectionId: string, label = 'Edit Section') => {
    if (!showAdminEdit) return null;
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          requestAdminEdit('pages', 'home', sectionId);
          onNavigate('admin');
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#342A3A] text-white hover:bg-[#514458] text-[11px] font-semibold shadow-xs transition-colors cursor-pointer"
        title={`Edit ${sectionId} in Admin Studio`}
      >
        <Edit3 className="w-3 h-3" />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="bg-[#F8F5EF] text-[#514458]">
      {/* 4.1 HERO SECTION */}
      <section className="pt-12 pb-16 lg:py-24 border-b border-[#514458]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showAdminEdit && (
            <div className="mb-4 flex justify-end">
              {editSectionButton('hero', 'Edit Hero Banner')}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
                {homeCms?.subtitle || brandConfig.positioning}
              </p>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.35rem] font-semibold tracking-tight text-[#514458] leading-[1.12]">
                {homeCms?.heroHeading || 'Understanding Behaviour. Creating Meaningful Change.'}
              </h1>

              <p className="text-base sm:text-lg text-[#6E6474] leading-relaxed max-w-xl">
                {homeCms?.heroBody || brandConfig.heroSubheadline}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('academy')}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>{homeCms?.ctaPrimaryLabel || 'Explore Our Academy'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 text-sm font-semibold text-[#514458] bg-[#F4E4ED]/65 hover:bg-[#F4E4ED] border border-[#514458]/15 rounded-xl transition-all cursor-pointer"
                >
                  {homeCms?.ctaSecondaryLabel || 'Discover Our Services'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#514458]/10 bg-[#F4E4ED]/30 shadow-sm aspect-[16/10]">
                <img
                  src={
                    homeCms?.heroImage ||
                    '/src/assets/images/hero_behaviour_canvas_calm_1794989127767.jpg'
                  }
                  alt="Calm pastel watercolour editorial illustration for The Behavior Canvas"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.2 INTRODUCTION */}
      {(!introSec || introSec.visible) && (
        <section className="py-16 lg:py-20 bg-[#F8F5EF]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            {showAdminEdit && <div className="flex justify-center">{editSectionButton('home-intro')}</div>}
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
              {introSec?.subheading || 'Our Mission & Purpose'}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458] tracking-tight leading-snug">
              {introSec?.heading || 'A Space Where Behavioural Science Meets Meaningful Learning.'}
            </h2>
            <p className="text-base text-[#6E6474] leading-relaxed">
              {introSec?.body || brandConfig.mission}
            </p>
            {(introSec?.ctaLabel || true) && (
              <p className="text-sm text-[#6E6474] leading-relaxed pt-1">
                {introSec?.ctaLabel ||
                  'Supporting parents and families, individuals requiring thoughtful support, psychology and special education students, behaviour analysts, educators, curious learners, and academic research communities.'}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 4.3 OUR AREAS OF WORK */}
      {(!pillarsSec || pillarsSec.visible) && (
        <section className="py-16 bg-white border-y border-[#514458]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
                  {pillarsSec?.subheading || 'What We Do'}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458] tracking-tight">
                  {pillarsSec?.heading || 'Our Four Pillars of Work'}
                </h2>
              </div>
              {editSectionButton('home-pillars', 'Edit Pillars')}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fourAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <div
                    key={area.title}
                    onClick={() => onNavigate(area.route)}
                    className="group rounded-2xl bg-[#F8F5EF]/60 hover:bg-white border border-[#514458]/10 hover:border-[#514458]/25 overflow-hidden transition-all flex flex-col justify-between cursor-pointer shadow-xs"
                  >
                    <div>
                      <div className="h-44 overflow-hidden bg-[#E9E1F4]/40">
                        <img
                          src={area.image}
                          alt={area.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <Icon className="w-5 h-5 text-[#514458]" />
                        <h3 className="font-serif text-xl font-semibold text-[#514458]">
                          {area.title}
                        </h3>
                        <p className="text-sm text-[#6E6474] leading-relaxed">{area.description}</p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#514458] group-hover:gap-2.5 transition-all">
                        <span>{area.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4.4 ACADEMY HIGHLIGHT */}
      {(!academySec || academySec.visible) && (
        <section className="py-16 lg:py-20 bg-[#E9E1F4]/35">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
                  {academySec?.subheading || 'Academic & Applied Programmes'}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458] tracking-tight">
                  {academySec?.heading || 'The Behavior Canvas – Academy of Behavioural Science.'}
                </h2>
                <p className="text-sm sm:text-base text-[#6E6474] leading-relaxed">
                  {academySec?.body}
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                {editSectionButton('home-academy-highlight')}
                <button
                  onClick={() => onNavigate('programmes')}
                  className="px-5 py-3 text-xs font-semibold text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl inline-flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>{academySec?.ctaLabel || 'Explore All Programmes'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programmes.slice(0, 3).map((prog) => {
                const feeDisplay = prog.isFree
                  ? 'Free Access'
                  : `${symbol}${(currency === 'INR' ? prog.feeINR : prog.feeUSD).toLocaleString()}`;
                return (
                  <div
                    key={prog.id}
                    onClick={() => onNavigate('programme-detail', prog.slug)}
                    className="rounded-2xl bg-white border border-[#514458]/10 overflow-hidden shadow-xs hover:border-[#514458]/25 transition-all flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="h-44 overflow-hidden bg-[#F4E4ED]/40">
                        <img
                          src={prog.coverImage}
                          alt={prog.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between text-xs text-[#6E6474]">
                          <span className="font-medium text-[#514458]">{prog.enrolmentStatus}</span>
                          <span>{prog.duration.split('(')[0].trim()}</span>
                        </div>
                        <h3 className="font-serif text-xl font-semibold text-[#514458] leading-snug">
                          {prog.title}
                        </h3>
                        <p className="text-sm text-[#6E6474] line-clamp-3 leading-relaxed">
                          {prog.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-[#F8F5EF]/60 border-t border-[#514458]/10 flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#514458]">{feeDisplay}</span>
                      <span className="inline-flex items-center gap-1 font-medium text-[#514458]">
                        <span>Programme Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4.5 UPCOMING WORKSHOPS */}
      {(!workshopsSec || workshopsSec.visible) && (
        <section className="py-16 bg-white border-y border-[#514458]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
                  {workshopsSec?.subheading || 'Live Learning & Cohorts'}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458] tracking-tight">
                  {workshopsSec?.heading || 'Workshops & Masterclasses'}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                {editSectionButton('home-workshops')}
                <button
                  onClick={() => onNavigate('workshops')}
                  className="text-xs font-semibold text-[#514458] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{workshopsSec?.ctaLabel || 'View All Workshops'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {workshops.slice(0, 3).map((w) => (
                <div
                  key={w.id}
                  className="p-6 rounded-2xl bg-[#F8F5EF]/60 border border-[#514458]/10 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#6E6474]">
                      <span className="font-semibold text-[#514458]">
                        {w.eventStatus || w.status}
                      </span>
                      <span>{w.duration.split('(')[0].trim()}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#514458] leading-snug">
                      {w.title}
                    </h3>
                    <p className="text-xs text-[#6E6474] font-medium">{w.dateTime}</p>
                    <p className="text-sm text-[#6E6474] leading-relaxed line-clamp-3">
                      {w.shortDescription}
                    </p>
                    <p className="text-xs text-[#514458]/80">
                      <strong>Audience:</strong> {w.audience}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#514458]/10 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-[#514458]">{w.fee}</span>
                    <button
                      onClick={() => onNavigate('workshop-detail', w.slug)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl cursor-pointer"
                    >
                      Details & Register
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4.6 FOUNDER INTRODUCTION */}
      {(!founderSec || founderSec.visible) && (
        <section className="py-16 lg:py-20 bg-[#F8F5EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-white rounded-3xl p-8 sm:p-12 border border-[#514458]/10 shadow-xs">
              <div className="lg:col-span-4">
                <div className="rounded-2xl overflow-hidden border border-[#514458]/15 aspect-[4/5] bg-[#F4E4ED]/30">
                  <img
                    src={founderSec?.imageUrl || brandConfig.founder.image}
                    alt="Reema Singh — Founder & Director, The Behavior Canvas"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
                    {founderSec?.subheading || 'Meet the Founder'}
                  </p>
                  {editSectionButton('home-founder', 'Edit Founder Section')}
                </div>
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458]">
                    {founderSec?.heading || brandConfig.founder.name}
                  </h2>
                  <p className="text-sm font-medium text-[#514458] mt-1">
                    {brandConfig.founder.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[#6E6474] mt-1 font-medium">
                    {brandConfig.founder.credentialsLine}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#6E6474] leading-relaxed">
                  {founderSec?.body || brandConfig.founder.bioShort}
                </p>

                <ul className="space-y-2 pt-1">
                  {founderHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#514458]">
                      <CheckCircle2 className="w-4 h-4 text-[#514458] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('meet-the-founder')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#514458] bg-[#F4E4ED] hover:bg-[#E9E1F4] rounded-xl transition-colors cursor-pointer"
                  >
                    <span>{founderSec?.ctaLabel || 'Read Full Founder Biography'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4.7 OUR PHILOSOPHY */}
      {(!philSec || philSec.visible) && (
        <section className="py-16 lg:py-20 bg-white border-y border-[#514458]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
                  {philSec?.subheading || 'Ethical Framework'}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458]">
                  {philSec?.heading || 'Behaviour Is More Than What We See.'}
                </h2>
                <p className="text-sm sm:text-base text-[#6E6474] leading-relaxed">
                  {philSec?.body}
                </p>
              </div>
              {editSectionButton('home-philosophy', 'Edit Philosophy')}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {philosophyItems.map((principle, index) => (
                <div
                  key={`${principle.title}-${index}`}
                  className="p-6 rounded-2xl bg-[#F8F5EF]/70 border border-[#514458]/10 space-y-2.5"
                >
                  <span className="text-xs font-mono text-[#6E6474]">0{index + 1}</span>
                  <h3 className="font-serif text-lg font-semibold text-[#514458]">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-[#6E6474] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4.8 RESEARCH AND KNOWLEDGE */}
      {(!researchSec || researchSec.visible) && (
        <section className="py-16 lg:py-20 bg-[#F8F5EF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
                  {researchSec?.subheading || 'Scholarship & Applied Knowledge'}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458]">
                  {researchSec?.heading || 'Research, Publications & Articles'}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                {editSectionButton('home-research')}
                <button
                  onClick={() => onNavigate('research')}
                  className="text-[#514458] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Microscope className="w-3.5 h-3.5" />
                  <span>Research & Publications</span>
                </button>
                <button
                  onClick={() => onNavigate('articles')}
                  className="text-[#514458] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>All Articles</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-7 rounded-2xl bg-white border border-[#514458]/10 space-y-4">
                <h3 className="font-serif text-xl font-semibold text-[#514458]">
                  Research Themes & Publications
                </h3>
                <div className="divide-y divide-[#514458]/10">
                  {research.slice(0, 3).map((item) => (
                    <div key={item.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1">
                      <span className="text-[11px] font-medium text-[#6E6474]">
                        {item.type} · {item.year}
                      </span>
                      <h4 className="text-sm font-semibold text-[#514458]">{item.title}</h4>
                      <p className="text-xs text-[#6E6474] line-clamp-2">{item.abstract}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('research')}
                  className="text-xs font-semibold text-[#514458] inline-flex items-center gap-1 pt-2 hover:underline cursor-pointer"
                >
                  <span>Explore Research Archive</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-7 rounded-2xl bg-white border border-[#514458]/10 space-y-4">
                <h3 className="font-serif text-xl font-semibold text-[#514458]">
                  Recent Educational Articles
                </h3>
                <div className="divide-y divide-[#514458]/10">
                  {articles.slice(0, 3).map((art) => (
                    <button
                      key={art.id}
                      onClick={() => onNavigate('article-detail', art.slug)}
                      className="w-full text-left py-3.5 first:pt-0 last:pb-0 space-y-1 group cursor-pointer"
                    >
                      <span className="text-[11px] font-medium text-[#6E6474]">
                        {art.category} · {art.readTime}
                      </span>
                      <h4 className="text-sm font-semibold text-[#514458] group-hover:underline">
                        {art.title}
                      </h4>
                      <p className="text-xs text-[#6E6474] line-clamp-2">{art.summary}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('articles')}
                  className="text-xs font-semibold text-[#514458] inline-flex items-center gap-1 pt-2 hover:underline cursor-pointer"
                >
                  <span>Read All Articles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4.9 TESTIMONIALS */}
      <TestimonialsSection onOpenEnquiry={onOpenEnquiry} />

      {/* 4.10 FINAL CALL TO ACTION */}
      {(!ctaSec || ctaSec.visible) && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            {showAdminEdit && <div className="flex justify-center">{editSectionButton('home-cta', 'Edit CTA Banner')}</div>}
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458]">
              {ctaSec?.heading || "Let's Learn, Understand and Grow Together."}
            </h2>
            <p className="text-sm sm:text-base text-[#6E6474] leading-relaxed max-w-2xl mx-auto">
              {ctaSec?.body}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('programmes')}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl cursor-pointer"
              >
                {ctaSec?.ctaLabel || 'Explore Programmes'}
              </button>
              <button
                onClick={() => onOpenEnquiry('Behavioural Services')}
                className="px-6 py-3.5 text-sm font-semibold text-[#514458] bg-[#F4E4ED] hover:bg-[#E9E1F4] rounded-xl cursor-pointer"
              >
                Enquire About Services
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 text-sm font-semibold text-[#514458] border border-[#514458]/20 hover:bg-[#F8F5EF] rounded-xl inline-flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

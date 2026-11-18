import React from 'react';
import { CheckCircle2, Target, Compass, ArrowRight, Linkedin, Edit3 } from 'lucide-react';
import { brandConfig } from '../data/brand';
import { DEFAULT_CMS_PAGES } from '../data/cmsDefaults';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../contexts/PlatformContext';
import { RoutePath } from '../types';

interface AboutPageProps {
  mode?: 'about' | 'meet-the-founder' | 'our-philosophy';
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  mode = 'about',
  onNavigate,
  onOpenEnquiry,
}) => {
  const { isAdmin, isVerifiedUser } = useAuth();
  const { cmsPages, requestAdminEdit } = usePlatform();
  const showAdminEdit = isVerifiedUser && isAdmin;

  const pageId = mode;
  const pageCms = cmsPages[pageId] || DEFAULT_CMS_PAGES[pageId] || DEFAULT_CMS_PAGES['about'];
  const defaultPage = DEFAULT_CMS_PAGES[pageId] || DEFAULT_CMS_PAGES['about'];

  const findSec = (id: string) =>
    pageCms.sections?.find((s) => s.id === id) ||
    defaultPage.sections?.find((s) => s.id === id);

  const editBtn = (sectionId?: string, label = 'Edit Page Section') => {
    if (!showAdminEdit) return null;
    return (
      <button
        onClick={() => {
          requestAdminEdit('pages', pageId, sectionId);
          onNavigate('admin');
        }}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#342A3A] text-white hover:bg-[#514458] text-[11px] font-semibold shadow-xs transition-colors cursor-pointer"
      >
        <Edit3 className="w-3 h-3" />
        <span>{label}</span>
      </button>
    );
  };

  if (mode === 'meet-the-founder') {
    const bioSec = findSec('founder-bio');
    const commitSec = findSec('founder-commitments');
    const bioParagraphs = (bioSec?.body || brandConfig.founder.bioFull.join('\n\n'))
      .split('\n\n')
      .filter(Boolean);
    const commitments =
      commitSec?.items && commitSec.items.length > 0
        ? commitSec.items.map((i) => i.title)
        : brandConfig.founder.approachHighlights;

    return (
      <div className="bg-[#F8F5EF] py-12 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {showAdminEdit && (
            <div className="flex justify-end">{editBtn('founder-bio', 'Edit Founder Page')}</div>
          )}
          <div className="bg-white rounded-3xl border border-[#514458]/10 p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#514458]/15 aspect-[4/5] bg-[#F4E4ED]/30">
                <img
                  src={pageCms.heroImage || brandConfig.founder.image}
                  alt="Reema Singh — Founder & Director"
                  className="w-full h-full object-cover"
                />
              </div>
              <a
                href={brandConfig.linkedin.url}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-2.5 px-4 bg-[#F8F5EF] hover:bg-[#E9E1F4] border border-[#514458]/15 rounded-xl text-xs font-semibold text-[#514458] flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>Verified LinkedIn Profile</span>
              </a>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
                  Meet the Founder
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458] mt-1">
                  {pageCms.heroHeading || brandConfig.founder.name}
                </h1>
                <p className="text-sm font-semibold text-[#514458] mt-1">
                  {brandConfig.founder.role} · The Behavior Canvas
                </p>
                <p className="text-xs sm:text-sm text-[#6E6474] mt-1">
                  {pageCms.subtitle || brandConfig.founder.credentialsLine}
                </p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#6E6474] leading-relaxed">
                {bioParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#F8F5EF] border border-[#514458]/10 space-y-3">
                <h2 className="font-serif text-lg font-semibold text-[#514458]">
                  {commitSec?.heading || 'Guiding Practice Commitments'}
                </h2>
                <ul className="space-y-2">
                  {commitments.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-[#514458]">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('academy')}
                  className="px-5 py-3 text-xs font-semibold text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl cursor-pointer"
                >
                  Explore the Academy
                </button>
                <button
                  onClick={() => onOpenEnquiry('Consultation & Speaking')}
                  className="px-5 py-3 text-xs font-semibold text-[#514458] bg-[#F4E4ED] rounded-xl cursor-pointer"
                >
                  Connect With Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'our-philosophy') {
    const principlesSec = findSec('philosophy-principles');
    const respSec = findSec('philosophy-responsibility');
    const principles =
      principlesSec?.items && principlesSec.items.length > 0
        ? principlesSec.items
        : brandConfig.philosophyPrinciples;

    return (
      <div className="bg-[#F8F5EF] py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
                {pageCms.subtitle || 'Ethical & Scientific Foundations'}
              </p>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#514458]">
                {pageCms.heroHeading || 'Behaviour Is More Than What We See.'}
              </h1>
              <p className="text-base text-[#6E6474] leading-relaxed">
                {pageCms.heroBody}
              </p>
            </div>
            {editBtn('philosophy-principles', 'Edit Philosophy Page')}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, idx) => (
              <div
                key={`${p.title}-${idx}`}
                className="p-7 rounded-2xl bg-white border border-[#514458]/10 shadow-xs space-y-3"
              >
                <span className="text-xs font-mono text-[#6E6474]">0{idx + 1}</span>
                <h2 className="font-serif text-xl font-semibold text-[#514458]">{p.title}</h2>
                <p className="text-sm text-[#6E6474] leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>

          {(!respSec || respSec.visible) && (
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#514458]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <h3 className="font-serif text-2xl font-semibold text-[#514458]">
                  {respSec?.heading || 'Ethical Responsibility & Transparency'}
                </h3>
                <p className="text-sm text-[#6E6474] leading-relaxed">
                  {respSec?.body ||
                    'We honour scope of practice boundaries, do not promise guaranteed behavioural transformations, and reject coercive compliance in favour of functional understanding and assent.'}
                </p>
              </div>
              <button
                onClick={() => onNavigate('programmes')}
                className="px-6 py-3 text-xs font-semibold text-white bg-[#514458] rounded-xl shrink-0 cursor-pointer"
              >
                {respSec?.ctaLabel || 'Explore Programmes'}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const missionSec = findSec('about-mission');
  const visionSec = findSec('about-vision');
  const serveSec = findSec('about-who-we-serve');
  const serveList =
    serveSec?.items && serveSec.items.length > 0
      ? serveSec.items.map((i) => i.title)
      : [
          'Parents and families seeking calm, practical understanding',
          'Children and individuals requiring respectful, individualised support',
          'Psychology and special education students building scientific foundations',
          'Behaviour analysts and ABA practitioners pursuing ethical growth',
          'School educators creating inclusive learning environments',
          'Individuals and academic communities curious about behavioural science',
        ];

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
              {brandConfig.positioning}
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#514458] leading-tight">
              {pageCms.heroHeading || 'About The Behavior Canvas'}
            </h1>
            <p className="text-base text-[#6E6474] leading-relaxed">
              {pageCms.heroBody || brandConfig.mission}
            </p>
          </div>
          {editBtn('about-mission', 'Edit About Page')}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-[#514458]/10 space-y-3 shadow-xs">
            <Target className="w-6 h-6 text-[#514458]" />
            <h2 className="font-serif text-2xl font-semibold text-[#514458]">
              {missionSec?.heading || 'Our Mission'}
            </h2>
            <p className="text-sm text-[#6E6474] leading-relaxed">
              {missionSec?.body || brandConfig.mission}
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-white border border-[#514458]/10 space-y-3 shadow-xs">
            <Compass className="w-6 h-6 text-[#514458]" />
            <h2 className="font-serif text-2xl font-semibold text-[#514458]">
              {visionSec?.heading || 'Our Vision'}
            </h2>
            <p className="text-sm text-[#6E6474] leading-relaxed">
              {visionSec?.body || brandConfig.vision}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#514458]/10 p-8 sm:p-12 space-y-6 shadow-xs">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#514458]">
              {serveSec?.heading || 'Who Our Platform Serves'}
            </h2>
            {editBtn('about-who-we-serve', 'Edit Communities')}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-[#514458]">
            {serveList.map((item) => (
              <div
                key={item}
                className="p-4 rounded-xl bg-[#F8F5EF]/70 border border-[#514458]/10 flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#514458] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onNavigate('meet-the-founder')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#514458] rounded-xl inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Meet Founder Reema Singh</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('our-philosophy')}
              className="px-5 py-2.5 text-xs font-semibold text-[#514458] bg-[#F4E4ED] rounded-xl cursor-pointer"
            >
              Read Our Philosophy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

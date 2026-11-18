import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Clock,
  Users,
  Calendar,
  Award,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { usePlatform } from '../contexts/PlatformContext';
import { ACADEMY_CATEGORIES } from '../data/programmes';
import { ProgrammeItem, RoutePath } from '../types';
import { CheckoutItem } from '../components/CheckoutModal';

interface AcademyPageProps {
  mode: 'academy' | 'programmes' | 'programme-detail';
  selectedSlug?: string;
  currency: 'USD' | 'INR';
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
  onCheckoutItem: (item: CheckoutItem) => void;
}

export const AcademyPage: React.FC<AcademyPageProps> = ({
  mode,
  selectedSlug,
  currency,
  onNavigate,
  onOpenEnquiry,
  onCheckoutItem,
}) => {
  const { programmes } = usePlatform();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const symbol = currency === 'INR' ? '₹' : '$';

  // Programme Detail View
  if (mode === 'programme-detail' && selectedSlug) {
    const prog = programmes.find((p) => p.slug === selectedSlug || p.id === selectedSlug);
    if (!prog) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
          <h1 className="font-serif text-3xl text-[#514458]">Programme Not Found</h1>
          <button
            onClick={() => onNavigate('programmes')}
            className="px-5 py-2.5 bg-[#514458] text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            View All Programmes
          </button>
        </div>
      );
    }

    const priceDisplay = prog.isFree
      ? 'Free Open Access'
      : `${symbol}${(currency === 'INR' ? prog.feeINR : prog.feeUSD).toLocaleString()}`;

    const handleEnrol = () => {
      onCheckoutItem({
        itemType: 'programme',
        id: prog.id,
        title: prog.title,
        subtitle: `${prog.category} · ${prog.duration}`,
        priceINR: prog.isFree ? 0 : prog.feeINR,
        priceUSD: prog.isFree ? 0 : prog.feeUSD,
      });
    };

    return (
      <div className="bg-[#F8F5EF] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <button
            onClick={() => onNavigate('programmes')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#514458] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Programmes</span>
          </button>

          <div className="bg-white rounded-3xl border border-[#514458]/10 overflow-hidden shadow-xs">
            <div className="h-64 sm:h-80 overflow-hidden bg-[#E9E1F4]/40">
              <img
                src={prog.coverImage}
                alt={prog.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8 sm:p-10 space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6E6474]">
                  {prog.category} · {prog.enrolmentStatus}
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458]">
                  {prog.title}
                </h1>
                <p className="text-base text-[#6E6474] leading-relaxed">{prog.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F8F5EF] border border-[#514458]/10 text-xs">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[#6E6474] font-medium">
                    <Clock className="w-3.5 h-3.5" /> Duration
                  </span>
                  <p className="font-semibold text-[#514458]">{prog.duration}</p>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[#6E6474] font-medium">
                    <Calendar className="w-3.5 h-3.5" /> Schedule
                  </span>
                  <p className="font-semibold text-[#514458]">{prog.startDate}</p>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[#6E6474] font-medium">
                    <Award className="w-3.5 h-3.5" /> Certificate
                  </span>
                  <p className="font-semibold text-[#514458]">{prog.certificateType}</p>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-[#6E6474] font-medium">
                    <Users className="w-3.5 h-3.5" /> Fee
                  </span>
                  <p className="font-semibold text-[#514458] text-sm">{priceDisplay}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h2 className="font-serif text-xl font-semibold text-[#514458]">
                    Learning Objectives
                  </h2>
                  <ul className="space-y-2.5">
                    {prog.learningObjectives.map((obj) => (
                      <li key={obj} className="flex items-start gap-2.5 text-sm text-[#6E6474]">
                        <CheckCircle2 className="w-4 h-4 text-[#514458] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-semibold text-[#514458]">
                    Programme Details
                  </h2>
                  <div className="space-y-2.5 text-sm text-[#6E6474]">
                    <p>
                      <strong className="text-[#514458]">Eligibility:</strong> {prog.eligibility}
                    </p>
                    <p>
                      <strong className="text-[#514458]">Target Audience:</strong> {prog.audience}
                    </p>
                    <p>
                      <strong className="text-[#514458]">Faculty:</strong> {prog.faculty}
                    </p>
                    <p>
                      <strong className="text-[#514458]">Teaching Format:</strong> {prog.teachingFormat}
                    </p>
                    <p>
                      <strong className="text-[#514458]">Registration Deadline:</strong>{' '}
                      {prog.registrationDeadline}
                    </p>
                  </div>
                </div>
              </div>

              {prog.modules.length > 0 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-xl font-semibold text-[#514458]">
                    Curriculum Modules
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {prog.modules.map((m) => (
                      <div
                        key={m.title}
                        className="p-4 rounded-xl bg-[#F8F5EF]/70 border border-[#514458]/10 space-y-1"
                      >
                        <h3 className="text-sm font-semibold text-[#514458]">{m.title}</h3>
                        <p className="text-xs text-[#6E6474] leading-relaxed">{m.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 rounded-xl bg-[#F4E4ED]/50 border border-[#514458]/10 flex items-start gap-3 text-xs text-[#514458]">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Educational Certificate Transparency:</strong> {prog.certificateType} is issued independently by The Behavior Canvas – Academy of Behavioural Science. Independent programmes do not constitute statutory clinical licences, university degrees, or QABA-approved coursework unless formally stated.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                {prog.enrolmentStatus !== 'Closed' && prog.enrolmentStatus !== 'Archived' && (
                  <button
                    onClick={handleEnrol}
                    className="px-6 py-3.5 bg-[#514458] hover:bg-[#3f3445] text-white text-sm font-semibold rounded-xl inline-flex items-center gap-2 cursor-pointer"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>{prog.isFree ? 'Enrol Free in Learner Portal' : `Register / Enrol (${priceDisplay})`}</span>
                  </button>
                )}
                <button
                  onClick={() => onOpenEnquiry('Academy Programmes', prog.title)}
                  className="px-6 py-3.5 bg-[#F8F5EF] hover:bg-[#E9E1F4] text-[#514458] border border-[#514458]/15 text-sm font-semibold rounded-xl cursor-pointer"
                >
                  Enquire About Next Cohort
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Academy Overview & All Programmes List
  const filteredProgrammes =
    selectedCategory === 'All'
      ? programmes
      : programmes.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-[#514458]/10 shadow-xs">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
              Academy of Behavioural Science
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#514458] leading-tight">
              {mode === 'academy'
                ? 'The Behavior Canvas – Academy of Behavioural Science'
                : 'All Academy Programmes & Cohorts'}
            </h1>
            <p className="text-base text-[#6E6474] leading-relaxed">
              Thoughtfully structured education bridging empirical Applied Behaviour Analysis, functional understanding, compassionate pedagogy, and ethical reflection across ten specialised programme areas.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('student')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl cursor-pointer"
              >
                Open Student & Learner Portal
              </button>
              <button
                onClick={() => onNavigate('verify-certificate')}
                className="px-5 py-2.5 text-xs font-semibold text-[#514458] bg-[#F4E4ED] hover:bg-[#E9E1F4] rounded-xl cursor-pointer"
              >
                Verify an Academy Certificate
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden aspect-[16/10] border border-[#514458]/10">
              <img
                src="/assets/images/academy_editorial_cover_1794989128289.jpg"
                alt="The Behavior Canvas Academy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Ten Official Domains Filter */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-[#514458]">
            Programme Categories (10 Curriculum Pillars)
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#514458] text-white'
                  : 'bg-white text-[#514458] border border-[#514458]/15 hover:bg-[#F4E4ED]/60'
              }`}
            >
              All Categories ({programmes.length})
            </button>
            {ACADEMY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#514458] text-white'
                    : 'bg-white text-[#514458] border border-[#514458]/15 hover:bg-[#F4E4ED]/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Programme Cards Grid */}
        {filteredProgrammes.length === 0 ? (
          <div className="p-10 rounded-2xl bg-white border border-[#514458]/10 text-center space-y-3">
            <h3 className="font-serif text-xl text-[#514458]">
              Upcoming Curriculum Under Development
            </h3>
            <p className="text-sm text-[#6E6474] max-w-lg mx-auto">
              New cohorts under “{selectedCategory}” are announced upon syllabus confirmation. Submit an enquiry to receive cohort launch notifications.
            </p>
            <button
              onClick={() => onOpenEnquiry('Academy Programmes', selectedCategory)}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#514458] rounded-xl cursor-pointer"
            >
              Request Syllabus Updates
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProgrammes.map((prog: ProgrammeItem) => {
              const fee = prog.isFree
                ? 'Free Open Access'
                : `${symbol}${(currency === 'INR' ? prog.feeINR : prog.feeUSD).toLocaleString()}`;
              return (
                <div
                  key={prog.id}
                  onClick={() => onNavigate('programme-detail', prog.slug)}
                  className="bg-white rounded-2xl border border-[#514458]/10 overflow-hidden shadow-xs hover:border-[#514458]/25 transition-all flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="h-44 overflow-hidden bg-[#F4E4ED]/30">
                      <img
                        src={prog.coverImage}
                        alt={prog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#6E6474]">
                        <span className="font-semibold text-[#514458]">{prog.enrolmentStatus}</span>
                        <span>{prog.certificateType}</span>
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-[#514458]">
                        {prog.title}
                      </h3>
                      <p className="text-xs text-[#6E6474] font-medium">{prog.category}</p>
                      <p className="text-sm text-[#6E6474] line-clamp-3 leading-relaxed">
                        {prog.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-[#F8F5EF]/60 border-t border-[#514458]/10 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#514458]">{fee}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#514458]">
                      <span>View Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react';
import { usePlatform } from '../contexts/PlatformContext';
import { RoutePath } from '../types';
import { CheckoutItem } from '../components/CheckoutModal';

interface WorkshopsPageProps {
  selectedSlug?: string;
  currency?: 'USD' | 'INR';
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
  onCheckoutItem?: (item: CheckoutItem) => void;
}

export const WorkshopsPage: React.FC<WorkshopsPageProps> = ({
  selectedSlug,
  currency = 'INR',
  onNavigate,
  onOpenEnquiry,
  onCheckoutItem,
}) => {
  const { workshops } = usePlatform();
  const [tab, setTab] = useState<'All' | 'Registration Open' | 'Upcoming'>('All');

  const activeWorkshop = selectedSlug
    ? workshops.find((w) => w.slug === selectedSlug || w.id === selectedSlug) || null
    : null;

  if (activeWorkshop) {
    const statusLabel = activeWorkshop.eventStatus || activeWorkshop.status;
    return (
      <div className="bg-[#F8F5EF] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <button
            onClick={() => onNavigate('workshops')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#514458] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Workshops & Events</span>
          </button>

          <div className="bg-white rounded-3xl border border-[#514458]/10 overflow-hidden shadow-xs">
            {activeWorkshop.bannerImage && (
              <div className="h-64 overflow-hidden bg-[#F4E4ED]/30">
                <img
                  src={activeWorkshop.bannerImage}
                  alt={activeWorkshop.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-8 sm:p-10 space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6474]">
                  {statusLabel} · {activeWorkshop.deliveryFormat}
                </p>
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458]">
                  {activeWorkshop.title}
                </h1>
                <p className="text-base text-[#6E6474] leading-relaxed">
                  {activeWorkshop.shortDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F8F5EF] border border-[#514458]/10 text-xs">
                <div>
                  <span className="text-[#6E6474] block mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Date & Schedule
                  </span>
                  <strong className="text-[#514458]">{activeWorkshop.dateTime}</strong>
                </div>
                <div>
                  <span className="text-[#6E6474] block mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Duration
                  </span>
                  <strong className="text-[#514458]">{activeWorkshop.duration}</strong>
                </div>
                <div>
                  <span className="text-[#6E6474] block mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> Audience
                  </span>
                  <strong className="text-[#514458]">{activeWorkshop.audience}</strong>
                </div>
                <div>
                  <span className="text-[#6E6474] block mb-1 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Fee & Certificate
                  </span>
                  <strong className="text-[#514458]">{activeWorkshop.fee}</strong>
                </div>
              </div>

              {activeWorkshop.learningObjectives.length > 0 && (
                <div className="space-y-3">
                  <h2 className="font-serif text-xl font-semibold text-[#514458]">
                    Learning Objectives
                  </h2>
                  <ul className="space-y-2">
                    {activeWorkshop.learningObjectives.map((obj) => (
                      <li key={obj} className="flex items-start gap-2.5 text-sm text-[#6E6474]">
                        <CheckCircle2 className="w-4 h-4 text-[#514458] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                {onCheckoutItem &&
                  statusLabel === 'Registration Open' &&
                  (activeWorkshop.feeINR ?? 0) > 0 && (
                    <button
                      onClick={() =>
                        onCheckoutItem({
                          itemType: 'workshop',
                          id: activeWorkshop.id,
                          title: activeWorkshop.title,
                          subtitle: activeWorkshop.dateTime,
                          priceINR: activeWorkshop.feeINR || 999,
                          priceUSD: activeWorkshop.feeUSD || 14,
                        })
                      }
                      className="px-6 py-3 bg-[#514458] hover:bg-[#3f3445] text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Register Online ({currency === 'INR' ? `₹${activeWorkshop.feeINR}` : `$${activeWorkshop.feeUSD}`})
                    </button>
                  )}
                <button
                  onClick={() => onOpenEnquiry('Workshops & Masterclasses', activeWorkshop.title)}
                  className="px-6 py-3 bg-[#F4E4ED] text-[#514458] text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Enquire / Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filtered = workshops.filter((w) => {
    if (tab === 'All') return true;
    const label = w.eventStatus || w.status;
    return label === tab;
  });

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
            Live Cohorts & Seminars
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#514458]">
            Workshops & Events
          </h1>
          <p className="text-base text-[#6E6474] leading-relaxed">
            Interactive live workshops and applied masterclasses for parents, educators, psychology learners, and practitioners.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['All', 'Registration Open', 'Upcoming'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                tab === t
                  ? 'bg-[#514458] text-white'
                  : 'bg-white text-[#514458] border border-[#514458]/15'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-2xl border border-[#514458]/10 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div>
                {w.bannerImage && (
                  <div className="h-44 overflow-hidden bg-[#F4E4ED]/30">
                    <img
                      src={w.bannerImage}
                      alt={w.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#6E6474]">
                    <span className="font-semibold text-[#514458]">
                      {w.eventStatus || w.status}
                    </span>
                    <span>{w.duration.split('(')[0].trim()}</span>
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-[#514458]">{w.title}</h2>
                  <p className="text-xs font-medium text-[#6E6474]">{w.dateTime}</p>
                  <p className="text-sm text-[#6E6474] line-clamp-3 leading-relaxed">
                    {w.shortDescription}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 bg-[#F8F5EF]/60 border-t border-[#514458]/10 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#514458]">{w.fee}</span>
                <button
                  onClick={() => onNavigate('workshop-detail', w.slug)}
                  className="inline-flex items-center gap-1 font-semibold text-[#514458] cursor-pointer"
                >
                  <span>Workshop Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

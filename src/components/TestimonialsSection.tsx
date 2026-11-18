import React from 'react';
import { Quote } from 'lucide-react';
import { usePlatform } from '../contexts/PlatformContext';

interface TestimonialsSectionProps {
  onOpenEnquiry?: (category?: string, subject?: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onOpenEnquiry }) => {
  const { testimonials } = usePlatform();
  const approvedList = testimonials.filter((t) => t.approved && t.visible);

  return (
    <section className="py-16 bg-[#F4E4ED]/35 border-y border-[#514458]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6E6474]">
            Community Reflections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458] tracking-tight">
            Words From Families, Learners & Educators
          </h2>
          <p className="text-sm text-[#6E6474] leading-relaxed">
            Only genuine testimonials shared with explicit consent are published here.
          </p>
        </div>

        {approvedList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedList.map((item) => (
              <div
                key={item.id}
                className="p-7 rounded-2xl bg-white border border-[#514458]/10 shadow-xs flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <Quote className="w-5 h-5 text-[#514458]/40" />
                  <p className="text-sm text-[#514458] leading-relaxed">“{item.quote}”</p>
                </div>
                <div className="pt-4 border-t border-[#514458]/10">
                  <p className="text-sm font-semibold text-[#514458]">{item.name}</p>
                  <p className="text-xs text-[#6E6474]">
                    {item.role}
                    {item.context ? ` · ${item.context}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-[#514458]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <h3 className="font-serif text-lg font-medium text-[#514458]">
                Verified Feedback Archive
              </h3>
              <p className="text-sm text-[#6E6474] leading-relaxed">
                Have you participated in an Academy programme, workshop, parent education circle, or used our study resources? With your permission, reflections added by the Director appear in this space.
              </p>
            </div>
            {onOpenEnquiry && (
              <button
                onClick={() => onOpenEnquiry('Community Feedback', 'Share Verified Testimonial')}
                className="px-5 py-2.5 text-xs font-semibold text-[#514458] bg-[#F8F5EF] hover:bg-[#E9E1F4] border border-[#514458]/15 rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                Share Feedback With Consent
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

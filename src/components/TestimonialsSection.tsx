import React, { useState } from 'react';
import { Quote, Sparkles, Star, CheckCircle2, HeartHandshake, GraduationCap, School } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  category: 'parent' | 'student' | 'educator';
  quote: string;
  outcome: string;
  author: string;
  role: string;
  location: string;
  verifiedLabel: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "parent-1",
    category: "parent",
    quote:
      "Before connecting with Reema, our home was filled with tension around transition times and daily routines. The non-blaming approach of The Behavior Canvas completely transformed how we view our son's communication. Replacing punishments with positive reinforcement and visual schedules has brought peace back to our family.",
    outcome: "Reduced daily transition meltdowns & built functional communication at home",
    author: "Ananya & Raghav S.",
    role: "Parents of a 6-Year-Old",
    location: "Bengaluru, India",
    verifiedLabel: "Verified Parent Guidance Client"
  },
  {
    id: "student-1",
    category: "student",
    quote:
      "Studying for the QASP-S examination while working full-time felt overwhelming until I got the Complete Study Bundle. The study notes break down dense behavioral theory into practical, scenario-based examples, and the rationales in the question bank helped me understand the 'why' behind each distractor.",
    outcome: "Structured 8-week exam study & mastered task-list measurement matrices",
    author: "Elena Rostova",
    role: "Behavior Technician & QASP-S Candidate",
    location: "Dubai, United Arab Emirates",
    verifiedLabel: "Verified Study Bundle Purchaser"
  },
  {
    id: "educator-1",
    category: "educator",
    quote:
      "The classroom accommodation workshop gave our faculty realistic tools that we implemented the very next morning. The emphasis on neurodiversity, visual predictable agendas, and sensory breaks helped our diverse learners participate meaningfully without feeling singled out.",
    outcome: "Successfully integrated visual schedules & positive behavior supports across 3 primary classes",
    author: "Meenakshi Kulkarni",
    role: "Head of Inclusive Learning",
    location: "Mumbai, India",
    verifiedLabel: "Verified School Workshop Participant"
  },
  {
    id: "student-2",
    category: "student",
    quote:
      "The remote tele-supervision sessions with Reema were invaluable. Even connecting from London with the timezone difference, every session was punctual and tailored. We dove deep into client assent, functional analysis, and ethical dilemmas that textbooks simply don't cover.",
    outcome: "Completed competency review & enhanced assent-based clinical reasoning",
    author: "David M.",
    role: "Trainee Behavior Analyst",
    location: "London, United Kingdom",
    verifiedLabel: "Verified Remote Mentoring Trainee"
  },
  {
    id: "parent-2",
    category: "parent",
    quote:
      "The Home De-escalation & Communication Guide gave us concrete steps to identify subtle distress signals before they escalated into tears. Understanding behavior as an unmet need rather than 'defiance' changed our parenting forever.",
    outcome: "Established calm bedtime rhythms & proactive co-regulation strategies",
    author: "Pooja & Tushar D.",
    role: "Parents of a 4-Year-Old Learner",
    location: "Delhi NCR, India",
    verifiedLabel: "Verified Parent Workshop Participant"
  },
  {
    id: "student-3",
    category: "student",
    quote:
      "The QASP-S Exam Cheat Sheet was my secret weapon in the final two weeks of revision. Having differential reinforcement, prompt hierarchies, and schedules of reinforcement visually mapped in one place made rapid recall effortless during mock practice.",
    outcome: "Consolidated key formulas & boosted scenario mock exam accuracy",
    author: "Carlos Gutierrez",
    role: "Aspiring Behavior Specialist",
    location: "Toronto, Canada",
    verifiedLabel: "Verified Cheat Sheet Purchaser"
  }
];

export const TestimonialsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'parent' | 'student' | 'educator'>('all');

  const filtered = testimonialsData.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section className="relative overflow-hidden py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      {/* Soft Watercolor Ambient Background Accents matching logo */}
      <div className="absolute inset-0 bg-[#FAF7F9] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#F5DEE8]/35 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-[#EAE2F3]/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-[#FCECE4]/35 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#7A5B79] bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-[#EDE2EB]">
              <Sparkles className="w-3.5 h-3.5 text-[#583256]" />
              <span>Real Experiences & Meaningful Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2A182C] tracking-tight">
              Stories of Growth & Understanding
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
              Read how parents, international exam candidates, and educators across India and worldwide have built practical skills, compassionate routines, and confident exam readiness.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/90 backdrop-blur-xs rounded-xl border border-[#EDE2EB] shrink-0 self-start md:self-auto shadow-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-[#583256] text-white shadow-xs'
                  : 'text-[#6B5A6E] hover:text-[#2A182C]'
              }`}
            >
              All Stories
            </button>
            <button
              onClick={() => setFilter('parent')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'parent'
                  ? 'bg-[#583256] text-white shadow-xs'
                  : 'text-[#6B5A6E] hover:text-[#2A182C]'
              }`}
            >
              Parents
            </button>
            <button
              onClick={() => setFilter('student')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'student'
                  ? 'bg-[#583256] text-white shadow-xs'
                  : 'text-[#6B5A6E] hover:text-[#2A182C]'
              }`}
            >
              QASP-S Candidates
            </button>
            <button
              onClick={() => setFilter('educator')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === 'educator'
                  ? 'bg-[#583256] text-white shadow-xs'
                  : 'text-[#6B5A6E] hover:text-[#2A182C]'
              }`}
            >
              Educators
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative p-7 rounded-3xl bg-white/90 backdrop-blur-md border border-[#EDE2EB] shadow-xs hover:border-[#DACFDB] hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden"
            >
              {/* Subtle Watercolor Edge Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full bg-gradient-to-bl from-[#F6EEF5]/60 to-transparent pointer-events-none" />

              <div className="space-y-4 relative">
                {/* Header info */}
                <div className="flex items-center justify-between text-xs text-[#7A677D]">
                  <div className="flex items-center gap-1.5 font-medium text-[#583256]">
                    {item.category === 'parent' && <HeartHandshake className="w-3.5 h-3.5" />}
                    {item.category === 'student' && <GraduationCap className="w-3.5 h-3.5" />}
                    {item.category === 'educator' && <School className="w-3.5 h-3.5" />}
                    <span className="capitalize">{item.category} Story</span>
                  </div>
                  <span className="text-[11px] text-[#7A677D]">{item.location}</span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#38263A] leading-relaxed italic relative">
                  "{item.quote}"
                </p>

                {/* Concrete Outcome Highlight */}
                <div className="p-3 bg-[#FAF7F9] rounded-xl border border-[#F0E6EF] text-[11px] text-[#583256] font-medium leading-snug flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.outcome}</span>
                </div>
              </div>

              {/* Author footer */}
              <div className="pt-5 mt-5 border-t border-[#F2EBF1] flex items-center justify-between relative">
                <div>
                  <h4 className="text-xs font-bold text-[#2A182C]">
                    {item.author}
                  </h4>
                  <p className="text-[11px] text-[#7A677D]">
                    {item.role}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-100">
                  {item.verifiedLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical disclaimer regarding individual outcomes */}
        <p className="text-[11px] text-center text-[#8C7A8F] max-w-xl mx-auto leading-relaxed">
          * Note: Every individual, family, and learner is unique. Testimonials reflect personal experiences with our educational resources, guidance, and workshops; they do not constitute clinical guarantees or promise specific exam or behavioral results.
        </p>
      </div>
    </section>
  );
};

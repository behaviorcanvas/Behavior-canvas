import React from 'react';
import { CheckCircle2, HeartHandshake, ShieldCheck, Sparkles, Target, Compass, Award, ArrowRight, Linkedin } from 'lucide-react';
import { brandConfig } from '../data/brand';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RoutePath } from '../types';

interface AboutPageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenEnquiry }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={[{ label: 'About The Behavior Canvas' }]} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
          Our Identity & Purpose
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2A182C]">
          About The Behavior Canvas
        </h1>
        <p className="text-base sm:text-lg text-[#5A475D] leading-relaxed">
          Crafting behavior, creating change. We are an educational and professional guidance platform dedicated to demystifying behavior science, empowering families, and fostering inclusive learning environments across India.
        </p>
      </div>

      {/* Our Story */}
      <section className="bg-white rounded-3xl border border-[#EDE2EB] p-8 sm:p-12 shadow-xs space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2A182C] tracking-tight">
          Our Story
        </h2>
        <div className="space-y-4 text-sm text-[#5C4A60] leading-relaxed max-w-4xl">
          <p>
            The Behavior Canvas was founded by Reema Singh with a straightforward, urgent realization: in India, quality behavior science and positive behavioral support have remained largely locked behind expensive clinical doors or obscured by dense academic jargon.
          </p>
          <p>
            Parents navigating behavioral distress with their neurodivergent children frequently encounter blame or contradictory advice. Simultaneously, mainstream school educators want to build inclusive classrooms but lack practical, easy-to-implement behavioral toolkits.
          </p>
          <p>
            The Behavior Canvas was established to serve as an empathetic bridge. We believe that behavior is not something to be merely controlled or extinguished through compliance; it is a canvas—a dynamic, expressive signal of human needs, communication, and environmental interaction that can be understood, guided, and transformed with dignity.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-[#FAF6F8] border border-[#EDE2EB] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#583256]/10 text-[#583256] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#2A182C]">
            Our Mission
          </h2>
          <p className="text-sm text-[#5C4A60] leading-relaxed">
            {brandConfig.mission}
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-white to-[#FAF6F8] border border-[#EDE2EB] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#583256]/10 text-[#583256] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#2A182C]">
            Our Vision
          </h2>
          <p className="text-sm text-[#5C4A60] leading-relaxed">
            {brandConfig.vision}
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
            Guiding Standards
          </span>
          <h2 className="text-3xl font-bold text-[#2A182C] tracking-tight">
            Our Core Values
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4A60]">
            These principles govern every educational publication, consultation, and interaction we facilitate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandConfig.values.map((val, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F6EEF5] text-[#583256] flex items-center justify-center font-serif font-bold text-sm">
                0{i + 1}
              </div>
              <h3 className="text-base font-bold text-[#2A182C]">
                {val.title}
              </h3>
              <p className="text-xs text-[#5C4A60] leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-white rounded-3xl border border-[#EDE2EB] p-8 sm:p-12 shadow-xs space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#2A182C] tracking-tight">
          Our Approach to Behavior & Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {brandConfig.founder.approachHighlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-[#FAF8FA] border border-[#F0E6EF]">
              <CheckCircle2 className="w-5 h-5 text-[#583256] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-[#2A182C] font-medium leading-relaxed">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Founder (Editable Profile) */}
      <section className="bg-[#FAF6F8] rounded-3xl border border-[#EDE2EB] p-8 sm:p-12 shadow-xs space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#EDE2EB] shadow-lg bg-white group">
              <img
                src={brandConfig.founder.image}
                alt={`Reema Singh, Founder of The Behavior Canvas`}
                className="w-full h-[460px] sm:h-[490px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-[#EDE2EB]/80 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#2A182C]">{brandConfig.founder.name}</div>
                  <div className="text-[11px] text-[#7A5B79]">Director & Lead Practitioner</div>
                </div>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#FAF2F8] text-[#583256] border border-[#EDE2EB]">
                  Official
                </span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
              Founder & Director
            </span>
            <h2 className="text-3xl font-bold text-[#2A182C]">
              {brandConfig.founder.name}
            </h2>
            <p className="text-sm font-semibold text-[#583256]">
              {brandConfig.founder.role}
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
              {brandConfig.founder.bioFull.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-2">
              {brandConfig.founder.credentials.map((cred, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white rounded-lg border border-[#DACFDB] text-xs font-medium text-[#2A182C]"
                >
                  {cred}
                </span>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenEnquiry('Professional Mentoring & Supervision', 'Founder Mentoring Enquiry')}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-colors shadow-xs"
              >
                Enquire for Mentoring or Speaking
              </button>
              <a
                href={brandConfig.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs font-semibold text-[#0077B5] bg-white hover:bg-[#0077B5] hover:text-white rounded-xl border border-[#0077B5]/30 transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5 fill-current" />
                <span>Verify on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Clear Scope Boundary */}
      <div className="p-6 rounded-2xl bg-white border border-[#EDE2EB] text-xs text-[#5C4A60] space-y-2">
        <h4 className="font-bold text-[#2A182C] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Professional Distinction: Educational Content vs. Individual Services</span>
        </h4>
        <p className="leading-relaxed">
          General articles, guides, worksheets, and resources published on this website are educational tools intended to spread research-informed behavior concepts. They do not substitute for individual diagnostic or clinical evaluations. Individualized consultations are conducted under distinct service agreements and subject to mutual professional suitability.
        </p>
      </div>
    </div>
  );
};

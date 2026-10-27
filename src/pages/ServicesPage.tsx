import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Clock, Video, FileText, Send, ShieldCheck, ArrowLeft, Globe, Sparkles } from 'lucide-react';
import { servicesData, ServiceItem } from '../data/services';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { brandConfig } from '../data/brand';
import { RoutePath } from '../types';

interface ServicesPageProps {
  selectedSlug?: string;
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  selectedSlug,
  onNavigate,
  onOpenEnquiry
}) => {
  const [filter, setFilter] = useState<string>('All');

  // If a specific service slug is provided or selected
  const activeService = selectedSlug
    ? servicesData.find((s) => s.slug === selectedSlug) || null
    : null;

  // Local inline enquiry form state for individual service view
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preferredMethod, setPreferredMethod] = useState<'Email' | 'WhatsApp' | 'Phone Call'>('Email');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredServices = servicesData.filter((s) => {
    if (filter === 'All') return true;
    return s.category === filter;
  });

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Please fill in your name, email, and a brief description of your goals.');
      return;
    }
    if (!consent) {
      setFormError('Please consent to our Privacy Policy.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  // Helper for matching watercolor illustration per service
  const getServiceArtwork = (slug: string) => {
    if (slug === 'professional-mentoring-and-supervision') {
      return '/src/assets/images/supervision_watercolor_mentoring_1793099905362.jpg';
    }
    if (slug === 'special-education-inclusive-learning' || slug === 'workshops-and-training') {
      return '/src/assets/images/classroom_watercolor_inclusion_1793099874430.jpg';
    }
    return '/src/assets/images/hero_watercolor_child_guide_1793099905373.jpg';
  };

  // 1. DETAIL VIEW FOR AN INDIVIDUAL SERVICE
  if (activeService) {
    const artwork = getServiceArtwork(activeService.slug);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Services', onClick: () => onNavigate('services') },
            { label: activeService.title }
          ]}
        />

        <button
          onClick={() => onNavigate('services')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#583256] hover:text-[#2A182C] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </button>

        {/* Hero Banner for Service with Watercolor Artwork */}
        <div className="bg-white rounded-3xl border border-[#EDE2EB] p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-[#583256] bg-[#F6EEF5] px-3 py-1 rounded-full border border-[#EDE2EB]">
                {activeService.category} Support
              </span>
              <span className="text-xs font-medium text-[#6B5A6E] flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#583256]" />
                <span>{activeService.deliveryFormat}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2A182C]">
              {activeService.title}
            </h1>

            <div className="space-y-4 text-sm sm:text-base text-[#5A475D] leading-relaxed">
              {activeService.longDescription.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden border border-[#EDE2EB] shadow-md bg-[#FAF8FA] p-2">
              <img
                src={artwork}
                alt={`${activeService.title} Watercolor Illustration`}
                className="w-full h-64 sm:h-72 object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Left (Who it's for & Process) / Right (Enquiry Form & Pricing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-10">
            {/* Who It Is Suitable For */}
            <div className="bg-white rounded-2xl border border-[#EDE2EB] p-7 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-[#2A182C]">
                Who This Service Is Suitable For
              </h2>
              <p className="text-xs text-[#6B5A6E]">
                {activeService.audience}
              </p>
              <ul className="space-y-3 pt-2">
                {activeService.whoItsFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2A182C]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What It Involves (Process Roadmap) */}
            <div className="bg-white rounded-2xl border border-[#EDE2EB] p-7 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
                  Structured Pathway
                </span>
                <h2 className="text-xl font-bold text-[#2A182C]">
                  What the Consultation & Mentoring Involves
                </h2>
              </div>

              <div className="space-y-4">
                {activeService.whatItInvolves.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl bg-[#FAF8FA] border border-[#F0E6EF] flex gap-4"
                  >
                    <span className="font-serif font-bold text-base text-[#583256] shrink-0">
                      {step.step}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-[#2A182C]">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#5C4A60] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scope & Limitations */}
            <div className="bg-[#FAF8FA] rounded-2xl border border-[#EDE2EB] p-6 space-y-3">
              <h3 className="text-sm font-bold text-[#2A182C] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#7A5B79]" />
                <span>Scope & Professional Limitations</span>
              </h3>
              <ul className="space-y-2 text-xs text-[#5C4A60]">
                {activeService.scopeAndLimitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#8E75A6] font-bold">·</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Pricing & Service Enquiry Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Fee Card */}
            <div className="bg-white rounded-2xl border border-[#EDE2EB] p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#2A182C]">
                Fee & Delivery Structure
              </h3>
              <p className="text-xs text-[#5C4A60] leading-relaxed">
                {activeService.feeNote}
              </p>
              <div className="pt-2 border-t border-[#F2EBF1] flex items-center justify-between text-xs text-[#6B5A6E]">
                <span>Format: Secure Video Call</span>
                <span className="text-emerald-700 font-semibold">Worldwide Timezones</span>
              </div>
            </div>

            {/* Dedicated Service Enquiry Form */}
            <div className="bg-white rounded-2xl border border-[#EDE2EB] p-6 shadow-md space-y-5">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#2A182C]">
                  Enquire for {activeService.title}
                </h3>
                <p className="text-xs text-[#6B5A6E]">
                  Submit your request. We review your goals and reply with scheduling and tele-consultation availability.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-6 text-center space-y-3 bg-[#FAF8FA] rounded-xl border border-[#EDE2EB] p-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-[#2A182C]">
                    Enquiry Received
                  </h4>
                  <p className="text-xs text-[#5C4A60] leading-relaxed">
                    Thank you, {name}! We have received your request regarding {activeService.title}. Reema Singh will follow up with you at {email} within 24–48 business hours.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs font-semibold text-[#583256] underline"
                  >
                    Submit another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-3.5">
                  {formError && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
                      {formError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Shalini Roy / James Peterson"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                      Preferred Contact Method
                    </label>
                    <select
                      value={preferredMethod}
                      onChange={(e) => setPreferredMethod(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                    >
                      <option value="Email">Email</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Phone Call">Phone Call / Zoom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                      Message / Goals & Time Zone *
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your goals, exam focus, or learner context, along with your local country/timezone. Do NOT include sensitive medical records."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-0.5 w-3.5 h-3.5 rounded border-[#DACFDB] text-[#583256]"
                      />
                      <span className="text-[11px] text-[#5C4A60] leading-tight">
                        I agree to the privacy terms and understand this consultation is educational.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Service Enquiry</span>
                  </button>

                  <p className="text-[11px] text-center text-[#7A677D]">
                    Prefer direct email? Reach us at{' '}
                    <a href={`mailto:${brandConfig.email}`} className="text-[#583256] underline font-medium">
                      {brandConfig.email}
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. OVERVIEW LISTING OF ALL SERVICES
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Services' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EDE2EB] pb-8">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
            Evidence-Informed Practice
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2A182C]">
            Our Educational & Consultation Services
          </h1>
          <p className="text-sm sm:text-base text-[#5A475D] leading-relaxed">
            From parent guidance and classroom accommodations to international remote supervision and professional study mentoring, The Behavior Canvas provides grounded, individualized support across all global time zones.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF6F8] rounded-xl border border-[#EDE2EB] shrink-0 self-start md:self-auto">
          {['All', 'Parents', 'Educators', 'Professionals'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === cat
                  ? 'bg-white text-[#2A182C] shadow-xs'
                  : 'text-[#6B5A6E] hover:text-[#2A182C]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, idx) => (
          <div
            key={service.id}
            className="p-8 rounded-3xl bg-white border border-[#EDE2EB] shadow-xs hover:border-[#583256]/50 hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#583256] bg-[#F6EEF5] px-2.5 py-0.5 rounded-full border border-[#EDE2EB]">
                  {service.category}
                </span>
                <span className="text-[11px] text-[#7A677D] font-mono">
                  0{idx + 1}.
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#2A182C] group-hover:text-[#583256] transition-colors">
                {service.title}
              </h2>

              <p className="text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
                {service.shortDescription}
              </p>

              <div className="pt-2 text-xs text-[#7A677D] flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#583256]" />
                <span>{service.deliveryFormat}</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F2EBF1] flex items-center justify-between">
              <button
                onClick={() => onNavigate('service-detail', service.slug)}
                className="text-xs font-semibold text-[#2A182C] group-hover:text-[#583256] flex items-center gap-1 transition-colors"
              >
                <span>Full Service Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onOpenEnquiry(service.title, `Service: ${service.title}`)}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-lg transition-colors shadow-xs"
              >
                Enquire
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reassurance Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FAF6F8] to-white border border-[#EDE2EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="text-base font-bold text-[#2A182C]">
            International candidate or parent with timezone questions?
          </h3>
          <p className="text-xs text-[#5C4A60] leading-relaxed">
            Reach out through our enquiry form. We flexibly accommodate candidates across the Americas, Europe, Middle East, Australia, and India for online guidance and supervision.
          </p>
        </div>
        <button
          onClick={() => onOpenEnquiry('Professional Mentoring & Supervision')}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-colors shadow-xs shrink-0"
        >
          Request Timezone Consultation
        </button>
      </div>
    </div>
  );
};

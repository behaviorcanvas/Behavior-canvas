import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  Send,
  Video,
} from 'lucide-react';
import { usePlatform } from '../contexts/PlatformContext';
import { RoutePath } from '../types';

interface ServicesPageProps {
  selectedSlug?: string;
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  selectedSlug,
  onNavigate,
  onOpenEnquiry,
}) => {
  const { services, submitEnquiry } = usePlatform();
  const [filter, setFilter] = useState<string>('All');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErr, setFormErr] = useState('');

  useEffect(() => {
    setSubmitted(false);
    setFormErr('');
  }, [selectedSlug]);

  const activeService = selectedSlug
    ? services.find((s) => s.slug === selectedSlug || s.id === selectedSlug) || null
    : null;

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeService) return;
    if (!name.trim() || !email.trim() || message.trim().length < 10) {
      setFormErr('Please complete your name, email, and brief enquiry message.');
      return;
    }
    if (!consent) {
      setFormErr('Please confirm the privacy & scope notice.');
      return;
    }
    setSubmitting(true);
    setFormErr('');
    try {
      await submitEnquiry({
        name,
        email,
        category: activeService.title,
        contactMethod: 'Email',
        message,
        consentAgreed: consent,
      });
      setSubmitted(true);
    } catch (err: any) {
      setFormErr(err?.message || 'Unable to submit enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  if (activeService) {
    return (
      <div className="bg-[#F8F5EF] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#514458] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Behavioural Services</span>
          </button>

          <div className="bg-white rounded-3xl border border-[#514458]/10 p-8 sm:p-12 shadow-xs space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6E6474]">
                Behavioural Services · {activeService.category}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#514458]">
                {activeService.title}
              </h1>
              <p className="text-base text-[#6E6474] leading-relaxed">
                {activeService.shortDescription}
              </p>
            </div>

            <div className="space-y-3 text-sm sm:text-base text-[#6E6474] leading-relaxed">
              {activeService.longDescription.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#F8F5EF] border border-[#514458]/10 text-xs">
              <div>
                <span className="font-semibold text-[#514458] block mb-1">Intended Audience</span>
                <p className="text-[#6E6474]">{activeService.audience}</p>
              </div>
              <div>
                <span className="font-semibold text-[#514458] block mb-1 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" /> Delivery Format
                </span>
                <p className="text-[#6E6474]">{activeService.deliveryFormat}</p>
              </div>
              <div>
                <span className="font-semibold text-[#514458] block mb-1">Fee Transparency</span>
                <p className="text-[#6E6474]">{activeService.feeNote}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-[#514458]">
                How Support Works
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeService.whatItInvolves.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl bg-[#F8F5EF]/70 border border-[#514458]/10 space-y-1"
                  >
                    <span className="text-xs font-mono text-[#6E6474]">Step {step.step}</span>
                    <h3 className="text-sm font-semibold text-[#514458]">{step.title}</h3>
                    <p className="text-xs text-[#6E6474] leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F4E4ED]/45 border border-[#514458]/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#514458]">
                <ShieldAlert className="w-4 h-4" />
                <span>Ethical Boundaries & Service Disclaimers</span>
              </div>
              <ul className="space-y-1.5 text-xs text-[#6E6474]">
                {activeService.scopeAndLimitations.map((lim) => (
                  <li key={lim} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#514458] shrink-0 mt-0.5" />
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inline Service Enquiry Form */}
            <div className="pt-4 border-t border-[#514458]/10 space-y-4">
              <h2 className="font-serif text-2xl font-semibold text-[#514458]">
                Request {activeService.title}
              </h2>
              {submitted ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
                  Your service enquiry has been securely received. Reema Singh’s team will reply to {email} within 24–48 business hours.
                </div>
              ) : (
                <form onSubmit={handleInlineSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name *"
                      className="px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address *"
                      className="px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15"
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your goals (avoid uploading sensitive medical files here) *"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15"
                  />
                  <label className="flex items-start gap-2 text-xs text-[#6E6474] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5"
                    />
                    <span>
                      I understand no guaranteed behavioural results are promised and agree to the Privacy Policy.
                    </span>
                  </label>
                  {formErr && <p className="text-xs text-rose-600">{formErr}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-[#514458] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Submitting...' : 'Submit Service Enquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filtered =
    filter === 'All' ? services : services.filter((s) => s.category === filter);

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
            Behavioural Support & Consultation
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#514458]">
            Behavioural Services
          </h1>
          <p className="text-base text-[#6E6474] leading-relaxed">
            Evidence-based consultation, parent education and training, online behavioural support, individualised behavioural assessment and intervention planning (where appropriate), educational guidance, and professional consultation.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', 'Parents', 'Educators', 'Professionals'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                filter === cat
                  ? 'bg-[#514458] text-white'
                  : 'bg-white text-[#514458] border border-[#514458]/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((svc) => (
            <div
              key={svc.id}
              className="p-7 rounded-2xl bg-white border border-[#514458]/10 shadow-xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <span className="text-xs font-medium text-[#6E6474]">{svc.category}</span>
                <h2 className="font-serif text-xl font-semibold text-[#514458]">{svc.title}</h2>
                <p className="text-sm text-[#6E6474] leading-relaxed">{svc.shortDescription}</p>
                <p className="text-xs text-[#514458]/80">
                  <strong>Delivery:</strong> {svc.deliveryFormat}
                </p>
              </div>
              <div className="pt-4 border-t border-[#514458]/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigate('service-detail', svc.slug)}
                  className="text-xs font-semibold text-[#514458] inline-flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Full Scope & Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenEnquiry(svc.title)}
                  className="px-3.5 py-2 text-xs font-semibold bg-[#F4E4ED] text-[#514458] rounded-xl cursor-pointer"
                >
                  Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

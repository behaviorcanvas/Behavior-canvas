import React, { useState } from 'react';
import { Mail, Instagram, Youtube, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { usePlatform } from '../contexts/PlatformContext';
import { RoutePath } from '../types';

interface ContactPageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { siteSettings, submitEnquiry } = usePlatform();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('General Enquiry');
  const [contactMethod, setContactMethod] = useState<'Email' | 'WhatsApp' | 'Phone Call'>('Email');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your full name.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email.';
    if (!message.trim() || message.trim().length < 10)
      errs.message = 'Please enter a brief message (at least 10 characters).';
    if (!consent) errs.consent = 'Please confirm agreement to our Privacy Policy.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const id = await submitEnquiry({
        name,
        email,
        phone,
        category,
        contactMethod,
        message,
        consentAgreed: consent,
      });
      setRefCode(id);
      setIsSubmitted(true);
    } catch (err: any) {
      setErrors({ submit: err?.message || 'Unable to submit enquiry right now.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
            Contact & Enquiries
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#514458]">
            Get in Touch With The Behavior Canvas
          </h1>
          <p className="text-base text-[#6E6474] leading-relaxed">
            Questions about Academy programmes, workshops, behavioural consultations, or learning resources? Reach out directly and we will respond thoughtfully.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-white border border-[#514458]/10 space-y-5 shadow-xs">
              <h2 className="font-serif text-xl font-semibold text-[#514458]">Direct Channels</h2>
              <div className="space-y-4 text-sm text-[#6E6474]">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#514458] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#514458]">Official Email</p>
                    <a href={`mailto:${siteSettings.email}`} className="underline">
                      {siteSettings.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Instagram className="w-4 h-4 text-[#514458] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#514458]">Instagram</p>
                    <a href={siteSettings.instagramUrl} target="_blank" rel="noreferrer noopener" className="underline">
                      {siteSettings.instagramHandle}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Youtube className="w-4 h-4 text-[#514458] mt-1 shrink-0" />
                  <div>
                    <p className="font-semibold text-[#514458]">YouTube</p>
                    <a href={siteSettings.youtubeUrl} target="_blank" rel="noreferrer noopener" className="underline">
                      {siteSettings.youtubeHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F4E4ED]/50 border border-[#514458]/10 space-y-2 text-xs text-[#514458]">
              <p className="font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Privacy & Clinical Scope Note
              </p>
              <p className="leading-relaxed text-[#6E6474]">
                Please avoid uploading confidential medical reports or acute crisis details here. The Behavior Canvas provides educational, consultation, and academic services and is not an emergency clinic.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-[#514458]/10 shadow-xs">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h2 className="font-serif text-2xl font-semibold text-[#514458]">
                  Enquiry Submitted
                </h2>
                <p className="text-sm text-[#6E6474] max-w-md mx-auto">
                  Thank you, {name}. Your reference is <span className="font-mono text-xs">{refCode}</span>. We will reply via {contactMethod} within 24–48 business hours.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setMessage('');
                  }}
                  className="px-5 py-2.5 bg-[#514458] text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-serif text-2xl font-semibold text-[#514458]">
                  Send an Enquiry
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#514458] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15"
                    />
                    {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#514458] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15"
                    />
                    {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#514458] mb-1">
                      Phone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#514458] mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Academy Programmes">Academy Programmes</option>
                      <option value="Behaviour Consultation">Behaviour Consultation</option>
                      <option value="Parent Training">Parent Training</option>
                      <option value="Workshops & Masterclasses">Workshops & Masterclasses</option>
                      <option value="Learning Resources">Learning Resources</option>
                      <option value="Research Collaboration">Research Collaboration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#514458] mb-1">
                      Preferred Contact
                    </label>
                    <select
                      value={contactMethod}
                      onChange={(e) => setContactMethod(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15"
                    >
                      <option value="Email">Email</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Phone Call">Phone Call</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#514458] mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15"
                  />
                  {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
                </div>

                <label className="flex items-start gap-2.5 text-xs text-[#6E6474] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5"
                  />
                  <span>
                    I consent to my enquiry details being stored for response and agree to the{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('privacy-policy')}
                      className="underline text-[#514458]"
                    >
                      Privacy Policy
                    </button>
                    .
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-rose-600">{errors.consent}</p>}
                {errors.submit && <p className="text-xs text-rose-600">{errors.submit}</p>}

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-[#6E6474] inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Direct to Admin Inbox
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#514458] hover:bg-[#3f3445] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

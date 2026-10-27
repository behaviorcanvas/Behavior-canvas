import React, { useState } from 'react';
import { Mail, Instagram, Youtube, Send, CheckCircle2, ShieldCheck, Clock, MessageSquare, AlertCircle } from 'lucide-react';
import { brandConfig } from '../data/brand';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RoutePath } from '../types';

interface ContactPageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('General Enquiry');
  const [contactMethod, setContactMethod] = useState<'Email' | 'WhatsApp' | 'Phone Call'>('Email');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please provide a valid email address.';
    if (!message.trim() || message.trim().length < 15) errs.message = 'Please provide a message with at least 15 characters.';
    if (!consent) errs.consent = 'Please confirm agreement to our Privacy Policy.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumbs items={[{ label: 'Contact & Enquiry' }]} />

      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2A182C]">
          Contact The Behavior Canvas
        </h1>
        <p className="text-base sm:text-lg text-[#5A475D] leading-relaxed">
          Whether you are a parent exploring behavioral guidance, an educator seeking inclusive strategies, a school requesting workshops, or a professional with questions, we would love to connect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact Channels & Trust Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-3xl border border-[#EDE2EB] p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-[#2A182C]">
              Direct Communication Channels
            </h2>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAF8FA] border border-[#F0E6EF]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE2EB] flex items-center justify-center text-[#583256] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#7A677D] uppercase">Official Email</span>
                  <a
                    href={`mailto:${brandConfig.email}`}
                    className="block text-sm font-bold text-[#2A182C] hover:text-[#583256] hover:underline transition-colors"
                  >
                    {brandConfig.email}
                  </a>
                  <p className="text-[11px] text-[#7A677D] mt-0.5">Checked daily by our team</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAF8FA] border border-[#F0E6EF]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE2EB] flex items-center justify-center text-[#583256] shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#7A677D] uppercase">Instagram Community</span>
                  <a
                    href={brandConfig.instagram.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block text-sm font-bold text-[#2A182C] hover:text-[#583256] hover:underline transition-colors"
                  >
                    {brandConfig.instagram.handle}
                  </a>
                  <p className="text-[11px] text-[#7A677D] mt-0.5">Bite-sized behavior tips & updates</p>
                </div>
              </div>

              {/* YouTube */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAF8FA] border border-[#F0E6EF]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE2EB] flex items-center justify-center text-[#583256] shrink-0">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#7A677D] uppercase">YouTube Channel</span>
                  <a
                    href={brandConfig.youtube.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="block text-sm font-bold text-[#2A182C] hover:text-[#583256] hover:underline transition-colors"
                  >
                    {brandConfig.youtube.handle}
                  </a>
                  <p className="text-[11px] text-[#7A677D] mt-0.5">Educational videos & tutorials</p>
                </div>
              </div>
            </div>

            {/* Operating info */}
            <div className="pt-4 border-t border-[#EDE2EB] space-y-2 text-xs text-[#5C4A60]">
              <div className="flex items-center gap-2 font-semibold text-[#2A182C]">
                <Clock className="w-4 h-4 text-[#583256]" />
                <span>Response Window: 24–48 Business Hours</span>
              </div>
              <p>
                Services and consultations are conducted virtually across all Indian states and territories.
              </p>
            </div>
          </div>

          {/* Privacy & Crisis Notice */}
          <div className="p-6 rounded-2xl bg-[#FAF8FA] border border-[#EDE2EB] text-xs text-[#5C4A60] space-y-2.5">
            <h4 className="font-bold text-[#2A182C] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Data Confidentiality & Privacy Notice</span>
            </h4>
            <p className="leading-relaxed">
              We respect your privacy. Please do not submit medical histories, diagnostic paperwork, or sensitive personal child records through this public enquiry form. Specific contextual information is gathered securely during private consultation intake.
            </p>
          </div>
        </div>

        {/* Right Column: Multi-Category Interactive Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EDE2EB] p-8 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#2A182C]">
              Send an Online Enquiry
            </h2>
            <p className="text-xs text-[#6B5A6E]">
              Fill in your details below. We review each enquiry personally and reply promptly.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#2A182C]">
                Thank You, {name}!
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4A60] max-w-md mx-auto leading-relaxed">
                Your message regarding <span className="font-semibold text-[#2A182C]">{category}</span> has been received. Reema Singh and The Behavior Canvas team will respond via {contactMethod} at <span className="font-semibold text-[#2A182C]">{email}</span> within 24 to 48 business hours.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                    setConsent(false);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-colors shadow-xs"
                >
                  Send Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                  Your Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ananya Sen / Vikram Rao"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                />
                {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                    Phone / WhatsApp Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                    Enquiry Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Service Enquiry">Service & Consultation Enquiry</option>
                    <option value="Workshop Enquiry">Workshop & School Training Enquiry</option>
                    <option value="Digital Product Support">Digital Product & Study Notes Support</option>
                    <option value="Professional Collaboration">Professional Collaboration & Speaking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                  >
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Phone Call">Phone Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                  How Can We Help You? <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details of your situation, the age of your learner, specific behavioral questions, or the topic you would like to explore."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256] resize-y"
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
              </div>

              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[#DACFDB] text-[#583256] focus:ring-[#583256]"
                  />
                  <span className="text-xs text-[#5C4A60] leading-relaxed">
                    I confirm that this enquiry is for educational guidance and agree to the{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('privacy-policy')}
                      className="text-[#583256] font-semibold underline"
                    >
                      Privacy Policy
                    </button>.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-rose-600 mt-1">{errors.consent}</p>}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-[#7A677D]">
                  No spam guaranteed. We respect your inbox.
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-all shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

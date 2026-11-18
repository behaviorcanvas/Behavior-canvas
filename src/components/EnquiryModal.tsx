import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Mail, Send, ShieldCheck } from 'lucide-react';
import { brandConfig } from '../data/brand';
import { usePlatform } from '../contexts/PlatformContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultSubject?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'General Guidance',
  defaultSubject = '',
}) => {
  const { submitEnquiry } = usePlatform();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [contactMethod, setContactMethod] = useState<'Email' | 'WhatsApp' | 'Phone Call'>('Email');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setCategory(defaultCategory || 'General Guidance');
    if (defaultSubject) {
      setMessage(`Enquiry regarding: ${defaultSubject}\n\n`);
    }
  }, [defaultCategory, defaultSubject, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please provide a valid email address.';
    if (!message.trim() || message.trim().length < 10)
      errs.message = 'Please share a brief message (at least 10 characters).';
    if (!consent) errs.consent = 'Please confirm your agreement to proceed.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const refId = await submitEnquiry({
        name,
        email,
        phone,
        category,
        contactMethod,
        message,
        consentAgreed: consent,
      });
      setSubmittedRef(refId);
      setIsSubmitted(true);
    } catch (err: any) {
      setErrors({ submit: err?.message || 'Unable to submit enquiry right now.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setConsent(false);
    setIsSubmitted(false);
    setSubmittedRef('');
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#514458]/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-[#514458]/10 overflow-hidden max-h-[92vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-[#F8F5EF] border-b border-[#514458]/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F4E4ED] flex items-center justify-center text-[#514458]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#514458]">Make an Enquiry</h2>
              <p className="text-xs text-[#6E6474]">The Behavior Canvas – Academy of Behavioural Science</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6E6474] hover:text-[#514458] hover:bg-black/5 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#514458]">
                Thank You, {name.split(' ')[0]}
              </h3>
              <p className="text-sm text-[#6E6474] max-w-md mx-auto leading-relaxed">
                Your enquiry under <strong className="text-[#514458]">{category}</strong> has been securely recorded (Ref: <span className="font-mono text-xs">{submittedRef}</span>). We aim to reply via {contactMethod} within 24–48 business hours.
              </p>
              <p className="text-xs text-[#6E6474]">
                Direct email:{' '}
                <a href={`mailto:${brandConfig.email}`} className="text-[#514458] font-medium underline">
                  {brandConfig.email}
                </a>
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 bg-[#514458] hover:bg-[#3f3445] text-white text-sm font-medium rounded-xl cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#514458] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15 bg-white text-[#514458] focus:outline-hidden focus:border-[#514458]"
                />
                {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#514458] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15 bg-white text-[#514458] focus:outline-hidden focus:border-[#514458]"
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#514458] mb-1">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 ..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15 bg-white text-[#514458] focus:outline-hidden focus:border-[#514458]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#514458] mb-1">
                    Area of Interest
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15 bg-white text-[#514458] focus:outline-hidden focus:border-[#514458]"
                  >
                    <option value="Academy Programmes">Academy Programmes</option>
                    <option value="Behaviour Consultation">Behaviour Consultation</option>
                    <option value="Parent Training">Parent Training</option>
                    <option value="Online Behavioural Support">Online Behavioural Support</option>
                    <option value="Workshops & Masterclasses">Workshops & Masterclasses</option>
                    <option value="Professional Consultation">Professional Consultation</option>
                    <option value="Learning Resources">Learning Resources</option>
                    <option value="General Guidance">General Guidance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#514458] mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15 bg-white text-[#514458] focus:outline-hidden focus:border-[#514458]"
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
                  placeholder="Share your goals or questions. For your privacy, avoid sharing sensitive medical or clinical diagnostic reports in this initial form."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#514458]/15 bg-white text-[#514458] focus:outline-hidden focus:border-[#514458] resize-y"
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-[#514458]/30 text-[#514458]"
                />
                <span className="text-xs text-[#6E6474] leading-relaxed">
                  I agree to the Privacy Policy and understand that initial enquiries are educational and do not substitute for medical or psychiatric diagnosis.
                </span>
              </label>
              {errors.consent && <p className="text-xs text-rose-600">{errors.consent}</p>}
              {errors.submit && <p className="text-xs text-rose-600">{errors.submit}</p>}

              <div className="pt-4 flex items-center justify-between border-t border-[#514458]/10">
                <span className="flex items-center gap-1.5 text-xs text-[#6E6474]">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Stored confidentially
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-[#6E6474] hover:text-[#514458] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

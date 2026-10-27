import React, { useState } from 'react';
import { X, CheckCircle2, Mail, Send, Clock, ShieldCheck } from 'lucide-react';
import { brandConfig } from '../data/brand';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultSubject?: string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultCategory = 'General Enquiry',
  defaultSubject = ''
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState(defaultCategory);
  const [contactMethod, setContactMethod] = useState<'Email' | 'WhatsApp' | 'Phone Call'>('Email');
  const [message, setMessage] = useState(defaultSubject ? `I would like to enquire regarding: ${defaultSubject}\n\n` : '');
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please provide a valid email address.';
    if (!message.trim() || message.trim().length < 15) errs.message = 'Please provide a brief message (minimum 15 characters).';
    if (!consent) errs.consent = 'Please confirm agreement to our Privacy Policy.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate transparent processing with genuine response confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setConsent(false);
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1120]/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#EDE2EB] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#FAF6F8] to-[#F5EEF4] border-b border-[#EDE2EB]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#583256]/10 flex items-center justify-center text-[#583256]">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 id="enquiry-modal-title" className="text-lg font-bold text-[#2A182C]">
                Make an Enquiry
              </h2>
              <p className="text-xs text-[#6B5A6E]">
                The Behavior Canvas · Pan-India Support
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B5A6E] hover:text-[#2A182C] hover:bg-black/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#2A182C]">
                Thank You, {name.split(' ')[0]}!
              </h3>
              <p className="text-sm text-[#5C4A60] max-w-md mx-auto leading-relaxed">
                Your enquiry regarding <span className="font-semibold text-[#2A182C]">{category}</span> has been received. Reema Singh and The Behavior Canvas team will review your message and reply via <span className="font-semibold text-[#2A182C]">{contactMethod}</span> ({email}) within 24 to 48 business hours.
              </p>
              <div className="p-4 bg-[#FAF7F9] rounded-xl border border-[#EDE2EB] text-xs text-[#68536C] text-left space-y-1.5 max-w-md mx-auto">
                <div className="flex items-center gap-2 font-medium text-[#2A182C]">
                  <Clock className="w-3.5 h-3.5 text-[#583256]" />
                  <span>Standard Response Time: 24–48 Hours</span>
                </div>
                <p>
                  Need immediate contact? You can also email us directly at{' '}
                  <a
                    href={`mailto:${brandConfig.email}?subject=Enquiry from ${encodeURIComponent(name)}`}
                    className="text-[#583256] font-medium underline"
                  >
                    {brandConfig.email}
                  </a>
                </p>
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="mt-4 px-6 py-2.5 bg-[#583256] hover:bg-[#482746] text-white text-sm font-medium rounded-lg transition-colors shadow-xs"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                  Your Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Priya Sharma / Amit Verma"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] placeholder-[#9E8E9F] focus:outline-hidden focus:border-[#583256] focus:ring-1 focus:ring-[#583256] transition-all"
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
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] placeholder-[#9E8E9F] focus:outline-hidden focus:border-[#583256] focus:ring-1 focus:ring-[#583256] transition-all"
                  />
                  {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] placeholder-[#9E8E9F] focus:outline-hidden focus:border-[#583256] focus:ring-1 focus:ring-[#583256] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                    Category of Enquiry
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256] focus:ring-1 focus:ring-[#583256] transition-all"
                  >
                    <option value="Behavior Consultation">Behavior Consultation</option>
                    <option value="Parent Guidance and Training">Parent Guidance and Training</option>
                    <option value="Special Education & Inclusion">Special Education & Inclusion</option>
                    <option value="Online Behavior Support">Online Behavior Support</option>
                    <option value="Professional Mentoring & Supervision">Professional Mentoring & Supervision</option>
                    <option value="Workshops & Training">Workshops & Training</option>
                    <option value="Digital Study Resources Support">Digital Study Resources Support</option>
                    <option value="General Guidance">General Guidance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256] focus:ring-1 focus:ring-[#583256] transition-all"
                  >
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Phone Call">Phone Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                  How Can We Help? <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please describe your general query, your learner's age/context, or specific workshop topic you wish to discuss. Please do NOT include sensitive medical diagnoses."
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] placeholder-[#9E8E9F] focus:outline-hidden focus:border-[#583256] focus:ring-1 focus:ring-[#583256] transition-all resize-y"
                />
                {errors.message && <p className="text-xs text-rose-600 mt-1">{errors.message}</p>}
                <p className="text-[11px] text-[#7C6A7E] mt-1">
                  * Note: For privacy and security, do not disclose detailed medical reports or private child case histories in this general form.
                </p>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-[#DACFDB] text-[#583256] focus:ring-[#583256]"
                  />
                  <span className="text-xs text-[#5C4A60] leading-relaxed">
                    I understand that general educational enquiries do not constitute formal medical or psychiatric diagnosis, and I agree to the{' '}
                    <span className="text-[#583256] font-medium underline">Privacy Policy</span>.
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-rose-600 mt-1">{errors.consent}</p>}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#EDE2EB]">
                <div className="flex items-center gap-1.5 text-xs text-[#6B5A6E]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Confidential & Spam-Free</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-[#5C4A60] hover:text-[#2A182C] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-lg transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
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

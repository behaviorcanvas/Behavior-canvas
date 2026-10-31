import React, { useState } from 'react';
import { X, CheckCircle2, Download, ShieldCheck, FileText, Lock, ArrowRight, Sparkles, CreditCard, Globe } from 'lucide-react';
import { ProductItem } from '../data/products';
import { brandConfig } from '../data/brand';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  currency: 'USD' | 'INR';
  onCurrencyChange?: (c: 'USD' | 'INR') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
  currency: initialCurrency = 'USD',
  onCurrencyChange
}) => {
  const [currency, setCurrency] = useState<'USD' | 'INR'>(initialCurrency);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [paymentProvider, setPaymentProvider] = useState<'stripe' | 'paypal' | 'razorpay'>('stripe');
  const [step, setStep] = useState<'details' | 'processing' | 'confirmed'>('details');
  const [agreedToLicense, setAgreedToLicense] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen || !product) return null;

  const rawPrice = currency === 'USD' ? product.priceUSD : product.priceINR;
  const currentSymbol = currency === 'USD' ? '$' : '₹';
  const originalPrice = currency === 'USD' ? product.originalPriceUSD : product.originalPriceINR;
  const discountAmount = discountPercent > 0 ? (rawPrice * discountPercent) / 100 : 0;
  const currentPrice = discountPercent > 0 ? (currency === 'USD' ? Number((rawPrice - discountAmount).toFixed(2)) : Math.round(rawPrice - discountAmount)) : rawPrice;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'GLOBALSTUDY') {
      setDiscountPercent(15);
      setCouponMessage({ text: 'Coupon GLOBALSTUDY applied! 15% off.', isError: false });
    } else if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setCouponMessage({ text: 'Coupon WELCOME10 applied! 10% off.', isError: false });
    } else if (!code) {
      setCouponMessage(null);
    } else {
      setCouponMessage({ text: 'Invalid promo code. Try "GLOBALSTUDY"', isError: true });
    }
  };

  const handleCurrencySwitch = (c: 'USD' | 'INR') => {
    setCurrency(c);
    if (onCurrencyChange) onCurrencyChange(c);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your full name.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email for international digital delivery.';
    if (!agreedToLicense) errs.license = 'You must accept the personal-use digital licensing policy.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep('processing');
    setTimeout(() => {
      setStep('confirmed');
    }, 1200);
  };

  const handleDownloadSample = () => {
    const content = `============================================================
THE BEHAVIOR CANVAS · OFFICIAL EDUCATIONAL RESOURCE
Resource: ${product.title}
Author: Reema Singh, Founder
Product Format: ${product.format}
Order Status: Verified International Educational License
Purchaser: ${name || 'Valued International Learner'}
Delivery Email: ${email || 'customer@example.com'}
Currency & Amount: ${currentSymbol}${currentPrice} (${currency})
Payment Gateway: ${paymentProvider.toUpperCase()} Verified Checkout
============================================================

CORE MODULES & SYLLABUS BREAKDOWN
------------------------------------------------------------
${product.contents.map((c, i) => `${i + 1}. ${c}`).join('\n')}

INTERNATIONAL STUDY GUIDELINES
------------------------------------------------------------
Designed to support candidates preparing for QASP-S, ABAT, and
applied behavior science coursework across North America, Europe,
the Middle East, Australia, India, and worldwide.

DIGITAL USAGE & COPYRIGHT POLICY
------------------------------------------------------------
This resource is licensed strictly for individual personal educational
use. Redistribution, public file-sharing (e.g. Google Drive, Telegram,
Course Hero), or commercial resale is strictly prohibited under
international intellectual property treaties.

Official Website: https://${brandConfig.domain}
Support Email: ${brandConfig.email}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.slug}-study-guide.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetAndClose = () => {
    setStep('details');
    setName('');
    setEmail('');
    setCouponCode('');
    setDiscountPercent(0);
    setCouponMessage(null);
    setAgreedToLicense(false);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1E1120]/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#EDE2EB] overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#FAF6F8] to-[#F5EEF4] border-b border-[#EDE2EB]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#583256]/10 flex items-center justify-center text-[#583256]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 id="checkout-modal-title" className="text-base font-bold text-[#2A182C]">
                International Secure Checkout
              </h2>
              <p className="text-xs text-[#6B5A6E]">Instant Worldwide Delivery · Stripe & PayPal Protected</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-[#6B5A6E] hover:text-[#2A182C] hover:bg-black/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full border-3 border-[#583256] border-t-transparent animate-spin" />
              <h3 className="text-base font-bold text-[#2A182C]">
                Processing Secure International Order...
              </h3>
              <p className="text-xs text-[#6B5A6E] max-w-xs mx-auto">
                Verifying transaction via {paymentProvider === 'stripe' ? 'Stripe Gateway' : paymentProvider === 'paypal' ? 'PayPal Gateway' : 'Razorpay Global'} and generating your encrypted digital download link.
              </p>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="py-4 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#2A182C]">
                Order Confirmed!
              </h3>
              <p className="text-xs text-[#5C4A60] max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#2A182C]">{name}</span>! Your order for <span className="font-semibold text-[#2A182C]">{product.title}</span> ({currentSymbol}{currentPrice} {currency}) has been verified.
              </p>

              {/* Download card */}
              <div className="p-4 bg-[#FAF7F9] rounded-xl border border-[#EDE2EB] text-left space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#583256]" />
                    <div>
                      <p className="text-xs font-bold text-[#2A182C]">{product.title}</p>
                      <p className="text-[11px] text-[#6B5A6E]">{product.fileSpecs.format}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">
                    Ready to Access
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadSample}
                  className="w-full mt-2 py-2 px-3 bg-[#583256] hover:bg-[#482746] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resource Package</span>
                </button>
              </div>

              {/* Technical gateway integration note */}
              <div className="p-3 bg-[#F4F1F5] rounded-lg text-left text-[11px] text-[#5A475D] space-y-1">
                <p className="font-semibold text-[#2A182C] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#583256]" />
                  <span>Global Payment Gateway Architecture</span>
                </p>
                <p>
                  This storefront is pre-architected to bind directly to Stripe, PayPal, or Razorpay International. Files are cryptographically licensed to the purchaser's email address with multi-currency conversion.
                </p>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className="mt-2 px-5 py-2 text-xs font-medium text-[#5C4A60] hover:text-[#2A182C] transition-colors"
              >
                Close Window
              </button>
            </div>
          )}

          {step === 'details' && (
            <form onSubmit={handleProceedPayment} className="space-y-4">
              {/* Product Summary Box with Currency Switcher */}
              <div className="p-3.5 bg-[#FAF7F9] rounded-xl border border-[#EDE2EB] space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#EDE2EB] overflow-hidden flex items-center justify-center shrink-0">
                      <img
                        src={brandConfig.logoPath}
                        alt="The Behavior Canvas"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#2A182C] line-clamp-1">{product.title}</h4>
                      <p className="text-[11px] text-[#6B5A6E]">{product.format}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold text-[#583256] tabular-nums">
                      {currentSymbol}{currentPrice.toLocaleString()} {currency}
                    </span>
                    {originalPrice && (
                      <span className="block text-[11px] text-[#8C7A8F] line-through tabular-nums">
                        {currentSymbol}{originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Currency selector toggle inside checkout */}
                <div className="flex items-center justify-between pt-2 border-t border-[#EDE2EB] text-xs">
                  <span className="text-[#6B5A6E] flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-[#583256]" />
                    <span>Select Preferred Currency:</span>
                  </span>
                  <div className="flex items-center gap-1 p-0.5 bg-white rounded-md border border-[#EDE2EB]">
                    <button
                      type="button"
                      onClick={() => handleCurrencySwitch('USD')}
                      className={`px-2 py-0.5 text-[11px] font-semibold rounded-sm transition-colors ${
                        currency === 'USD'
                          ? 'bg-[#583256] text-white'
                          : 'text-[#6B5A6E] hover:text-[#2A182C]'
                      }`}
                    >
                      $ USD (Global)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCurrencySwitch('INR')}
                      className={`px-2 py-0.5 text-[11px] font-semibold rounded-sm transition-colors ${
                        currency === 'INR'
                          ? 'bg-[#583256] text-white'
                          : 'text-[#6B5A6E] hover:text-[#2A182C]'
                      }`}
                    >
                      ₹ INR (India)
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment Provider Choice */}
              <div>
                <label className="block text-xs font-semibold text-[#3B223D] mb-1.5">
                  Secure International Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentProvider('stripe')}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      paymentProvider === 'stripe'
                        ? 'border-[#583256] bg-[#FAF5F9] ring-1 ring-[#583256]'
                        : 'border-[#EDE2EB] bg-white hover:border-[#DACFDB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2A182C]">Stripe</span>
                      <CreditCard className="w-3.5 h-3.5 text-[#583256]" />
                    </div>
                    <span className="text-[10px] text-[#7A677D] mt-1">Cards / Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentProvider('paypal')}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      paymentProvider === 'paypal'
                        ? 'border-[#583256] bg-[#FAF5F9] ring-1 ring-[#583256]'
                        : 'border-[#EDE2EB] bg-white hover:border-[#DACFDB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2A182C]">PayPal</span>
                      <Globe className="w-3.5 h-3.5 text-[#0070BA]" />
                    </div>
                    <span className="text-[10px] text-[#7A677D] mt-1">Global Accounts</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentProvider('razorpay')}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      paymentProvider === 'razorpay'
                        ? 'border-[#583256] bg-[#FAF5F9] ring-1 ring-[#583256]'
                        : 'border-[#EDE2EB] bg-white hover:border-[#DACFDB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2A182C]">Razorpay</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <span className="text-[10px] text-[#7A677D] mt-1">UPI & Global</span>
                  </button>
                </div>
              </div>

              {/* Customer details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins / Dr. Priya Sen"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                  />
                  {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                    Country of Residence
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="India">India</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Germany">Germany</option>
                    <option value="Other">Other Global Country</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B223D] mb-1">
                  Delivery Email Address <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256]"
                />
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                <p className="text-[11px] text-[#7C6A7E] mt-1">
                  Your PDF file download link will be delivered immediately to this address.
                </p>
              </div>

              {/* Promo Code Input */}
              <div className="p-3 bg-[#FAF8FA] rounded-xl border border-[#EDE2EB] space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code (e.g. GLOBALSTUDY)"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-[#DACFDB] bg-white text-[#2A182C] focus:outline-hidden focus:border-[#583256] uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-3 py-1.5 text-xs font-semibold text-[#583256] bg-white hover:bg-[#F2EBF1] border border-[#DACFDB] rounded-lg transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-[11px] ${
                      couponMessage.isError ? 'text-rose-600' : 'text-emerald-700 font-medium'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </div>

              {/* Order total */}
              <div className="py-2.5 px-3 bg-[#FAF8FA] rounded-lg border border-[#EDE2EB] text-xs space-y-1">
                <div className="flex justify-between text-[#5C4A60]">
                  <span>Item Subtotal</span>
                  <span className="tabular-nums">{currentSymbol}{rawPrice.toLocaleString()} {currency}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="tabular-nums">-{currentSymbol}{discountAmount.toLocaleString()} {currency}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5C4A60]">
                  <span>Worldwide Digital Delivery</span>
                  <span className="text-emerald-700 font-medium">Free (Instant Email Link)</span>
                </div>
                <div className="pt-1.5 border-t border-[#EDE2EB] flex justify-between font-bold text-[#2A182C] text-sm">
                  <span>Total Due</span>
                  <span className="text-[#583256] tabular-nums">
                    {currentSymbol}{currentPrice.toLocaleString()} {currency}
                  </span>
                </div>
              </div>

              {/* Digital license acceptance */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToLicense}
                    onChange={(e) => setAgreedToLicense(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-[#DACFDB] text-[#583256] focus:ring-[#583256]"
                  />
                  <span className="text-[11px] text-[#5C4A60] leading-relaxed">
                    I agree to the <span className="font-semibold text-[#2A182C]">Single-User Digital Educational License</span>. Files are for personal study only. Redistribution, public upload, or resale is prohibited.
                  </span>
                </label>
                {errors.license && <p className="text-xs text-rose-600 mt-1">{errors.license}</p>}
              </div>

              {/* Security badges & CTA */}
              <div className="pt-3 flex items-center justify-between border-t border-[#EDE2EB]">
                <div className="flex items-center gap-1.5 text-[11px] text-[#6B5A6E]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="px-3 py-2 text-xs font-medium text-[#5C4A60] hover:text-[#2A182C] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <span>Proceed via {paymentProvider === 'stripe' ? 'Stripe' : paymentProvider === 'paypal' ? 'PayPal' : 'Razorpay'} ({currentSymbol}{currentPrice})</span>
                    <ArrowRight className="w-3 h-3" />
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

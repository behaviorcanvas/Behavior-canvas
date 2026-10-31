import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, FileText, Download, ShieldCheck, Sparkles, ArrowLeft, HelpCircle, Lock, Globe, CreditCard, Eye } from 'lucide-react';
import { productsData, ProductItem } from '../data/products';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { RoutePath } from '../types';

interface ResourcesPageProps {
  selectedSlug?: string;
  onNavigate: (route: RoutePath, param?: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  onPreviewProduct?: (product: ProductItem) => void;
  currency: 'USD' | 'INR';
  onCurrencyToggle: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({
  selectedSlug,
  onNavigate,
  onSelectProduct,
  onPreviewProduct,
  currency,
  onCurrencyToggle
}) => {
  const [filter, setFilter] = useState<string>('All');
  const currentSymbol = currency === 'USD' ? '$' : '₹';

  const activeProduct = selectedSlug
    ? productsData.find((p) => p.slug === selectedSlug) || null
    : null;

  const filteredProducts = productsData.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Bundle') return p.isBundle;
    return p.category === filter;
  });

  if (activeProduct) {
    const currentPrice = currency === 'USD' ? activeProduct.priceUSD : activeProduct.priceINR;
    const origPrice = currency === 'USD' ? activeProduct.originalPriceUSD : activeProduct.originalPriceINR;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Resources & Shop', onClick: () => onNavigate('resources') },
            { label: activeProduct.title }
          ]}
        />

        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('resources')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#583256] hover:text-[#2A182C] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Resources</span>
          </button>

          <button
            onClick={onCurrencyToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#583256] bg-white border border-[#DACFDB] rounded-lg hover:bg-[#FAF6F8] transition-colors shadow-xs"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Currency: {currency === 'USD' ? '$ USD (Global)' : '₹ INR (India)'}</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-[#EDE2EB] p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-[#EDE2EB] shadow-md bg-[#FAF8FA] relative group p-2">
              <img
                src={activeProduct.image}
                alt={activeProduct.title}
                className="w-full h-[360px] object-cover object-center rounded-xl"
                referrerPolicy="no-referrer"
              />
              {activeProduct.badge && (
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold text-[#583256] border border-[#EDE2EB] shadow-xs">
                  {activeProduct.badge}
                </div>
              )}
            </div>

            <div className="p-4 bg-[#FAF6F8] rounded-2xl border border-[#EDE2EB] space-y-2 text-xs text-[#5C4A60]">
              <div className="flex justify-between">
                <span className="font-medium text-[#2A182C]">File Format:</span>
                <span>{activeProduct.fileSpecs.format}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#2A182C]">Delivery:</span>
                <span>{activeProduct.fileSpecs.delivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#2A182C]">Coverage:</span>
                <span>{activeProduct.fileSpecs.estimatedPages}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#2A182C]">License:</span>
                <span>Single-User Educational License</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#583256] uppercase tracking-wider">
                {activeProduct.category} · International Study Material
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2A182C]">
                {activeProduct.title}
              </h1>
              <p className="text-sm font-medium text-[#7A677D]">
                {activeProduct.subtitle}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8FA] border border-[#EDE2EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#7A677D] block">International Price ({currency})</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-bold text-[#2A182C] tabular-nums">
                    {currentSymbol}{currentPrice.toLocaleString()}
                  </span>
                  {origPrice && (
                    <span className="text-sm text-[#8C7A8F] line-through tabular-nums">
                      {currentSymbol}{origPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs font-medium text-[#583256]">
                    {currency === 'USD' ? 'USD (Global)' : 'INR (India)'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
                {onPreviewProduct && (
                  <button
                    onClick={() => onPreviewProduct(activeProduct)}
                    className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-semibold text-[#583256] bg-white hover:bg-[#F6EEF5] border border-[#DACFDB] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 shrink-0"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview Sample Pages</span>
                  </button>
                )}
                <button
                  onClick={() => onSelectProduct(activeProduct)}
                  className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Get This Resource</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
              {activeProduct.fullDescription.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-[#2A182C]">
                Contents & Modules Included
              </h3>
              <ul className="space-y-2">
                {activeProduct.contents.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-[#2A182C]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-[#2A182C]">
                Key Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProduct.features.map((feat, i) => (
                  <div key={i} className="p-3 bg-[#FAF8FA] rounded-xl border border-[#EDE2EB] text-xs text-[#5C4A60]">
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EDE2EB] p-7 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#2A182C] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#583256]" />
              <span>Frequently Asked Questions for this Resource</span>
            </h3>
            <div className="space-y-4">
              {activeProduct.faq.map((item, i) => (
                <div key={i} className="space-y-1 p-3.5 bg-[#FAF8FA] rounded-xl border border-[#F0E6EF]">
                  <h4 className="text-xs font-bold text-[#2A182C]">{item.question}</h4>
                  <p className="text-xs text-[#5C4A60] leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF8FA] rounded-2xl border border-[#EDE2EB] p-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2A182C]">
              <Lock className="w-4 h-4 text-[#583256]" />
              <span>Usage & Licensing Terms</span>
            </div>
            <p className="text-xs text-[#5C4A60] leading-relaxed">
              Digital resources are licensed exclusively for the purchaser’s personal educational use. Redistribution, resale, public file sharing, or unauthorized group distribution is strictly prohibited.
            </p>
            <div className="pt-2 flex flex-col space-y-2 text-xs">
              <button
                onClick={() => onNavigate('copyright-policy')}
                className="text-[#583256] font-semibold hover:underline text-left"
              >
                Read Complete Digital Product Usage Policy →
              </button>
              <button
                onClick={() => onNavigate('refund-and-cancellation-policy')}
                className="text-[#583256] font-semibold hover:underline text-left"
              >
                Review Digital Refund Policy →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'Resources & Digital Shop' }]} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EDE2EB] pb-8">
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
            International Study Publications
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2A182C]">
            Behavior Science Study Resources
          </h1>
          <p className="text-sm sm:text-base text-[#5A475D] leading-relaxed">
            Organized study notes, rapid revision cheat sheets, scenario-based practice questions, and study planners designed to support candidates preparing for QASP-S, ABAT, and applied behavior science coursework worldwide.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          <button
            onClick={onCurrencyToggle}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#583256] bg-white border border-[#DACFDB] rounded-xl hover:bg-[#FAF6F8] transition-colors shadow-xs"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Currency: {currency === 'USD' ? '$ USD (Global)' : '₹ INR (India)'}</span>
          </button>

          <div className="flex items-center gap-1.5 p-1 bg-[#FAF6F8] rounded-xl border border-[#EDE2EB] overflow-x-auto max-w-full">
            {['All', 'Notes', 'Cheat Sheet', 'Practice', 'Planner', 'Bundle'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  filter === cat
                    ? 'bg-white text-[#2A182C] shadow-xs'
                    : 'text-[#6B5A6E] hover:text-[#2A182C]'
                }`}
              >
                {cat === 'All' ? 'All Resources' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF6F8] via-white to-[#FAF6F8] border border-[#EDE2EB] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5C4A60]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#583256]/10 text-[#583256] flex items-center justify-center shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-[#2A182C]">Secure International Payment Gateways</p>
            <p className="text-[11px] text-[#7A677D]">Stripe & PayPal Verified · Visa, Mastercard, American Express, Apple Pay, Google Pay & UPI accepted globally</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Instant Download & Email Delivery</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => {
          const price = currency === 'USD' ? product.priceUSD : product.priceINR;
          const origPrice = currency === 'USD' ? product.originalPriceUSD : product.originalPriceINR;

          return (
            <div
              key={product.id}
              className={`p-7 rounded-3xl bg-white border shadow-xs transition-all flex flex-col justify-between ${
                product.isBundle
                  ? 'border-[#8E75A6] shadow-md ring-1 ring-[#8E75A6]/40 md:col-span-2 lg:col-span-1'
                  : 'border-[#EDE2EB] hover:border-[#DACFDB] hover:shadow-lg'
              }`}
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-[#EDE2EB] bg-[#FAF8FA] h-48 relative p-1.5">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#583256] px-2.5 py-0.5 rounded-full border border-[#EDE2EB] shadow-xs">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-[#7A677D]">
                  <span>{product.format}</span>
                  <span>{product.fileSpecs.estimatedPages}</span>
                </div>

                <h2 className="text-xl font-bold text-[#2A182C] line-clamp-1">
                  {product.title}
                </h2>

                <p className="text-xs text-[#5C4A60] leading-relaxed line-clamp-3">
                  {product.shortDescription}
                </p>

                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#2A182C] tabular-nums">
                    {currentSymbol}{price.toLocaleString()}
                  </span>
                  {origPrice && (
                    <span className="text-xs text-[#8C7A8F] line-through tabular-nums">
                      {currentSymbol}{origPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-[11px] text-[#7A677D] font-medium ml-1">
                    ({currency})
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F2EBF1] flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {onPreviewProduct && (
                    <button
                      onClick={() => onPreviewProduct(product)}
                      className="flex-1 py-2 text-center text-xs font-semibold text-[#583256] bg-[#FAF2F8] hover:bg-[#F2EBF1] border border-[#DACFDB] rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate('product-detail', product.slug)}
                    className="flex-1 py-2 text-center text-xs font-semibold text-[#2A182C] bg-white border border-[#DACFDB] hover:bg-[#FAF6F8] rounded-xl transition-colors"
                  >
                    View Details
                  </button>
                </div>
                <button
                  onClick={() => onSelectProduct(product)}
                  className="w-full py-2.5 text-center text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-colors shadow-xs"
                >
                  Get Resource ({currentSymbol}{price.toLocaleString()})
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-[#FAF8FA] border border-[#EDE2EB] text-xs text-[#5C4A60] space-y-2">
        <h4 className="font-bold text-[#2A182C] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Independent Educational Publisher Notice</span>
        </h4>
        <p className="leading-relaxed">
          These study resources are independently created by The Behavior Canvas and Reema Singh. They are not officially published, endorsed, or certified by the Qualified Applied Behavior Analysis Credentialing Board (QABA) or any other certifying entity. We do not guarantee examination passage, as performance is contingent upon individual coursework, supervision, and personal dedication.
        </p>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  FileText,
  Lock,
  Search,
  ShoppingBag,
} from 'lucide-react';
import { ProductItem } from '../data/products';
import { usePlatform } from '../contexts/PlatformContext';
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
  onCurrencyToggle,
}) => {
  const { products } = usePlatform();
  const [filter, setFilter] = useState<string>('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const symbol = currency === 'USD' ? '$' : '₹';

  const activeProduct = selectedSlug
    ? products.find((p) => p.slug === selectedSlug || p.id === selectedSlug) || null
    : null;

  if (activeProduct) {
    const price = currency === 'INR' ? activeProduct.priceINR : activeProduct.priceUSD;
    const orig = currency === 'INR' ? activeProduct.originalPriceINR : activeProduct.originalPriceUSD;
    return (
      <div className="bg-[#F8F5EF] py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <button
            onClick={() => onNavigate('resources')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#514458] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Learning Resources Store</span>
          </button>

          <div className="bg-white rounded-3xl border border-[#514458]/10 p-8 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-[#514458]/10 bg-[#F4E4ED]/30 aspect-[4/3]">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {onPreviewProduct && (
                <button
                  onClick={() => onPreviewProduct(activeProduct)}
                  className="w-full py-2.5 px-4 bg-[#F8F5EF] hover:bg-[#F4E4ED] text-[#514458] border border-[#514458]/15 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview Sample Excerpt</span>
                </button>
              )}
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#6E6474]">
                  {activeProduct.category} · {activeProduct.format}
                </p>
                <h1 className="font-serif text-3xl font-semibold text-[#514458] mt-1">
                  {activeProduct.title}
                </h1>
                <p className="text-sm text-[#6E6474] mt-1">{activeProduct.subtitle}</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-semibold text-[#514458]">
                  {symbol}
                  {price.toLocaleString()}
                </span>
                {orig && (
                  <span className="text-sm text-[#6E6474] line-through">
                    {symbol}
                    {orig.toLocaleString()}
                  </span>
                )}
                <button
                  onClick={onCurrencyToggle}
                  className="ml-auto text-xs font-medium text-[#514458] underline cursor-pointer"
                >
                  Switch to {currency === 'INR' ? 'USD ($)' : 'INR (₹)'}
                </button>
              </div>

              <div className="space-y-3 text-sm text-[#6E6474] leading-relaxed">
                {activeProduct.fullDescription.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-lg font-semibold text-[#514458]">What Is Included</h2>
                <ul className="space-y-1.5">
                  {activeProduct.contents.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#6E6474]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#514458] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#514458]/10 text-xs text-[#6E6474] flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#514458] shrink-0 mt-0.5" />
                <span>
                  Downloads unlock immediately upon server-verified payment. Independent educational study material; licensed strictly for single-user personal study.
                </span>
              </div>

              <button
                onClick={() => onSelectProduct(activeProduct)}
                className="w-full py-3.5 px-6 bg-[#514458] hover:bg-[#3f3445] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Purchase & Unlock Download ({symbol}{price.toLocaleString()})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filtered = products.filter((p) => {
    if (!p.isAvailable) return false;
    if (filter !== 'All' && p.category !== filter) return false;
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-[#F8F5EF] py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6474]">
              Digital Study Store
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#514458]">
              Learning Resources
            </h1>
            <p className="text-base text-[#6E6474] leading-relaxed">
              Structured ABA study notes, rapid revision cheat sheets, scenario question banks, study trackers, and digital guides unlocked automatically upon verified payment.
            </p>
          </div>
          <button
            onClick={onCurrencyToggle}
            className="px-4 py-2 text-xs font-semibold bg-white border border-[#514458]/15 rounded-xl text-[#514458] self-start md:self-auto cursor-pointer"
          >
            Showing {currency === 'INR' ? '₹ INR' : '$ USD'} · Switch
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {['All', 'Notes', 'Cheat Sheet', 'Practice', 'Planner', 'E-book', 'Bundle'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer ${
                  filter === cat
                    ? 'bg-[#514458] text-white'
                    : 'bg-white text-[#514458] border border-[#514458]/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#6E6474] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Filter resources..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#514458]/15"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const price = currency === 'INR' ? item.priceINR : item.priceUSD;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#514458]/10 overflow-hidden shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => onNavigate('product-detail', item.slug)}
                    className="h-44 overflow-hidden bg-[#F4E4ED]/30 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-[#6E6474]">
                      <span className="font-semibold text-[#514458]">{item.category}</span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" />
                        {item.fileSpecs.estimatedPages}
                      </span>
                    </div>
                    <h2
                      onClick={() => onNavigate('product-detail', item.slug)}
                      className="font-serif text-xl font-semibold text-[#514458] cursor-pointer hover:underline"
                    >
                      {item.title}
                    </h2>
                    <p className="text-sm text-[#6E6474] line-clamp-3 leading-relaxed">
                      {item.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-[#F8F5EF]/60 border-t border-[#514458]/10 flex items-center justify-between gap-2">
                  <span className="font-serif text-lg font-semibold text-[#514458]">
                    {symbol}
                    {price.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('product-detail', item.slug)}
                      className="px-3 py-2 text-xs font-medium text-[#514458] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onSelectProduct(item)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#514458] hover:bg-[#3f3445] rounded-xl cursor-pointer"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

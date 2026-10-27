import React from 'react';
import { ArrowRight, BookOpen, Users, Compass, GraduationCap, CheckCircle2, Calendar, FileText, Sparkles, HeartHandshake, ShieldCheck, Globe, Linkedin } from 'lucide-react';
import { brandConfig } from '../data/brand';
import { servicesData } from '../data/services';
import { productsData, ProductItem } from '../data/products';
import { workshopsData } from '../data/workshops';
import { articlesData } from '../data/articles';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { TrustBadges } from '../components/TrustBadges';
import { RoutePath } from '../types';

interface HomePageProps {
  onNavigate: (route: RoutePath, param?: string) => void;
  onOpenEnquiry: (category?: string, subject?: string) => void;
  onSelectProduct: (product: ProductItem) => void;
  currency: 'USD' | 'INR';
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenEnquiry,
  onSelectProduct,
  currency,
}) => {
  const currentSymbol = currency === 'USD' ? '$' : '₹';

  return (
    <div className="space-y-24">
      {/* Section B: Hero Section with Soft Watercolor Artwork */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#583256] tracking-wide uppercase bg-[#FAF2F8] px-3 py-1 rounded-full border border-[#EDE2EB]">
                <Globe className="w-3.5 h-3.5 text-[#583256]" />
                <span>Global & Pan-India · QASP-S Study Resources & Tele-Supervision</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-[#2A182C] leading-[1.15] text-balance">
                {brandConfig.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-[#5A475D] leading-relaxed max-w-2xl">
                The Behavior Canvas connects behavior science, parent education, inclusive learning, and international professional development. We support families, educators, and candidates worldwide with structured QASP-S study materials and remote supervision across global time zones.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('resources')}
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-all shadow-md hover:shadow-lg active:scale-98 flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Explore Study Resources</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('service-detail', 'professional-mentoring-and-supervision')}
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#2A182C] bg-white hover:bg-[#F6EEF5] border border-[#DACFDB] rounded-xl transition-all shadow-xs hover:border-[#583256] whitespace-nowrap shrink-0"
                >
                  Remote Supervision & Mentoring
                </button>
              </div>

              {/* International Trust & Foundation Strip */}
              <div className="pt-6 border-t border-[#EDE2EB] grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-[#2A182C] tabular-nums">
                    Worldwide
                  </span>
                  <span className="text-xs text-[#756178]">Stripe & PayPal Checkout</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-[#2A182C] tabular-nums">
                    Tele-Supervision
                  </span>
                  <span className="text-xs text-[#756178]">All Global Timezones</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-bold text-[#2A182C] tabular-nums">
                    QASP-S Prep
                  </span>
                  <span className="text-xs text-[#756178]">Notes, Cheats & Questions</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset (Soft Elegant Watercolor Illustration) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#EDE2EB] bg-white group p-2">
                <img
                  src="/src/assets/images/hero_watercolor_child_guide_1793099905373.jpg"
                  alt="Soft watercolor illustration of an educator guiding a learner with colorful learning shapes and cards"
                  className="w-full h-[380px] sm:h-[450px] object-cover object-center rounded-2xl group-hover:scale-101 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-4 bottom-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EDE2EB] shadow-md text-[#2A182C]">
                  <p className="text-xs font-bold tracking-tight text-[#2A182C] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#583256]" />
                    <span>Respectful, Compassionate Behavior Science</span>
                  </p>
                  <p className="text-[11px] text-[#5C4A60] mt-0.5 leading-snug">
                    Helping families, educators, and international candidates master evidence-informed behavior support with empathy and dignity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section C: Who We Support */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
            Targeted Understanding
          </span>
          <h2 className="text-3xl font-bold text-[#2A182C] tracking-tight">
            Who We Support
          </h2>
          <p className="text-sm text-[#5C4A60] leading-relaxed">
            Every learner, family, and educational context is distinct. We tailor educational resources and guidance to support your specific role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs hover:border-[#C4B2C6] hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6EEF5] text-[#583256] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#2A182C]">
                Parents & Caregivers
              </h3>
              <p className="text-xs text-[#5C4A60] leading-relaxed">
                Practical education and guidance to better understand behavior, communication, learning, and everyday family challenges without blame.
              </p>
            </div>
            <button
              onClick={() => onNavigate('service-detail', 'parent-guidance-and-training')}
              className="mt-6 text-xs font-semibold text-[#583256] hover:text-[#2A182C] flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Parent Guidance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs hover:border-[#C4B2C6] hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6EEF5] text-[#583256] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#2A182C]">
                Children & Learners
              </h3>
              <p className="text-xs text-[#5C4A60] leading-relaxed">
                Individualized, respectful support focused on meaningful skills, participation, functional communication, and personal strengths, where appropriate.
              </p>
            </div>
            <button
              onClick={() => onNavigate('service-detail', 'behavior-consultation')}
              className="mt-6 text-xs font-semibold text-[#583256] hover:text-[#2A182C] flex items-center gap-1.5 transition-colors"
            >
              <span>View Consultation Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs hover:border-[#C4B2C6] hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6EEF5] text-[#583256] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#2A182C]">
                Educators & Special Educators
              </h3>
              <p className="text-xs text-[#5C4A60] leading-relaxed">
                Educational resources, positive behavior support strategies, and visual classroom accommodations for truly inclusive schools.
              </p>
            </div>
            <button
              onClick={() => onNavigate('service-detail', 'special-education-inclusive-learning')}
              className="mt-6 text-xs font-semibold text-[#583256] hover:text-[#2A182C] flex items-center gap-1.5 transition-colors"
            >
              <span>Inclusive Learning Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs hover:border-[#C4B2C6] hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F6EEF5] text-[#583256] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#2A182C]">
                Global Candidates & Trainees
              </h3>
              <p className="text-xs text-[#5C4A60] leading-relaxed">
                QASP-S & ABAT study notes, question banks, exam cheat sheets, and international remote supervision accommodated to your local timezone.
              </p>
            </div>
            <button
              onClick={() => onNavigate('service-detail', 'professional-mentoring-and-supervision')}
              className="mt-6 text-xs font-semibold text-[#583256] hover:text-[#2A182C] flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Tele-Supervision</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges & Accreditations (QABA® QASP-S, Remote Supervision, Payments & Ethics) */}
      <TrustBadges onNavigate={onNavigate} onOpenEnquiry={onOpenEnquiry} />

      {/* Section D: Explore Our Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
              Consultation & Professional Support
            </span>
            <h2 className="text-3xl font-bold text-[#2A182C] tracking-tight">
              Explore Our Services
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
              Every service is grounded in evidence-informed methods, clear ethical boundaries, and transparent communication across all time zones.
            </p>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-semibold text-[#583256] hover:text-[#2A182C] flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>View All Services Breakdown</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="p-7 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs hover:border-[#583256]/50 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#7A677D]">
                    0{index + 1}.
                  </span>
                  <span className="text-[11px] font-medium text-[#6B5A6E] bg-[#FAF6F8] px-2.5 py-0.5 rounded-full border border-[#EDE2EB]">
                    {service.id === 'professional-mentoring-and-supervision'
                      ? 'Worldwide Tele-Supervision'
                      : 'Online / Remote'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#2A182C] group-hover:text-[#583256] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-[#5C4A60] leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F2EBF1] flex items-center justify-between">
                <button
                  onClick={() => onNavigate('service-detail', service.slug)}
                  className="text-xs font-semibold text-[#2A182C] group-hover:text-[#583256] flex items-center gap-1 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenEnquiry(service.title, `Service: ${service.title}`)}
                  className="text-xs font-medium text-[#583256] hover:underline"
                >
                  Enquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section E: Featured Learning Resources (Digital Educational Products) with Watercolor Cover & Multi-Currency */}
      <section className="bg-gradient-to-b from-[#F7EFF5]/60 to-[#FAF6F8] py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 border-y border-[#EDE2EB]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
                Worldwide Digital Storefront
              </span>
              <h2 className="text-3xl font-bold text-[#2A182C] tracking-tight">
                QASP-S Study Resources & Question Banks
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
                Structured digital study guides, scenario question banks, and revision planners with instant global delivery and multi-currency payment via Stripe & PayPal.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('resources')}
                className="text-xs font-semibold text-[#583256] hover:text-[#2A182C] flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <span>View Full Shop ({currency})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.map((product) => {
              const price = currency === 'USD' ? product.priceUSD : product.priceINR;
              const origPrice = currency === 'USD' ? product.originalPriceUSD : product.originalPriceINR;

              return (
                <div
                  key={product.id}
                  className={`p-6 rounded-2xl bg-white border shadow-xs transition-all flex flex-col justify-between ${
                    product.isBundle
                      ? 'border-[#8E75A6] shadow-md ring-1 ring-[#8E75A6]/40 md:col-span-2 lg:col-span-1'
                      : 'border-[#EDE2EB] hover:border-[#DACFDB] hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-[#583256] uppercase tracking-wider">
                        {product.format}
                      </span>
                      {product.badge && (
                        <span className="text-[11px] font-medium text-[#583256] bg-[#F6EEF5] px-2 py-0.5 rounded-sm">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#2A182C]">
                      {product.title}
                    </h3>

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

                  <div className="pt-6 mt-6 border-t border-[#F2EBF1] flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('product-detail', product.slug)}
                      className="flex-1 py-2 text-center text-xs font-semibold text-[#2A182C] bg-white border border-[#DACFDB] hover:bg-[#FAF6F8] rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="flex-1 py-2 text-center text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-lg transition-colors shadow-xs"
                    >
                      Get Resource
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#EDE2EB] text-xs text-[#5C4A60] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>International Payment Gateway: Stripe, PayPal, Visa, Mastercard, Amex, Apple Pay & Google Pay supported. Instant worldwide email delivery.</span>
            </div>
            <button
              onClick={() => onNavigate('copyright-policy')}
              className="text-[#583256] font-semibold hover:underline shrink-0"
            >
              Digital Licensing Policy
            </button>
          </div>
        </div>
      </section>

      {/* Section F: Why The Behavior Canvas? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
            Our Guiding Philosophy
          </span>
          <h2 className="text-3xl font-bold text-[#2A182C] tracking-tight">
            Why The Behavior Canvas?
          </h2>
          <p className="text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
            Our platform is built upon transparent commitments to scientific integrity, empathetic family partnership, and respectful inclusive practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandConfig.commitments.map((commitment, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs space-y-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FAF2F8] text-[#583256] flex items-center justify-center font-serif font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-[#2A182C]">
                {commitment.title}
              </h3>
              <p className="text-xs text-[#5C4A60] leading-relaxed">
                {commitment.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials & Success Stories Section with Watercolor Accents */}
      <TestimonialsSection />

      {/* Section G: Founder Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EDE2EB] shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#EDE2EB] shadow-lg bg-[#FBF8FA] group">
                <img
                  src={brandConfig.founder.image}
                  alt={`Portrait of ${brandConfig.founder.name}, Founder of The Behavior Canvas`}
                  className="w-full h-[460px] sm:h-[490px] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-[#EDE2EB]/80 shadow-xs flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#2A182C]">{brandConfig.founder.name}</div>
                    <div className="text-[11px] text-[#7A5B79]">Behavior & Special Education Specialist</div>
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#FAF2F8] text-[#583256] border border-[#EDE2EB]">
                    Founder
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#583256] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#583256]" />
                <span>Founder & Global Practice Lead</span>
              </div>

              <h2 className="text-3xl font-bold text-[#2A182C] tracking-tight">
                Meet the Founder
              </h2>

              <p className="text-sm font-semibold text-[#583256]">
                {brandConfig.founder.name} · {brandConfig.founder.role}
              </p>

              <p className="text-sm text-[#5C4A60] leading-relaxed">
                {brandConfig.founder.bioShort}
              </p>

              <div className="space-y-2 pt-2">
                {brandConfig.founder.credentials.map((cred, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#2A182C]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-xl transition-colors shadow-xs"
                >
                  Read Full Story & Mission
                </button>
                <a
                  href={brandConfig.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-[#0077B5] bg-white hover:bg-[#0077B5] hover:text-white rounded-xl border border-[#0077B5]/30 transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                  <span>LinkedIn Profile (QASP-S)</span>
                </a>
                <button
                  onClick={() => onOpenEnquiry('Professional Mentoring & Supervision', 'Founder Tele-Supervision Enquiry')}
                  className="px-4 py-2.5 text-xs font-semibold text-[#2A182C] bg-[#FAF6F8] hover:bg-[#F2EBF1] rounded-xl border border-[#DACFDB] transition-colors"
                >
                  Connect for Supervision
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section H: Workshops and Learning */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
              Interactive Learning
            </span>
            <h2 className="text-3xl font-bold text-[#2A182C] tracking-tight">
              Workshops & Online Training
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
              Live educational sessions for parents, educators, special educators, and aspiring behavior analysts across all time zones.
            </p>
          </div>
          <button
            onClick={() => onNavigate('workshops')}
            className="text-xs font-semibold text-[#583256] hover:text-[#2A182C] flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>View All Scheduled Workshops</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshopsData.map((workshop) => (
            <div
              key={workshop.id}
              className="p-6 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs hover:border-[#DACFDB] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {workshop.status}
                  </span>
                  <span className="text-xs font-medium text-[#7A677D]">
                    {workshop.duration}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#2A182C]">
                  {workshop.title}
                </h3>

                <p className="text-xs text-[#5C4A60] leading-relaxed line-clamp-3">
                  {workshop.shortDescription}
                </p>

                <div className="p-3 bg-[#FAF8FA] rounded-xl text-xs space-y-1 text-[#5C4A60]">
                  <div className="flex items-center gap-1.5 font-medium text-[#2A182C]">
                    <Calendar className="w-3.5 h-3.5 text-[#583256]" />
                    <span>{workshop.dateTime}</span>
                  </div>
                  <p className="text-[11px]">Fee: <span className="font-semibold text-[#583256]">{workshop.fee}</span></p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F2EBF1] flex items-center justify-between">
                <button
                  onClick={() => onNavigate('workshops')}
                  className="text-xs font-semibold text-[#2A182C] hover:text-[#583256] transition-colors"
                >
                  View Objectives
                </button>
                <button
                  onClick={() => onOpenEnquiry('Workshops & Training', `Workshop: ${workshop.title}`)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#583256] hover:bg-[#482746] rounded-lg transition-colors"
                >
                  Register / Enquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section I: Latest Articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#7A5B79]">
              Knowledge Hub
            </span>
            <h2 className="text-3xl font-bold text-[#2A182C] tracking-tight">
              Latest Articles & Insights
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4A60] leading-relaxed">
              Research-informed perspectives on behavior science, positive reinforcement, functional communication, and inclusive pedagogy.
            </p>
          </div>
          <button
            onClick={() => onNavigate('articles')}
            className="text-xs font-semibold text-[#583256] hover:text-[#2A182C] flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <span>Browse All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articlesData.slice(0, 3).map((article) => (
            <div
              key={article.id}
              className="p-6 rounded-2xl bg-white border border-[#EDE2EB] shadow-xs hover:border-[#DACFDB] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#7A677D]">
                  <span className="font-semibold text-[#583256]">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-[#2A182C] line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-[#5C4A60] leading-relaxed line-clamp-3">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F2EBF1] flex items-center justify-between text-xs">
                <span className="text-[#8C7A8F]">{article.publishedDate}</span>
                <button
                  onClick={() => onNavigate('article-detail', article.slug)}
                  className="font-semibold text-[#583256] hover:text-[#2A182C] flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section J: Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#3B223D] via-[#482A4A] to-[#3B223D] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Small Steps. Meaningful Change.
            </h2>
            <p className="text-sm sm:text-base text-[#E0D3E3] leading-relaxed">
              Explore our services, order our international study resources, or connect with The Behavior Canvas to begin your personalized supervision journey.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('resources')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-[#2A182C] bg-white hover:bg-[#F6EEF5] rounded-xl transition-all shadow-md active:scale-98 whitespace-nowrap"
              >
                Explore Digital Shop
              </button>
              <button
                onClick={() => onNavigate('service-detail', 'professional-mentoring-and-supervision')}
                className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-transparent hover:bg-white/10 border border-white/40 rounded-xl transition-all whitespace-nowrap"
              >
                Enquire for Supervision
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

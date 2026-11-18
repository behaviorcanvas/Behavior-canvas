import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { PlatformProvider, usePlatform } from './contexts/PlatformContext';
import { AdminBar } from './components/AdminBar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { CheckoutItem, CheckoutModal } from './components/CheckoutModal';
import { SampleNotesModal } from './components/SampleNotesModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { AcademyPage } from './pages/AcademyPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { WorkshopsPage } from './pages/WorkshopsPage';
import { ResearchPage } from './pages/ResearchPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';
import { VerifyCertificatePage } from './pages/VerifyCertificatePage';
import { StudentPortalPage } from './pages/StudentPortalPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductItem } from './data/products';
import { RoutePath, RouteState } from './types';

function resolveRouteFromLocation(): RouteState {
  try {
    const sp = new URLSearchParams(window.location.search);
    if (
      sp.has('admin') ||
      sp.get('page') === 'admin' ||
      sp.get('route') === 'admin' ||
      sp.get('portal') === 'true'
    ) {
      return { path: 'admin' };
    }
  } catch {
    // ignore malformed query string
  }

  const hashRaw = (window.location.hash || '').replace(/^#\/?/, '').trim();
  const pathRaw = (window.location.pathname || '').replace(/^\/+|\/+$/g, '').trim();
  const raw = hashRaw !== '' ? hashRaw : pathRaw;
  const clean = raw.split('?')[0].replace(/^\/+|\/+$/g, '').toLowerCase();

  if (!clean || clean === 'home' || clean === 'index.html') {
    return { path: 'home' };
  }

  if (clean === 'admin/login' || clean === 'admin-login') {
    return { path: 'admin-login' };
  }
  if (
    clean === 'admin' ||
    clean === 'admin/dashboard' ||
    clean.startsWith('admin/') ||
    clean === 'portal' ||
    clean === 'admin-portal' ||
    clean === 'dashboard'
  ) {
    return { path: 'admin' };
  }

  const parts = clean.split('/');
  const main = parts[0];
  const param = parts.slice(1).join('/') || undefined;

  switch (main) {
    case 'about':
      return { path: 'about' };
    case 'meet-the-founder':
      return { path: 'meet-the-founder' };
    case 'our-philosophy':
      return { path: 'our-philosophy' };
    case 'services':
      return param ? { path: 'service-detail', param } : { path: 'services' };
    case 'parent-training':
      return { path: 'parent-training' };
    case 'behaviour-consultation':
      return { path: 'behaviour-consultation' };
    case 'academy':
      return { path: 'academy' };
    case 'programmes':
      return param ? { path: 'programme-detail', param } : { path: 'programmes' };
    case 'workshops':
      return param ? { path: 'workshop-detail', param } : { path: 'workshops' };
    case 'resources':
      return param ? { path: 'product-detail', param } : { path: 'resources' };
    case 'research':
      return { path: 'research' };
    case 'articles':
      return param ? { path: 'article-detail', param } : { path: 'articles' };
    case 'faq':
      return { path: 'faq' };
    case 'contact':
      return { path: 'contact' };
    case 'verify-certificate':
      return { path: 'verify-certificate' };
    case 'student':
      return { path: 'student' };
    case 'privacy-policy':
      return { path: 'privacy-policy' };
    case 'terms-and-conditions':
      return { path: 'terms-and-conditions' };
    case 'refund-and-cancellation-policy':
      return { path: 'refund-and-cancellation-policy' };
    case 'professional-disclaimer':
      return { path: 'professional-disclaimer' };
    case 'educational-disclaimer':
      return { path: 'educational-disclaimer' };
    case 'digital-product-terms':
      return { path: 'digital-product-terms' };
    case 'copyright-policy':
      return { path: 'copyright-policy' };
    default:
      return { path: 'not-found' };
  }
}

function buildUrlForRoute(path: RoutePath, param?: string): string {
  switch (path) {
    case 'home':
      return '/';
    case 'service-detail':
      return param ? `/services/${param}` : '/services';
    case 'programme-detail':
      return param ? `/programmes/${param}` : '/programmes';
    case 'workshop-detail':
      return param ? `/workshops/${param}` : '/workshops';
    case 'product-detail':
      return param ? `/resources/${param}` : '/resources';
    case 'article-detail':
      return param ? `/articles/${param}` : '/articles';
    case 'admin-login':
      return '/admin/login';
    case 'admin':
      return '/admin/dashboard';
    default:
      return `/${path}`;
  }
}

const ROUTE_META: Partial<Record<RoutePath, { title: string; desc: string }>> = {
  home: {
    title: 'The Behavior Canvas — Academy of Behavioural Science',
    desc: 'Understanding behaviour and creating meaningful change through behavioural science education, compassionate support, workshops, and clinical research.',
  },
  about: {
    title: 'About Us — The Behavior Canvas',
    desc: 'Our mission, ethics, and approach to accessible behavioural science education across families, students, educators, and clinicians.',
  },
  'meet-the-founder': {
    title: 'Meet the Founder: Reema Singh — The Behavior Canvas',
    desc: 'Reema Singh — Founder & Director, QASP-S (QABA, USA), Behaviour Analyst, Clinical Psychology Researcher & Special Educator.',
  },
  'our-philosophy': {
    title: 'Our Philosophy — The Behavior Canvas',
    desc: 'Behaviour is more than what we see: dignity, autonomy, learner assent, science with compassion, and individualised support.',
  },
  services: {
    title: 'Behavioural Services — The Behavior Canvas',
    desc: 'Behaviour consultation, parent guidance and training, inclusive educational support, and online behavioural consultation.',
  },
  'parent-training': {
    title: 'Parent Education & Training — The Behavior Canvas',
    desc: 'Skill-building caregiver training in positive reinforcement, functional communication, and calm household routines.',
  },
  'behaviour-consultation': {
    title: 'Behaviour Consultation — The Behavior Canvas',
    desc: 'Structured assessment-informed consultations uncovering behavioral functions and building humane positive support strategies.',
  },
  academy: {
    title: 'Academy of Behavioural Science — The Behavior Canvas',
    desc: 'Structured courses, skill development programmes, and masterclasses across foundational ABA, FBA, PBS, FCT, and ethics.',
  },
  programmes: {
    title: 'All Academy Programmes — The Behavior Canvas',
    desc: 'Browse open and upcoming programmes at The Behavior Canvas – Academy of Behavioural Science.',
  },
  workshops: {
    title: 'Workshops & Masterclasses — The Behavior Canvas',
    desc: 'Interactive online workshops and institutional trainings in applied behavioural science and inclusive education.',
  },
  resources: {
    title: 'Learning Resources & Study Guides — The Behavior Canvas',
    desc: 'Evidence-informed ABA Notes, Cheat Sheets, Scenario Question Banks, and digital workbooks with instant access.',
  },
  research: {
    title: 'Research & Publications — The Behavior Canvas',
    desc: 'Academic dialogue, clinical psychology research interests, and scholarly publications.',
  },
  articles: {
    title: 'Research & Blog — The Behavior Canvas',
    desc: 'Educational articles and evidence-based reflections on behaviour analysis, neurodiversity, and assent.',
  },
  'verify-certificate': {
    title: 'Certificate Verification — The Behavior Canvas',
    desc: 'Verify official Participation and Completion certificates issued by The Behavior Canvas Academy.',
  },
  student: {
    title: 'Learner Portal — The Behavior Canvas',
    desc: 'Access your enrolled Academy programmes, digital study downloads, and certificates.',
  },
  contact: {
    title: 'Contact Us — The Behavior Canvas',
    desc: 'Reach out to The Behavior Canvas at info@behaviorcanvas.com for consultation, training, or academy enquiries.',
  },
  faq: {
    title: 'Frequently Asked Questions — The Behavior Canvas',
    desc: 'Answers on services, Academy programmes, workshops, digital resources, and ethical governance.',
  },
  'admin-login': {
    title: 'Admin Sign In — The Behavior Canvas',
    desc: 'Authorised administrator login for The Behavior Canvas.',
  },
  admin: {
    title: 'Admin Console — The Behavior Canvas',
    desc: 'Private management console for The Behavior Canvas.',
  },
};

const AppShell: React.FC = () => {
  const { siteSettings } = usePlatform();
  const [routeState, setRouteState] = useState<RouteState>(() => resolveRouteFromLocation());
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCategory, setEnquiryCategory] = useState('General Guidance');
  const [enquirySubject, setEnquirySubject] = useState('');

  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [previewProduct, setPreviewProduct] = useState<ProductItem | null>(null);
  const [isSampleOpen, setIsSampleOpen] = useState(false);

  const navigateTo = (path: RoutePath, param?: string) => {
    const nextUrl = buildUrlForRoute(path, param);
    try {
      window.history.pushState({}, '', nextUrl);
    } catch {
      window.location.hash = nextUrl;
    }
    setRouteState({ path, param });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onPopOrHash = () => {
      setRouteState(resolveRouteFromLocation());
    };
    window.addEventListener('popstate', onPopOrHash);
    window.addEventListener('hashchange', onPopOrHash);
    return () => {
      window.removeEventListener('popstate', onPopOrHash);
      window.removeEventListener('hashchange', onPopOrHash);
    };
  }, []);

  // Global keyboard shortcuts: Cmd/Ctrl+K Search, Cmd/Ctrl+Shift+A Private Admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigateTo('admin');
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dynamic per-route SEO title & description
  useEffect(() => {
    const meta = ROUTE_META[routeState.path];
    document.title = meta?.title || siteSettings.seoTitle;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta?.desc || siteSettings.seoDescription);
    }
  }, [routeState.path, siteSettings.seoTitle, siteSettings.seoDescription]);

  const handleOpenEnquiry = (category?: string, subject?: string) => {
    setEnquiryCategory(category || 'General Guidance');
    setEnquirySubject(subject || '');
    setIsEnquiryOpen(true);
  };

  const handleSelectProduct = (product: ProductItem) => {
    setCheckoutItem(null);
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutItem = (item: CheckoutItem) => {
    setSelectedProduct(null);
    setCheckoutItem(item);
    setIsCheckoutOpen(true);
  };

  const handlePreviewProduct = (product: ProductItem) => {
    setPreviewProduct(product);
    setIsSampleOpen(true);
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  const isAdminRoute = routeState.path === 'admin' || routeState.path === 'admin-login';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EF] text-[#514458] selection:bg-[#F4E4ED] selection:text-[#514458]">
      {!isAdminRoute && (
        <>
          <AdminBar currentRoute={routeState.path} onNavigate={navigateTo} />
          <AnnouncementBar currency={currency} onCurrencyToggle={handleToggleCurrency} />
          <Navbar
            currentRoute={routeState.path}
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenSearch={() => setIsSearchOpen(true)}
            currency={currency}
            onCurrencyToggle={handleToggleCurrency}
          />
        </>
      )}

      <main className="flex-1">
        {routeState.path === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onOpenSearch={() => setIsSearchOpen(true)}
            onSelectProduct={handleSelectProduct}
            onPreviewProduct={handlePreviewProduct}
            currency={currency}
          />
        )}

        {(routeState.path === 'about' ||
          routeState.path === 'meet-the-founder' ||
          routeState.path === 'our-philosophy') && (
          <AboutPage
            mode={routeState.path}
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {(routeState.path === 'services' || routeState.path === 'service-detail') && (
          <ServicesPage
            selectedSlug={routeState.param}
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {routeState.path === 'parent-training' && (
          <ServicesPage
            selectedSlug="parent-guidance-and-training"
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {routeState.path === 'behaviour-consultation' && (
          <ServicesPage
            selectedSlug="behavior-consultation"
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {(routeState.path === 'academy' ||
          routeState.path === 'programmes' ||
          routeState.path === 'programme-detail') && (
          <AcademyPage
            mode={routeState.path}
            selectedSlug={routeState.param}
            currency={currency}
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onCheckoutItem={handleCheckoutItem}
          />
        )}

        {(routeState.path === 'workshops' || routeState.path === 'workshop-detail') && (
          <WorkshopsPage
            selectedSlug={routeState.param}
            currency={currency}
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onCheckoutItem={handleCheckoutItem}
          />
        )}

        {(routeState.path === 'resources' || routeState.path === 'product-detail') && (
          <ResourcesPage
            selectedSlug={routeState.param}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onPreviewProduct={handlePreviewProduct}
            currency={currency}
            onCurrencyToggle={handleToggleCurrency}
          />
        )}

        {routeState.path === 'research' && (
          <ResearchPage onNavigate={navigateTo} onOpenEnquiry={handleOpenEnquiry} />
        )}

        {(routeState.path === 'articles' || routeState.path === 'article-detail') && (
          <ArticlesPage
            selectedSlug={routeState.param}
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {routeState.path === 'faq' && (
          <FaqPage onNavigate={navigateTo} onOpenEnquiry={handleOpenEnquiry} />
        )}

        {routeState.path === 'contact' && <ContactPage onNavigate={navigateTo} />}

        {routeState.path === 'verify-certificate' && <VerifyCertificatePage />}

        {routeState.path === 'student' && <StudentPortalPage onNavigate={navigateTo} />}

        {(routeState.path === 'privacy-policy' ||
          routeState.path === 'terms-and-conditions' ||
          routeState.path === 'refund-and-cancellation-policy' ||
          routeState.path === 'professional-disclaimer' ||
          routeState.path === 'educational-disclaimer' ||
          routeState.path === 'digital-product-terms' ||
          routeState.path === 'copyright-policy') && (
          <PolicyPage policySlug={routeState.path} onNavigate={navigateTo} />
        )}

        {routeState.path === 'admin-login' && (
          <AdminPage mode="login" onNavigate={navigateTo} />
        )}

        {routeState.path === 'admin' && (
          <AdminPage mode="dashboard" onNavigate={navigateTo} />
        )}

        {routeState.path === 'not-found' && <NotFoundPage onNavigate={navigateTo} />}
      </main>

      {!isAdminRoute && (
        <>
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onPreviewProduct={handlePreviewProduct}
            onOpenEnquiry={handleOpenEnquiry}
            currency={currency}
          />

          <EnquiryModal
            isOpen={isEnquiryOpen}
            onClose={() => setIsEnquiryOpen(false)}
            defaultCategory={enquiryCategory}
            defaultSubject={enquirySubject}
          />

          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            product={selectedProduct}
            checkoutItem={checkoutItem}
            currency={currency}
            onCurrencyChange={setCurrency}
          />

          <SampleNotesModal
            isOpen={isSampleOpen}
            onClose={() => setIsSampleOpen(false)}
            product={previewProduct}
            onProceedToCheckout={handleSelectProduct}
            currency={currency}
          />

          <Footer onNavigate={navigateTo} onOpenEnquiry={handleOpenEnquiry} />

          <GeminiChatbot onNavigate={navigateTo} onOpenEnquiry={handleOpenEnquiry} />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <PlatformProvider>
          <AppShell />
        </PlatformProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

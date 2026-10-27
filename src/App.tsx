import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { CheckoutModal } from './components/CheckoutModal';
import { GeminiChatbot } from './components/GeminiChatbot';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { WorkshopsPage } from './pages/WorkshopsPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductItem } from './data/products';
import { RoutePath, RouteState } from './types';

export default function App() {
  const [routeState, setRouteState] = useState<RouteState>({ path: 'home' });

  // International currency state (defaults to USD for global candidates, toggles to INR)
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  // Enquiry Modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryCategory, setEnquiryCategory] = useState<string>('General Guidance');
  const [enquirySubject, setEnquirySubject] = useState<string>('');

  // Checkout Modal state
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Parse hash to route state on mount and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === '') {
        setRouteState({ path: 'home' });
        return;
      }

      const parts = hash.split('/');
      const mainPath = parts[0];
      const param = parts[1];

      if (mainPath === 'about') setRouteState({ path: 'about' });
      else if (mainPath === 'services') {
        if (param) setRouteState({ path: 'service-detail', param });
        else setRouteState({ path: 'services' });
      } else if (mainPath === 'resources') {
        if (param) setRouteState({ path: 'product-detail', param });
        else setRouteState({ path: 'resources' });
      } else if (mainPath === 'workshops') setRouteState({ path: 'workshops' });
      else if (mainPath === 'articles') {
        if (param) setRouteState({ path: 'article-detail', param });
        else setRouteState({ path: 'articles' });
      } else if (mainPath === 'faq') setRouteState({ path: 'faq' });
      else if (mainPath === 'contact') setRouteState({ path: 'contact' });
      else if (mainPath === 'privacy-policy') setRouteState({ path: 'privacy-policy' });
      else if (mainPath === 'terms-and-conditions') setRouteState({ path: 'terms-and-conditions' });
      else if (mainPath === 'refund-and-cancellation-policy') setRouteState({ path: 'refund-and-cancellation-policy' });
      else if (mainPath === 'professional-disclaimer') setRouteState({ path: 'professional-disclaimer' });
      else if (mainPath === 'copyright-policy') setRouteState({ path: 'copyright-policy' });
      else setRouteState({ path: 'not-found' });
    };

    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const navigateTo = (path: RoutePath, param?: string) => {
    let hashTarget = path;
    if (path === 'service-detail' && param) hashTarget = `services/${param}` as any;
    else if (path === 'product-detail' && param) hashTarget = `resources/${param}` as any;
    else if (path === 'article-detail' && param) hashTarget = `articles/${param}` as any;
    else if (path === 'home') hashTarget = '' as any;

    window.location.hash = hashTarget;
    setRouteState({ path, param });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = (category?: string, subject?: string) => {
    setEnquiryCategory(category || 'General Guidance');
    setEnquirySubject(subject || '');
    setIsEnquiryOpen(true);
  };

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    setIsCheckoutOpen(true);
  };

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'INR' : 'USD'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F9] text-[#221824] selection:bg-[#EBDDE9] selection:text-[#3B223D]">
      {/* Top Banner with International & Multi-currency notice */}
      <div className="bg-[#583256] text-[#F3EBF2] text-[11px] py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span>The Behavior Canvas · International Behavior Science Study Resources, Remote Supervision & Parent Guidance Across All Time Zones</span>
      </div>

      {/* Main Navigation (Uploaded logo strictly integrated in Zone 1) */}
      <Navbar
        currentRoute={routeState.path}
        onNavigate={navigateTo}
        onOpenEnquiry={handleOpenEnquiry}
        currency={currency}
        onCurrencyToggle={handleToggleCurrency}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {routeState.path === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
            onSelectProduct={handleSelectProduct}
            currency={currency}
          />
        )}

        {routeState.path === 'about' && (
          <AboutPage
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

        {(routeState.path === 'resources' || routeState.path === 'product-detail') && (
          <ResourcesPage
            selectedSlug={routeState.param}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            currency={currency}
            onCurrencyToggle={handleToggleCurrency}
          />
        )}

        {routeState.path === 'workshops' && (
          <WorkshopsPage
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {(routeState.path === 'articles' || routeState.path === 'article-detail') && (
          <ArticlesPage
            selectedSlug={routeState.param}
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {routeState.path === 'faq' && (
          <FaqPage
            onNavigate={navigateTo}
            onOpenEnquiry={handleOpenEnquiry}
          />
        )}

        {routeState.path === 'contact' && (
          <ContactPage
            onNavigate={navigateTo}
          />
        )}

        {routeState.path === 'privacy-policy' && (
          <PolicyPage
            policySlug="privacy-policy"
            onNavigate={navigateTo}
          />
        )}

        {routeState.path === 'terms-and-conditions' && (
          <PolicyPage
            policySlug="terms-and-conditions"
            onNavigate={navigateTo}
          />
        )}

        {routeState.path === 'refund-and-cancellation-policy' && (
          <PolicyPage
            policySlug="refund-and-cancellation-policy"
            onNavigate={navigateTo}
          />
        )}

        {routeState.path === 'professional-disclaimer' && (
          <PolicyPage
            policySlug="professional-disclaimer"
            onNavigate={navigateTo}
          />
        )}

        {routeState.path === 'copyright-policy' && (
          <PolicyPage
            policySlug="copyright-policy"
            onNavigate={navigateTo}
          />
        )}

        {routeState.path === 'not-found' && (
          <NotFoundPage
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Global Interactive Enquiry Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultCategory={enquiryCategory}
        defaultSubject={enquirySubject}
      />

      {/* Global Digital Store Checkout Modal (International Gateways & Multi-Currency) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        product={selectedProduct}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Global AI Behavior & Supervision Chat Advisor */}
      <GeminiChatbot
        onNavigate={navigateTo}
        onOpenEnquiry={handleOpenEnquiry}
      />
    </div>
  );
}

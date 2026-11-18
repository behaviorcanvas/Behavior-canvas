import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Award,
  Calendar,
  ClipboardList,
  CreditCard,
  Database,
  ExternalLink,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  LayoutDashboard,
  Lock,
  LogIn,
  LogOut,
  Mail,
  MessageSquareQuote,
  Microscope,
  Plus,
  RefreshCw,
  Save,
  Settings,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { usePlatform } from '../contexts/PlatformContext';
import { ACADEMY_CATEGORIES } from '../data/programmes';
import { brandConfig } from '../data/brand';
import {
  CertificateRecord,
  CmsPageDoc,
  CmsSectionBlock,
  CouponDoc,
  EnquiryRecord,
  MediaAssetDoc,
  OrderRecord,
  ProgrammeItem,
  ResearchItem,
  RoutePath,
  SiteSettingsDoc,
  TestimonialDoc,
} from '../types';
import { ServiceItem } from '../data/services';
import { WorkshopItem } from '../data/workshops';
import { ProductItem } from '../data/products';
import { ArticleItem } from '../data/articles';

interface AdminPageProps {
  mode?: 'login' | 'dashboard';
  onNavigate: (route: RoutePath, param?: string) => void;
}

type AdminTab =
  | 'overview'
  | 'pages'
  | 'services'
  | 'programmes'
  | 'workshops'
  | 'products'
  | 'orders'
  | 'coupons'
  | 'enrolments'
  | 'certificates'
  | 'articles'
  | 'research'
  | 'testimonials'
  | 'media'
  | 'enquiries'
  | 'payments'
  | 'settings'
  | 'audit';

export const AdminPage: React.FC<AdminPageProps> = ({
  mode = 'dashboard',
  onNavigate,
}) => {
  const { user, authReady, isAdmin, isVerifiedUser, signInWithGoogle, logout } = useAuth();
  const {
    siteSettings,
    cmsPages,
    services,
    programmes,
    workshops,
    products,
    articles,
    research,
    testimonials,
    coupons,
    paymentConfigs,
    enquiries,
    orders,
    enrolments,
    certificates,
    mediaAssets,
    auditLogs,
    admins,
    adminEditTarget,
    clearAdminEdit,
    saveSiteSettings,
    saveCmsPage,
    saveCollectionItem,
    deleteCollectionItem,
    updateEnquiryAdmin,
    updateOrderAdmin,
    seedInitialCloudCatalogue,
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [focusedPageId, setFocusedPageId] = useState<string>('home');
  const [focusedSectionId, setFocusedSectionId] = useState<string | undefined>(undefined);
  const [statusBanner, setStatusBanner] = useState<{ type: 'ok' | 'err'; text: string } | null>(
    null
  );
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (adminEditTarget) {
      setActiveTab((adminEditTarget.tab as AdminTab) || 'overview');
      if (adminEditTarget.pageId) setFocusedPageId(adminEditTarget.pageId);
      setFocusedSectionId(adminEditTarget.sectionId);
      clearAdminEdit();
    }
  }, [adminEditTarget, clearAdminEdit]);

  const notify = (type: 'ok' | 'err', text: string) => {
    setStatusBanner({ type, text });
    window.setTimeout(() => setStatusBanner(null), 6000);
  };

  // ==================== AUTHENTICATION & ACCESS GATE ====================
  if (!authReady) {
    return (
      <div className="min-h-[80vh] bg-[#F8F5EF] flex items-center justify-center p-6">
        <div className="bg-white border border-[#E6DCE6] rounded-3xl p-8 text-center max-w-md w-full shadow-xs">
          <div className="w-10 h-10 rounded-full border-2 border-[#514458] border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-sm font-medium text-[#514458]">
            Verifying administrator credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[85vh] bg-[#F8F5EF] flex items-center justify-center p-4">
        <div className="bg-white border border-[#E6DCE6] rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#F4E4ED] text-[#514458] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6474] block">
                Private Administration
              </span>
              <h1 className="font-serif text-2xl text-[#514458]">
                The Behavior Canvas Console
              </h1>
            </div>
          </div>

          <p className="text-sm text-[#6E6474] leading-relaxed">
            This management portal is strictly restricted to authorised administrators of{' '}
            <strong className="text-[#514458]">The Behavior Canvas</strong>. Public visitors do not
            have access to CMS pages, student enrolments, orders, or enquiries.
          </p>

          <button
            onClick={async () => {
              try {
                await signInWithGoogle();
              } catch (err: any) {
                notify('err', err?.message || 'Unable to sign in with Google.');
              }
            }}
            className="w-full py-3.5 px-5 rounded-xl bg-[#514458] hover:bg-[#3E3344] text-white text-sm font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-xs"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign in with Authorised Google Account</span>
          </button>

          {statusBanner && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              {statusBanner.text}
            </div>
          )}

          <div className="pt-4 border-t border-[#EEE6EE] flex items-center justify-between text-xs text-[#6E6474]">
            <span>Owner: {brandConfig.email}</span>
            <button
              onClick={() => onNavigate('home')}
              className="font-semibold text-[#514458] hover:underline"
            >
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isVerifiedUser || !isAdmin) {
    return (
      <div className="min-h-[85vh] bg-[#F8F5EF] flex items-center justify-center p-4">
        <div className="bg-white border border-rose-200 rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-sm space-y-5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl text-[#514458]">
            Administrator Access Denied
          </h1>
          <p className="text-sm text-[#6E6474] leading-relaxed">
            You are signed in as <strong className="text-[#514458]">{user.email}</strong>, which
            does not hold administrator privileges for The Behavior Canvas.
          </p>
          <p className="text-xs text-[#6E6474] bg-[#F8F5EF] p-3 rounded-xl border border-[#E6DCE6]">
            If you are a learner accessing your Academy courses or digital downloads, please visit the{' '}
            <button
              onClick={() => onNavigate('student')}
              className="font-semibold text-[#514458] underline"
            >
              Student Portal
            </button>
            . Otherwise, sign out and log in with <span className="font-mono">{brandConfig.email}</span>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => logout()}
              className="px-5 py-2.5 rounded-xl bg-[#514458] text-white text-xs font-semibold flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-5 py-2.5 rounded-xl bg-white border border-[#E6DCE6] text-[#514458] text-xs font-semibold"
            >
              Return to Public Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If mode === 'login' and user is already verified admin, offer immediate portal access or render dashboard directly
  const sidebarItems: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'overview', label: 'Overview & Sync', icon: LayoutDashboard },
    { id: 'pages', label: 'CMS & Founder Pages', icon: Layers },
    { id: 'services', label: 'Behavioural Services', icon: Activity },
    { id: 'programmes', label: 'Academy Programmes', icon: GraduationCap },
    { id: 'workshops', label: 'Workshops & Events', icon: Calendar },
    { id: 'products', label: 'Resources & PDFs', icon: ShoppingBag },
    { id: 'orders', label: 'Orders & Refunds', icon: CreditCard },
    { id: 'coupons', label: 'Coupons & Discounts', icon: Tag },
    { id: 'enrolments', label: 'Student Enrolments', icon: Users },
    { id: 'certificates', label: 'Certificates Registry', icon: Award },
    { id: 'articles', label: 'Blog & Articles', icon: FileText },
    { id: 'research', label: 'Research & Papers', icon: Microscope },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'enquiries', label: 'Enquiries Inbox', icon: Mail },
    { id: 'payments', label: 'Payment Gateways', icon: ShieldCheck },
    { id: 'settings', label: 'SEO & Site Settings', icon: Settings },
    { id: 'audit', label: 'Admins & Audit Logs', icon: ClipboardList },
  ];

  const handleCloudSeed = async () => {
    setBusy(true);
    try {
      await seedInitialCloudCatalogue();
      notify(
        'ok',
        'Default catalogue, CMS pages, services, programmes, workshops, resources, research, coupons, and gateway settings synchronised to Cloud Firestore.'
      );
    } catch (err: any) {
      notify('err', err?.message || 'Failed to sync default dataset to Cloud Firestore.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#514458] flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-white border-b border-[#E6DCE6] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img
            src={brandConfig.logoPath}
            alt="The Behavior Canvas Logo"
            className="w-9 h-9 rounded-full object-cover border border-[#E6DCE6]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-medium text-[#514458]">
                The Behavior Canvas — Admin Studio
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E9E1F4] text-[#514458]">
                {mode === 'login' ? 'Authenticated' : 'Private Console'}
              </span>
            </div>
            <p className="text-[11px] text-[#6E6474]">
              Signed in as {user.email} · Real-Time Cloud Firestore Sync
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('home')}
            className="px-3.5 py-2 rounded-xl bg-[#F4E4ED] hover:bg-[#E9E1F4] text-[#514458] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </button>
          <button
            onClick={async () => {
              await logout();
              onNavigate('home');
            }}
            className="px-3.5 py-2 rounded-xl border border-[#E6DCE6] hover:bg-[#F8F5EF] text-[#514458] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {statusBanner && (
        <div className="px-4 sm:px-6 pt-4">
          <div
            className={`max-w-7xl mx-auto px-4 py-3 rounded-2xl border text-xs font-medium flex items-center justify-between ${
              statusBanner.type === 'ok'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <span>{statusBanner.text}</span>
            <button onClick={() => setStatusBanner(null)} className="font-bold ml-4">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Workspace Body */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white border border-[#E6DCE6] rounded-3xl p-3 space-y-1 lg:sticky lg:top-20 overflow-x-auto lg:overflow-visible flex lg:flex-col gap-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors text-left ${
                    active
                      ? 'bg-[#514458] text-white'
                      : 'text-[#6E6474] hover:bg-[#F4E4ED]/60 hover:text-[#514458]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Panel */}
        <section className="flex-1 min-w-0 space-y-6">
          {activeTab === 'overview' && (
            <OverviewPanel
              programmesCount={programmes.length}
              workshopsCount={workshops.length}
              productsCount={products.length}
              servicesCount={services.length}
              enquiriesCount={enquiries.length}
              newEnquiriesCount={enquiries.filter((e) => e.status === 'new').length}
              ordersCount={orders.length}
              certificatesCount={certificates.length}
              recentEnquiries={enquiries.slice(0, 5)}
              recentOrders={orders.slice(0, 5)}
              busy={busy}
              onSeed={handleCloudSeed}
              onSelectTab={setActiveTab}
            />
          )}

          {activeTab === 'pages' && (
            <CmsPagesPanel
              cmsPages={cmsPages}
              initialPageId={focusedPageId}
              initialSectionId={focusedSectionId}
              onSavePage={async (page) => {
                await saveCmsPage(page);
                notify('ok', `Page "${page.title}" saved (${page.status}).`);
              }}
            />
          )}

          {activeTab === 'services' && (
            <ServicesManager
              items={services}
              onSave={async (id, data) => {
                await saveCollectionItem('services', id, data, `Saved service: ${data.title}`);
                notify('ok', `Service "${data.title}" saved to Firestore.`);
              }}
              onDelete={async (id) => {
                await deleteCollectionItem('services', id);
                notify('ok', 'Service deleted.');
              }}
            />
          )}

          {activeTab === 'programmes' && (
            <ProgrammesManager
              items={programmes}
              onSave={async (id, data) => {
                await saveCollectionItem('programmes', id, data, `Saved programme: ${data.title}`);
                notify('ok', `Programme "${data.title}" saved to Firestore.`);
              }}
              onDelete={async (id) => {
                await deleteCollectionItem('programmes', id);
                notify('ok', 'Programme deleted.');
              }}
            />
          )}

          {activeTab === 'workshops' && (
            <WorkshopsManager
              items={workshops}
              onSave={async (id, data) => {
                await saveCollectionItem('workshops', id, data, `Saved workshop: ${data.title}`);
                notify('ok', `Workshop "${data.title}" saved to Firestore.`);
              }}
              onDelete={async (id) => {
                await deleteCollectionItem('workshops', id);
                notify('ok', 'Workshop deleted.');
              }}
            />
          )}

          {activeTab === 'products' && (
            <ProductsManager
              items={products}
              onSave={async (id, data) => {
                await saveCollectionItem('products', id, data, `Saved resource: ${data.title}`);
                notify('ok', `Resource "${data.title}" saved to Firestore.`);
              }}
              onDelete={async (id) => {
                await deleteCollectionItem('products', id);
                notify('ok', 'Resource deleted.');
              }}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersManager
              orders={orders}
              onUpdateOrder={async (id, updates, label) => {
                await updateOrderAdmin(id, updates, label);
                notify('ok', label || 'Order updated.');
              }}
              onError={(msg) => notify('err', msg)}
            />
          )}

          {activeTab === 'coupons' && (
            <CouponsManager
              coupons={coupons}
              onSave={async (code, data) => {
                await saveCollectionItem('coupons', code, data, `Saved coupon ${code}`);
                notify('ok', `Coupon ${code} saved.`);
              }}
              onDelete={async (code) => {
                await deleteCollectionItem('coupons', code);
                notify('ok', `Coupon ${code} deleted.`);
              }}
            />
          )}

          {activeTab === 'enrolments' && (
            <EnrolmentsManager
              enrolments={enrolments}
              onUpdate={async (id, data) => {
                await saveCollectionItem('enrolments', id, data, `Updated enrolment ${id}`);
                notify('ok', 'Learner enrolment updated.');
              }}
            />
          )}

          {activeTab === 'certificates' && (
            <CertificatesManager
              certificates={certificates}
              onSave={async (certId, data) => {
                await saveCollectionItem(
                  'certificates',
                  certId,
                  data,
                  `Saved certificate ${certId}`
                );
                notify('ok', `Certificate ${certId} saved.`);
              }}
              onDelete={async (id) => {
                await deleteCollectionItem('certificates', id);
                notify('ok', 'Certificate removed.');
              }}
            />
          )}

          {activeTab === 'articles' && (
            <ArticlesManager
              articles={articles}
              onSave={async (id, data) => {
                await saveCollectionItem('articles', id, data, `Saved article: ${data.title}`);
                notify('ok', `Article "${data.title}" saved.`);
              }}
              onDelete={async (id) => {
                await deleteCollectionItem('articles', id);
                notify('ok', 'Article deleted.');
              }}
            />
          )}

          {activeTab === 'research' && (
            <ResearchManager
              items={research}
              onSave={async (id, data) => {
                await saveCollectionItem('research', id, data, `Saved research: ${data.title}`);
                notify('ok', `Research entry "${data.title}" saved.`);
              }}
              onDelete={async (id) => {
                await deleteCollectionItem('research', id);
                notify('ok', 'Research entry deleted.');
              }}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsManager
              items={testimonials}
              onSave={async (id, data) => {
                await saveCollectionItem(
                  'testimonials',
                  id,
                  data,
                  `Saved testimonial: ${data.name}`
                );
                notify('ok', `Testimonial from "${data.name}" saved.`);
              }}
              onDelete={async (id) => {
                await deleteCollectionItem('testimonials', id);
                notify('ok', 'Testimonial removed.');
              }}
            />
          )}

          {activeTab === 'media' && (
            <MediaManager
              items={mediaAssets}
              userEmail={user.email || brandConfig.email}
              onSave={async (id, data) => {
                await saveCollectionItem('media', id, data, `Uploaded media: ${data.title}`);
                notify('ok', `Media "${data.title}" saved.`);
              }}
              onDelete={async (id) => {
                await deleteCollectionItem('media', id);
                notify('ok', 'Media item deleted.');
              }}
              onError={(msg) => notify('err', msg)}
            />
          )}

          {activeTab === 'enquiries' && (
            <EnquiriesManager
              enquiries={enquiries}
              onUpdate={async (id, updates) => {
                await updateEnquiryAdmin(id, updates);
                notify('ok', 'Enquiry record updated.');
              }}
              onDelete={async (id) => {
                await deleteCollectionItem('enquiries', id);
                notify('ok', 'Enquiry deleted.');
              }}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentSettingsManager
              siteSettings={siteSettings}
              paymentConfigs={paymentConfigs}
              onSaveSettings={async (next) => {
                await saveSiteSettings(next);
                notify('ok', 'Payment gateway settings saved to Firestore.');
              }}
              onSaveGatewayConfig={async (id, data) => {
                await saveCollectionItem(
                  'paymentConfigs',
                  id,
                  data,
                  `Updated gateway config: ${id}`
                );
                notify('ok', `Gateway "${id}" configuration saved.`);
              }}
              onError={(msg) => notify('err', msg)}
            />
          )}

          {activeTab === 'settings' && (
            <SiteSettingsManager
              siteSettings={siteSettings}
              onSave={async (next) => {
                await saveSiteSettings(next);
                notify('ok', 'Website settings & SEO metadata saved.');
              }}
            />
          )}

          {activeTab === 'audit' && (
            <AuditAndAdminsPanel
              admins={admins}
              auditLogs={auditLogs}
              onAddAdmin={async (uid, email, name, role) => {
                await saveCollectionItem(
                  'admins',
                  uid,
                  {
                    uid: uid.trim(),
                    email: email.trim(),
                    ...(name.trim() ? { name: name.trim() } : {}),
                    role,
                    createdAt: new Date().toISOString(),
                  },
                  `Added authorised admin ${email}`
                );
                notify('ok', `Admin UID ${uid} authorised.`);
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
};

// ==================== SUB-PANELS ====================

const OverviewPanel: React.FC<{
  programmesCount: number;
  workshopsCount: number;
  productsCount: number;
  servicesCount: number;
  enquiriesCount: number;
  newEnquiriesCount: number;
  ordersCount: number;
  certificatesCount: number;
  recentEnquiries: EnquiryRecord[];
  recentOrders: OrderRecord[];
  busy: boolean;
  onSeed: () => Promise<void>;
  onSelectTab: (tab: AdminTab) => void;
}> = ({
  programmesCount,
  workshopsCount,
  productsCount,
  servicesCount,
  enquiriesCount,
  newEnquiriesCount,
  ordersCount,
  certificatesCount,
  recentEnquiries,
  recentOrders,
  busy,
  onSeed,
  onSelectTab,
}) => {
  const stats = [
    { label: 'Academy Programmes', value: programmesCount, tab: 'programmes' as AdminTab },
    { label: 'Workshops & Events', value: workshopsCount, tab: 'workshops' as AdminTab },
    { label: 'Resources & PDFs', value: productsCount, tab: 'products' as AdminTab },
    { label: 'Behavioural Services', value: servicesCount, tab: 'services' as AdminTab },
    { label: `Enquiries (${newEnquiriesCount} New)`, value: enquiriesCount, tab: 'enquiries' as AdminTab },
    { label: 'Orders & Enrolments', value: ordersCount, tab: 'orders' as AdminTab },
    { label: 'Issued Certificates', value: certificatesCount, tab: 'certificates' as AdminTab },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6474]">
            Workspace Overview
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#514458]">
            Welcome back, Reema Singh
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6474] max-w-2xl leading-relaxed">
            Manage CMS pages, Academy programmes, workshops, downloadable PDFs & e-books, flexible
            payment gateways (Razorpay, Stripe, UPI), certificates, and student enrolments from one
            place.
          </p>
        </div>
        <button
          onClick={onSeed}
          disabled={busy}
          className="px-4 py-3 rounded-xl bg-[#514458] hover:bg-[#3E3344] disabled:opacity-60 text-white text-xs font-semibold flex items-center gap-2 shrink-0 transition-colors"
        >
          <Database className="w-4 h-4" />
          <span>{busy ? 'Syncing to Cloud...' : 'Sync Default Data to Cloud Firestore'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((st) => (
          <button
            key={st.label}
            onClick={() => onSelectTab(st.tab)}
            className="bg-white border border-[#E6DCE6] rounded-2xl p-5 text-left hover:border-[#514458]/40 transition-colors"
          >
            <div className="text-2xl font-serif text-[#514458]">{st.value}</div>
            <div className="text-xs font-medium text-[#6E6474] mt-1">{st.label}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-[#514458]">Recent Enquiries</h3>
            <button
              onClick={() => onSelectTab('enquiries')}
              className="text-xs font-semibold text-[#514458] hover:underline"
            >
              Open Inbox
            </button>
          </div>
          {recentEnquiries.length === 0 ? (
            <p className="text-xs text-[#6E6474] py-4">No enquiries recorded in Firestore yet.</p>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((e) => (
                <div
                  key={e.id}
                  className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-[#514458]">
                      {e.name} · <span className="font-normal text-[#6E6474]">{e.category}</span>
                    </div>
                    <p className="text-xs text-[#6E6474] line-clamp-1 mt-0.5">{e.message}</p>
                  </div>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white border border-[#E6DCE6]">
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-[#514458]">Recent Orders</h3>
            <button
              onClick={() => onSelectTab('orders')}
              className="text-xs font-semibold text-[#514458] hover:underline"
            >
              Manage Orders
            </button>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-xs text-[#6E6474] py-4">No orders placed in Firestore yet.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-[#514458]">{o.itemTitle}</div>
                    <div className="text-[11px] text-[#6E6474]">
                      {o.customerEmail} · {o.orderCode}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#514458]">
                      {o.currency} {o.amount}
                    </div>
                    <span className="text-[10px] font-semibold uppercase text-[#6E6474]">
                      {o.paymentStatus}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. CMS Pages Editor (Homepage, About Us, Meet the Founder, Our Philosophy)
const CmsPagesPanel: React.FC<{
  cmsPages: Record<string, CmsPageDoc>;
  initialPageId?: string;
  initialSectionId?: string;
  onSavePage: (page: CmsPageDoc) => Promise<void>;
}> = ({ cmsPages, initialPageId = 'home', initialSectionId, onSavePage }) => {
  type EditablePageId = 'home' | 'about' | 'meet-the-founder' | 'our-philosophy';
  const pageOptions: { id: EditablePageId; label: string }[] = [
    { id: 'home', label: 'Homepage' },
    { id: 'about', label: 'About Us' },
    { id: 'meet-the-founder', label: 'Meet the Founder' },
    { id: 'our-philosophy', label: 'Our Philosophy' },
  ];

  const validInitial: EditablePageId = pageOptions.some((o) => o.id === initialPageId)
    ? (initialPageId as EditablePageId)
    : 'home';

  const [selectedPageId, setSelectedPageId] = useState<EditablePageId>(validInitial);
  const [draft, setDraft] = useState<CmsPageDoc>(() => cmsPages[validInitial] || {
    id: validInitial,
    slug: validInitial,
    title: validInitial,
    sections: [],
    status: 'published',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (pageOptions.some((o) => o.id === initialPageId)) {
      const pid = initialPageId as EditablePageId;
      setSelectedPageId(pid);
      if (cmsPages[pid]) setDraft(cmsPages[pid]);
    }
  }, [initialPageId]);

  const selectPage = (id: EditablePageId) => {
    setSelectedPageId(id);
    if (cmsPages[id]) {
      setDraft(cmsPages[id]);
    } else {
      setDraft({
        id,
        slug: id,
        title: pageOptions.find((p) => p.id === id)?.label || id,
        sections: [],
        status: 'published',
      });
    }
  };

  const handleSave = async (status: 'draft' | 'published') => {
    setSaving(true);
    try {
      await onSavePage({ ...draft, id: selectedPageId, slug: selectedPageId, status });
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (idx: number, patch: Partial<CmsSectionBlock>) => {
    const next = [...(draft.sections || [])];
    next[idx] = { ...next[idx], ...patch };
    setDraft({ ...draft, sections: next });
  };

  const moveSection = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    const list = [...(draft.sections || [])];
    if (target < 0 || target >= list.length) return;
    [list[idx], list[target]] = [list[target], list[idx]];
    setDraft({ ...draft, sections: list });
  };

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE6EE] pb-4">
        <div>
          <h2 className="font-serif text-2xl text-[#514458]">CMS Pages & Section Editor</h2>
          <p className="text-xs text-[#6E6474]">
            Edit every section heading, text, imagery, buttons, and cards across Homepage, About, Founder Bio, and Philosophy.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {pageOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => selectPage(opt.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                selectedPageId === opt.id
                  ? 'bg-[#514458] text-white'
                  : 'bg-[#F8F5EF] text-[#514458] hover:bg-[#F4E4ED]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero & SEO Block */}
      <div
        className={`p-5 rounded-2xl border space-y-4 ${
          initialSectionId === 'hero'
            ? 'border-[#514458] bg-[#F4E4ED]/30'
            : 'border-[#E6DCE6] bg-[#F8F5EF]/50'
        }`}
      >
        <div className="text-xs font-bold uppercase tracking-wider text-[#514458]">
          Top Hero Banner & Page SEO
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-1 text-xs font-semibold">
            <span>Page Title</span>
            <input
              value={draft.title || ''}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCE6] text-xs font-normal"
            />
          </label>
          <label className="space-y-1 text-xs font-semibold">
            <span>Hero Image Path / HTTPS URL</span>
            <input
              value={draft.heroImage || ''}
              onChange={(e) => setDraft({ ...draft, heroImage: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCE6] text-xs font-normal"
            />
          </label>
          <label className="space-y-1 text-xs font-semibold md:col-span-2">
            <span>Hero Headline</span>
            <input
              value={draft.heroHeading || ''}
              onChange={(e) => setDraft({ ...draft, heroHeading: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCE6] text-xs font-normal"
            />
          </label>
          <label className="space-y-1 text-xs font-semibold md:col-span-2">
            <span>Hero Supporting Body</span>
            <textarea
              rows={3}
              value={draft.heroBody || ''}
              onChange={(e) => setDraft({ ...draft, heroBody: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCE6] text-xs font-normal"
            />
          </label>
          <label className="space-y-1 text-xs font-semibold">
            <span>Primary Button Label</span>
            <input
              value={draft.ctaPrimaryLabel || ''}
              onChange={(e) => setDraft({ ...draft, ctaPrimaryLabel: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCE6] text-xs font-normal"
            />
          </label>
          <label className="space-y-1 text-xs font-semibold">
            <span>Secondary Button Label</span>
            <input
              value={draft.ctaSecondaryLabel || ''}
              onChange={(e) => setDraft({ ...draft, ctaSecondaryLabel: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCE6] text-xs font-normal"
            />
          </label>
          <label className="space-y-1 text-xs font-semibold">
            <span>SEO Title</span>
            <input
              value={draft.seoTitle || ''}
              onChange={(e) => setDraft({ ...draft, seoTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCE6] text-xs font-normal"
            />
          </label>
          <label className="space-y-1 text-xs font-semibold">
            <span>SEO Meta Description</span>
            <input
              value={draft.seoDescription || ''}
              onChange={(e) => setDraft({ ...draft, seoDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E6DCE6] text-xs font-normal"
            />
          </label>
        </div>
      </div>

      {/* Section Blocks */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg text-[#514458]">
            Page Sections ({(draft.sections || []).length})
          </h3>
          <button
            onClick={() =>
              setDraft({
                ...draft,
                sections: [
                  ...(draft.sections || []),
                  {
                    id: `sec-${Date.now()}`,
                    subheading: 'Section Eyebrow',
                    heading: 'New Section Heading',
                    body: 'Add section text here.',
                    visible: true,
                  },
                ],
              })
            }
            className="px-3 py-1.5 rounded-xl bg-[#F4E4ED] text-[#514458] text-xs font-semibold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Section</span>
          </button>
        </div>

        {(draft.sections || []).map((sec, idx) => {
          const isHighlighted = initialSectionId && initialSectionId === sec.id;
          return (
            <div
              key={sec.id}
              className={`p-5 rounded-2xl border space-y-3 ${
                isHighlighted
                  ? 'bg-[#F4E4ED]/35 border-[#514458] ring-2 ring-[#514458]/15'
                  : 'bg-[#F8F5EF] border-[#E6DCE6]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white border border-[#E6DCE6] text-[#514458]">
                    {sec.id}
                  </span>
                  {isHighlighted && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#514458] text-white">
                      Selected Section
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => moveSection(idx, -1)}
                    disabled={idx === 0}
                    className="p-1 rounded bg-white border border-[#E6DCE6] disabled:opacity-40"
                    title="Move Section Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveSection(idx, 1)}
                    disabled={idx === draft.sections.length - 1}
                    className="p-1 rounded bg-white border border-[#E6DCE6] disabled:opacity-40"
                    title="Move Section Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <label className="flex items-center gap-1.5 text-xs font-semibold ml-1">
                    <input
                      type="checkbox"
                      checked={sec.visible}
                      onChange={(e) => updateSection(idx, { visible: e.target.checked })}
                    />
                    <span>Visible</span>
                  </label>
                  <button
                    onClick={() =>
                      setDraft({
                        ...draft,
                        sections: draft.sections.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-rose-700 text-xs font-semibold hover:underline ml-1"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  value={sec.subheading || ''}
                  onChange={(e) => updateSection(idx, { subheading: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
                  placeholder="Subheading / Eyebrow (optional)"
                />
                <input
                  value={sec.heading}
                  onChange={(e) => updateSection(idx, { heading: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs font-semibold"
                  placeholder="Section Heading"
                />
              </div>

              <textarea
                rows={3}
                value={sec.body}
                onChange={(e) => updateSection(idx, { body: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
                placeholder="Section Body Copy"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  value={sec.ctaLabel || ''}
                  onChange={(e) => updateSection(idx, { ctaLabel: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
                  placeholder="Button / Secondary Line Text (optional)"
                />
                <input
                  value={sec.imageUrl || ''}
                  onChange={(e) => updateSection(idx, { imageUrl: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
                  placeholder="Section Image URL (optional)"
                />
              </div>

              {/* Structured Sub-Items (Cards / Principles / Commitments) */}
              <div className="pt-2 space-y-2 border-t border-[#E6DCE6]/70">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6E6474]">
                    Section Cards / Items ({sec.items?.length || 0})
                  </span>
                  <button
                    onClick={() =>
                      updateSection(idx, {
                        items: [
                          ...(sec.items || []),
                          { title: 'New Item', description: '', imageUrl: '', ctaLabel: '' },
                        ],
                      })
                    }
                    className="text-[11px] font-semibold text-[#514458] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Card / Point</span>
                  </button>
                </div>

                {(sec.items || []).map((subItem, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-white border border-[#E6DCE6] grid grid-cols-1 md:grid-cols-3 gap-2 items-start"
                  >
                    <input
                      value={subItem.title}
                      onChange={(e) => {
                        const nextItems = [...(sec.items || [])];
                        nextItems[sIdx] = { ...subItem, title: e.target.value };
                        updateSection(idx, { items: nextItems });
                      }}
                      placeholder="Item / Principle Title"
                      className="px-2.5 py-1.5 rounded-lg border border-[#E6DCE6] text-xs font-semibold"
                    />
                    <input
                      value={subItem.description}
                      onChange={(e) => {
                        const nextItems = [...(sec.items || [])];
                        nextItems[sIdx] = { ...subItem, description: e.target.value };
                        updateSection(idx, { items: nextItems });
                      }}
                      placeholder="Description (if applicable)"
                      className="px-2.5 py-1.5 rounded-lg border border-[#E6DCE6] text-xs"
                    />
                    <div className="flex gap-1.5">
                      <input
                        value={subItem.imageUrl || ''}
                        onChange={(e) => {
                          const nextItems = [...(sec.items || [])];
                          nextItems[sIdx] = { ...subItem, imageUrl: e.target.value };
                          updateSection(idx, { items: nextItems });
                        }}
                        placeholder="Image URL (optional)"
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#E6DCE6] text-xs"
                      />
                      <button
                        onClick={() => {
                          const nextItems = (sec.items || []).filter((_, k) => k !== sIdx);
                          updateSection(idx, { items: nextItems });
                        }}
                        className="px-2 py-1 rounded-lg text-rose-700 hover:bg-rose-50 text-xs font-bold"
                        title="Remove Item"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#EEE6EE]">
        <button
          onClick={() => handleSave('draft')}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl border border-[#E6DCE6] text-[#514458] text-xs font-semibold"
        >
          Save Draft
        </button>
        <button
          onClick={() => handleSave('published')}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-[#514458] hover:bg-[#3E3344] text-white text-xs font-semibold flex items-center gap-2"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saving ? 'Saving...' : 'Publish Live to Website'}</span>
        </button>
      </div>
    </div>
  );
};

// 3. Services Manager
const ServicesManager: React.FC<{
  items: (ServiceItem & { status?: 'published' | 'draft' })[];
  onSave: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}> = ({ items, onSave, onDelete }) => {
  const [editing, setEditing] = useState<(ServiceItem & { status?: 'published' | 'draft' }) | null>(
    null
  );

  const blank = (): ServiceItem & { status: 'published' | 'draft' } => ({
    id: `svc-${Date.now()}`,
    slug: `service-${Date.now()}`,
    title: '',
    shortDescription: '',
    longDescription: [''],
    audience: '',
    whoItsFor: [''],
    whatItInvolves: [{ step: '01', title: 'Initial Consultation', description: '' }],
    deliveryFormat: 'Online Consultation',
    feeNote: 'Shared upon enquiry',
    scopeAndLimitations: ['Educational and behavioural guidance only; not medical diagnosis.'],
    category: 'Parents',
    status: 'published',
  });

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-[#514458]">Behavioural Services Manager</h2>
          <p className="text-xs text-[#6E6474]">
            Add or update Parent Training, Behaviour Consultation, and Online Behavioural Support pages.
          </p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Service</span>
        </button>
      </div>

      {editing && (
        <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Service Title"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              placeholder="URL Slug (e.g. behavior-consultation)"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <select
              value={editing.status || 'published'}
              onChange={(e) =>
                setEditing({ ...editing, status: e.target.value as 'published' | 'draft' })
              }
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <textarea
            rows={2}
            value={editing.shortDescription}
            onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
            placeholder="Short summary..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              value={editing.deliveryFormat}
              onChange={(e) => setEditing({ ...editing, deliveryFormat: e.target.value })}
              placeholder="Delivery Format"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              value={editing.feeNote}
              onChange={(e) => setEditing({ ...editing, feeNote: e.target.value })}
              placeholder="Fee / Pricing Note"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
          </div>
          <textarea
            rows={3}
            value={(editing.longDescription || []).join('\n\n')}
            onChange={(e) =>
              setEditing({
                ...editing,
                longDescription: e.target.value.split('\n\n').filter(Boolean),
              })
            }
            placeholder="Full service description paragraphs (blank line separated)..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <div className="flex gap-2">
            <button
              onClick={async () => {
                if (!editing.title.trim()) return;
                await onSave(editing.id, { ...editing, status: editing.status || 'published' });
                setEditing(null);
              }}
              className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
            >
              Save Service
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl border border-[#E6DCE6] flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <div className="text-sm font-bold text-[#514458]">{item.title}</div>
              <div className="text-xs text-[#6E6474]">
                /{item.slug} · {item.deliveryFormat} · Status: {item.status || 'published'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(item)}
                className="px-3 py-1.5 rounded-lg bg-[#F4E4ED] text-[#514458] text-xs font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
                aria-label="Delete service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 4. Academy Programmes Manager
const ProgrammesManager: React.FC<{
  items: ProgrammeItem[];
  onSave: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}> = ({ items, onSave, onDelete }) => {
  const [editing, setEditing] = useState<ProgrammeItem | null>(null);

  const blank = (): ProgrammeItem => ({
    id: `prog-${Date.now()}`,
    slug: `programme-${Date.now()}`,
    title: '',
    category: ACADEMY_CATEGORIES[0],
    coverImage: '/assets/behavior-canvas-logo.jpg',
    description: '',
    learningObjectives: [''],
    modules: [{ title: 'Module 1', summary: '' }],
    duration: '4 Weeks',
    eligibility: 'Students, educators, parents & practitioners',
    audience: 'Open',
    faculty: 'Reema Singh — QASP-S (QABA, USA)',
    teachingFormat: 'Live Online Cohort + Guided Materials',
    feeINR: 3500,
    feeUSD: 45,
    registrationDeadline: 'Open',
    startDate: 'Upcoming Cohort',
    endDate: 'Self-paced / 4 Weeks',
    enrolmentStatus: 'Open',
    certificateType: 'Certificate of Completion',
    status: 'published',
  });

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-[#514458]">Academy Programmes Manager</h2>
          <p className="text-xs text-[#6E6474]">
            Create unlimited Academy of Behavioural Science courses, syllabus modules, fees, dates & certificate types.
          </p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Programme</span>
        </button>
      </div>

      {editing && (
        <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Programme Title"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <select
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              {ACADEMY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              placeholder="URL Slug"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              value={editing.duration}
              onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
              placeholder="Duration (e.g. 6 Weeks)"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              type="number"
              value={editing.feeINR}
              onChange={(e) => setEditing({ ...editing, feeINR: Number(e.target.value) })}
              placeholder="Fee (INR)"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              type="number"
              value={editing.feeUSD}
              onChange={(e) => setEditing({ ...editing, feeUSD: Number(e.target.value) })}
              placeholder="Fee (USD)"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <select
              value={editing.enrolmentStatus}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  enrolmentStatus: e.target.value as ProgrammeItem['enrolmentStatus'],
                })
              }
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              <option value="Open">Open</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Closed">Closed</option>
              <option value="Archived">Archived</option>
            </select>
            <select
              value={editing.certificateType}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  certificateType: e.target.value as ProgrammeItem['certificateType'],
                })
              }
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              <option value="Certificate of Completion">Certificate of Completion</option>
              <option value="Certificate of Participation">Certificate of Participation</option>
              <option value="None">None</option>
            </select>
            <input
              value={editing.faculty}
              onChange={(e) => setEditing({ ...editing, faculty: e.target.value })}
              placeholder="Faculty"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <select
              value={editing.status}
              onChange={(e) =>
                setEditing({ ...editing, status: e.target.value as 'published' | 'draft' })
              }
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <textarea
            rows={2}
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            placeholder="Programme Description..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <textarea
            rows={2}
            value={(editing.learningObjectives || []).join('\n')}
            onChange={(e) =>
              setEditing({
                ...editing,
                learningObjectives: e.target.value.split('\n').filter(Boolean),
              })
            }
            placeholder="Learning objectives (one per line)..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <div className="flex gap-2">
            <button
              onClick={async () => {
                if (!editing.title.trim()) return;
                await onSave(editing.id, { ...editing });
                setEditing(null);
              }}
              className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
            >
              Save Programme
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-2xl border border-[#E6DCE6] flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <div className="text-sm font-bold text-[#514458]">{p.title}</div>
              <div className="text-xs text-[#6E6474]">
                {p.category} · ₹{p.feeINR} / ${p.feeUSD} · {p.enrolmentStatus} ·{' '}
                <span className="uppercase">{p.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(p)}
                className="px-3 py-1.5 rounded-lg bg-[#F4E4ED] text-[#514458] text-xs font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Workshops Manager
const WorkshopsManager: React.FC<{
  items: WorkshopItem[];
  onSave: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}> = ({ items, onSave, onDelete }) => {
  const [editing, setEditing] = useState<WorkshopItem | null>(null);

  const blank = (): WorkshopItem => ({
    id: `ws-${Date.now()}`,
    slug: `workshop-${Date.now()}`,
    title: '',
    bannerImage: '',
    shortDescription: '',
    fullDescription: [''],
    learningObjectives: [''],
    dateTime: 'Date Announced Soon · Online Live',
    duration: '2 Hours',
    audience: 'Parents, educators & psychology students',
    feeINR: 499,
    feeUSD: 12,
    fee: '₹499 / $12',
    deliveryFormat: 'Live Interactive Webinar',
    closingDate: 'Open',
    eventStatus: 'Upcoming',
    status: 'Upcoming',
    publishState: 'published',
    instructor: 'Reema Singh — QASP-S (QABA, USA)',
    includesCertificate: true,
    takeaways: ['Practical behavioural framework', 'Guided takeaway notes'],
  });

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-[#514458]">Workshops & Events Manager</h2>
          <p className="text-xs text-[#6E6474]">
            Manage real scheduled workshops, registration statuses, audience, and live fees.
          </p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Workshop</span>
        </button>
      </div>

      {editing && (
        <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Workshop Title"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              placeholder="Slug"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              value={editing.dateTime}
              onChange={(e) => setEditing({ ...editing, dateTime: e.target.value })}
              placeholder="Date & Time"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              value={editing.audience}
              onChange={(e) => setEditing({ ...editing, audience: e.target.value })}
              placeholder="Intended Audience"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              type="number"
              value={editing.feeINR || 0}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  feeINR: Number(e.target.value),
                  fee: `₹${e.target.value} / $${editing.feeUSD || 0}`,
                })
              }
              placeholder="Fee INR"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              type="number"
              value={editing.feeUSD || 0}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  feeUSD: Number(e.target.value),
                  fee: `₹${editing.feeINR || 0} / $${e.target.value}`,
                })
              }
              placeholder="Fee USD"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <select
              value={editing.eventStatus || 'Upcoming'}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  eventStatus: e.target.value as WorkshopItem['eventStatus'],
                })
              }
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              <option value="Registration Open">Registration Open</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Registration Closed">Registration Closed</option>
              <option value="Completed">Completed</option>
              <option value="Archived">Archived</option>
            </select>
            <input
              value={editing.bannerImage || ''}
              onChange={(e) => setEditing({ ...editing, bannerImage: e.target.value })}
              placeholder="Banner Image URL (optional)"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
          </div>
          <textarea
            rows={2}
            value={editing.shortDescription}
            onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
            placeholder="Workshop Description..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <div className="flex gap-2">
            <button
              onClick={async () => {
                if (!editing.title.trim()) return;
                await onSave(editing.id, {
                  slug: editing.slug || editing.id,
                  title: editing.title,
                  bannerImage: editing.bannerImage || '',
                  shortDescription: editing.shortDescription,
                  fullDescription: editing.fullDescription?.length
                    ? editing.fullDescription
                    : [editing.shortDescription],
                  learningObjectives: editing.learningObjectives,
                  dateTime: editing.dateTime,
                  duration: editing.duration,
                  audience: editing.audience,
                  feeINR: editing.feeINR || 0,
                  feeUSD: editing.feeUSD || 0,
                  fee: editing.fee,
                  deliveryFormat: editing.deliveryFormat,
                  closingDate: editing.closingDate || '',
                  eventStatus: editing.eventStatus || 'Upcoming',
                  instructor: editing.instructor || 'Reema Singh — QASP-S (QABA, USA)',
                  includesCertificate: editing.includesCertificate ?? true,
                  takeaways: editing.takeaways || [],
                  status: editing.publishState === 'draft' ? 'draft' : 'published',
                });
                setEditing(null);
              }}
              className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
            >
              Save Workshop
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((w) => (
          <div
            key={w.id}
            className="p-4 rounded-2xl border border-[#E6DCE6] flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <div className="text-sm font-bold text-[#514458]">{w.title}</div>
              <div className="text-xs text-[#6E6474]">
                {w.dateTime} · {w.eventStatus || w.status} · {w.fee}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(w)}
                className="px-3 py-1.5 rounded-lg bg-[#F4E4ED] text-[#514458] text-xs font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(w.id)}
                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 6. Products / PDFs Manager
const ProductsManager: React.FC<{
  items: ProductItem[];
  onSave: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}> = ({ items, onSave, onDelete }) => {
  const [editing, setEditing] = useState<(ProductItem & { status?: 'published' | 'draft' }) | null>(
    null
  );

  const blank = (): ProductItem => ({
    id: `prod-${Date.now()}`,
    slug: `resource-${Date.now()}`,
    title: '',
    subtitle: 'Digital Study Resource',
    category: 'Notes',
    format: 'Digital PDF Workbook',
    priceINR: 799,
    priceUSD: 15,
    image: '/assets/behavior-canvas-logo.jpg',
    shortDescription: '',
    fullDescription: [''],
    audience: ['Students & Practitioners'],
    contents: ['Structured Concept Modules'],
    features: ['Instant Verified Digital Download'],
    faq: [],
    fileSpecs: {
      estimatedPages: '40+ Pages',
      format: 'Interactive PDF',
      delivery: 'Verified Checkout Token Download',
      access: 'Single-User Personal Copy',
    },
    isAvailable: true,
    downloadPath: '',
    status: 'published',
  });

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-[#514458]">Learning Resources & PDFs Store</h2>
          <p className="text-xs text-[#6E6474]">
            Edit study notes, cheat sheets, question banks, e-books, pricing (INR & USD), and preview specs.
          </p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Resource</span>
        </button>
      </div>

      {editing && (
        <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Resource Title"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              placeholder="Slug"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <select
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value as ProductItem['category'] })
              }
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              <option value="Notes">Notes</option>
              <option value="Cheat Sheet">Cheat Sheet</option>
              <option value="Practice">Practice</option>
              <option value="Planner">Planner</option>
              <option value="E-book">E-book</option>
              <option value="Bundle">Bundle</option>
            </select>
            <input
              type="number"
              value={editing.priceINR}
              onChange={(e) => setEditing({ ...editing, priceINR: Number(e.target.value) })}
              placeholder="Price INR"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              type="number"
              value={editing.priceUSD}
              onChange={(e) => setEditing({ ...editing, priceUSD: Number(e.target.value) })}
              placeholder="Price USD"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <select
              value={editing.isAvailable ? 'available' : 'coming_soon'}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  isAvailable: e.target.value === 'available',
                })
              }
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              <option value="available">Available Now</option>
              <option value="coming_soon">Coming Soon</option>
            </select>
          </div>
          <textarea
            rows={2}
            value={editing.shortDescription}
            onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
            placeholder="Short description..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              value={editing.image || ''}
              onChange={(e) => setEditing({ ...editing, image: e.target.value })}
              placeholder="Cover Image URL"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              value={editing.downloadPath || ''}
              onChange={(e) => setEditing({ ...editing, downloadPath: e.target.value })}
              placeholder="Digital PDF Download Path / Cloud Storage URL"
              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                if (!editing.title.trim()) return;
                await onSave(editing.id, {
                  ...editing,
                  fullDescription: editing.fullDescription?.some(Boolean)
                    ? editing.fullDescription
                    : [editing.shortDescription],
                  status: editing.status || 'published',
                });
                setEditing(null);
              }}
              className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
            >
              Save Resource
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-2xl border border-[#E6DCE6] flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <div className="text-sm font-bold text-[#514458]">{p.title}</div>
              <div className="text-xs text-[#6E6474]">
                {p.category} · ₹{p.priceINR} / ${p.priceUSD} ·{' '}
                {p.isAvailable ? 'Available' : 'Coming Soon'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(p)}
                className="px-3 py-1.5 rounded-lg bg-[#F4E4ED] text-[#514458] text-xs font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 7. Orders & Refunds Manager
const OrdersManager: React.FC<{
  orders: OrderRecord[];
  onUpdateOrder: (id: string, updates: Partial<OrderRecord>, label?: string) => Promise<void>;
  onError: (msg: string) => void;
}> = ({ orders, onUpdateOrder, onError }) => {
  const [refundingId, setRefundingId] = useState<string | null>(null);

  const handleRefund = async (order: OrderRecord) => {
    setRefundingId(order.id);
    try {
      const res = await fetch('/api/payments/refund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: order.transactionId || order.orderCode,
          amount: order.amount,
          reason: 'Admin initiated refund from Behavior Canvas console',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Refund API returned error');
      await onUpdateOrder(
        order.id,
        {
          paymentStatus: 'refunded',
          refundStatus: 'processed',
          refundReference: data.refundReference,
          refundReason: 'Processed by administrator',
        },
        `Processed refund for ${order.orderCode}`
      );
    } catch (err: any) {
      onError(err?.message || 'Refund failed.');
    } finally {
      setRefundingId(null);
    }
  };

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-[#514458]">Orders, Payments & Refunds</h2>
        <p className="text-xs text-[#6E6474]">
          Verify manual UPI orders, inspect gateway transaction IDs, and issue refunds cleanly.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] text-center text-xs text-[#6E6474]">
          No customer orders recorded in Firestore yet.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] flex flex-wrap items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="text-sm font-bold text-[#514458]">{order.itemTitle}</div>
                <div className="text-xs text-[#6E6474]">
                  {order.customerName || 'Customer'} ({order.customerEmail}) ·{' '}
                  <span className="font-mono">{order.orderCode}</span>
                </div>
                <div className="text-[11px] text-[#6E6474]">
                  Gateway: {order.gateway} · Tx: {order.transactionId || 'Pending'} ·{' '}
                  <strong>
                    {order.currency} {order.amount}
                  </strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full border ${
                    order.paymentStatus === 'verified'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : order.paymentStatus === 'refunded'
                      ? 'bg-rose-50 border-rose-200 text-rose-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
                >
                  {order.paymentStatus}
                </span>

                {order.paymentStatus === 'pending' && (
                  <button
                    onClick={() =>
                      onUpdateOrder(
                        order.id,
                        { paymentStatus: 'verified' },
                        `Verified payment for ${order.orderCode}`
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold"
                  >
                    Mark Verified
                  </button>
                )}

                {order.paymentStatus === 'verified' && (
                  <button
                    disabled={refundingId === order.id}
                    onClick={() => handleRefund(order)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-800 text-xs font-semibold"
                  >
                    {refundingId === order.id ? 'Refunding...' : 'Issue Refund'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 8. Coupons Manager (strictly adheres to firestore.rules coupons hasOnly allowlist)
const CouponsManager: React.FC<{
  coupons: CouponDoc[];
  onSave: (code: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (code: string) => Promise<void>;
}> = ({ coupons, onSave, onDelete }) => {
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed_inr'>('percent');
  const [value, setValue] = useState(15);
  const [expiryDate, setExpiryDate] = useState('2027-12-31');
  const [active, setActive] = useState(true);

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[#514458]">Coupons & Discount Codes</h2>
        <p className="text-xs text-[#6E6474]">
          Create percentage or fixed-INR coupons validated server-side and at checkout.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] grid grid-cols-1 sm:grid-cols-5 gap-3 items-end">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="CODE (e.g. CANVAS15)"
          className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs font-mono"
        />
        <select
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value as 'percent' | 'fixed_inr')}
          className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
        >
          <option value="percent">Percent (%)</option>
          <option value="fixed_inr">Fixed (₹ INR)</option>
        </select>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="Discount Value"
          className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
        />
        <button
          onClick={async () => {
            const cleanCode = code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
            if (!cleanCode) return;
            await onSave(cleanCode, {
              code: cleanCode,
              discountType,
              value: Number(value) || 0,
              expiryDate,
              active,
            });
            setCode('');
          }}
          className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
        >
          Save Coupon
        </button>
      </div>

      <div className="space-y-2.5">
        {coupons.map((c) => (
          <div
            key={c.code}
            className="p-3.5 rounded-2xl border border-[#E6DCE6] flex items-center justify-between gap-3"
          >
            <div>
              <span className="font-mono text-xs font-bold text-[#514458]">{c.code}</span>
              <span className="text-xs text-[#6E6474] ml-3">
                {c.discountType === 'percent' ? `${c.value}% OFF` : `₹${c.value} OFF`} · Exp:{' '}
                {c.expiryDate || 'None'} · {c.active ? 'Active' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onSave(c.code, {
                    code: c.code,
                    discountType: c.discountType,
                    value: c.value,
                    expiryDate: c.expiryDate || '',
                    active: !c.active,
                  })
                }
                className="px-3 py-1 rounded-lg bg-[#F4E4ED] text-[#514458] text-xs font-semibold"
              >
                {c.active ? 'Disable' : 'Enable'}
              </button>
              <button
                onClick={() => onDelete(c.code)}
                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 9. Enrolments Manager
const EnrolmentsManager: React.FC<{
  enrolments: import('../types').EnrolmentRecord[];
  onUpdate: (id: string, data: Record<string, unknown>) => Promise<void>;
}> = ({ enrolments, onUpdate }) => {
  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-[#514458]">Student Enrolments & Progress</h2>
        <p className="text-xs text-[#6E6474]">
          Update attendance status, completion percentage, and link verified Certificate IDs to learner records.
        </p>
      </div>

      {enrolments.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] text-center text-xs text-[#6E6474]">
          No student enrolments recorded yet.
        </div>
      ) : (
        <div className="space-y-3">
          {enrolments.map((enr) => (
            <div
              key={enr.id}
              className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <div className="text-sm font-bold text-[#514458]">{enr.itemTitle}</div>
                <div className="text-xs text-[#6E6474]">
                  {enr.learnerName || 'Learner'} ({enr.learnerEmail || enr.userId}) · Type:{' '}
                  {enr.itemType}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={enr.attendanceStatus}
                  onChange={(e) =>
                    onUpdate(enr.id, {
                      userId: enr.userId,
                      itemType: enr.itemType,
                      itemId: enr.itemId,
                      itemTitle: enr.itemTitle,
                      attendanceStatus: e.target.value,
                      completionPercent:
                        e.target.value === 'completed' ? 100 : enr.completionPercent || 0,
                    })
                  }
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DCE6] text-xs font-semibold"
                >
                  <option value="registered">Registered</option>
                  <option value="attending">Attending</option>
                  <option value="completed">Completed</option>
                </select>
                <span className="text-xs font-mono text-[#514458]">
                  {enr.completionPercent || 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 10. Certificates Registry Manager
const CertificatesManager: React.FC<{
  certificates: CertificateRecord[];
  onSave: (certId: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}> = ({ certificates, onSave, onDelete }) => {
  const [certId, setCertId] = useState(`TBC-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [learnerName, setLearnerName] = useState('');
  const [programmeTitle, setProgrammeTitle] = useState('');
  const [certificateType, setCertificateType] = useState<
    'Certificate of Completion' | 'Certificate of Participation'
  >('Certificate of Completion');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().slice(0, 10));

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[#514458]">Certificate Registry & Verification</h2>
        <p className="text-xs text-[#6E6474]">
          Issue or revoke verifiable Completion and Participation certificates displayed at{' '}
          <span className="font-mono">/verify-certificate</span>.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          value={certId}
          onChange={(e) => setCertId(e.target.value.toUpperCase())}
          placeholder="Certificate ID (e.g. TBC-2026-1024)"
          className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs font-mono"
        />
        <input
          value={learnerName}
          onChange={(e) => setLearnerName(e.target.value)}
          placeholder="Recipient Full Name"
          className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
        />
        <input
          value={programmeTitle}
          onChange={(e) => setProgrammeTitle(e.target.value)}
          placeholder="Programme or Workshop Title"
          className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
        />
        <select
          value={certificateType}
          onChange={(e) =>
            setCertificateType(
              e.target.value as 'Certificate of Completion' | 'Certificate of Participation'
            )
          }
          className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
        >
          <option value="Certificate of Completion">Certificate of Completion</option>
          <option value="Certificate of Participation">Certificate of Participation</option>
        </select>
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
        />
        <button
          onClick={async () => {
            const cleanId = certId.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
            if (!cleanId || !learnerName.trim() || !programmeTitle.trim()) return;
            await onSave(cleanId, {
              certificateId: cleanId,
              learnerName: learnerName.trim(),
              programmeTitle: programmeTitle.trim(),
              certificateType,
              issueDate,
              verificationStatus: 'valid',
              issuedBy: 'Reema Singh — Founder & Director, The Behavior Canvas',
            });
            setLearnerName('');
            setProgrammeTitle('');
            setCertId(`TBC-2026-${Math.floor(1000 + Math.random() * 9000)}`);
          }}
          className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
        >
          Issue Certificate
        </button>
      </div>

      <div className="space-y-2.5">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-4 rounded-2xl border border-[#E6DCE6] flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <div className="text-sm font-bold text-[#514458]">
                {cert.learnerName} · <span className="font-mono text-xs">{cert.certificateId}</span>
              </div>
              <div className="text-xs text-[#6E6474]">
                {cert.programmeTitle} · {cert.certificateType} · {cert.issueDate}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onSave(cert.certificateId, {
                    certificateId: cert.certificateId,
                    learnerName: cert.learnerName,
                    programmeTitle: cert.programmeTitle,
                    certificateType: cert.certificateType,
                    issueDate: cert.issueDate,
                    verificationStatus: cert.verificationStatus === 'valid' ? 'revoked' : 'valid',
                  })
                }
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  cert.verificationStatus === 'valid'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-rose-50 text-rose-800'
                }`}
              >
                {cert.verificationStatus === 'valid' ? 'Valid (Revoke?)' : 'Revoked (Restore?)'}
              </button>
              <button
                onClick={() => onDelete(cert.id)}
                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 11. Articles / Blog Manager
const ArticlesManager: React.FC<{
  articles: (ArticleItem & { status?: 'published' | 'draft' })[];
  onSave: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}> = ({ articles, onSave, onDelete }) => {
  const [editing, setEditing] = useState<
    (ArticleItem & { status?: 'published' | 'draft' }) | null
  >(null);

  const blank = (): ArticleItem & { status: 'published' | 'draft' } => ({
    id: `art-${Date.now()}`,
    slug: `article-${Date.now()}`,
    title: '',
    summary: '',
    category: 'Foundations of ABA',
    author: 'Reema Singh',
    authorRole: 'Founder & Director, The Behavior Canvas',
    publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: '6 min read',
    sections: [{ heading: 'Overview', paragraphs: [''] }],
    keyTakeaways: [''],
    references: [],
    status: 'published',
  });

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-[#514458]">Blog & Educational Articles</h2>
          <p className="text-xs text-[#6E6474]">Publish evidence-based articles and reflections.</p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Article</span>
        </button>
      </div>

      {editing && (
        <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Article Title"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              placeholder="Slug"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <input
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              placeholder="Category"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
          </div>
          <textarea
            rows={2}
            value={editing.summary}
            onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
            placeholder="Summary excerpt..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <textarea
            rows={5}
            value={(editing.sections?.[0]?.paragraphs || []).join('\n\n')}
            onChange={(e) =>
              setEditing({
                ...editing,
                sections: [
                  {
                    heading: editing.sections?.[0]?.heading || 'Article Body',
                    paragraphs: e.target.value.split('\n\n').filter(Boolean),
                  },
                  ...(editing.sections?.slice(1) || []),
                ],
              })
            }
            placeholder="Full article body (separate paragraphs with blank line)..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <div className="flex items-center gap-3">
            <select
              value={editing.status || 'published'}
              onChange={(e) =>
                setEditing({ ...editing, status: e.target.value as 'published' | 'draft' })
              }
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <button
              onClick={async () => {
                if (!editing.title.trim()) return;
                await onSave(editing.id, { ...editing, status: editing.status || 'published' });
                setEditing(null);
              }}
              className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
            >
              Save Article
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {articles.map((art) => (
          <div
            key={art.id}
            className="p-4 rounded-2xl border border-[#E6DCE6] flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <div className="text-sm font-bold text-[#514458]">{art.title}</div>
              <div className="text-xs text-[#6E6474]">
                {art.category} · {art.publishedDate} · {art.status || 'published'}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(art)}
                className="px-3 py-1.5 rounded-lg bg-[#F4E4ED] text-[#514458] text-xs font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(art.id)}
                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 12. Research & Publications Manager
const ResearchManager: React.FC<{
  items: ResearchItem[];
  onSave: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}> = ({ items, onSave, onDelete }) => {
  const [editing, setEditing] = useState<ResearchItem | null>(null);

  const blank = (): ResearchItem => ({
    id: `res-${Date.now()}`,
    title: '',
    type: 'Interest Area',
    authors: 'Reema Singh',
    venueOrJournal: '',
    year: String(new Date().getFullYear()),
    abstract: '',
    link: '',
    status: 'published',
  });

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-[#514458]">Research & Publications</h2>
          <p className="text-xs text-[#6E6474]">
            Manage authentic research interests, publications, and conference presentations.
          </p>
        </div>
        <button
          onClick={() => setEditing(blank())}
          className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Entry</span>
        </button>
      </div>

      {editing && (
        <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Title"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
            <select
              value={editing.type}
              onChange={(e) =>
                setEditing({ ...editing, type: e.target.value as ResearchItem['type'] })
              }
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              <option value="Interest Area">Interest Area</option>
              <option value="Publication">Publication</option>
              <option value="Conference Presentation">Conference Presentation</option>
            </select>
            <input
              value={editing.year || ''}
              onChange={(e) => setEditing({ ...editing, year: e.target.value })}
              placeholder="Year"
              className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            />
          </div>
          <textarea
            rows={3}
            value={editing.abstract}
            onChange={(e) => setEditing({ ...editing, abstract: e.target.value })}
            placeholder="Abstract / Research Focus..."
            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <div className="flex gap-2">
            <button
              onClick={async () => {
                if (!editing.title.trim()) return;
                await onSave(editing.id, { ...editing });
                setEditing(null);
              }}
              className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
            >
              Save Entry
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((r) => (
          <div
            key={r.id}
            className="p-4 rounded-2xl border border-[#E6DCE6] flex flex-wrap items-center justify-between gap-3"
          >
            <div>
              <div className="text-sm font-bold text-[#514458]">{r.title}</div>
              <div className="text-xs text-[#6E6474]">
                {r.type} · {r.year || 'Ongoing'} · {r.status}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(r)}
                className="px-3 py-1.5 rounded-lg bg-[#F4E4ED] text-[#514458] text-xs font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(r.id)}
                className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 13. Testimonials Manager (strictly adheres to firestore.rules testimonials allowlist)
const TestimonialsManager: React.FC<{
  items: TestimonialDoc[];
  onSave: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}> = ({ items, onSave, onDelete }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [context, setContext] = useState('');
  const [quote, setQuote] = useState('');
  const [approved, setApproved] = useState(false);

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[#514458]">Consent-Verified Testimonials</h2>
        <p className="text-xs text-[#6E6474]">
          Public website visitors see ONLY testimonials where both Consent Approved and Visible are active.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name / Initials"
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role (e.g. Parent / Special Educator)"
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <input
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Programme / Context"
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
        </div>
        <textarea
          rows={2}
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Verified quote (only add with explicit permission)..."
          className="w-full px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs font-semibold">
            <input
              type="checkbox"
              checked={approved}
              onChange={(e) => setApproved(e.target.checked)}
            />
            <span>Written Consent Verified (Publish on Homepage)</span>
          </label>
          <button
            onClick={async () => {
              if (!name.trim() || !role.trim() || !quote.trim()) return;
              const id = `test_${Date.now()}`;
              await onSave(id, {
                name: name.trim(),
                role: role.trim(),
                ...(context.trim() ? { context: context.trim() } : {}),
                quote: quote.trim(),
                approved,
                visible: approved,
              });
              setName('');
              setRole('');
              setContext('');
              setQuote('');
            }}
            className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
          >
            Add Testimonial
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-[#6E6474]">
          No testimonials stored yet. Section on Homepage stays hidden until approved testimonials exist.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((t) => (
            <div
              key={t.id}
              className="p-4 rounded-2xl border border-[#E6DCE6] flex flex-wrap items-center justify-between gap-3"
            >
              <div className="max-w-2xl">
                <div className="text-xs font-bold text-[#514458]">
                  {t.name} · {t.role}
                </div>
                <p className="text-xs text-[#6E6474] italic mt-1">“{t.quote}”</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onSave(t.id, {
                      name: t.name,
                      role: t.role,
                      ...(t.context ? { context: t.context } : {}),
                      quote: t.quote,
                      approved: !t.approved,
                      visible: !t.visible,
                    })
                  }
                  className="px-3 py-1.5 rounded-lg bg-[#F4E4ED] text-[#514458] text-xs font-semibold"
                >
                  {t.approved && t.visible ? 'Hide' : 'Approve & Show'}
                </button>
                <button
                  onClick={() => onDelete(t.id)}
                  className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 14. Media Library Manager (Firebase Storage + URLs)
const MediaManager: React.FC<{
  items: MediaAssetDoc[];
  userEmail: string;
  onSave: (id: string, data: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onError: (msg: string) => void;
}> = ({ items, userEmail, onSave, onDelete, onError }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'image' | 'pdf' | 'banner' | 'poster'>('pdf');
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const pathRef = storageRef(storage, `behavior-canvas-media/${Date.now()}-${file.name}`);
      await uploadBytes(pathRef, file);
      const dl = await getDownloadURL(pathRef);
      const id = `med_${Date.now()}`;
      await onSave(id, {
        title: title.trim() || file.name,
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        url: dl,
        uploadedBy: userEmail,
        createdAt: new Date().toISOString(),
      });
      setTitle('');
    } catch (err: any) {
      onError(
        err?.message || 'Storage upload unavailable; you can register any HTTPS file URL directly below.'
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[#514458]">Media, PDF & Asset Library</h2>
        <p className="text-xs text-[#6E6474]">
          Upload PDF workbooks, banners, or event posters directly to cloud storage or register HTTPS links.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Asset Title"
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as MediaAssetDoc['type'])}
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          >
            <option value="pdf">PDF Document</option>
            <option value="image">Image</option>
            <option value="banner">Hero / Banner</option>
            <option value="poster">Workshop Poster</option>
          </select>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://... or /assets/..."
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={async () => {
              if (!title.trim() || !url.trim()) return;
              await onSave(`med_${Date.now()}`, {
                title: title.trim(),
                type,
                url: url.trim(),
                uploadedBy: userEmail,
                createdAt: new Date().toISOString(),
              });
              setTitle('');
              setUrl('');
            }}
            className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
          >
            Save Asset Link
          </button>

          <label className="px-4 py-2 rounded-xl bg-white border border-[#E6DCE6] text-[#514458] text-xs font-semibold cursor-pointer flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? 'Uploading...' : 'Upload File to Cloud Storage'}</span>
            <input type="file" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((m) => (
          <div
            key={m.id}
            className="p-4 rounded-2xl border border-[#E6DCE6] flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#514458] truncate">{m.title}</div>
              <div className="text-[11px] text-[#6E6474] uppercase">{m.type}</div>
              <a
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#514458] underline truncate block max-w-xs"
              >
                {m.url}
              </a>
            </div>
            <button
              onClick={() => onDelete(m.id)}
              className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50 shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// 15. Enquiries Inbox Manager
const EnquiriesManager: React.FC<{
  enquiries: EnquiryRecord[];
  onUpdate: (id: string, updates: Partial<EnquiryRecord>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}> = ({ enquiries, onUpdate, onDelete }) => {
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'resolved' | 'archived'>('all');
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  const visible = useMemo(
    () => (filter === 'all' ? enquiries : enquiries.filter((e) => e.status === filter)),
    [enquiries, filter]
  );

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-[#514458]">Enquiries & Submissions Inbox</h2>
          <p className="text-xs text-[#6E6474]">
            Review service, parent training, academy, and institutional requests submitted across the site.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(['all', 'new', 'contacted', 'resolved', 'archived'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize ${
                filter === st ? 'bg-[#514458] text-white' : 'bg-[#F8F5EF] text-[#514458]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] text-center text-xs text-[#6E6474]">
          No enquiries in this status filter.
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((enq) => (
            <div
              key={enq.id}
              className="p-5 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-[#514458]">
                    {enq.name} · <span className="font-normal text-[#6E6474]">{enq.email}</span>
                  </div>
                  <div className="text-xs text-[#6E6474]">
                    {enq.category} {enq.phone ? `· ${enq.phone}` : ''} ·{' '}
                    {new Date(enq.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={enq.status}
                    onChange={(e) =>
                      onUpdate(enq.id, { status: e.target.value as EnquiryRecord['status'] })
                    }
                    className="px-3 py-1.5 rounded-xl bg-white border border-[#E6DCE6] text-xs font-semibold"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    onClick={() => onDelete(enq.id)}
                    className="p-1.5 rounded-lg text-rose-700 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#514458] bg-white p-3.5 rounded-xl border border-[#E6DCE6] leading-relaxed">
                {enq.message}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  value={notesDraft[enq.id] ?? enq.internalNotes ?? ''}
                  onChange={(e) => setNotesDraft({ ...notesDraft, [enq.id]: e.target.value })}
                  placeholder="Private admin follow-up notes..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
                />
                <button
                  onClick={() =>
                    onUpdate(enq.id, {
                      internalNotes: notesDraft[enq.id] ?? enq.internalNotes ?? '',
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold shrink-0"
                >
                  Save Note
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 16. Flexible Payment Gateway Settings Manager
const PaymentSettingsManager: React.FC<{
  siteSettings: SiteSettingsDoc;
  paymentConfigs: import('../types').PaymentGatewayConfig[];
  onSaveSettings: (next: Partial<SiteSettingsDoc>) => Promise<void>;
  onSaveGatewayConfig: (id: string, data: Record<string, unknown>) => Promise<void>;
  onError: (msg: string) => void;
}> = ({ siteSettings, onSaveSettings, onSaveGatewayConfig, onError }) => {
  const [form, setForm] = useState<SiteSettingsDoc>(siteSettings);
  const [diagResult, setDiagResult] = useState<Record<string, any> | null>(null);
  const [testing, setTesting] = useState(false);

  const runDiagnostics = async () => {
    setTesting(true);
    try {
      const res = await fetch('/api/payments/test-connection', { method: 'POST' });
      const data = await res.json();
      setDiagResult(data);
    } catch (err: any) {
      onError(err?.message || 'Unable to run gateway diagnostics.');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EEE6EE] pb-4">
        <div>
          <h2 className="font-serif text-2xl text-[#514458]">Payment Gateway Configuration</h2>
          <p className="text-xs text-[#6E6474]">
            Switch active gateway, test vs. live mode, public Key IDs, and direct UPI settings. Server secret keys belong exclusively in server environment variables.
          </p>
        </div>
        <button
          onClick={runDiagnostics}
          disabled={testing}
          className="px-4 py-2 rounded-xl bg-[#F4E4ED] text-[#514458] text-xs font-semibold flex items-center gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
          <span>Test Server Gateway Keys</span>
        </button>
      </div>

      {diagResult && (
        <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#E6DCE6] text-xs space-y-1">
          <div className="font-bold text-[#514458]">Server Key Readiness Report</div>
          <div>
            Razorpay Secret Configured:{' '}
            <strong>
              {diagResult.providers?.razorpay?.serverKeysConfigured ? 'Yes' : 'Not set in .env'}
            </strong>
          </div>
          <div>
            Razorpay Webhook Secret:{' '}
            <strong>
              {diagResult.providers?.razorpay?.webhookSecretConfigured ? 'Configured' : 'Not set in .env'}
            </strong>
          </div>
          <div>
            Stripe Secret Configured:{' '}
            <strong>
              {diagResult.providers?.stripe?.serverKeysConfigured ? 'Yes' : 'Not set in .env'}
            </strong>
          </div>
          <div className="text-[#6E6474] pt-1">
            Webhook Endpoint URL: <span className="font-mono">https://behaviorcanvas.com/api/payments/webhook</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1 text-xs font-semibold">
          <span>Active Default Gateway</span>
          <select
            value={form.activeGateway}
            onChange={(e) =>
              setForm({
                ...form,
                activeGateway: e.target.value as SiteSettingsDoc['activeGateway'],
              })
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs font-normal"
          >
            <option value="razorpay">Razorpay (UPI, Cards, NetBanking)</option>
            <option value="stripe">Stripe (Global International Cards)</option>
            <option value="upi_manual">Direct UPI / Manual Reference Verification</option>
          </select>
        </label>

        <label className="space-y-1 text-xs font-semibold">
          <span>Checkout Environment Mode</span>
          <select
            value={form.gatewayMode}
            onChange={(e) =>
              setForm({ ...form, gatewayMode: e.target.value as 'test' | 'live' })
            }
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs font-normal"
          >
            <option value="test">Test / Sandbox Verification Mode</option>
            <option value="live">Live Production Mode (Requires Server Keys)</option>
          </select>
        </label>

        <label className="space-y-1 text-xs font-semibold">
          <span>Razorpay Public Key ID (Non-Secret)</span>
          <input
            value={form.razorpayKeyId}
            onChange={(e) => setForm({ ...form, razorpayKeyId: e.target.value })}
            placeholder="rzp_live_... or rzp_test_..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs font-mono"
          />
        </label>

        <label className="space-y-1 text-xs font-semibold">
          <span>Stripe Publishable Key (Non-Secret)</span>
          <input
            value={form.stripePublishableKey}
            onChange={(e) => setForm({ ...form, stripePublishableKey: e.target.value })}
            placeholder="pk_live_... or pk_test_..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs font-mono"
          />
        </label>

        <label className="space-y-1 text-xs font-semibold">
          <span>Verified Direct UPI VPA</span>
          <input
            value={form.upiId}
            onChange={(e) => setForm({ ...form, upiId: e.target.value })}
            placeholder="yourname@okaxis / @upi"
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs font-mono"
          />
        </label>

        <label className="space-y-1 text-xs font-semibold">
          <span>Payee Display Name</span>
          <input
            value={form.payeeName}
            onChange={(e) => setForm({ ...form, payeeName: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-5 pt-2 text-xs font-semibold">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.razorpayEnabled}
            onChange={(e) => setForm({ ...form, razorpayEnabled: e.target.checked })}
          />
          <span>Enable Razorpay</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.stripeEnabled}
            onChange={(e) => setForm({ ...form, stripeEnabled: e.target.checked })}
          />
          <span>Enable Stripe</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.upiEnabled}
            onChange={(e) => setForm({ ...form, upiEnabled: e.target.checked })}
          />
          <span>Enable Direct UPI</span>
        </label>
      </div>

      <button
        onClick={async () => {
          await onSaveSettings(form);
          await onSaveGatewayConfig('razorpay', {
            provider: 'razorpay',
            displayName: 'Razorpay (UPI, Cards & NetBanking)',
            enabled: form.razorpayEnabled,
            isDefault: form.activeGateway === 'razorpay',
            mode: form.gatewayMode,
            publicKey: form.razorpayKeyId,
            supportedMethods: ['UPI', 'Cards', 'NetBanking'],
            webhookStatus: diagResult?.providers?.razorpay?.webhookSecretConfigured
              ? 'connected'
              : 'pending',
            updatedAt: new Date().toISOString(),
          });
        }}
        className="px-5 py-2.5 rounded-xl bg-[#514458] hover:bg-[#3E3344] text-white text-xs font-semibold flex items-center gap-2"
      >
        <Save className="w-3.5 h-3.5" />
        <span>Save Gateway Settings</span>
      </button>
    </div>
  );
};

// 17. Website & SEO Settings Manager
const SiteSettingsManager: React.FC<{
  siteSettings: SiteSettingsDoc;
  onSave: (next: Partial<SiteSettingsDoc>) => Promise<void>;
}> = ({ siteSettings, onSave }) => {
  const [form, setForm] = useState<SiteSettingsDoc>(siteSettings);

  return (
    <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-[#514458]">SEO, Announcement Bar & Contact Settings</h2>
        <p className="text-xs text-[#6E6474]">
          Update the top announcement bar, global SEO metadata, and verified public contact links.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-1 text-xs font-semibold md:col-span-2">
          <span>Top Announcement Banner Text</span>
          <input
            value={form.announcementText}
            onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs font-normal"
          />
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold md:col-span-2">
          <input
            type="checkbox"
            checked={form.announcementEnabled}
            onChange={(e) => setForm({ ...form, announcementEnabled: e.target.checked })}
          />
          <span>Display Top Announcement Bar Publicly</span>
        </label>
        <label className="space-y-1 text-xs font-semibold md:col-span-2">
          <span>Default Global SEO Title</span>
          <input
            value={form.seoTitle}
            onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs font-normal"
          />
        </label>
        <label className="space-y-1 text-xs font-semibold md:col-span-2">
          <span>Default Global SEO Description</span>
          <textarea
            rows={2}
            value={form.seoDescription}
            onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs font-normal"
          />
        </label>
        <label className="space-y-1 text-xs font-semibold">
          <span>Contact Email</span>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs font-normal"
          />
        </label>
        <label className="space-y-1 text-xs font-semibold">
          <span>Instagram Handle</span>
          <input
            value={form.instagramHandle}
            onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DCE6] text-xs font-normal"
          />
        </label>
      </div>

      <button
        onClick={() => onSave(form)}
        className="px-5 py-2.5 rounded-xl bg-[#514458] hover:bg-[#3E3344] text-white text-xs font-semibold flex items-center gap-2"
      >
        <Save className="w-3.5 h-3.5" />
        <span>Save Site & SEO Settings</span>
      </button>
    </div>
  );
};

// 18. Admin Registry & Immutable Audit Logs
const AuditAndAdminsPanel: React.FC<{
  admins: import('../types').AdminUserRecord[];
  auditLogs: import('../types').AuditLogRecord[];
  onAddAdmin: (
    uid: string,
    email: string,
    name: string,
    role: 'super_admin' | 'editor'
  ) => Promise<void>;
}> = ({ admins, auditLogs, onAddAdmin }) => {
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'super_admin' | 'editor'>('editor');

  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-5">
        <div>
          <h2 className="font-serif text-2xl text-[#514458]">Authorised Admin Registry</h2>
          <p className="text-xs text-[#6E6474]">
            Primary owner account (<span className="font-mono">{brandConfig.email}</span>) is
            permanently bootstrapped. You may add verified faculty/editor UIDs below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-[#F8F5EF] p-4 rounded-2xl border border-[#E6DCE6]">
          <input
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="Firebase Auth UID"
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs font-mono"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Verified Email"
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name (optional)"
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
          />
          <div className="flex gap-2">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'super_admin' | 'editor')}
              className="px-2.5 py-2 rounded-xl bg-white border border-[#E6DCE6] text-xs"
            >
              <option value="editor">Editor</option>
              <option value="super_admin">Super Admin</option>
            </select>
            <button
              onClick={async () => {
                if (!uid.trim() || !email.trim()) return;
                await onAddAdmin(uid, email, name, role);
                setUid('');
                setEmail('');
                setName('');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#514458] text-white text-xs font-semibold"
            >
              Grant
            </button>
          </div>
        </div>

        {admins.length > 0 && (
          <div className="space-y-2">
            {admins.map((a) => (
              <div
                key={a.uid}
                className="p-3 rounded-xl border border-[#E6DCE6] text-xs flex items-center justify-between"
              >
                <span>
                  <strong>{a.email}</strong> ({a.role}) · <span className="font-mono">{a.uid}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border border-[#E6DCE6] rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-xl text-[#514458]">Immutable Activity Audit Trail</h3>
        {auditLogs.length === 0 ? (
          <p className="text-xs text-[#6E6474]">No admin activity logged yet.</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {auditLogs.slice(0, 50).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-[#F8F5EF] border border-[#E6DCE6] text-xs flex flex-wrap items-center justify-between gap-2"
              >
                <div>
                  <span className="font-semibold text-[#514458]">{log.action}</span>
                  {log.targetCollection && (
                    <span className="text-[#6E6474] ml-2 font-mono">
                      [{log.targetCollection}/{log.targetId}]
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#6E6474]">
                  {log.actorEmail} · {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

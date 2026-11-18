import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useAuth } from './AuthContext';
import {
  AdminUserRecord,
  AuditLogRecord,
  CertificateRecord,
  CmsPageDoc,
  CouponDoc,
  EnquiryRecord,
  EnrolmentRecord,
  MediaAssetDoc,
  OrderRecord,
  PaymentGatewayConfig,
  ProgrammeItem,
  ResearchItem,
  SiteSettingsDoc,
  TestimonialDoc,
} from '../types';
import { ProductItem, productsData } from '../data/products';
import { ServiceItem, servicesData } from '../data/services';
import { WorkshopItem, workshopsData } from '../data/workshops';
import { ArticleItem, articlesData } from '../data/articles';
import { programmesData } from '../data/programmes';
import { researchData } from '../data/research';
import {
  DEFAULT_CMS_PAGES,
  DEFAULT_COUPONS,
  DEFAULT_PAYMENT_CONFIGS,
  DEFAULT_SITE_SETTINGS,
} from '../data/cmsDefaults';

function slugToDocId(raw: string): string {
  const sanitized = raw
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
  return sanitized || `item-${Date.now()}`;
}

interface PlatformContextValue {
  loading: boolean;
  siteSettings: SiteSettingsDoc;
  cmsPages: Record<string, CmsPageDoc>;
  services: (ServiceItem & { status?: 'published' | 'draft' })[];
  programmes: ProgrammeItem[];
  workshops: WorkshopItem[];
  products: ProductItem[];
  articles: (ArticleItem & { status?: 'published' | 'draft'; coverImage?: string; tags?: string[] })[];
  research: ResearchItem[];
  testimonials: TestimonialDoc[];
  coupons: CouponDoc[];
  paymentConfigs: PaymentGatewayConfig[];
  enquiries: EnquiryRecord[];
  orders: OrderRecord[];
  enrolments: EnrolmentRecord[];
  certificates: CertificateRecord[];
  mediaAssets: MediaAssetDoc[];
  auditLogs: AuditLogRecord[];
  admins: AdminUserRecord[];
  adminEditTarget: { tab: string; pageId?: string; sectionId?: string } | null;
  requestAdminEdit: (tab: string, pageId?: string, sectionId?: string) => void;
  clearAdminEdit: () => void;

  // Actions
  submitEnquiry: (payload: {
    name: string;
    email: string;
    phone?: string;
    category: string;
    contactMethod?: string;
    message: string;
    consentAgreed: boolean;
  }) => Promise<string>;
  validateCoupon: (code: string) => Promise<CouponDoc | null>;
  verifyCertificateById: (certificateId: string) => Promise<CertificateRecord | null>;
  createPendingOrder: (order: Omit<OrderRecord, 'id' | 'createdAt'>) => Promise<OrderRecord>;
  attachPaymentVerification: (
    orderId: string,
    updates: {
      gateway: 'razorpay' | 'stripe' | 'upi_manual';
      gatewayOrderId?: string;
      transactionId: string;
      downloadToken?: string;
    }
  ) => Promise<void>;
  createInitialEnrolment: (
    enrolment: Omit<EnrolmentRecord, 'id' | 'createdAt' | 'attendanceStatus'>
  ) => Promise<EnrolmentRecord>;

  // Admin CMS & Management Actions
  saveSiteSettings: (next: Partial<SiteSettingsDoc>) => Promise<void>;
  saveCmsPage: (page: CmsPageDoc) => Promise<void>;
  saveCollectionItem: (
    collectionName:
      | 'services'
      | 'programmes'
      | 'workshops'
      | 'products'
      | 'articles'
      | 'research'
      | 'testimonials'
      | 'coupons'
      | 'media'
      | 'paymentConfigs'
      | 'certificates'
      | 'enrolments'
      | 'admins',
    id: string,
    data: Record<string, unknown>,
    auditAction?: string
  ) => Promise<void>;
  deleteCollectionItem: (
    collectionName:
      | 'services'
      | 'programmes'
      | 'workshops'
      | 'products'
      | 'articles'
      | 'research'
      | 'testimonials'
      | 'coupons'
      | 'media'
      | 'paymentConfigs'
      | 'certificates'
      | 'enquiries',
    id: string
  ) => Promise<void>;
  updateEnquiryAdmin: (
    id: string,
    updates: Partial<EnquiryRecord>
  ) => Promise<void>;
  updateOrderAdmin: (
    id: string,
    updates: Partial<OrderRecord>,
    auditLabel?: string
  ) => Promise<void>;
  seedInitialCloudCatalogue: () => Promise<void>;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, authReady, isAdmin, isVerifiedUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const [siteSettings, setSiteSettings] = useState<SiteSettingsDoc>(DEFAULT_SITE_SETTINGS);
  const [cmsPages, setCmsPages] = useState<Record<string, CmsPageDoc>>(DEFAULT_CMS_PAGES);
  const [cloudServices, setCloudServices] = useState<
    (ServiceItem & { status?: 'published' | 'draft' })[]
  >([]);
  const [cloudProgrammes, setCloudProgrammes] = useState<ProgrammeItem[]>([]);
  const [cloudWorkshops, setCloudWorkshops] = useState<WorkshopItem[]>([]);
  const [cloudProducts, setCloudProducts] = useState<ProductItem[]>([]);
  const [cloudArticles, setCloudArticles] = useState<
    (ArticleItem & { status?: 'published' | 'draft' })[]
  >([]);
  const [cloudResearch, setCloudResearch] = useState<ResearchItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialDoc[]>([]);
  const [coupons, setCoupons] = useState<CouponDoc[]>(DEFAULT_COUPONS);
  const [paymentConfigs, setPaymentConfigs] = useState<PaymentGatewayConfig[]>(
    DEFAULT_PAYMENT_CONFIGS
  );
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [enrolments, setEnrolments] = useState<EnrolmentRecord[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [mediaAssets, setMediaAssets] = useState<MediaAssetDoc[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>([]);
  const [admins, setAdmins] = useState<AdminUserRecord[]>([]);
  const [adminEditTarget, setAdminEditTarget] = useState<{
    tab: string;
    pageId?: string;
    sectionId?: string;
  } | null>(null);

  const requestAdminEdit = (tab: string, pageId?: string, sectionId?: string) => {
    setAdminEditTarget({ tab, pageId, sectionId });
  };
  const clearAdminEdit = () => setAdminEditTarget(null);

  // Public listeners
  useEffect(() => {
    if (!authReady) return;

    const unsubscribers: (() => void)[] = [];

    // 1. Site settings
    unsubscribers.push(
      onSnapshot(
        doc(db, 'siteSettings', 'main'),
        (snap) => {
          if (snap.exists()) {
            setSiteSettings({ ...DEFAULT_SITE_SETTINGS, ...(snap.data() as Partial<SiteSettingsDoc>), id: 'main' });
          }
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          handleFirestoreError(error, OperationType.GET, 'siteSettings/main');
        }
      )
    );

    // 2. CMS Pages
    const pagesQ = isAdmin
      ? collection(db, 'pages')
      : query(collection(db, 'pages'), where('status', '==', 'published'));
    unsubscribers.push(
      onSnapshot(
        pagesQ,
        (snap) => {
          if (!snap.empty) {
            const map: Record<string, CmsPageDoc> = { ...DEFAULT_CMS_PAGES };
            snap.forEach((d) => {
              map[d.id] = { ...(d.data() as CmsPageDoc), id: d.id };
            });
            setCmsPages(map);
          }
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'pages')
      )
    );

    // 3. Services
    const servicesQ = isAdmin
      ? collection(db, 'services')
      : query(collection(db, 'services'), where('status', '==', 'published'));
    unsubscribers.push(
      onSnapshot(
        servicesQ,
        (snap) => {
          setCloudServices(
            snap.docs.map((d) => ({ ...(d.data() as ServiceItem), id: d.id }))
          );
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'services')
      )
    );

    // 4. Programmes
    const programmesQ = isAdmin
      ? collection(db, 'programmes')
      : query(collection(db, 'programmes'), where('status', '==', 'published'));
    unsubscribers.push(
      onSnapshot(
        programmesQ,
        (snap) => {
          setCloudProgrammes(
            snap.docs.map((d) => ({ ...(d.data() as ProgrammeItem), id: d.id }))
          );
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'programmes')
      )
    );

    // 5. Workshops
    const workshopsQ = isAdmin
      ? collection(db, 'workshops')
      : query(collection(db, 'workshops'), where('status', '==', 'published'));
    unsubscribers.push(
      onSnapshot(
        workshopsQ,
        (snap) => {
          setCloudWorkshops(
            snap.docs.map((d) => ({ ...(d.data() as WorkshopItem), id: d.id }))
          );
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'workshops')
      )
    );

    // 6. Products
    const productsQ = isAdmin
      ? collection(db, 'products')
      : query(collection(db, 'products'), where('status', '==', 'published'));
    unsubscribers.push(
      onSnapshot(
        productsQ,
        (snap) => {
          setCloudProducts(
            snap.docs.map((d) => ({ ...(d.data() as ProductItem), id: d.id }))
          );
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'products')
      )
    );

    // 7. Articles
    const articlesQ = isAdmin
      ? collection(db, 'articles')
      : query(collection(db, 'articles'), where('status', '==', 'published'));
    unsubscribers.push(
      onSnapshot(
        articlesQ,
        (snap) => {
          setCloudArticles(
            snap.docs.map((d) => ({ ...(d.data() as ArticleItem), id: d.id }))
          );
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'articles')
      )
    );

    // 8. Research
    const researchQ = isAdmin
      ? collection(db, 'research')
      : query(collection(db, 'research'), where('status', '==', 'published'));
    unsubscribers.push(
      onSnapshot(
        researchQ,
        (snap) => {
          setCloudResearch(
            snap.docs.map((d) => ({ ...(d.data() as ResearchItem), id: d.id }))
          );
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'research')
      )
    );

    // 9. Testimonials
    const testimonialsQ = isAdmin
      ? collection(db, 'testimonials')
      : query(
          collection(db, 'testimonials'),
          where('approved', '==', true),
          where('visible', '==', true)
        );
    unsubscribers.push(
      onSnapshot(
        testimonialsQ,
        (snap) => {
          setTestimonials(
            snap.docs.map((d) => ({ ...(d.data() as TestimonialDoc), id: d.id }))
          );
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'testimonials')
      )
    );

    // 10. Coupons (admins list all; public validates on demand or reads active)
    if (isAdmin) {
      unsubscribers.push(
        onSnapshot(
          collection(db, 'coupons'),
          (snap) => {
            if (!snap.empty) {
              setCoupons(snap.docs.map((d) => ({ ...(d.data() as CouponDoc), id: d.id })));
            }
          },
          (error) => handleFirestoreError(error, OperationType.LIST, 'coupons')
        )
      );
    }

    return () => {
      unsubscribers.forEach((u) => u());
    };
  }, [authReady, isAdmin]);

  // Authenticated user & Admin-only listeners
  useEffect(() => {
    if (!authReady || !user || !isVerifiedUser) {
      setOrders([]);
      setEnrolments([]);
      setCertificates([]);
      setEnquiries([]);
      setMediaAssets([]);
      setAuditLogs([]);
      setAdmins([]);
      return;
    }

    const unsubscribers: (() => void)[] = [];

    // Orders (all for admin; userId scoped for learners)
    const ordersQ = isAdmin
      ? collection(db, 'orders')
      : query(collection(db, 'orders'), where('userId', '==', user.uid));
    unsubscribers.push(
      onSnapshot(
        ordersQ,
        (snap) => {
          const list = snap.docs
            .map((d) => ({ ...(d.data() as OrderRecord), id: d.id }))
            .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
          setOrders(list);
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'orders')
      )
    );

    // Enrolments
    const enrolmentsQ = isAdmin
      ? collection(db, 'enrolments')
      : query(collection(db, 'enrolments'), where('userId', '==', user.uid));
    unsubscribers.push(
      onSnapshot(
        enrolmentsQ,
        (snap) => {
          setEnrolments(
            snap.docs.map((d) => ({ ...(d.data() as EnrolmentRecord), id: d.id }))
          );
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'enrolments')
      )
    );

    // Certificates (scoped list for learner, full list for admin)
    const certsQ = isAdmin
      ? collection(db, 'certificates')
      : query(collection(db, 'certificates'), where('userId', '==', user.uid));
    unsubscribers.push(
      onSnapshot(
        certsQ,
        (snap) => {
          setCertificates(
            snap.docs.map((d) => ({ ...(d.data() as CertificateRecord), id: d.id }))
          );
        },
        (error) => handleFirestoreError(error, OperationType.LIST, 'certificates')
      )
    );

    if (isAdmin) {
      unsubscribers.push(
        onSnapshot(
          collection(db, 'paymentConfigs'),
          (snap) => {
            if (!snap.empty) {
              setPaymentConfigs(
                snap.docs.map((d) => ({ ...(d.data() as PaymentGatewayConfig), id: d.id }))
              );
            }
          },
          (error) => handleFirestoreError(error, OperationType.LIST, 'paymentConfigs')
        )
      );

      unsubscribers.push(
        onSnapshot(
          collection(db, 'enquiries'),
          (snap) => {
            const list = snap.docs
              .map((d) => ({ ...(d.data() as EnquiryRecord), id: d.id }))
              .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
            setEnquiries(list);
          },
          (error) => handleFirestoreError(error, OperationType.LIST, 'enquiries')
        )
      );

      unsubscribers.push(
        onSnapshot(
          collection(db, 'media'),
          (snap) => {
            setMediaAssets(
              snap.docs.map((d) => ({ ...(d.data() as MediaAssetDoc), id: d.id }))
            );
          },
          (error) => handleFirestoreError(error, OperationType.LIST, 'media')
        )
      );

      unsubscribers.push(
        onSnapshot(
          collection(db, 'auditLogs'),
          (snap) => {
            const list = snap.docs
              .map((d) => ({ ...(d.data() as AuditLogRecord), id: d.id }))
              .sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
            setAuditLogs(list);
          },
          (error) => handleFirestoreError(error, OperationType.LIST, 'auditLogs')
        )
      );

      unsubscribers.push(
        onSnapshot(
          collection(db, 'admins'),
          (snap) => {
            setAdmins(snap.docs.map((d) => d.data() as AdminUserRecord));
          },
          (error) => handleFirestoreError(error, OperationType.LIST, 'admins')
        )
      );
    }

    return () => {
      unsubscribers.forEach((u) => u());
    };
  }, [authReady, user, isVerifiedUser, isAdmin]);

  // Merged datasets with clean static fallbacks before cloud seeding
  const services = useMemo(
    () =>
      cloudServices.length > 0
        ? cloudServices
        : servicesData.map((s) => ({ ...s, status: 'published' as const })),
    [cloudServices]
  );

  const programmes = useMemo(
    () => (cloudProgrammes.length > 0 ? cloudProgrammes : programmesData),
    [cloudProgrammes]
  );

  const workshops = useMemo(
    () => (cloudWorkshops.length > 0 ? cloudWorkshops : workshopsData),
    [cloudWorkshops]
  );

  const products = useMemo(
    () => (cloudProducts.length > 0 ? cloudProducts : productsData),
    [cloudProducts]
  );

  const articles = useMemo(
    () =>
      cloudArticles.length > 0
        ? cloudArticles
        : articlesData.map((a) => ({ ...a, status: 'published' as const })),
    [cloudArticles]
  );

  const research = useMemo(
    () => (cloudResearch.length > 0 ? cloudResearch : researchData),
    [cloudResearch]
  );

  // Helper: write audit log safely
  const logAudit = async (
    action: string,
    targetCollection?: string,
    targetId?: string
  ) => {
    if (!isAdmin || !user?.email) return;
    const logId = `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const payload: AuditLogRecord = {
      id: logId,
      actorEmail: user.email.slice(0, 160),
      action: action.slice(0, 160),
      targetCollection: targetCollection?.slice(0, 80),
      targetId: targetId?.slice(0, 128),
      timestamp: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'auditLogs', logId), {
        actorEmail: payload.actorEmail,
        action: payload.action,
        ...(payload.targetCollection ? { targetCollection: payload.targetCollection } : {}),
        ...(payload.targetId ? { targetId: payload.targetId } : {}),
        timestamp: payload.timestamp,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `auditLogs/${logId}`);
    }
  };

  // Public actions
  const submitEnquiry = async (payload: {
    name: string;
    email: string;
    phone?: string;
    category: string;
    contactMethod?: string;
    message: string;
    consentAgreed: boolean;
  }): Promise<string> => {
    const id = `enq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const record = {
      name: payload.name.trim().slice(0, 120),
      email: payload.email.trim().slice(0, 160),
      ...(payload.phone?.trim() ? { phone: payload.phone.trim().slice(0, 40) } : {}),
      category: payload.category.trim().slice(0, 100),
      ...(payload.contactMethod?.trim()
        ? { contactMethod: payload.contactMethod.trim().slice(0, 60) }
        : {}),
      message: payload.message.trim().slice(0, 3000),
      consentAgreed: Boolean(payload.consentAgreed),
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'enquiries', id), record);
      return id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `enquiries/${id}`);
    }
  };

  const validateCoupon = async (rawCode: string): Promise<CouponDoc | null> => {
    const code = rawCode.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, '');
    if (!code) return null;
    try {
      const snap = await getDoc(doc(db, 'coupons', code));
      if (snap.exists()) {
        const c = snap.data() as CouponDoc;
        if (c.active) return { ...c, id: snap.id };
      }
      const localFallback = DEFAULT_COUPONS.find((c) => c.code === code && c.active);
      return localFallback || null;
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `coupons/${code}`);
    }
  };

  const verifyCertificateById = async (
    rawCertId: string
  ): Promise<CertificateRecord | null> => {
    const certId = slugToDocId(rawCertId.toUpperCase());
    if (!certId) return null;
    try {
      const snap = await getDoc(doc(db, 'certificates', certId));
      if (!snap.exists()) return null;
      return { ...(snap.data() as CertificateRecord), id: snap.id };
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `certificates/${certId}`);
    }
  };

  const createPendingOrder = async (
    order: Omit<OrderRecord, 'id' | 'createdAt'>
  ): Promise<OrderRecord> => {
    const id = `ord_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();
    const record: OrderRecord = {
      ...order,
      id,
      orderCode: order.orderCode.slice(0, 80),
      userId: order.userId.slice(0, 128),
      itemId: order.itemId.slice(0, 128),
      itemTitle: order.itemTitle.slice(0, 200),
      customerName: order.customerName?.slice(0, 120),
      customerEmail: order.customerEmail.slice(0, 160),
      paymentStatus: 'pending',
      createdAt: now,
    };

    const firestoreDoc: Record<string, unknown> = {
      orderCode: record.orderCode,
      userId: record.userId,
      itemType: record.itemType,
      itemId: record.itemId,
      itemTitle: record.itemTitle,
      customerEmail: record.customerEmail,
      amount: record.amount,
      currency: record.currency,
      gateway: record.gateway,
      paymentStatus: 'pending',
      createdAt: now,
    };
    if (record.customerName) firestoreDoc.customerName = record.customerName;
    if (record.couponApplied) firestoreDoc.couponApplied = record.couponApplied.slice(0, 40);
    if (record.gatewayOrderId) firestoreDoc.gatewayOrderId = record.gatewayOrderId.slice(0, 140);
    if (record.transactionId) firestoreDoc.transactionId = record.transactionId.slice(0, 140);

    try {
      await setDoc(doc(db, 'orders', id), firestoreDoc);
      return record;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `orders/${id}`);
    }
  };

  const attachPaymentVerification = async (
    orderId: string,
    updates: {
      gateway: 'razorpay' | 'stripe' | 'upi_manual';
      gatewayOrderId?: string;
      transactionId: string;
      downloadToken?: string;
    }
  ) => {
    const clean: Record<string, unknown> = {
      gateway: updates.gateway,
      transactionId: updates.transactionId.slice(0, 140),
    };
    if (updates.gatewayOrderId) clean.gatewayOrderId = updates.gatewayOrderId.slice(0, 140);
    if (updates.downloadToken) clean.downloadToken = updates.downloadToken.slice(0, 200);

    try {
      await updateDoc(doc(db, 'orders', orderId), clean);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const createInitialEnrolment = async (
    enrolment: Omit<EnrolmentRecord, 'id' | 'createdAt' | 'attendanceStatus'>
  ): Promise<EnrolmentRecord> => {
    const id = `enr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date().toISOString();
    const record: EnrolmentRecord = {
      ...enrolment,
      id,
      attendanceStatus: 'registered',
      completionPercent: 0,
      createdAt: now,
    };

    const payload: Record<string, unknown> = {
      userId: enrolment.userId.slice(0, 128),
      itemType: enrolment.itemType,
      itemId: enrolment.itemId.slice(0, 128),
      itemTitle: enrolment.itemTitle.slice(0, 200),
      attendanceStatus: 'registered',
      completionPercent: 0,
      createdAt: now,
    };
    if (enrolment.learnerName) payload.learnerName = enrolment.learnerName.slice(0, 120);
    if (enrolment.learnerEmail) payload.learnerEmail = enrolment.learnerEmail.slice(0, 160);
    if (enrolment.orderId) payload.orderId = enrolment.orderId.slice(0, 128);

    try {
      await setDoc(doc(db, 'enrolments', id), payload);
      return record;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `enrolments/${id}`);
    }
  };

  // Admin writes
  const saveSiteSettings = async (next: Partial<SiteSettingsDoc>) => {
    const merged: SiteSettingsDoc = {
      ...siteSettings,
      ...next,
      id: 'main',
      updatedAt: new Date().toISOString(),
    };
    const { id: _ignoreId, ...rest } = merged;
    try {
      await setDoc(doc(db, 'siteSettings', 'main'), rest);
      await logAudit('Updated Website & Payment Display Settings', 'siteSettings', 'main');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'siteSettings/main');
    }
  };

  const saveCmsPage = async (page: CmsPageDoc) => {
    const docId = slugToDocId(page.id || page.slug);
    const clean: Record<string, unknown> = {
      slug: docId,
      title: (page.title || 'Page').slice(0, 180),
      status: page.status === 'draft' ? 'draft' : 'published',
      sections: (page.sections || []).slice(0, 30),
      updatedAt: new Date().toISOString(),
    };
    if (page.subtitle) clean.subtitle = page.subtitle.slice(0, 400);
    if (page.heroHeading) clean.heroHeading = page.heroHeading.slice(0, 240);
    if (page.heroBody) clean.heroBody = page.heroBody.slice(0, 2000);
    if (page.heroImage) clean.heroImage = page.heroImage.slice(0, 500);
    if (page.ctaPrimaryLabel) clean.ctaPrimaryLabel = page.ctaPrimaryLabel.slice(0, 80);
    if (page.ctaSecondaryLabel) clean.ctaSecondaryLabel = page.ctaSecondaryLabel.slice(0, 80);
    if (page.seoTitle) clean.seoTitle = page.seoTitle.slice(0, 140);
    if (page.seoDescription) clean.seoDescription = page.seoDescription.slice(0, 320);

    try {
      await setDoc(doc(db, 'pages', docId), clean);
      await logAudit(`Saved CMS page (${page.status}): ${docId}`, 'pages', docId);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `pages/${docId}`);
    }
  };

  const saveCollectionItem = async (
    collectionName:
      | 'services'
      | 'programmes'
      | 'workshops'
      | 'products'
      | 'articles'
      | 'research'
      | 'testimonials'
      | 'coupons'
      | 'media'
      | 'paymentConfigs'
      | 'certificates'
      | 'enrolments'
      | 'admins',
    id: string,
    data: Record<string, unknown>,
    auditAction?: string
  ) => {
    const safeId = slugToDocId(id);
    const cleaned = Object.fromEntries(
      Object.entries(data).filter(([k, v]) => k !== 'id' && v !== undefined)
    );
    try {
      await setDoc(doc(db, collectionName, safeId), cleaned, { merge: true });
      await logAudit(
        auditAction || `Saved ${collectionName} item`,
        collectionName,
        safeId
      );
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `${collectionName}/${safeId}`);
    }
  };

  const deleteCollectionItem = async (
    collectionName:
      | 'services'
      | 'programmes'
      | 'workshops'
      | 'products'
      | 'articles'
      | 'research'
      | 'testimonials'
      | 'coupons'
      | 'media'
      | 'paymentConfigs'
      | 'certificates'
      | 'enquiries',
    id: string
  ) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      await logAudit(`Deleted ${collectionName} item`, collectionName, id);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    }
  };

  const updateEnquiryAdmin = async (
    id: string,
    updates: Partial<EnquiryRecord>
  ) => {
    const existing = enquiries.find((e) => e.id === id);
    if (!existing) return;
    const next = {
      name: existing.name,
      email: existing.email,
      ...(existing.phone ? { phone: existing.phone } : {}),
      category: existing.category,
      ...(existing.contactMethod ? { contactMethod: existing.contactMethod } : {}),
      message: existing.message,
      ...(existing.consentAgreed !== undefined
        ? { consentAgreed: existing.consentAgreed }
        : {}),
      status: updates.status || existing.status,
      ...(updates.internalNotes !== undefined
        ? { internalNotes: updates.internalNotes.slice(0, 2000) }
        : existing.internalNotes
        ? { internalNotes: existing.internalNotes }
        : {}),
      createdAt: existing.createdAt,
    };
    try {
      await setDoc(doc(db, 'enquiries', id), next);
      await logAudit(`Updated enquiry status -> ${next.status}`, 'enquiries', id);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `enquiries/${id}`);
    }
  };

  const updateOrderAdmin = async (
    id: string,
    updates: Partial<OrderRecord>,
    auditLabel?: string
  ) => {
    const cleaned = Object.fromEntries(
      Object.entries(updates).filter(([k, v]) => k !== 'id' && v !== undefined)
    );
    try {
      await updateDoc(doc(db, 'orders', id), cleaned);
      await logAudit(auditLabel || 'Updated order status', 'orders', id);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${id}`);
    }
  };

  const seedInitialCloudCatalogue = async () => {
    if (!isAdmin) return;
    await saveSiteSettings(DEFAULT_SITE_SETTINGS);
    for (const page of Object.values(DEFAULT_CMS_PAGES)) {
      await saveCmsPage(page);
    }
    for (const s of servicesData) {
      await saveCollectionItem('services', s.id, { ...s, status: 'published' }, `Seeded service ${s.title}`);
    }
    for (const p of programmesData) {
      await saveCollectionItem('programmes', p.id, { ...p }, `Seeded programme ${p.title}`);
    }
    for (const w of workshopsData) {
      await saveCollectionItem(
        'workshops',
        w.id,
        {
          slug: w.slug,
          title: w.title,
          bannerImage: w.bannerImage || '',
          shortDescription: w.shortDescription,
          learningObjectives: w.learningObjectives,
          dateTime: w.dateTime,
          duration: w.duration,
          audience: w.audience,
          feeINR: w.feeINR || 0,
          feeUSD: w.feeUSD || 0,
          fee: w.fee,
          deliveryFormat: w.deliveryFormat,
          closingDate: w.closingDate || '',
          eventStatus: w.eventStatus || 'Upcoming',
          status: 'published',
        },
        `Seeded workshop ${w.title}`
      );
    }
    for (const prod of productsData) {
      await saveCollectionItem(
        'products',
        prod.id,
        { ...prod, status: 'published' },
        `Seeded product ${prod.title}`
      );
    }
    for (const art of articlesData) {
      await saveCollectionItem(
        'articles',
        art.id,
        { ...art, status: 'published' },
        `Seeded article ${art.title}`
      );
    }
    for (const res of researchData) {
      await saveCollectionItem('research', res.id, { ...res }, `Seeded research ${res.title}`);
    }
    for (const c of DEFAULT_COUPONS) {
      await saveCollectionItem(
        'coupons',
        c.code,
        {
          code: c.code,
          discountType: c.discountType,
          value: c.value,
          expiryDate: c.expiryDate,
          active: c.active,
        },
        `Seeded coupon ${c.code}`
      );
    }
    for (const gw of DEFAULT_PAYMENT_CONFIGS) {
      await saveCollectionItem(
        'paymentConfigs',
        gw.id,
        {
          provider: gw.provider,
          displayName: gw.displayName,
          enabled: gw.enabled,
          isDefault: gw.isDefault,
          mode: gw.mode,
          publicKey: gw.publicKey,
          supportedMethods: gw.supportedMethods,
          webhookStatus: gw.webhookStatus,
          updatedAt: new Date().toISOString(),
        },
        `Seeded gateway ${gw.provider}`
      );
    }
  };

  return (
    <PlatformContext.Provider
      value={{
        loading,
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
        requestAdminEdit,
        clearAdminEdit,
        submitEnquiry,
        validateCoupon,
        verifyCertificateById,
        createPendingOrder,
        attachPaymentVerification,
        createInitialEnrolment,
        saveSiteSettings,
        saveCmsPage,
        saveCollectionItem,
        deleteCollectionItem,
        updateEnquiryAdmin,
        updateOrderAdmin,
        seedInitialCloudCatalogue,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) {
    throw new Error('usePlatform must be used inside PlatformProvider');
  }
  return ctx;
}

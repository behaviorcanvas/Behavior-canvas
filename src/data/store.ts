import { productsData, ProductItem } from './products';
import { brandConfig, BrandConfig } from './brand';
import { workshopsData, WorkshopItem } from './workshops';
import { articlesData, ArticleItem } from './articles';

export interface AnnouncementConfig {
  enabled: boolean;
  message: string;
  couponCode: string;
  discountPercent: number;
  welcomeCouponCode: string;
  welcomeDiscountPercent: number;
}

export interface InquiryRecord {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  contactMethod: string;
  message: string;
  status: 'new' | 'contacted' | 'archived';
}

export interface OrderRecord {
  id: string;
  date: string;
  productTitle: string;
  productId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  utrNumber?: string;
}

const STORAGE_KEYS = {
  PRODUCTS: 'bc_custom_products_v1',
  BRAND: 'bc_custom_brand_v1',
  ANNOUNCEMENT: 'bc_custom_announcement_v1',
  INQUIRIES: 'bc_inquiries_log_v1',
  ORDERS: 'bc_orders_log_v1',
  WORKSHOPS: 'bc_custom_workshops_v1',
  ARTICLES: 'bc_custom_articles_v1',
  ADMIN_PIN: 'bc_admin_pin_v1',
  ADMIN_SESSION: 'bc_admin_session_v1',
};

const DEFAULT_ANNOUNCEMENT: AnnouncementConfig = {
  enabled: true,
  message: 'Special Study Access: Use code GLOBALSTUDY for 15% off worldwide exam notes & clinical packages',
  couponCode: 'GLOBALSTUDY',
  discountPercent: 15,
  welcomeCouponCode: 'WELCOME10',
  welcomeDiscountPercent: 10,
};

// Dispatch custom event for real-time reactivity without page reload
function emitStoreUpdate(key: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bc_store_updated', { detail: { key } }));
  }
}

// ================= PRODUCTS =================
export function getStoredProducts(): ProductItem[] {
  if (typeof window === 'undefined') return productsData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) return productsData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : productsData;
  } catch (err) {
    console.error('Error reading stored products:', err);
    return productsData;
  }
}

export function saveStoredProducts(products: ProductItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  emitStoreUpdate('products');
}

export function resetStoredProducts(): ProductItem[] {
  if (typeof window === 'undefined') return productsData;
  localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
  emitStoreUpdate('products');
  return productsData;
}

// ================= BRAND CONFIG & PAYMENTS =================
export function getStoredBrandConfig(): BrandConfig {
  if (typeof window === 'undefined') return brandConfig;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BRAND);
    if (!raw) return brandConfig;
    return { ...brandConfig, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Error reading stored brand config:', err);
    return brandConfig;
  }
}

export function saveStoredBrandConfig(config: Partial<BrandConfig>): void {
  if (typeof window === 'undefined') return;
  const current = getStoredBrandConfig();
  const updated = { ...current, ...config };
  localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(updated));
  emitStoreUpdate('brand');
}

export function resetStoredBrandConfig(): BrandConfig {
  if (typeof window === 'undefined') return brandConfig;
  localStorage.removeItem(STORAGE_KEYS.BRAND);
  emitStoreUpdate('brand');
  return brandConfig;
}

// ================= ANNOUNCEMENT & COUPONS =================
export function getStoredAnnouncement(): AnnouncementConfig {
  if (typeof window === 'undefined') return DEFAULT_ANNOUNCEMENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
    if (!raw) return DEFAULT_ANNOUNCEMENT;
    return { ...DEFAULT_ANNOUNCEMENT, ...JSON.parse(raw) };
  } catch (err) {
    return DEFAULT_ANNOUNCEMENT;
  }
}

export function saveStoredAnnouncement(config: AnnouncementConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(config));
  emitStoreUpdate('announcement');
}

// ================= INQUIRIES LOG =================
export function getStoredInquiries(): InquiryRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function addStoredInquiry(record: Omit<InquiryRecord, 'id' | 'date' | 'status'>): void {
  if (typeof window === 'undefined') return;
  const current = getStoredInquiries();
  const newEntry: InquiryRecord = {
    ...record,
    id: 'inq_' + Date.now(),
    date: new Date().toISOString(),
    status: 'new',
  };
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify([newEntry, ...current]));
  emitStoreUpdate('inquiries');
}

export function updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'archived'): void {
  if (typeof window === 'undefined') return;
  const current = getStoredInquiries();
  const updated = current.map((i) => (i.id === id ? { ...i, status } : i));
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  emitStoreUpdate('inquiries');
}

export function deleteStoredInquiry(id: string): void {
  if (typeof window === 'undefined') return;
  const current = getStoredInquiries();
  const updated = current.filter((i) => i.id !== id);
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(updated));
  emitStoreUpdate('inquiries');
}

// ================= ORDERS LOG =================
export function getStoredOrders(): OrderRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

export function addStoredOrder(order: Omit<OrderRecord, 'id' | 'date'>): void {
  if (typeof window === 'undefined') return;
  const current = getStoredOrders();
  const newEntry: OrderRecord = {
    ...order,
    id: 'ord_' + Date.now(),
    date: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([newEntry, ...current]));
  emitStoreUpdate('orders');
}

// ================= WORKSHOPS =================
export function getStoredWorkshops(): WorkshopItem[] {
  if (typeof window === 'undefined') return workshopsData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WORKSHOPS);
    if (!raw) return workshopsData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : workshopsData;
  } catch (err) {
    console.error('Error reading stored workshops:', err);
    return workshopsData;
  }
}

export function saveStoredWorkshops(workshops: WorkshopItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.WORKSHOPS, JSON.stringify(workshops));
  emitStoreUpdate('workshops');
}

export function resetStoredWorkshops(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.WORKSHOPS);
  emitStoreUpdate('workshops');
}

// ================= ARTICLES / BLOG =================
export function getStoredArticles(): ArticleItem[] {
  if (typeof window === 'undefined') return articlesData;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!raw) return articlesData;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : articlesData;
  } catch (err) {
    console.error('Error reading stored articles:', err);
    return articlesData;
  }
}

export function saveStoredArticles(articles: ArticleItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  emitStoreUpdate('articles');
}

export function resetStoredArticles(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.ARTICLES);
  emitStoreUpdate('articles');
}

// ================= ADMIN AUTH =================
export function getAdminPin(): string {
  if (typeof window === 'undefined') return '2026';
  return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || '2026';
}

export function saveAdminPin(newPin: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin);
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
}

export function setAdminAuthenticated(auth: boolean): void {
  if (typeof window === 'undefined') return;
  if (auth) {
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
  } else {
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  }
}

export type RoutePath =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'resources'
  | 'product-detail'
  | 'workshops'
  | 'articles'
  | 'article-detail'
  | 'faq'
  | 'contact'
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'refund-and-cancellation-policy'
  | 'professional-disclaimer'
  | 'copyright-policy'
  | 'not-found';

export interface RouteState {
  path: RoutePath;
  param?: string;
}

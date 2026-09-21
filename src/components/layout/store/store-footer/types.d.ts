// All footer shape types are defined in `@/config/storefront` — the
// storefront channel registry needs them to type the retail/wholesale config
// objects, and that registry cannot import from `components/layout` (features
// depend on it too). Re-exported here so local consumers (`store-footer.tsx`,
// `contact-column.tsx`, `footer-column.tsx`) are unaffected.
export type {
  StoreFooterFeature,
  StoreFooterLink,
  StoreFooterColumn,
  StoreFooterSocial,
  StoreFooterContact,
  StoreFooterConfig,
} from '@/config/storefront';

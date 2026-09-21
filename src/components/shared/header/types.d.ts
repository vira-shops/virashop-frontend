import type { ButtonColor } from '@/components/ui';

// `NavItem`, `UserAction`, and `StoreHeaderConfig` are defined in
// `@/config/storefront` — the storefront channel registry needs them to
// type the retail/wholesale config objects, and that registry cannot import
// from `components/shared` (features depend on it too). Re-exported here so
// local consumers (`mobile-menu.tsx`, `user-actions.tsx`) and existing
// `@/components/shared` call sites are unaffected.
export type { NavItem, UserAction, StoreHeaderConfig } from '@/config/storefront';

export interface HeaderCTA {
  label: string;
  href: string;
  color?: ButtonColor;
}

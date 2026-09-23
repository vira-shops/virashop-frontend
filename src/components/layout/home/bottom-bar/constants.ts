import type { LandingBottomBarItem } from './types';

/**
 * Quick-category chips on the landing's mobile bar. Static UI config, not API
 * data — the labels come straight from the design. No `href` yet: the
 * destinations are still being decided, so the chips report their id instead
 * of navigating.
 */
export const LANDING_BOTTOM_BAR_ITEMS: LandingBottomBarItem[] = [
  { id: 'supermarket', label: 'سوپرمارکت' },
  { id: 'fruit', label: 'میوه' },
  { id: 'fast-food', label: 'فست فود' },
  { id: 'bakery', label: 'نانوایی' },
];

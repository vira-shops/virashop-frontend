import type { NavItem } from '@/components/shared';
import { PATHS } from '@/routes/paths';

export const landingHeaderConfig = {
  logo: {
    src: '/images/landing/header/header-logo.svg',
    alt: 'ویراشاپ',
  },
  brandName: 'ویراشاپ',
  ctas: [
    { label: 'فروش خرده ', href: PATHS.RETAIL.ROOT, color: 'retail' as const },
    { label: 'فروش عمده', href: PATHS.WHOLESALE.ROOT, color: 'wholesale' as const },
  ],
  navItems: [
    { label: 'عمده فروشی', href: PATHS.WHOLESALE.ROOT },
    { label: 'خرده فروشی', href: PATHS.RETAIL.ROOT },
    { label: 'درباره ما', href: PATHS.ABOUT },
    { label: 'تماس با ما', href: PATHS.CONTACT },
    { label: 'بلاگ', href: PATHS.BLOG },
  ] satisfies NavItem[],
};

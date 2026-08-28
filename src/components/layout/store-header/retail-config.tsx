import type { StoreHeaderConfig } from '@/components/shared';
import { SearchIcon, UserIcon, BasketIcon } from '@icons';
import { PATHS } from '@/routes/paths';

export const retailConfig: StoreHeaderConfig = {
  logo: {
    src: '/images/landing/header/header-logo.svg',
    alt: 'ویراشاپ خرده',
  },
  brandName: 'ویراشاپ',
  navItems: [
    { label: 'دسته‌بندی‌ها', href: PATHS.RETAIL.CATEGORIES },
    { label: 'پرفروش‌ها', href: PATHS.RETAIL.BEST_SELLERS },
    { label: 'تخفیف‌ها', href: PATHS.RETAIL.OFFERS },
    { label: 'درباره ما', href: PATHS.ABOUT },
    { label: 'تماس با ما', href: PATHS.CONTACT },
  ],
  userActions: [
    { icon: <SearchIcon />, ariaLabel: 'جستجو' },
    { icon: <UserIcon />, ariaLabel: 'ورود', href: PATHS.AUTH.LOGIN },
    { icon: <BasketIcon />, ariaLabel: 'سبد خرید', href: PATHS.CART },
  ],
};

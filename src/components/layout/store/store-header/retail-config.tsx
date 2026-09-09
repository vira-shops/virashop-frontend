'use client';

import type { StoreHeaderConfig } from '@/components/shared';
import { SearchIcon, HeartIcon, BasketIcon } from '@icons';
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
    { label: 'وبلاگ', href: PATHS.BLOG },
  ],
  userActions: [
    { icon: <SearchIcon />, ariaLabel: 'جستجو' },
    { icon: <HeartIcon />, ariaLabel: 'ورود', href: PATHS.AUTH.LOGIN },
    { icon: <BasketIcon />, ariaLabel: 'سبد خرید', href: PATHS.CART },
  ],
};

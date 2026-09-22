import type { Metadata } from 'next';

const SITE_NAME = 'ویراشاپس';
const SITE_URL = 'https://virashop.com';
const DEFAULT_DESCRIPTION =
  'فروشگاه اینترنتی ویراشاپس — خرید آنلاین با بهترین قیمت و تضمین بازگشت کالا';

export const configMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    type: 'website',
    locale: 'fa_IR',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ['/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const wholesaleMetadata: Metadata = {
  title: {
    default: 'عمده فروشی',
    template: `%s | عمده فروشی ${SITE_NAME}`,
  },
  description: `خرید عمده با بهترین قیمت از ${SITE_NAME}`,
  openGraph: {
    title: `عمده فروشی ${SITE_NAME}`,
    description: `خرید عمده با بهترین قیمت از ${SITE_NAME}`,
    type: 'website',
  },
};

export const retailMetadata: Metadata = {
  title: {
    default: 'خرده فروشی',
    template: `%s | خرده فروشی ${SITE_NAME}`,
  },
  description: `خرید آنلاین با بهترین قیمت از ${SITE_NAME}`,
  openGraph: {
    title: `خرده فروشی ${SITE_NAME}`,
    description: `خرید آنلاین با بهترین قیمت از ${SITE_NAME}`,
    type: 'website',
  },
};

export const homeMetadata: Metadata = {
  title: `${SITE_NAME} — فروشگاه اینترنتی`,
};

export const aboutMetadata: Metadata = {
  title: 'درباره ما',
};

export const contactMetadata: Metadata = {
  title: 'تماس با ما',
};

export const blogMetadata: Metadata = {
  title: 'بلاگ',
};

export const cartMetadata: Metadata = {
  title: 'سبد خرید',
  robots: { index: false, follow: false },
};

export const loginMetadata: Metadata = {
  title: 'ورود',
  robots: { index: false, follow: false },
};

export const registerMetadata: Metadata = {
  title: 'ثبت‌نام',
  robots: { index: false, follow: false },
};

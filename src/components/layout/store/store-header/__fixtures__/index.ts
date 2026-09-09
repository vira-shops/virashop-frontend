import type { PopularCategoriesResponse } from '@/contracts/endpoints/categories/schemas';
import { PATHS } from '@/routes/paths';

/** Mock user location — replace with backend data once the location endpoint is wired. */
export const MOCK_USER_CITY = 'تهران';

/** Primary nav items in the retail mobile sidebar (top of drawer). */
export const PRIMARY_NAV_ITEMS = [
  { label: 'بلاگ', href: PATHS.BLOG },
  { label: 'تخفیف‌ها', href: PATHS.RETAIL.OFFERS },
  { label: 'درباره ما', href: PATHS.ABOUT },
  { label: 'پرفروش‌ترین‌ها', href: PATHS.RETAIL.BEST_SELLERS },
] as const;

/** Mobile nav items for the retail sidebar — includes Favorites with heart icon. */
export const MOBILE_NAV_ITEMS: ReadonlyArray<{
  label: string;
  href: string;
  icon?: string;
}> = [
  { label: 'مورد علاقه‌ها', href: PATHS.RETAIL.FAVORITES, icon: 'HeartIcon' },
  { label: 'بلاگ', href: PATHS.BLOG },
  { label: 'تخفیف‌ها', href: PATHS.RETAIL.OFFERS },
  { label: 'درباره ما', href: PATHS.ABOUT },
  { label: 'پرفروش‌ترین‌ها', href: PATHS.RETAIL.BEST_SELLERS },
];

/** Secondary nav items in the desktop header (after CategoriesDropdown). */
export const DESKTOP_NAV_ITEMS = [
  { label: 'پرفروش‌ها', href: PATHS.RETAIL.BEST_SELLERS },
  { label: 'تخفیف‌ها', href: PATHS.RETAIL.OFFERS },
  { label: 'درباره ما', href: PATHS.ABOUT },
  { label: 'وبلاگ', href: PATHS.BLOG },
] as const;

export const CATEGORIES_SECTION_TITLE = 'دسته‌بندی';
export const CATEGORIES_SECTION_ICON = 'ShopIcon';

/**
 * Mock popular categories used in tests and (optionally) in the live retail sidebar.
 * Mirrors the contract mock shape: category → subcategory groups (سرگروه) → items
 * (زیرمجموعه) — the same three-level tree the desktop mega menu and the mobile
 * sidebar accordion both render.
 */
export const POPULAR_CATEGORIES_MOCK: PopularCategoriesResponse = [
  {
    id: 'food',
    slug: 'food',
    title: 'مواد غذایی',
    image: '/images/landing/big-offer/01.png',
    imageAlt: 'مواد غذایی',
    productCount: 128,
    href: '/retail/category/food',
    icon: 'BottleIcon',
    subcategories: [
      {
        id: 'food-staples',
        title: 'کالای اساسی',
        href: '/retail/category/food/food-staples',
        items: [
          {
            id: 'food-staples-1',
            title: 'نان حجیم',
            href: '/retail/category/food/food-staples/food-staples-1',
          },
          {
            id: 'food-staples-2',
            title: 'ماکارونی فرمی',
            href: '/retail/category/food/food-staples/food-staples-2',
          },
          {
            id: 'food-staples-3',
            title: 'شکر سفید',
            href: '/retail/category/food/food-staples/food-staples-3',
          },
        ],
      },
      {
        id: 'food-oils',
        title: 'روغن و چاشنی',
        href: '/retail/category/food/food-oils',
        items: [
          {
            id: 'food-oils-1',
            title: 'روغن زیتون فرابکر',
            href: '/retail/category/food/food-oils/food-oils-1',
          },
          {
            id: 'food-oils-2',
            title: 'سرکه سیب',
            href: '/retail/category/food/food-oils/food-oils-2',
          },
        ],
      },
      {
        id: 'food-pasta',
        title: 'پاستا و نودل',
        href: '/retail/category/food/food-pasta',
        items: [
          {
            id: 'food-pasta-1',
            title: 'اسپاگتی شماره ۵',
            href: '/retail/category/food/food-pasta/food-pasta-1',
          },
        ],
      },
      {
        id: 'food-tea',
        title: 'چای و نوشیدنی گرم',
        href: '/retail/category/food/food-tea',
        items: [
          {
            id: 'food-tea-1',
            title: 'چای سیاه ممتاز',
            href: '/retail/category/food/food-tea/food-tea-1',
          },
        ],
      },
      {
        id: 'food-sauces',
        title: 'سس و رب',
        href: '/retail/category/food/food-sauces',
        items: [
          {
            id: 'food-sauces-1',
            title: 'سس مایونز',
            href: '/retail/category/food/food-sauces/food-sauces-1',
          },
        ],
      },
      {
        id: 'food-honey',
        title: 'عسل و ارده',
        href: '/retail/category/food/food-honey',
        items: [
          {
            id: 'food-honey-1',
            title: 'عسل کوهستان',
            href: '/retail/category/food/food-honey/food-honey-1',
          },
        ],
      },
    ],
    products: [
      {
        id: 'food-1',
        title: 'برنج ایرانی طارم ۱۰ کیلویی',
        image: '/images/landing/big-offer/01.png',
        imageAlt: 'برنج ایرانی طارم ۱۰ کیلویی',
        href: '/retail/food-1',
      },
      {
        id: 'food-2',
        title: 'روغن سرخ‌کردنی آفتابگردان',
        image: '/images/landing/big-offer/02.png',
        imageAlt: 'روغن سرخ‌کردنی آفتابگردان',
        href: '/retail/food-2',
      },
    ],
  },
  {
    id: 'protein',
    slug: 'protein',
    title: 'پروتئینی',
    image: '/images/landing/big-offer/02.png',
    imageAlt: 'پروتئینی',
    productCount: 64,
    href: '/retail/category/protein',
    icon: 'FishIcon',
    subcategories: [
      {
        id: 'protein-red-meat',
        title: 'گوشت قرمز',
        href: '/retail/category/protein/protein-red-meat',
        items: [
          {
            id: 'protein-red-meat-1',
            title: 'گوشت گوساله راسته',
            href: '/retail/category/protein/protein-red-meat/protein-red-meat-1',
          },
          {
            id: 'protein-red-meat-2',
            title: 'راسته گوسفندی',
            href: '/retail/category/protein/protein-red-meat/protein-red-meat-2',
          },
          {
            id: 'protein-red-meat-3',
            title: 'گوشت چرخ‌کرده مخلوط',
            href: '/retail/category/protein/protein-red-meat/protein-red-meat-3',
          },
        ],
      },
      {
        id: 'protein-poultry',
        title: 'مرغ و ماکیان',
        href: '/retail/category/protein/protein-poultry',
        items: [
          {
            id: 'protein-poultry-1',
            title: 'سینه مرغ بدون استخوان',
            href: '/retail/category/protein/protein-poultry/protein-poultry-1',
          },
          {
            id: 'protein-poultry-2',
            title: 'ران مرغ',
            href: '/retail/category/protein/protein-poultry/protein-poultry-2',
          },
        ],
      },
      {
        id: 'protein-seafood',
        title: 'آبزیان',
        href: '/retail/category/protein/protein-seafood',
        items: [
          {
            id: 'protein-seafood-1',
            title: 'میگوی جنوب',
            href: '/retail/category/protein/protein-seafood/protein-seafood-1',
          },
          {
            id: 'protein-seafood-2',
            title: 'فیله قزل‌آلا',
            href: '/retail/category/protein/protein-seafood/protein-seafood-2',
          },
        ],
      },
      {
        id: 'protein-eggs',
        title: 'تخم‌مرغ',
        href: '/retail/category/protein/protein-eggs',
        items: [
          {
            id: 'protein-eggs-1',
            title: 'تخم‌مرغ مازاد',
            href: '/retail/category/protein/protein-eggs/protein-eggs-1',
          },
          {
            id: 'protein-eggs-2',
            title: 'تخم‌مرغ محلی',
            href: '/retail/category/protein/protein-eggs/protein-eggs-2',
          },
        ],
      },
    ],
    products: [],
  },
  {
    id: 'dairy',
    slug: 'dairy',
    title: 'لبنیات',
    image: '/images/landing/big-offer/03.png',
    imageAlt: 'لبنیات',
    productCount: 45,
    href: '/retail/category/dairy',
    icon: 'CackeIcon',
    subcategories: [
      {
        id: 'dairy-milk',
        title: 'شیر',
        href: '/retail/category/dairy/dairy-milk',
        items: [
          {
            id: 'dairy-milk-1',
            title: 'شیر پرچرب پاستوریزه',
            href: '/retail/category/dairy/dairy-milk/dairy-milk-1',
          },
          {
            id: 'dairy-milk-2',
            title: 'شیر کم‌چرب',
            href: '/retail/category/dairy/dairy-milk/dairy-milk-2',
          },
        ],
      },
      {
        id: 'dairy-yogurt',
        title: 'ماست و دوغ',
        href: '/retail/category/dairy/dairy-yogurt',
        items: [
          {
            id: 'dairy-yogurt-1',
            title: 'ماست سون',
            href: '/retail/category/dairy/dairy-yogurt/dairy-yogurt-1',
          },
        ],
      },
      {
        id: 'dairy-cheese',
        title: 'پنیر',
        href: '/retail/category/dairy/dairy-cheese',
        items: [
          {
            id: 'dairy-cheese-1',
            title: 'پنیر لیقوان',
            href: '/retail/category/dairy/dairy-cheese/dairy-cheese-1',
          },
        ],
      },
      {
        id: 'dairy-butter',
        title: 'کره و خامه',
        href: '/retail/category/dairy/dairy-butter',
        items: [
          {
            id: 'dairy-butter-1',
            title: 'کره حیوانی',
            href: '/retail/category/dairy/dairy-butter/dairy-butter-1',
          },
        ],
      },
    ],
    products: [],
  },
  {
    id: 'snacks',
    slug: 'snacks',
    title: 'تنقلات',
    image: '/images/landing/big-offer/04.png',
    imageAlt: 'تنقلات',
    productCount: 87,
    href: '/retail/category/snacks',
    icon: 'CheeseIcon',
    subcategories: [
      {
        id: 'snacks-chips',
        title: 'چیپس و پفک',
        href: '/retail/category/snacks/snacks-chips',
        items: [
          {
            id: 'snacks-chips-1',
            title: 'چیپس سیب‌زمینی نمکی',
            href: '/retail/category/snacks/snacks-chips/snacks-chips-1',
          },
        ],
      },
      {
        id: 'snacks-biscuit',
        title: 'بیسکویت و کیک',
        href: '/retail/category/snacks/snacks-biscuit',
        items: [
          {
            id: 'snacks-biscuit-1',
            title: 'بیسکویت مادر',
            href: '/retail/category/snacks/snacks-biscuit/snacks-biscuit-1',
          },
        ],
      },
      {
        id: 'snacks-chocolate',
        title: 'شکلات',
        href: '/retail/category/snacks/snacks-chocolate',
        items: [
          {
            id: 'snacks-chocolate-1',
            title: 'شکلات شیری',
            href: '/retail/category/snacks/snacks-chocolate/snacks-chocolate-1',
          },
        ],
      },
      {
        id: 'snacks-nuts',
        title: 'آجیل و خشکبار',
        href: '/retail/category/snacks/snacks-nuts',
        items: [
          {
            id: 'snacks-nuts-1',
            title: 'آجیل مخلوط شور',
            href: '/retail/category/snacks/snacks-nuts/snacks-nuts-1',
          },
        ],
      },
    ],
    products: [],
  },
  {
    id: 'beverages',
    slug: 'beverages',
    title: 'نوشیدنی‌ها',
    image: '/images/landing/big-offer/05.png',
    imageAlt: 'نوشیدنی‌ها',
    productCount: 52,
    href: '/retail/category/beverages',
    icon: 'BottleIcon',
    subcategories: [
      {
        id: 'beverages-soda',
        title: 'نوشابه',
        href: '/retail/category/beverages/beverages-soda',
        items: [
          {
            id: 'beverages-soda-1',
            title: 'نوشابه کوکاکولا',
            href: '/retail/category/beverages/beverages-soda/beverages-soda-1',
          },
        ],
      },
      {
        id: 'beverages-juice',
        title: 'آبمیوه',
        href: '/retail/category/beverages/beverages-juice',
        items: [
          {
            id: 'beverages-juice-1',
            title: 'آبمیوه پرتقال',
            href: '/retail/category/beverages/beverages-juice/beverages-juice-1',
          },
        ],
      },
      {
        id: 'beverages-water',
        title: 'آب معدنی',
        href: '/retail/category/beverages/beverages-water',
        items: [
          {
            id: 'beverages-water-1',
            title: 'آب معدنی نیم لیتری',
            href: '/retail/category/beverages/beverages-water/beverages-water-1',
          },
        ],
      },
      {
        id: 'beverages-tea',
        title: 'چای سرد',
        href: '/retail/category/beverages/beverages-tea',
        items: [
          {
            id: 'beverages-tea-1',
            title: 'چای سرد لیمو',
            href: '/retail/category/beverages/beverages-tea/beverages-tea-1',
          },
        ],
      },
    ],
    products: [],
  },
  {
    id: 'detergents',
    slug: 'detergents',
    title: 'شویندگان',
    image: '/images/landing/big-offer/01.png',
    imageAlt: 'شویندگان',
    productCount: 73,
    href: '/retail/category/detergents',
    icon: 'LeafIcon',
    subcategories: [
      {
        id: 'detergents-laundry',
        title: 'شوینده لباس',
        href: '/retail/category/detergents/detergents-laundry',
        items: [
          {
            id: 'detergents-laundry-1',
            title: 'پودر لباسشویی',
            href: '/retail/category/detergents/detergents-laundry/detergents-laundry-1',
          },
        ],
      },
      {
        id: 'detergents-dish',
        title: 'مایع ظرفشویی',
        href: '/retail/category/detergents/detergents-dish',
        items: [
          {
            id: 'detergents-dish-1',
            title: 'مایع ظرفشویی لیمویی',
            href: '/retail/category/detergents/detergents-dish/detergents-dish-1',
          },
        ],
      },
      {
        id: 'detergents-cleaner',
        title: 'جرم‌گیر و سفیدکننده',
        href: '/retail/category/detergents/detergents-cleaner',
        items: [
          {
            id: 'detergents-cleaner-1',
            title: 'جرم‌گیر دستشویی',
            href: '/retail/category/detergents/detergents-cleaner/detergents-cleaner-1',
          },
        ],
      },
      {
        id: 'detergents-personal',
        title: 'بهداشت شخصی',
        href: '/retail/category/detergents/detergents-personal',
        items: [
          {
            id: 'detergents-personal-1',
            title: 'شامپو بدن',
            href: '/retail/category/detergents/detergents-personal/detergents-personal-1',
          },
        ],
      },
    ],
    products: [],
  },
  {
    id: 'fruits',
    slug: 'fruits',
    title: 'میوه و سبزیجات',
    image: '/images/landing/big-offer/02.png',
    imageAlt: 'میوه و سبزیجات',
    productCount: 96,
    href: '/retail/category/fruits',
    icon: 'LeafIcon',
    subcategories: [
      {
        id: 'fruits-apple',
        title: 'سیب',
        href: '/retail/category/fruits/fruits-apple',
        items: [
          {
            id: 'fruits-apple-1',
            title: 'سیب قرمز دماوند',
            href: '/retail/category/fruits/fruits-apple/fruits-apple-1',
          },
        ],
      },
      {
        id: 'fruits-citrus',
        title: 'مرکبات',
        href: '/retail/category/fruits/fruits-citrus',
        items: [
          {
            id: 'fruits-citrus-1',
            title: 'پرتقال تامسون',
            href: '/retail/category/fruits/fruits-citrus/fruits-citrus-1',
          },
        ],
      },
      {
        id: 'fruits-banana',
        title: 'موز',
        href: '/retail/category/fruits/fruits-banana',
        items: [
          {
            id: 'fruits-banana-1',
            title: 'موز اکوادور',
            href: '/retail/category/fruits/fruits-banana/fruits-banana-1',
          },
        ],
      },
      {
        id: 'fruits-vegetables',
        title: 'سبزیجات',
        href: '/retail/category/fruits/fruits-vegetables',
        items: [
          {
            id: 'fruits-vegetables-1',
            title: 'فلفل دلمه‌ای',
            href: '/retail/category/fruits/fruits-vegetables/fruits-vegetables-1',
          },
        ],
      },
    ],
    products: [],
  },
  {
    id: 'sweets',
    slug: 'sweets',
    title: 'شیرینی‌جات',
    image: '/images/landing/big-offer/03.png',
    imageAlt: 'شیرینی‌جات',
    productCount: 38,
    href: '/retail/category/sweets',
    icon: 'CackeIcon',
    subcategories: [
      {
        id: 'sweets-traditional',
        title: 'سنتی',
        href: '/retail/category/sweets/sweets-traditional',
        items: [
          {
            id: 'sweets-traditional-1',
            title: 'شیرینی نخودچی',
            href: '/retail/category/sweets/sweets-traditional/sweets-traditional-1',
          },
        ],
      },
      {
        id: 'sweets-cake',
        title: 'کیک و کلوچه',
        href: '/retail/category/sweets/sweets-cake',
        items: [
          {
            id: 'sweets-cake-1',
            title: 'کیک یزدی',
            href: '/retail/category/sweets/sweets-cake/sweets-cake-1',
          },
        ],
      },
      {
        id: 'sweets-gaz',
        title: 'گز و سوهان',
        href: '/retail/category/sweets/sweets-gaz',
        items: [
          {
            id: 'sweets-gaz-1',
            title: 'گز اصفهان',
            href: '/retail/category/sweets/sweets-gaz/sweets-gaz-1',
          },
        ],
      },
      {
        id: 'sweets-chocolate',
        title: 'شیرینی تختی',
        href: '/retail/category/sweets/sweets-chocolate',
        items: [
          {
            id: 'sweets-chocolate-1',
            title: 'پشمک',
            href: '/retail/category/sweets/sweets-chocolate/sweets-chocolate-1',
          },
        ],
      },
    ],
    products: [],
  },
];

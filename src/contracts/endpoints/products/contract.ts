import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
import { toFaDigits } from '@/utils/format';
import {
  CATEGORY_LIST,
  CATEGORY_TREE_MOCK,
  PRODUCT_IMAGES,
  PRODUCT_TITLES,
} from '@/contracts/endpoints/categories/contract';
import {
  ProductDetailQuerySchema,
  ProductDetailSchema,
  ProductListQuerySchema,
  ProductListResponseSchema,
  SellerOfferDetailQuerySchema,
  SellerOfferDetailSchema,
  SellerOffersQuerySchema,
  SellerOffersResponseSchema,
  type ProductCard,
  type ProductDetail,
  type SellerOffer,
  type SellerOfferDetail,
  type SellerOfferSort,
} from './schemas';

/** Single seller for every mock product — matches the backend guide's search example. */
const MOCK_SELLER = {
  id: 1,
  shopName: 'ویراشاپسس',
  logoKey: 'virashops',
  logoUrl: null,
};

/**
 * ~60 mock `ProductCard`s across all 8 categories, reusing the same
 * slugs/titles/images as the categories mock so the two stay consistent.
 * Prices/discounts/stock vary deterministically by index for realistic-
 * looking listing pages without needing real photography or copy yet.
 */
export const PRODUCTS_MOCK: ProductCard[] = CATEGORY_LIST.flatMap((category, categoryIndex) => {
  const titles = PRODUCT_TITLES[category.slug] ?? [];

  return titles.map((name, productIndex) => {
    const id = categoryIndex * 100 + productIndex + 1;
    const slug = `${category.slug}-${productIndex + 1}`;
    const basePrice = 150_000 + ((categoryIndex * 7 + productIndex * 3) % 20) * 85_000;
    const hasDiscount = productIndex % 3 === 0;
    const discountPercent = hasDiscount ? [10, 15, 20, 30][productIndex % 4] : 0;
    const price = hasDiscount
      ? Math.round((basePrice * (100 - discountPercent)) / 100 / 1000) * 1000
      : basePrice;
    const stockStatus =
      productIndex % 11 === 0 ? 'OUT_OF_STOCK' : productIndex % 7 === 0 ? 'LOW_STOCK' : 'IN_STOCK';

    return {
      id,
      slug,
      name,
      imageKey: null,
      imageUrl: PRODUCT_IMAGES[(categoryIndex + productIndex) % PRODUCT_IMAGES.length],
      price,
      compareAtPrice: hasDiscount ? basePrice : null,
      discountPercent,
      badges: hasDiscount ? [`${discountPercent}%`] : [],
      stockStatus,
      seller: MOCK_SELLER,
      storeCount: 1,
      channel: 'RETAIL',
    } satisfies ProductCard;
  });
});

/**
 * Mock product → the category slugs it belongs to, at every depth (L1 + one
 * L2 group + one L3 leaf). `ProductCard` carries no category field, so the
 * listing's category filter needs this side table to answer «which products
 * are in نان?» in mock mode. Products are spread round-robin over their
 * category's groups/leaves so every filter combination returns something.
 */
export const MOCK_PRODUCT_CATEGORY_SLUGS: Record<string, string[]> = Object.fromEntries(
  CATEGORY_TREE_MOCK.flatMap((l1) => {
    const products = PRODUCTS_MOCK.filter((product) => product.slug.startsWith(`${l1.slug}-`));

    return products.map((product, index) => {
      const group = l1.children[index % Math.max(1, l1.children.length)];
      const leaf = group?.children[index % Math.max(1, group.children.length)];

      return [
        product.slug,
        [l1.slug, group?.slug, leaf?.slug].filter((slug): slug is string => Boolean(slug)),
      ] as const;
    });
  }),
);

/** `true` when the product sits under ANY of the given category slugs. */
export const isProductInCategories = (productSlug: string, categorySlugs: string[]): boolean => {
  const lineage = MOCK_PRODUCT_CATEGORY_SLUGS[productSlug] ?? [];

  return categorySlugs.some((slug) => lineage.includes(slug));
};

const findProductBySlug = (slug: string): ProductCard | undefined =>
  PRODUCTS_MOCK.find((product) => product.slug === slug);

const CATEGORY_ID_BY_SLUG = new Map(CATEGORY_TREE_MOCK.map((node) => [node.slug, node]));

/** Builds a full `ProductDetail` mock for any known mock product slug. */
const buildProductDetailMock = (slug: string): ProductDetail | undefined => {
  const card = findProductBySlug(slug);

  if (!card) return undefined;

  const categorySlug = slug.split('-').slice(0, -1).join('-');
  const categoryNode = CATEGORY_ID_BY_SLUG.get(categorySlug);
  const related = PRODUCTS_MOCK.filter(
    (product) => product.slug.startsWith(`${categorySlug}-`) && product.slug !== slug,
  ).slice(0, 6);

  return {
    ...card,
    shortDescription: `${card.name} — کیفیت تضمینی، ارسال سریع.`,
    description: `${card.name} با بهترین کیفیت و بسته‌بندی استاندارد، مناسب مصرف خانگی و تجاری. این محصول تحت نظارت کیفی ویراشاپسس عرضه می‌شود.`,
    brand: 'ویراشاپسس',
    sku: `SKU-${card.id}`,
    gallery: PRODUCT_IMAGES.map((src, index) => ({
      imageKey: src,
      url: src,
      alt: card.name,
      isPrimary: index === 0,
      sortOrder: index,
    })),
    specs: [
      { key: 'weight', label: 'وزن', value: '۱ کیلوگرم' },
      { key: 'package', label: 'بسته‌بندی', value: 'کارتن ۱۲ عددی' },
      { key: 'origin', label: 'مبدا', value: 'ایران' },
    ],
    productionDate: null,
    expiryDate: null,
    category: categoryNode
      ? { id: categoryNode.id, slug: categoryNode.slug, name: categoryNode.name }
      : { id: 0, slug: categorySlug, name: categorySlug },
    wholesale: null,
    related,
  } satisfies ProductDetail;
};

/** `channel=WHOLESALE` adds tiered pricing — only computed when requested. */
const withWholesalePricing = (detail: ProductDetail): ProductDetail => ({
  ...detail,
  channel: 'WHOLESALE',
  wholesale: {
    moq: 10,
    maxQty: 500,
    packMultiple: 10,
    cashPrice: detail.price,
    packPrice: Math.round((detail.price * 10 * 0.92) / 1000) * 1000,
    installment: { months: 3, monthlyFeePercent: 2.5 },
    tiers: [
      { minQty: 10, maxQty: 49, unitPrice: detail.price },
      { minQty: 50, maxQty: 199, unitPrice: Math.round((detail.price * 0.95) / 1000) * 1000 },
      { minQty: 200, maxQty: null, unitPrice: Math.round((detail.price * 0.88) / 1000) * 1000 },
    ],
  },
});

/**
 * Representative product-detail mock. Mock-mode limitation (documented
 * elsewhere in this codebase): the static contract mock can't key off the
 * requested `{slug}` path param, so `use-product.ts` resolves the correct
 * mock detail (any of the ~60 `PRODUCTS_MOCK` slugs) itself and only falls
 * back to this fixed payload for an unmocked case.
 */
const FIRST_DETAIL_MOCK = buildProductDetailMock(PRODUCTS_MOCK[0].slug)!;

/* =========================================================
   Seller offers («فروشنده ها») — mock only
   ========================================================= */

/**
 * Invented storefronts, not real marketplaces — the PDP's seller list has no
 * endpoint yet, so `use-seller-offers.ts` forces this mock (same pattern as
 * the best-sellers banner). Replace with the real payload when
 * `GET /products/{slug}/offers` ships.
 */
const SELLER_OFFER_SEEDS = [
  {
    shopName: 'پارس کالا',
    isFeatured: true,
    city: 'یزد',
    membershipYears: 1,
    priceFactor: 1,
    discountPercent: 20,
    installmentMonths: 12,
    commissionPercent: 5,
    shippingType: 'باربری',
    stockLabel: '۵تن (فروش عمده و خرده)',
    distanceKm: 4,
    updatedAt: '2026-02-27',
  },
  {
    shopName: 'هایپر کالا',
    isFeatured: false,
    city: 'یزد',
    membershipYears: 1,
    priceFactor: 1.02,
    discountPercent: 0,
    installmentMonths: null,
    commissionPercent: null,
    shippingType: 'باربری',
    stockLabel: '۵تن (فروش عمده و خرده)',
    distanceKm: 11,
    updatedAt: '2026-02-27',
  },
  {
    shopName: 'پخش آرین',
    isFeatured: true,
    city: 'اصفهان',
    membershipYears: 3,
    priceFactor: 1.05,
    discountPercent: 20,
    installmentMonths: 6,
    commissionPercent: 4,
    shippingType: 'پست پیشتاز',
    stockLabel: '۲تن (فروش عمده)',
    distanceKm: 280,
    updatedAt: '2026-02-20',
  },
  {
    shopName: 'نیک‌کالا',
    isFeatured: false,
    city: 'تهران',
    membershipYears: 5,
    priceFactor: 1.08,
    discountPercent: 10,
    installmentMonths: 3,
    commissionPercent: 6,
    shippingType: 'تیپاکس',
    stockLabel: '۸۰۰ کیلو (فروش خرده)',
    distanceKm: 620,
    updatedAt: '2026-02-11',
  },
] as const;

/** Sellers carrying the product beyond the four listed — drives «نمایش N فروشگاه دیگر». */
const SELLER_OFFERS_HIDDEN_COUNT = 24;

/**
 * Builds the seller list for one product. Each offer's `price` is derived
 * from the product's own price, so the cheapest offer always matches the
 * headline «قیمت از» exactly as the real endpoint would.
 *
 * «مناسب ترین» (best) ranks on price after discount, then on how close the
 * seller is — the tab is a value judgement, not a single field.
 */
export const buildSellerOffersMock = (
  slug: string,
  sort: SellerOfferSort = 'cheapest',
  basePrice?: number,
): { items: SellerOffer[]; total: number } | undefined => {
  const product = PRODUCTS_MOCK.find((item) => item.slug === slug) ?? PRODUCTS_MOCK[0];

  if (!product) return undefined;

  // Real products are not in the mock catalog, so the caller passes the live
  // price — otherwise the seller list would quote a different product's.
  const anchorPrice = basePrice ?? product.price;

  const rows = SELLER_OFFER_SEEDS.map((seed, index) => ({
    distanceKm: seed.distanceKm,
    offer: {
      id: product.id * 100 + index,
      seller: {
        id: 900_100 + index,
        shopName: seed.shopName,
        logoKey: null,
        logoUrl: null,
      },
      isFeatured: seed.isFeatured,
      price: Math.round((anchorPrice * seed.priceFactor) / 1000) * 1000,
      discountPercent: seed.discountPercent,
      installmentMonths: seed.installmentMonths,
      commissionPercent: seed.commissionPercent,
      city: seed.city,
      membershipYears: seed.membershipYears,
      shippingType: seed.shippingType,
      stockLabel: seed.stockLabel,
      updatedAt: seed.updatedAt,
    } satisfies SellerOffer,
  }));

  const netPrice = (row: (typeof rows)[number]) =>
    row.offer.price * (1 - row.offer.discountPercent / 100);

  const sorted = [...rows].sort((a, b) => {
    if (sort === 'nearest') return a.distanceKm - b.distanceKm;
    if (sort === 'best') return netPrice(a) - netPrice(b) || a.distanceKm - b.distanceKm;
    return a.offer.price - b.offer.price;
  });

  return {
    items: sorted.map((row) => row.offer),
    total: rows.length + SELLER_OFFERS_HIDDEN_COUNT,
  };
};

const SELLER_OFFERS_MOCK = buildSellerOffersMock(PRODUCTS_MOCK[0].slug)!;

/* =========================================================
   One seller's offer in detail — mock only
   ========================================================= */

/** Tomans → «۲٬۵۴۰٬۰۰۰ تومان», the format every table row in this view uses. */
const offerMoney = (value: number): string =>
  `${toFaDigits(Math.round(value).toLocaleString('en-US').replace(/,/g, '٬'))} تومان`;

/** Volume brackets of the «طرح فروش شیرینگ» table, with their unit discount. */
const SHRINK_TIERS = [
  { id: 'tier-1', label: '۱ تا ۵ شل', factor: 1 },
  { id: 'tier-2', label: '۵ تا ۱۰ شل', factor: 0.97 },
  { id: 'tier-3', label: '۱۰ تا ۲۰ شل', factor: 0.94 },
  { id: 'tier-4', label: '۲۰ شل به بالا', factor: 0.9 },
] as const;

/** Payment terms of the calculator grid, with the surcharge each one carries. */
const PAYMENT_TERMS = [
  { id: 'cash', label: 'نقدی', factor: 1 },
  { id: 'month-1', label: 'یک ماهه', factor: 1.04 },
  { id: 'month-2', label: 'دو ماهه', factor: 1.08 },
  { id: 'month-3', label: 'سه ماهه', factor: 1.12 },
  { id: 'month-4', label: 'چهار ماهه', factor: 1.16 },
  { id: 'month-5', label: 'پنج ماهه', factor: 1.2 },
] as const;

/** Swatches behind the «N رنگ» attribute row. */
const OFFER_COLORS = ['#F87171', '#FB923C', '#A855F7', '#3B82F6', '#22C55E'];

/** Units per shrink pack — the «شل (۱۲ عددی)» row. */
const UNITS_PER_SHRINK = 12;

/**
 * Expands one seller offer into the tables the selected-seller view renders.
 * Every figure is derived from the offer's own price so the page stays
 * internally consistent; swap the whole builder for the real payload when
 * `GET /products/{slug}/offers/{offerId}` ships.
 */
export const buildSellerOfferDetailMock = (
  slug: string,
  offerId: number,
  basePrice?: number,
): SellerOfferDetail | undefined => {
  const offers = buildSellerOffersMock(slug, 'cheapest', basePrice);
  const offer = offers?.items.find((item) => item.id === offerId) ?? offers?.items[0];

  if (!offer) return undefined;

  const consumerPrice =
    Math.round(offer.price / (1 - offer.discountPercent / 100 || 1) / 1000) * 1000;
  const basePriceRow = Math.round((consumerPrice * 0.9) / 1000) * 1000;
  const cashPrice = Math.round((consumerPrice * 0.8) / 1000) * 1000;
  const bulkPrice = Math.round((consumerPrice * 0.75) / 1000) * 1000;
  const shrinkPrice = offer.price * UNITS_PER_SHRINK;

  return {
    ...offer,
    tariffs: [
      {
        id: 'consumer',
        label: 'قیمت مصرف کننده',
        value: offerMoney(consumerPrice),
        isStruck: true,
      },
      {
        id: 'base',
        label: 'قیمت پایه (اقساطی یا چکی)',
        value: offerMoney(basePriceRow),
        isStruck: false,
      },
      { id: 'cash', label: 'تخفیف نقدی ۲۰٪', value: offerMoney(cashPrice), isStruck: false },
      { id: 'bulk', label: 'تخفیف عمده (حجمی) ۵٪', value: offerMoney(bulkPrice), isStruck: false },
    ],
    installmentRows: [
      { id: 'unit', label: 'نقدی دانه', value: offerMoney(offer.price), isStruck: false },
      {
        id: 'shrink',
        label: `شل (${toFaDigits(UNITS_PER_SHRINK)} عددی)`,
        value: offerMoney(shrinkPrice),
        isStruck: false,
      },
      {
        id: 'months',
        label: 'تعداد اقساط',
        value: offer.installmentMonths ? `${toFaDigits(offer.installmentMonths)} ماهه` : 'ندارد',
        isStruck: false,
      },
      {
        id: 'fee',
        label: 'کارمزد ماهانه',
        value: offer.commissionPercent
          ? `${toFaDigits(offer.commissionPercent)}٪ (بانکی)`
          : 'ندارد',
        isStruck: false,
      },
    ],
    shrinkTiers: SHRINK_TIERS.map((tier) => ({
      id: tier.id,
      label: tier.label,
      value: offerMoney(Math.round((shrinkPrice * tier.factor) / 1000) * 1000),
      isStruck: false,
    })),
    shrinkNote: 'قیمت هر شل',
    attributes: [
      { id: 'produced', label: 'تاریخ تولید', value: '۱۴۰۲/۰۵/۱۷', isStruck: false },
      { id: 'expires', label: 'تاریخ انقضا', value: '۱۴۰۲/۰۵/۱۷', isStruck: false },
      { id: 'colors', label: `${toFaDigits(OFFER_COLORS.length)} رنگ`, value: '', isStruck: false },
    ],
    colors: OFFER_COLORS,
    calculator: {
      note: 'چک ۱۰ روزه نقدی محاسبه می‌شود.',
      terms: PAYMENT_TERMS.map((term) => ({
        id: term.id,
        label: term.label,
        price: Math.round((shrinkPrice * term.factor) / 1000) * 1000,
      })),
      defaultTermId: 'cash',
      rows: [],
      quantities: [
        {
          id: 'shrink-count',
          unit: 'شل',
          min: 1,
          max: 45,
          defaultValue: 3,
          ariaLabel: 'تعداد شل',
        },
      ],
      sliders: [
        { id: 'days', unit: 'روز', min: 1, max: 120, defaultValue: 45, ariaLabel: 'مدت پرداخت' },
        { id: 'shrinks', unit: 'شل', min: 1, max: 45, defaultValue: 3, ariaLabel: 'تعداد شل' },
        { id: 'units', unit: 'عدد', min: 1, max: 3, defaultValue: 1, ariaLabel: 'تعداد دانه' },
      ],
    },
  } satisfies SellerOfferDetail;
};

const SELLER_OFFER_DETAIL_MOCK = buildSellerOfferDetailMock(
  PRODUCTS_MOCK[0].slug,
  SELLER_OFFERS_MOCK.items[0].id,
)!;

export const productsContracts = {
  products: {
    /** `GET /products` — filtered/sorted/paginated list. */
    getList: {
      method: 'GET',
      path: '/products',
      request: ProductListQuerySchema,
      response: apiResponseWrapper(ProductListResponseSchema),
      mockData: mockDataWrapper({
        items: PRODUCTS_MOCK.slice(0, 20),
        total: PRODUCTS_MOCK.length,
        page: 1,
        limit: 20,
      }),
    },

    /** `GET /products/{slug}` — detail + gallery + specs + optional wholesale block. */
    getDetail: {
      method: 'GET',
      path: '/products/{slug}',
      request: ProductDetailQuerySchema,
      response: apiResponseWrapper(ProductDetailSchema),
      mockData: mockDataWrapper(FIRST_DETAIL_MOCK),
    },

    /**
     * `GET /products/{slug}/offers` — every storefront carrying the product.
     * NOT LIVE YET: the route 404s on the current backend, so
     * `use-seller-offers.ts` forces `mockData`. Same mock-mode limitation as
     * `getDetail` — the static mock can't key off `{slug}`, so the hook
     * resolves the right payload with `buildSellerOffersMock`.
     */
    getOffers: {
      method: 'GET',
      path: '/products/{slug}/offers',
      request: SellerOffersQuerySchema,
      response: apiResponseWrapper(SellerOffersResponseSchema),
      mockData: mockDataWrapper(SELLER_OFFERS_MOCK),
    },

    /**
     * `GET /products/{slug}/offers/{offerId}` — one seller's full terms:
     * tariffs, installments, volume brackets and the calculator inputs.
     * NOT LIVE YET, same as `getOffers` — `use-seller-offer.ts` forces the mock.
     */
    getOfferDetail: {
      method: 'GET',
      path: '/products/{slug}/offers/{offerId}',
      request: SellerOfferDetailQuerySchema,
      response: apiResponseWrapper(SellerOfferDetailSchema),
      mockData: mockDataWrapper(SELLER_OFFER_DETAIL_MOCK),
    },
  },
} as const satisfies Contracts;

export { buildProductDetailMock, findProductBySlug, withWholesalePricing };

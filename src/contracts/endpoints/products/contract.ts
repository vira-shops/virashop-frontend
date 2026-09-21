import { Contracts, apiResponseWrapper, mockDataWrapper } from '@/connections';
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
  type ProductCard,
  type ProductDetail,
} from './schemas';

/** Single seller for every mock product — matches the backend guide's search example. */
const MOCK_SELLER = {
  id: 1,
  shopName: 'ویراشاپس',
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
    description: `${card.name} با بهترین کیفیت و بسته‌بندی استاندارد، مناسب مصرف خانگی و تجاری. این محصول تحت نظارت کیفی ویراشاپس عرضه می‌شود.`,
    brand: 'ویراشاپس',
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
  },
} as const satisfies Contracts;

export { buildProductDetailMock, findProductBySlug, withWholesalePricing };

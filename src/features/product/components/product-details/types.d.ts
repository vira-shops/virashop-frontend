import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/components/shared/breadcrumb/types';
import type { ProductGalleryImage } from '@/components/shared/product-gallery/types';
import type {
  OfferCalculator,
  OfferTableRow,
  ProductDetail,
  SellerOffer,
  SellerOfferDetail,
  SellerOfferSort,
  WholesaleInfo,
} from '@/contracts/endpoints/products';
import type { Channel } from '@/validations/primitives';

export interface ProductDetailsProps {
  /**
   * Plain channel value, not the full StorefrontChannel — a Server
   * Component page can't pass the full config as a prop (its `header`/
   * `footer` embed icon components and `paths` embeds functions, neither
   * serializable across the server→client boundary). Resolved internally.
   */
  channel: Channel;
  slug: string;
}

export interface ProductDetailsViewModel {
  product?: ProductDetail;
  isLoading: boolean;
  breadcrumbItems: BreadcrumbItem[];
  images: ProductGalleryImage[];
  /** Spec values shown as bullets under the title. */
  highlights: string[];
  startBadge?: string;
  endBadge?: string;
  offers: SellerOffer[];
  offersTotal: number;
  offersLoading: boolean;
  sort: SellerOfferSort;
  setSort: (sort: SellerOfferSort) => void;
  buyHref: string;
  bestSellersHref: string;
  /** Id of the seller whose terms are open, or `undefined` for the list. */
  selectedOfferId?: number;
  selectedOffer?: SellerOfferDetail;
  selectedOfferLoading: boolean;
  /** Builds the href that opens one seller's terms. */
  hrefForOffer: (offerId: number) => string;
  /** Clears the selection and returns to the seller list. */
  clearSelectedOffer: () => void;
  /** Puts the selected seller's offer in the basket and opens the checkout. */
  addSelectedOfferToCart: () => void;
  /** Storefront `data-theme` value. */
  theme: string;
}

/* ---------------- Parts ---------------- */

export interface OfferTableProps {
  title: string;
  /** Muted caption beside the title, e.g. «قیمت هر شل». */
  note?: string;
  rows: OfferTableRow[];
  /** Extra content rendered inside a row, keyed by row id (e.g. colour swatches). */
  renderValue?: (row: OfferTableRow) => ReactNode;
  /** Right-aligned link under the last row, e.g. «بیشتر». */
  footer?: ReactNode;
  className?: string;
}

export interface ProductBuyBarProps {
  shopName: string;
  price: number;
  href: string;
}

export interface ProductSummaryCardProps {
  name: string;
  images: ProductGalleryImage[];
  /** Short bullet facts under the title — the product's specs, values only. */
  highlights: string[];
  price: number;
  compareAtPrice: number | null;
  discountPercent: number;
  /** Top-start badge, e.g. «اقساط ۵ ماهه». */
  startBadge?: string;
  /** Top-end badge, e.g. «۲۰٪ تخفیف». */
  endBadge?: string;
  /** Wholesale tier/MOQ pricing — replaces the «قیمت از» row when present. */
  wholesale: WholesaleInfo | null;
  /**
   * Hides the price row. The selected-seller view moves the price into its
   * buy panel, so the card would otherwise print it twice. @default true
   */
  showPrice?: boolean;
}

export interface PurchaseAsideProps {
  price: number;
  onAddToCart?: () => void;
}

export interface SellerOfferCardProps {
  offer: SellerOffer;
  /** Opens this seller's full terms — the selected-seller view of the PDP. */
  href: string;
}

export interface SellerOfferViewProps {
  product: ProductDetail;
  offer?: SellerOfferDetail;
  isLoading: boolean;
  images: ProductGalleryImage[];
  highlights: string[];
  startBadge?: string;
  endBadge?: string;
  /** Back to the full seller list. */
  onShowAllSellers: () => void;
  onAddToCart: () => void;
}

export interface SellerOffersProps {
  offers: SellerOffer[];
  /** Every seller carrying the product, including the ones not listed. */
  total: number;
  isLoading: boolean;
  sort: SellerOfferSort;
  onSortChange: (sort: SellerOfferSort) => void;
  /** Builds the href that opens one seller's terms. */
  hrefForOffer: (offerId: number) => string;
}

export interface ViraCalculatorProps {
  calculator: OfferCalculator;
}

export interface OfferChipProps {
  children: ReactNode;
}

export interface QuickActionProps {
  label: string;
  children: ReactNode;
}

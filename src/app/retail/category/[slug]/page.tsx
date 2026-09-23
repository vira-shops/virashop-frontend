import type { Metadata } from 'next';
import { RetailLayout } from '@/layouts/retail-layout';
import { BestSellersSection, BigOfferSection } from '@/components/shared';
import {
  RetailHero,
  PromoSlider,
  WeeklyOffers,
  PromoBanners,
  PopularBrands,
} from '@/features/storefront';
import { PATHS } from '@/routes/paths';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: 'دسته‌بندی' };

/**
 * Category landing — the retail storefront page scoped to one category
 * (Figma: `shop`). Same sections as `/retail` in the same order; the hero
 * names the category and shows its children, and every view-all drops into
 * that category's product listing instead of the storefront-wide one.
 */
export default async function RetailCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const productsHref = PATHS.RETAIL.CATEGORY_PRODUCTS(slug);

  return (
    <RetailLayout>
      <RetailHero categorySlug={slug} />
      <PromoSlider />
      <WeeklyOffers viewAllHref={productsHref} />
      <PromoBanners />
      <BestSellersSection
        link={{ label: 'مشاهده همه', href: productsHref }}
        className="bg-blue-50 py-10"
      />
      <PopularBrands />
      <BigOfferSection
        link={{ label: 'مشاهده همه', href: productsHref }}
        className="bg-blue-50 py-10"
      />
    </RetailLayout>
  );
}

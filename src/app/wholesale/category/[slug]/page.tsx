import type { Metadata } from 'next';
import { WholesaleLayout } from '@/layouts/wholesale-layout';
import { BestSellersSection, BigOfferSection, OfferBanner } from '@/components/shared';
import { WholesaleHero, PromoBanners } from '@/features/storefront';
import { PATHS } from '@/routes/paths';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: 'دسته‌بندی' };

/**
 * Category landing — the wholesale storefront page scoped to one category
 * (Figma: `shop`). The hero names the category and shows its children, so the
 * storefront landing's own category showcase, brand strip and features grid
 * drop out; every view-all drops into that category's product listing.
 */
export default async function WholesaleCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const productsHref = PATHS.WHOLESALE.CATEGORY_PRODUCTS(slug);

  return (
    <WholesaleLayout>
      <WholesaleHero categorySlug={slug} />
      <OfferBanner />
      <BigOfferSection link={{ label: 'مشاهده همه', href: productsHref }} />
      <PromoBanners />
      <BestSellersSection link={{ label: 'مشاهده همه', href: productsHref }} />
    </WholesaleLayout>
  );
}

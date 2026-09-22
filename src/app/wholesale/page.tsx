import type { Metadata } from 'next';
import { wholesaleMetadata } from '@/config/metadata';
import { WholesaleLayout } from '@/layouts/wholesale-layout';
import { BestSellersSection, OfferBanner } from '@/components/shared';
import {
  WholesaleHero,
  CategoryShowcase,
  SpecialOffers,
  PartnerBrandsStrip,
  FeaturesGrid,
} from '@/features/storefront';
import { PATHS } from '@/routes/paths';

export const metadata: Metadata = wholesaleMetadata;

export default function WholesalePage() {
  return (
    <WholesaleLayout>
      <WholesaleHero />
      <OfferBanner />
      <CategoryShowcase />
      <SpecialOffers />
      <PartnerBrandsStrip />
      <BestSellersSection link={{ label: 'مشاهده همه', href: PATHS.WHOLESALE.BEST_SELLERS }} />
      <FeaturesGrid />
    </WholesaleLayout>
  );
}

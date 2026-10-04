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
      {/* Past the banner the design opens up to 120px between sections. */}
      <div className="flex flex-col gap-13 md:gap-[120px]">
        <CategoryShowcase />
        <SpecialOffers />
        <PartnerBrandsStrip />
        <BestSellersSection
          link={{ label: 'مشاهده همه', href: PATHS.WHOLESALE.BEST_SELLERS }}
          className="bg-blue-50 py-11"
        />
        <FeaturesGrid />
      </div>
    </WholesaleLayout>
  );
}

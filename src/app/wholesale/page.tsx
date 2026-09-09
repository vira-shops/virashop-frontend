import type { Metadata } from 'next';
import { wholesaleMetadata } from '@/config/metadata';
import { WholesaleLayout } from '@/layouts/wholesale-layout';
import { OfferBanner } from '@/features/landing';
import {
  WholesaleHero,
  CategoryShowcase,
  SpecialOffers,
  PartnerBrandsStrip,
  BestSellers,
  FeaturesGrid,
} from '@/features/wholesale';

export const metadata: Metadata = wholesaleMetadata;

export default function WholesalePage() {
  return (
    <WholesaleLayout>
      <WholesaleHero />
      <OfferBanner />
      <CategoryShowcase />
      <SpecialOffers />
      <PartnerBrandsStrip />
      <BestSellers />
      <FeaturesGrid />
    </WholesaleLayout>
  );
}

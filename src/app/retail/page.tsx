import type { Metadata } from 'next';
import { retailMetadata } from '@/config/metadata';
import { RetailLayout } from '@/layouts/retail-layout';
import {
  RetailHero,
  PromoSlider,
  WeeklyOffers,
  PromoBanners,
  BestSellers,
  BigOffer,
  PopularBrands,
} from '@/features/retail';

export const metadata: Metadata = retailMetadata;

export default function RetailPage() {
  return (
    <RetailLayout>
      <RetailHero />
      <PromoSlider className="my-10" />
      <WeeklyOffers />
      <PromoBanners />
      <BestSellers />
      <PopularBrands />
      <BigOffer />
    </RetailLayout>
  );
}

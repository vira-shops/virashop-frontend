import type { Metadata } from 'next';
import { retailMetadata } from '@/config/metadata';
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

export const metadata: Metadata = retailMetadata;

export default function RetailPage() {
  return (
    <RetailLayout>
      <RetailHero />
      <PromoSlider />
      <WeeklyOffers />
      <PromoBanners />
      <BestSellersSection
        link={{ label: 'مشاهده همه', href: PATHS.RETAIL.BEST_SELLERS }}
        className="bg-blue-50 py-10"
      />
      <PopularBrands />
      <BigOfferSection
        link={{ label: 'مشاهده همه', href: PATHS.RETAIL.OFFERS }}
        className="bg-blue-50 py-10"
      />
    </RetailLayout>
  );
}

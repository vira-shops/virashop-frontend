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
} from '@/features/retail';
import { PATHS } from '@/routes/paths';

export const metadata: Metadata = retailMetadata;

export default function RetailPage() {
  return (
    <RetailLayout>
      <RetailHero />
      <PromoSlider className="my-10" />
      <WeeklyOffers />
      <PromoBanners />
      <BestSellersSection
        link={{ label: 'مشاهده همه', href: PATHS.RETAIL.BEST_SELLERS }}
        className="my-11 bg-blue-50 sm:my-10"
      />
      <PopularBrands />
      <BigOfferSection
        link={{ label: 'مشاهده همه', href: PATHS.RETAIL.OFFERS }}
        className="my-14 bg-blue-50 sm:my-20"
      />
    </RetailLayout>
  );
}

import { Metadata } from 'next';
import { homeMetadata } from '@/config/metadata';
import { HomeLayout } from '@/layouts/home-layout';
import { BestSellersSection, BigOfferSection, OfferBanner } from '@/components/shared';
import { Hero, MakeFuture, PartnerBrands, TechNews } from '@/features/landing';
import { PATHS } from '@/routes/paths';

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return (
    <HomeLayout>
      <Hero />
      <OfferBanner />
      <BigOfferSection
        link={{ label: 'مشاهده همه', href: PATHS.RETAIL.OFFERS }}
        className="bg-blue-50 py-10 md:py-11"
      />
      <OfferBanner />
      <MakeFuture />
      <BestSellersSection
        link={{ label: 'مشاهده همه', href: PATHS.RETAIL.BEST_SELLERS }}
        className="bg-blue-50 py-10 max-md:mt-12 md:py-11"
      />
      <PartnerBrands />
      <TechNews />
    </HomeLayout>
  );
}

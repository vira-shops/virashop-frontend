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
      <div className="mt-18 sm:mt-96">
        <OfferBanner />
      </div>
      <BigOfferSection
        link={{ label: 'مشاهده همه', href: PATHS.RETAIL.OFFERS }}
        className="my-11 bg-blue-50 sm:my-10"
      />
      <OfferBanner />
      <MakeFuture />
      <BestSellersSection
        link={{ label: 'مشاهده همه', href: PATHS.RETAIL.BEST_SELLERS }}
        className="my-11 bg-blue-50 sm:my-10"
      />
      <PartnerBrands />
      <TechNews />
    </HomeLayout>
  );
}

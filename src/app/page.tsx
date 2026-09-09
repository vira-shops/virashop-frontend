import { Metadata } from 'next';
import { homeMetadata } from '@/config/metadata';
import { HomeLayout } from '@/layouts/home-layout';
import {
  BestSellers,
  BigOffer,
  Hero,
  MakeFuture,
  OfferBanner,
  PartnerBrands,
  TechNews,
} from '@/features/landing';

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return (
    <HomeLayout>
      <Hero />
      <div className="mt-18 sm:mt-96">
        <OfferBanner />
      </div>
      <BigOffer />
      <OfferBanner />
      <MakeFuture />
      <BestSellers />
      <PartnerBrands />
      <TechNews />
    </HomeLayout>
  );
}

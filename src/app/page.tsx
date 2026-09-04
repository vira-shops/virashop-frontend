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
      <OfferBanner />
      <BigOffer />
      <OfferBanner />
      <MakeFuture />
      <BestSellers />
      <PartnerBrands />
      <TechNews />
    </HomeLayout>
  );
}

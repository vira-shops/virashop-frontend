import { Metadata } from 'next';
import { homeMetadata } from '@/config/metadata';
import { HomeLayout } from '@/layouts/home-layout';

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return <HomeLayout>ویرا شاپ</HomeLayout>;
}

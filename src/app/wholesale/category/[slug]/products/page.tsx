import type { Metadata } from 'next';
import { WholesaleLayout } from '@/layouts/wholesale-layout';
import { ProductListing } from '@/features/catalog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: 'دسته‌بندی محصولات' };

export default async function WholesaleCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <WholesaleLayout>
      <ProductListing channel="WHOLESALE" categorySlug={slug} />
    </WholesaleLayout>
  );
}

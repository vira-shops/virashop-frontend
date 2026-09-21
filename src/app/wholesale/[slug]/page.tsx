import type { Metadata } from 'next';
import { WholesaleLayout } from '@/layouts/wholesale-layout';
import { ProductDetails } from '@/features/product';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: 'جزئیات محصول' };

export default async function WholesaleProductPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <WholesaleLayout>
      <ProductDetails channel="WHOLESALE" slug={slug} />
    </WholesaleLayout>
  );
}

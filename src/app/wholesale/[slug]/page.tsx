import type { Metadata } from 'next';
import { WholesaleLayout } from '@/layouts/wholesale-layout';
import { ProductDetails } from '@/features/product';
import { wholesaleChannel } from '@/config/storefront';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: 'جزئیات محصول' };

export default async function WholesaleProductPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <WholesaleLayout>
      <ProductDetails channel={wholesaleChannel} slug={slug} />
    </WholesaleLayout>
  );
}

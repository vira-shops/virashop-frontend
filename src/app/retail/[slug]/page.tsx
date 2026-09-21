import type { Metadata } from 'next';
import { RetailLayout } from '@/layouts/retail-layout';
import { ProductDetails } from '@/features/product';
import { retailChannel } from '@/config/storefront';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: 'جزئیات محصول' };

export default async function RetailProductPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <RetailLayout>
      <ProductDetails channel={retailChannel} slug={slug} />
    </RetailLayout>
  );
}

import type { Metadata } from 'next';
import { RetailLayout } from '@/layouts/retail-layout';
import { ProductListing } from '@/features/catalog';
import { retailChannel } from '@/config/storefront';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: 'دسته‌بندی محصولات' };

export default async function RetailCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <RetailLayout>
      <ProductListing channel={retailChannel} categorySlug={slug} />
    </RetailLayout>
  );
}

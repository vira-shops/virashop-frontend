import type { Metadata } from 'next';
import { WholesaleLayout } from '@/layouts/wholesale-layout';
import { ProductListing } from '@/features/wholesale';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const metadata: Metadata = { title: 'دسته‌بندی محصولات' };

export default async function WholesaleCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <WholesaleLayout>
      <ProductListing categorySlug={slug} />
    </WholesaleLayout>
  );
}

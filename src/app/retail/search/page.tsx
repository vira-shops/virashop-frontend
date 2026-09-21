import type { Metadata } from 'next';
import { RetailLayout } from '@/layouts/retail-layout';
import { SearchResults } from '@/features/search';
import { retailChannel } from '@/config/storefront';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = { title: 'نتایج جستجو' };

export default async function RetailSearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return (
    <RetailLayout>
      <SearchResults channel={retailChannel} query={q ?? ''} />
    </RetailLayout>
  );
}

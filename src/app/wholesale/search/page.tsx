import type { Metadata } from 'next';
import { WholesaleLayout } from '@/layouts/wholesale-layout';
import { SearchResults } from '@/features/search';

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = { title: 'نتایج جستجو' };

export default async function WholesaleSearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return (
    <WholesaleLayout>
      <SearchResults channel="WHOLESALE" query={q ?? ''} />
    </WholesaleLayout>
  );
}

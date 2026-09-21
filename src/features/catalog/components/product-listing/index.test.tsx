import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductListing } from './index';
import { useCategoryBrowse, useProductListingFilters, useProducts } from '@/hooks';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

/** The catalog hero's search bar runs its own (unmocked) React Query hook. */
const renderListing = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0, staleTime: 0 } },
  });

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useCategoryBrowse: jest.fn(),
  useProductListingFilters: jest.fn(),
  useProducts: jest.fn(),
}));

const mockUseCategoryBrowse = useCategoryBrowse as jest.MockedFunction<typeof useCategoryBrowse>;
const mockUseProductListingFilters = useProductListingFilters as jest.MockedFunction<
  typeof useProductListingFilters
>;
const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

const categoryBrowse = {
  category: {
    id: 2,
    slug: 'protein-poultry',
    name: 'مرغ و ماکیان',
    nameFa: 'مرغ و ماکیان',
    nameEn: 'poultry',
    parentId: 1,
    depth: 1,
    iconKey: null,
    imageKey: null,
    sortOrder: 0,
    productCount: 40,
  },
  ancestors: [
    {
      id: 1,
      slug: 'protein',
      name: 'پروتئینی',
      nameFa: 'پروتئینی',
      nameEn: 'protein',
      parentId: null,
      depth: 0,
      iconKey: 'FishIcon',
      imageKey: '/images/landing/big-offer/01.png',
      sortOrder: 0,
      productCount: 64,
    },
  ],
  children: [
    {
      id: 3,
      slug: 'chicken-breast',
      name: 'سینه مرغ',
      nameFa: 'سینه مرغ',
      nameEn: 'chicken-breast',
      parentId: 2,
      depth: 2,
      iconKey: null,
      imageKey: null,
      sortOrder: 0,
      productCount: 10,
    },
  ],
};

const products = {
  items: [
    {
      id: 1,
      slug: 'protein-1',
      name: 'سینه مرغ تازه',
      imageKey: null,
      imageUrl: null,
      price: 250_000,
      compareAtPrice: null,
      discountPercent: 0,
      badges: [],
      stockStatus: 'IN_STOCK' as const,
      seller: { id: 1, shopName: 'ویراشاپس', logoKey: null, logoUrl: null },
      storeCount: 1,
      channel: 'RETAIL' as const,
    },
  ],
  total: 1,
  page: 1,
  limit: 20,
};

describe('ProductListing', () => {
  beforeEach(() => {
    mockUseCategoryBrowse.mockReturnValue({
      data: categoryBrowse,
      isLoading: false,
    } as unknown as ReturnType<typeof useCategoryBrowse>);

    mockUseProductListingFilters.mockReturnValue({
      page: 1,
      sort: 'relevant',
      minPrice: undefined,
      maxPrice: undefined,
      inStock: false,
      setSort: jest.fn(),
      setPage: jest.fn(),
      setPriceRange: jest.fn(),
      setInStock: jest.fn(),
      clearFilters: jest.fn(),
    });

    mockUseProducts.mockReturnValue({
      data: products,
      isLoading: false,
    } as unknown as ReturnType<typeof useProducts>);
  });

  it('renders the breadcrumb, child-category nav and product grid', () => {
    renderListing(<ProductListing channel="RETAIL" categorySlug="protein-poultry" />);

    expect(screen.getByText('پروتئینی')).toBeInTheDocument();
    expect(screen.getAllByText('مرغ و ماکیان').length).toBeGreaterThan(0);
    expect(screen.getAllByText('سینه مرغ').length).toBeGreaterThan(0);
    expect(screen.getByText('سینه مرغ تازه')).toBeInTheDocument();
  });

  it('renders the hero search bar and the sort tabs', () => {
    renderListing(<ProductListing channel="RETAIL" categorySlug="protein-poultry" />);

    expect(screen.getByRole('searchbox', { name: 'جستجو' })).toBeInTheDocument();
    expect(screen.getByRole('tablist', { name: 'مرتب سازی' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'همه' })).toHaveAttribute('aria-selected', 'true');
  });

  it('opens the mobile filter and sort sheets', async () => {
    renderListing(<ProductListing channel="RETAIL" categorySlug="protein-poultry" />);

    fireEvent.click(screen.getByRole('button', { name: 'فیلتر' }));
    expect(await screen.findByRole('dialog')).toHaveTextContent('فیلتر');
    fireEvent.click(screen.getByRole('button', { name: 'بستن' }));

    fireEvent.click(screen.getByRole('button', { name: 'مرتب سازی' }));
    expect(await screen.findByRole('dialog')).toHaveTextContent('مرتب سازی');
    expect(screen.getByRole('radio', { name: 'گران ترین' })).toBeInTheDocument();
  });
});

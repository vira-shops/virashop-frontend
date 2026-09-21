import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductListing } from './index';
import { useCategoryBrowse, useProductListingFilters, useProductsByCategories } from '@/hooks';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
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
  useProductsByCategories: jest.fn(),
}));

const mockUseCategoryBrowse = useCategoryBrowse as jest.MockedFunction<typeof useCategoryBrowse>;
const mockUseProductListingFilters = useProductListingFilters as jest.MockedFunction<
  typeof useProductListingFilters
>;
const mockUseProducts = useProductsByCategories as jest.MockedFunction<
  typeof useProductsByCategories
>;

const child = (id: number, slug: string, name: string) => ({
  id,
  slug,
  name,
  nameFa: name,
  nameEn: slug,
  parentId: 2,
  depth: 2,
  iconKey: null,
  imageKey: null,
  sortOrder: 0,
  productCount: 10,
});

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
    child(3, 'chicken-breast', 'سینه مرغ'),
    child(4, 'chicken-leg', 'ران مرغ'),
    child(5, 'turkey', 'بوقلمون'),
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

const toggleCategory = jest.fn();
const setCategories = jest.fn();

const mockFilters = (overrides: Partial<ReturnType<typeof useProductListingFilters>> = {}) =>
  mockUseProductListingFilters.mockReturnValue({
    page: 1,
    sort: 'relevant',
    minPrice: undefined,
    maxPrice: undefined,
    inStock: false,
    categories: [],
    setSort: jest.fn(),
    setPage: jest.fn(),
    setPriceRange: jest.fn(),
    setInStock: jest.fn(),
    toggleCategory,
    setCategories,
    clearFilters: jest.fn(),
    ...overrides,
  });

describe('ProductListing', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCategoryBrowse.mockReturnValue({
      data: categoryBrowse,
      isLoading: false,
    } as unknown as ReturnType<typeof useCategoryBrowse>);

    mockFilters();

    mockUseProducts.mockReturnValue({
      data: products,
      isLoading: false,
    } as unknown as ReturnType<typeof useProductsByCategories>);
  });

  it('renders the breadcrumb, child-category nav and product grid', () => {
    renderListing(<ProductListing channel="RETAIL" categorySlug="protein-poultry" />);

    expect(screen.getByText('پروتئینی')).toBeInTheDocument();
    expect(screen.getAllByText('مرغ و ماکیان').length).toBeGreaterThan(0);
    expect(screen.getAllByText('سینه مرغ').length).toBeGreaterThan(0);
    expect(screen.getAllByText('سینه مرغ تازه').length).toBeGreaterThan(0);
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

  it('filters by category instead of navigating away', () => {
    renderListing(<ProductListing channel="RETAIL" categorySlug="protein-poultry" />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'سینه مرغ' }));

    expect(toggleCategory).toHaveBeenCalledWith('chicken-breast');
    expect(push).not.toHaveBeenCalled();
  });

  it('keeps every sibling selectable while several are checked', () => {
    mockFilters({ categories: ['chicken-breast', 'turkey'] });

    renderListing(<ProductListing channel="RETAIL" categorySlug="protein-poultry" />);

    expect(screen.getByRole('checkbox', { name: 'سینه مرغ' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'بوقلمون' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'ران مرغ' })).not.toBeChecked();
  });

  it('shows the selected categories as the last breadcrumb entry', () => {
    mockFilters({ categories: ['chicken-breast', 'turkey'] });

    renderListing(<ProductListing channel="RETAIL" categorySlug="protein-poultry" />);

    const breadcrumb = screen.getByRole('navigation', { name: 'breadcrumb' });

    expect(within(breadcrumb).getByText('سینه مرغ، بوقلمون')).toBeInTheDocument();
    expect(within(breadcrumb).getByRole('link', { name: 'مرغ و ماکیان' })).toBeInTheDocument();
  });

  it('renders the compact mobile row beside the desktop card grid', () => {
    renderListing(<ProductListing channel="RETAIL" categorySlug="protein-poultry" />);

    // Same product, two layouts — one visible per breakpoint.
    expect(screen.getAllByText('سینه مرغ تازه')).toHaveLength(2);
  });
});

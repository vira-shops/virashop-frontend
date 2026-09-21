import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchResults } from './index';
import { useProductListingFilters, useSearch } from '@/hooks';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useProductListingFilters: jest.fn(),
  useSearch: jest.fn(),
}));

const mockUseProductListingFilters = useProductListingFilters as jest.MockedFunction<
  typeof useProductListingFilters
>;
const mockUseSearch = useSearch as jest.MockedFunction<typeof useSearch>;

describe('SearchResults', () => {
  beforeEach(() => {
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
      toggleCategory: jest.fn(),
      setCategories: jest.fn(),
      clearFilters: jest.fn(),
    });

    mockUseSearch.mockReturnValue({
      data: {
        query: 'مرغ',
        products: {
          items: [
            {
              id: 1,
              slug: 'chicken-breast-1kg',
              name: 'سینه مرغ تازه',
              imageKey: null,
              imageUrl: null,
              price: 420_000,
              compareAtPrice: null,
              discountPercent: 0,
              badges: [],
              stockStatus: 'IN_STOCK',
              seller: { id: 1, shopName: 'ویراشاپس', logoKey: null, logoUrl: null },
              storeCount: 1,
              channel: 'RETAIL',
            },
          ],
          total: 1,
          page: 1,
          limit: 20,
        },
        categories: [{ slug: 'chicken', name: 'مرغ', productCount: 1 }],
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useSearch>);
  });

  it('renders the query heading, category chip and product grid', () => {
    render(<SearchResults channel="RETAIL" query="مرغ" />);

    expect(screen.getByText('نتایج جستجو برای «مرغ»')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'مرغ' })).toHaveAttribute(
      'href',
      '/retail/category/chicken',
    );
    expect(screen.getByText('سینه مرغ تازه')).toBeInTheDocument();
  });
});

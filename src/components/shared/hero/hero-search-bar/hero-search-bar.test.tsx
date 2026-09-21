import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroSearchBar } from './hero-search-bar';
import { useRecentSearches, useSearchSuggestions } from '@/hooks';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useRecentSearches: jest.fn(),
  useSearchSuggestions: jest.fn(),
}));

const mockUseRecentSearches = useRecentSearches as jest.MockedFunction<typeof useRecentSearches>;
const mockUseSearchSuggestions = useSearchSuggestions as jest.MockedFunction<
  typeof useSearchSuggestions
>;

const hrefForCategory = (slug: string) => `/retail/category/${slug}`;
const hrefForSearch = (q: string) => `/retail/search?q=${encodeURIComponent(q)}`;

describe('HeroSearchBar', () => {
  const addRecentSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRecentSearches.mockReturnValue({
      terms: ['مرغ'],
      add: addRecentSearch,
      clear: jest.fn(),
    });

    mockUseSearchSuggestions.mockReturnValue({
      data: { categorized: [], terms: [] },
      isLoading: false,
    } as unknown as ReturnType<typeof useSearchSuggestions>);
  });

  it('renders the default search placeholder', () => {
    render(<HeroSearchBar />);

    expect(screen.getByLabelText('جستجو')).toHaveAttribute(
      'placeholder',
      'برای جست و جو بهتر مکان خود را ثبت کنید',
    );
  });

  it('renders a custom placeholder when given', () => {
    render(<HeroSearchBar placeholder="جستجوی فروشگاه خرده" />);

    expect(screen.getByLabelText('جستجو')).toHaveAttribute('placeholder', 'جستجوی فروشگاه خرده');
  });

  it('does not show a dropdown without hrefForCategory/hrefForSearch', async () => {
    const user = userEvent.setup();
    render(<HeroSearchBar />);

    await user.click(screen.getByLabelText('جستجو'));

    expect(screen.queryByText('جستجوهای اخیر')).not.toBeInTheDocument();
  });

  it('shows recent search chips on focus when hrefs are provided', async () => {
    const user = userEvent.setup();
    render(<HeroSearchBar hrefForCategory={hrefForCategory} hrefForSearch={hrefForSearch} />);

    await user.click(screen.getByLabelText('جستجو'));

    expect(screen.getByText('جستجوهای اخیر')).toBeInTheDocument();
    expect(screen.getByText('مرغ')).toBeInTheDocument();
  });

  it('navigates to the search href and records the term on Enter', async () => {
    const user = userEvent.setup();
    render(<HeroSearchBar hrefForCategory={hrefForCategory} hrefForSearch={hrefForSearch} />);

    const input = screen.getByLabelText('جستجو');
    await user.type(input, 'برنج{Enter}');

    expect(addRecentSearch).toHaveBeenCalledWith('برنج');
    expect(mockPush).toHaveBeenCalledWith('/retail/search?q=%D8%A8%D8%B1%D9%86%D8%AC');
  });

  it('navigates to the category href when a categorized suggestion is clicked', async () => {
    mockUseSearchSuggestions.mockReturnValue({
      data: {
        categorized: [{ text: 'مرغ', category: { id: 1, slug: 'food', name: 'مواد غذایی' } }],
        terms: [],
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useSearchSuggestions>);

    const user = userEvent.setup();
    render(<HeroSearchBar hrefForCategory={hrefForCategory} hrefForSearch={hrefForSearch} />);

    await user.type(screen.getByLabelText('جستجو'), 'مرغ');
    await user.click(screen.getByText('مواد غذایی'));

    expect(addRecentSearch).toHaveBeenCalledWith('مرغ');
    expect(mockPush).toHaveBeenCalledWith('/retail/category/food');
  });
});

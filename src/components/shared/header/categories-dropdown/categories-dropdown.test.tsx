import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CategoriesDropdown } from './index';
import { usePopularCategories } from '@/hooks';
import { POPULAR_CATEGORIES_MOCK } from '@/contracts/endpoints/categories';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  usePopularCategories: jest.fn(),
}));

const mockUsePopularCategories = usePopularCategories as jest.MockedFunction<
  typeof usePopularCategories
>;

const renderDropdown = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0, staleTime: 0 } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <CategoriesDropdown />
    </QueryClientProvider>,
  );
};

describe('CategoriesDropdown', () => {
  beforeEach(() => {
    mockUsePopularCategories.mockReturnValue({
      data: POPULAR_CATEGORIES_MOCK,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof usePopularCategories>);
  });

  it('opens the mega panel when the trigger is clicked', () => {
    renderDropdown();

    const trigger = screen.getByRole('button', { name: 'منوی دسته‌بندی‌ها' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'منوی دسته‌بندی‌ها' })).toBeInTheDocument();
  });

  it('renders every popular category as a menu item', () => {
    renderDropdown();
    fireEvent.click(screen.getByRole('button', { name: 'منوی دسته‌بندی‌ها' }));

    for (const category of POPULAR_CATEGORIES_MOCK) {
      expect(screen.getAllByRole('menuitem', { name: category.title }).length).toBeGreaterThan(0);
    }
  });

  it('closes the panel when the trigger is clicked again', () => {
    renderDropdown();

    const trigger = screen.getByRole('button', { name: 'منوی دسته‌بندی‌ها' });
    fireEvent.click(trigger);
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});

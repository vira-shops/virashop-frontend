import * as React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreHeader } from './store-header';
import { wholesaleConfig } from './wholesale-config';
import { retailConfig } from './retail-config';
import { usePopularCategories } from '@/features/landing/hooks';
import { POPULAR_CATEGORIES_MOCK } from './__fixtures__';

jest.mock('@/features/landing/hooks', () => ({
  ...jest.requireActual('@/features/landing/hooks'),
  usePopularCategories: jest.fn(),
}));

const mockUsePopularCategories = usePopularCategories as jest.MockedFunction<
  typeof usePopularCategories
>;

// --- Test helpers ----------------------------------------------------------

const renderHeader = (
  config: typeof wholesaleConfig | typeof retailConfig,
  theme: 'wholesale' | 'retail' = 'retail',
) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <div data-theme={theme}>
        <StoreHeader config={config} />
      </div>
    </QueryClientProvider>,
  );
};

beforeEach(() => {
  mockUsePopularCategories.mockReturnValue({
    data: POPULAR_CATEGORIES_MOCK,
    isLoading: false,
    isError: false,
  } as unknown as ReturnType<typeof usePopularCategories>);
});

// --- Desktop suite ---------------------------------------------------------

describe('StoreHeader — desktop', () => {
  // Both desktop and mobile variants render in jsdom (Tailwind responsive
  // classes don't hide them at test time). Use the first matching element so
  // the tests exercise the same instance the user interacts with on desktop.
  const getCategoriesTrigger = () =>
    screen.getAllByRole('button', { name: 'منوی دسته‌بندی‌ها' })[0];
  const getLoginButton = () => screen.getAllByRole('link', { name: /ورود و ثبت نام/ })[0];

  describe('top row (logo + actions + login button)', () => {
    it('renders the logo', () => {
      renderHeader(retailConfig, 'retail');

      expect(screen.getAllByRole('link', { name: retailConfig.logo.alt }).length).toBeGreaterThan(
        0,
      );
    });

    it('renders the login/signup button', () => {
      renderHeader(retailConfig, 'retail');

      const loginButton = getLoginButton();
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toHaveAttribute('href', '/auth/login');
      expect(loginButton).toHaveClass('button-primary');
    });

    it('renders all user actions with aria labels', () => {
      renderHeader(retailConfig, 'retail');

      for (const action of retailConfig.userActions) {
        const role = action.href ? 'link' : 'button';
        const elements = screen.getAllByRole(role, { name: action.ariaLabel });
        expect(elements.length).toBeGreaterThan(0);
        for (const el of elements) {
          expect(el).toHaveClass('button');
        }
      }
    });
  });

  describe('navigation bar (categories dropdown + nav items)', () => {
    it('renders the categories dropdown trigger with burger icon and label', () => {
      renderHeader(retailConfig, 'retail');

      const trigger = getCategoriesTrigger();
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-haspopup', 'true');
    });

    it('renders the four navigation items as links', () => {
      renderHeader(retailConfig, 'retail');

      const navItems = [
        { label: 'پرفروش‌ها', href: '/retail/best-sellers' },
        { label: 'تخفیف‌ها', href: '/retail/offers' },
        { label: 'درباره ما', href: '/about' },
        { label: 'وبلاگ', href: '/blog' },
      ];

      for (const item of navItems) {
        const links = screen.getAllByRole('link', { name: item.label });
        expect(links.length).toBeGreaterThan(0);
        for (const link of links) {
          expect(link).toHaveAttribute('href', item.href);
        }
      }
    });
  });

  describe('categories mega-menu behavior', () => {
    it('opens the mega panel when the trigger is clicked', () => {
      renderHeader(retailConfig, 'retail');

      const trigger = getCategoriesTrigger();
      fireEvent.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getAllByRole('menu', { name: 'منوی دسته‌بندی‌ها' }).length).toBeGreaterThan(0);
    });

    it('renders the popular categories as sidebar items with menuitem role', () => {
      renderHeader(retailConfig, 'retail');
      fireEvent.click(getCategoriesTrigger());

      for (const category of POPULAR_CATEGORIES_MOCK) {
        const items = screen.getAllByRole('menuitem', { name: category.title });
        expect(items.length).toBeGreaterThan(0);
      }
    });

    it('activates the first category by default when the panel opens', () => {
      renderHeader(retailConfig, 'retail');
      fireEvent.click(getCategoriesTrigger());

      const firstItem = screen.getAllByRole('menuitem', {
        name: POPULAR_CATEGORIES_MOCK[0].title,
      })[0];
      expect(firstItem).toHaveAttribute('aria-current', 'true');
    });

    it('activates a different category on hover', () => {
      renderHeader(retailConfig, 'retail');
      fireEvent.click(getCategoriesTrigger());

      const proteinItem = screen.getAllByRole('menuitem', { name: 'پروتئینی' })[0];
      fireEvent.mouseEnter(proteinItem);

      expect(proteinItem).toHaveAttribute('aria-current', 'true');

      const foodItem = screen.getAllByRole('menuitem', { name: 'مواد غذایی' })[0];
      expect(foodItem).not.toHaveAttribute('aria-current');
    });

    it('renders subcategory groups with their leaf items for the active category', () => {
      renderHeader(retailConfig, 'retail');
      fireEvent.click(getCategoriesTrigger());

      // First category (مواد غذایی) is active by default; its first سرگروه and
      // the leaf items under it should appear in the content area.
      const firstGroup = POPULAR_CATEGORIES_MOCK[0].subcategories[0];
      expect(firstGroup).toBeDefined();
      expect(screen.getByText(firstGroup.title)).toBeInTheDocument();

      const firstItem = firstGroup.items[0];
      expect(firstItem).toBeDefined();
      expect(screen.getByText(firstItem.title)).toBeInTheDocument();
    });

    it('switches the content area when a different category is hovered', () => {
      renderHeader(retailConfig, 'retail');
      fireEvent.click(getCategoriesTrigger());

      const proteinItem = screen.getAllByRole('menuitem', { name: 'پروتئینی' })[0];
      fireEvent.mouseEnter(proteinItem);

      const firstProteinGroup = POPULAR_CATEGORIES_MOCK[1].subcategories[0];
      expect(firstProteinGroup).toBeDefined();
      expect(screen.getByText(firstProteinGroup.title)).toBeInTheDocument();

      const firstProteinItem = firstProteinGroup.items[0];
      expect(firstProteinItem).toBeDefined();
      expect(screen.getByText(firstProteinItem.title)).toBeInTheDocument();
    });

    it('closes the mega panel when the Escape key is pressed', async () => {
      renderHeader(retailConfig, 'retail');

      const trigger = getCategoriesTrigger();
      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('toggles the mega panel closed when the trigger is clicked again', () => {
      renderHeader(retailConfig, 'retail');

      const trigger = getCategoriesTrigger();

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('wholesale config', () => {
    it('renders the wholesale logo and the login button (theme is retail)', () => {
      renderHeader(wholesaleConfig, 'retail');

      expect(
        screen.getAllByRole('link', { name: wholesaleConfig.logo.alt }).length,
      ).toBeGreaterThan(0);
      expect(getLoginButton()).toHaveClass('button-primary');
    });
  });
});

// --- Mobile suite ----------------------------------------------------------

describe('StoreHeader — mobile sidebar', () => {
  const getBurgerButton = () => screen.getAllByRole('button', { name: 'منو' })[0];
  const getDialog = () => screen.getAllByRole('dialog', { name: 'منوی موبایل' })[0];
  const openSidebar = () => {
    fireEvent.click(getBurgerButton());
  };

  it('opens the sidebar when the burger button is clicked', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();
    expect(screen.getAllByRole('dialog', { name: 'منوی موبایل' }).length).toBeGreaterThan(0);
  });

  it('renders the five navigation items with correct labels and hrefs', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();

    for (const item of [
      { label: 'مورد علاقه‌ها', href: '/retail/favorites' },
      { label: 'بلاگ', href: '/blog' },
      { label: 'تخفیف‌ها', href: '/retail/offers' },
      { label: 'درباره ما', href: '/about' },
      { label: 'پرفروش‌ترین‌ها', href: '/retail/best-sellers' },
    ]) {
      const link = within(dialog).getByRole('link', { name: item.label });
      expect(link).toHaveAttribute('href', item.href);
    }
  });

  it('renders a heart icon for the Favorites navigation item', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();
    const favoritesLink = within(dialog).getByRole('link', { name: 'مورد علاقه‌ها' });
    // HeartIcon should be present as a child of the link
    expect(favoritesLink.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a divider between navigation and categories sections', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();
    // Divider has data-testid="sidebar-divider"
    expect(within(dialog).getByTestId('sidebar-divider')).toBeInTheDocument();
  });

  it('renders the categories section header with title', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();
    expect(within(dialog).getByText('دسته‌بندی')).toBeInTheDocument();
  });

  it('renders all eight categories as accordion items', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();

    for (const category of POPULAR_CATEGORIES_MOCK) {
      const button = within(dialog).getByRole('button', { name: category.title });
      expect(button).toBeInTheDocument();
    }
  });

  it('expands the first category by default and shows its first group with items', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();
    const firstCategory = POPULAR_CATEGORIES_MOCK[0];

    // First category button should have aria-expanded="true"
    const firstButton = within(dialog).getByRole('button', { name: firstCategory.title });
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // First category should have active styling (cream background, orange border)
    expect(firstButton.closest('div')).toHaveClass('bg-primary-500/10');
    expect(firstButton.closest('div')).toHaveClass('border-l-2');
    expect(firstButton.closest('div')).toHaveClass('border-primary-500');

    // The first سرگروه of the first category should be visible (and its title)
    const firstGroup = firstCategory.subcategories[0];
    expect(firstGroup).toBeDefined();
    expect(within(dialog).getByText(firstGroup.title)).toBeInTheDocument();

    // Its leaf items should be visible too (first group auto-expands)
    const firstItem = firstGroup.items[0];
    expect(firstItem).toBeDefined();
    expect(within(dialog).getByText(firstItem.title)).toBeInTheDocument();
  });

  it('shows active styling on the first category (orange text, icon, left border)', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();
    const firstCategory = POPULAR_CATEGORIES_MOCK[0];
    const firstButton = within(dialog).getByRole('button', { name: firstCategory.title });

    // Active category container should have cream background and orange border
    const container = firstButton.closest('div');
    expect(container).toHaveClass('bg-primary-500/10');
    expect(container).toHaveClass('border-l-2');
    expect(container).toHaveClass('border-primary-500');

    // Text should be orange
    expect(firstButton).toHaveClass('text-primary-500');
  });

  it('expands a category and shows its groups with items when clicked', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();
    const proteinCategory = POPULAR_CATEGORIES_MOCK[1];
    const proteinButton = within(dialog).getByRole('button', { name: proteinCategory.title });

    // Initially collapsed
    expect(proteinButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand
    fireEvent.click(proteinButton);

    // Now expanded
    expect(proteinButton).toHaveAttribute('aria-expanded', 'true');

    // Its first سرگروه should be visible and auto-expanded (items visible)
    const firstGroup = proteinCategory.subcategories[0];
    expect(firstGroup).toBeDefined();
    expect(within(dialog).getByText(firstGroup.title)).toBeInTheDocument();

    const firstItem = firstGroup.items[0];
    expect(firstItem).toBeDefined();
    expect(within(dialog).getByText(firstItem.title)).toBeInTheDocument();

    // Arrow should be rotated (pointing down)
    const arrow = within(dialog).getByTestId(`category-arrow-${proteinCategory.id}`);
    expect(arrow).toHaveClass('rotate-180');
  });

  it('collapses a category when clicked again', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();
    const foodCategory = POPULAR_CATEGORIES_MOCK[0];
    const foodButton = within(dialog).getByRole('button', { name: foodCategory.title });

    // First category is expanded by default
    expect(foodButton).toHaveAttribute('aria-expanded', 'true');

    // Click to collapse
    fireEvent.click(foodButton);

    // Now collapsed
    expect(foodButton).toHaveAttribute('aria-expanded', 'false');

    // Its first group should be hidden
    const firstGroup = foodCategory.subcategories[0];
    expect(within(dialog).queryByText(firstGroup.title)).not.toBeInTheDocument();

    // Arrow should not be rotated (pointing right in RTL = collapsed)
    const arrow = within(dialog).getByTestId(`category-arrow-${foodCategory.id}`);
    expect(arrow).not.toHaveClass('rotate-180');
  });

  it('expands and collapses a سرگروه (group) inside the open category', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();
    const foodCategory = POPULAR_CATEGORIES_MOCK[0];
    const secondGroup = foodCategory.subcategories[1];
    expect(secondGroup).toBeDefined();

    // Second group is collapsed initially (only the first auto-expands)
    const secondGroupButton = within(dialog).getByRole('button', { name: secondGroup.title });
    expect(secondGroupButton).toHaveAttribute('aria-expanded', 'false');

    // Click to expand — its leaf items become visible
    fireEvent.click(secondGroupButton);
    expect(secondGroupButton).toHaveAttribute('aria-expanded', 'true');
    const secondGroupItem = secondGroup.items[0];
    expect(secondGroupItem).toBeDefined();
    expect(within(dialog).getByText(secondGroupItem.title)).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(secondGroupButton);
    expect(secondGroupButton).toHaveAttribute('aria-expanded', 'false');
    expect(within(dialog).queryByText(secondGroupItem.title)).not.toBeInTheDocument();
  });

  it('only expands one category at a time', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();
    const foodButton = within(dialog).getByRole('button', { name: 'مواد غذایی' });
    const proteinButton = within(dialog).getByRole('button', { name: 'پروتئینی' });

    // Food is expanded by default
    expect(foodButton).toHaveAttribute('aria-expanded', 'true');

    // Click protein to expand it
    fireEvent.click(proteinButton);

    // Food should collapse, protein should expand
    expect(foodButton).toHaveAttribute('aria-expanded', 'false');
    expect(proteinButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies active styling to the category that was last hovered/clicked', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();

    const dialog = getDialog();
    const foodButton = within(dialog).getByRole('button', { name: 'مواد غذایی' });
    const proteinButton = within(dialog).getByRole('button', { name: 'پروتئینی' });

    // Food is active by default — find the category accordion container
    // (parent div that carries the active classes)
    const foodContainer = foodButton.closest('div.rounded-2') ?? foodButton.parentElement;
    expect(foodContainer).toHaveClass('bg-primary-500/10');
    expect(foodContainer).toHaveClass('border-primary-500');

    // Click protein to make it active
    fireEvent.click(proteinButton);

    // Protein should now have active styling
    const proteinContainer = proteinButton.closest('div.rounded-2') ?? proteinButton.parentElement;
    expect(proteinContainer).toHaveClass('bg-primary-500/10');
    expect(proteinContainer).toHaveClass('border-primary-500');

    // Food should no longer be active
    expect(foodContainer).not.toHaveClass('bg-primary-50');
    expect(foodContainer).not.toHaveClass('border-primary-500');
  });

  it('renders the mock user city at the bottom of the sidebar', () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();
    const dialog = getDialog();
    const matches = within(dialog).getAllByText((content, element) =>
      Boolean(element?.textContent?.includes('تهران')),
    );
    expect(matches.length).toBeGreaterThan(0);
  });

  it('closes the sidebar when the Escape key is pressed', async () => {
    renderHeader(retailConfig, 'retail');
    openSidebar();
    expect(screen.getAllByRole('dialog', { name: 'منوی موبایل' }).length).toBeGreaterThan(0);

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: 'منوی موبایل' })).not.toBeInTheDocument();
    });
  });
});

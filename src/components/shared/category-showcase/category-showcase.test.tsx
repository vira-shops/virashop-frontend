import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { BottleIcon, FishIcon } from '@icons';
import { CategoryShowcase } from './category-showcase';

const iconMap = {
  food: BottleIcon,
  protein: FishIcon,
};

const items = [
  { id: 'food', title: 'مواد غذایی', href: '/wholesale/category/food', iconKey: 'food' },
  { id: 'protein', title: 'پروتئین', href: '/wholesale/category/protein', iconKey: 'protein' },
  { id: 'dairy', title: 'لبنیات', href: '#' },
];

describe('CategoryShowcase', () => {
  it('renders the title, subtitle and one tile per item', () => {
    render(<CategoryShowcase title="دسته‌بندی" subtitle="خرید بر اساس دسته" items={items} />);

    expect(screen.getByText('دسته‌بندی')).toBeInTheDocument();
    expect(screen.getByText('خرید بر اساس دسته')).toBeInTheDocument();
    expect(screen.getByText('مواد غذایی')).toBeInTheDocument();
    expect(screen.getByText('پروتئین')).toBeInTheDocument();
    expect(screen.getByText('لبنیات')).toBeInTheDocument();
  });

  it('renders tiles as links with their href', () => {
    render(<CategoryShowcase title="دسته‌بندی" items={items} />);

    expect(screen.getByRole('link', { name: /مواد غذایی/ })).toHaveAttribute(
      'href',
      '/wholesale/category/food',
    );
  });

  it('detaches the first item above the dashed strip when soonLabel is set', () => {
    render(<CategoryShowcase title="دسته‌بندی" soonLabel="بزودی" items={items} />);

    expect(screen.getByText('بزودی')).toBeInTheDocument();
    // Exactly one «مواد غذایی» tile — the first item is not duplicated in the grid.
    expect(screen.getAllByText('مواد غذایی')).toHaveLength(1);
  });

  it('renders every item in the grid without the strip when soonLabel is omitted', () => {
    render(<CategoryShowcase title="دسته‌بندی" items={items} />);

    expect(screen.queryByText('بزودی')).not.toBeInTheDocument();
  });

  it('falls back to the fallbackIcon for unknown iconKeys', () => {
    render(
      <CategoryShowcase
        title="دسته‌بندی"
        items={[{ id: 'x', title: 'نامشخص', iconKey: 'nope' }]}
        iconMap={iconMap}
        fallbackIcon={BottleIcon}
      />,
    );

    expect(screen.getByText('نامشخص')).toBeInTheDocument();
  });

  it('shows the loading skeleton instead of tiles', () => {
    const { container } = render(
      <CategoryShowcase title="دسته‌بندی" items={items} isLoading skeletonCount={5} />,
    );

    expect(screen.queryByText('مواد غذایی')).not.toBeInTheDocument();
    // Skeleton container is aria-hidden.
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('sets the section id for scroll anchoring', () => {
    render(<CategoryShowcase id="wholesale-categories" title="دسته‌بندی" items={items} />);

    expect(screen.getByLabelText('دسته‌بندی')).toHaveAttribute('id', 'wholesale-categories');
  });
});

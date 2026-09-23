import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroCategories } from './hero-categories';

const items = [
  { id: 1, title: 'کالای اساسی', image: '/images/categories/staples.png' },
  { id: 2, title: 'پروتئین', image: '/images/categories/protein.png' },
];

describe('HeroCategories', () => {
  it('renders the heading and one tile per item', () => {
    render(<HeroCategories title="دستـــــــه بندی ها" items={items} />);

    expect(screen.getByRole('heading')).toHaveTextContent('دستـــــــه بندی ها');
    expect(screen.getByText('کالای اساسی')).toBeInTheDocument();
    expect(screen.getByText('پروتئین')).toBeInTheDocument();
  });

  it('appends the highlighted category name to the heading', () => {
    render(<HeroCategories title="دستـــــــه بندی" highlight="مواد غذایی" items={items} />);

    const heading = screen.getByRole('heading');

    expect(heading).toHaveTextContent('دستـــــــه بندی مواد غذایی');
    // The name is the only part painted in the storefront's primary colour.
    expect(heading.querySelector('.text-primary')).toHaveTextContent('مواد غذایی');
  });

  it('omits the subtitle when none is given', () => {
    const { rerender } = render(<HeroCategories title="دسته‌بندی" items={items} />);

    expect(screen.queryByText(/محصول/)).not.toBeInTheDocument();

    rerender(<HeroCategories title="دسته‌بندی" subtitle="بیش از ۱۲۸ محصول" items={items} />);
    expect(screen.getByText('بیش از ۱۲۸ محصول')).toBeInTheDocument();
  });

  it('shows skeleton tiles instead of the row while loading', () => {
    const { container } = render(
      <HeroCategories title="دسته‌بندی" items={items} isLoading skeletonCount={4} />,
    );

    expect(screen.queryByText('کالای اساسی')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.skeleton').length).toBeGreaterThan(0);
  });
});

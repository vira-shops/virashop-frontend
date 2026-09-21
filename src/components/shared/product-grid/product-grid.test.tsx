import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductGrid } from './product-grid';

const items = [
  {
    id: 1,
    image: { src: '/images/products/01.png', alt: 'برنج هاشمی' },
    title: 'برنج هاشمی درجه یک',
    price: '۴۵۰٬۰۰۰',
    action: { label: 'مشاهده', href: '/retail/rice-1' },
  },
  {
    id: 2,
    image: { src: '/images/products/02.png', alt: 'روغن آفتابگردان' },
    title: 'روغن آفتابگردان',
    price: '۱۲۰٬۰۰۰',
    action: { label: 'مشاهده', href: '/retail/oil-1' },
  },
];

describe('ProductGrid', () => {
  it('renders one ProductCard per item', () => {
    render(<ProductGrid items={items} />);

    expect(screen.getByText('برنج هاشمی درجه یک')).toBeInTheDocument();
    expect(screen.getByText('روغن آفتابگردان')).toBeInTheDocument();
  });

  it('renders skeleton tiles while loading', () => {
    const { container } = render(<ProductGrid items={[]} isLoading skeletonCount={3} />);

    expect(container.querySelectorAll('[class*="skeleton"]').length).toBeGreaterThan(0);
    expect(screen.queryByText('برنج هاشمی درجه یک')).not.toBeInTheDocument();
  });

  it('renders the empty label when there are no items and not loading', () => {
    render(<ProductGrid items={[]} emptyLabel="چیزی پیدا نشد" />);

    expect(screen.getByText('چیزی پیدا نشد')).toBeInTheDocument();
  });
});

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { BrandsMarquee } from './brands-marquee';

const brands = [
  { id: '1', logo: '/images/brands/brand-1.png', name: 'برند یک' },
  { id: '2', logo: '/images/brands/brand-2.png', name: 'برند دو', logoAlt: 'لوگوی برند دو' },
  { id: '3', logo: '/images/brands/brand-3.png', name: 'برند سه' },
];

describe('BrandsMarquee', () => {
  it('renders the center CTA button with its label', () => {
    render(<BrandsMarquee brands={brands} ctaLabel="برندهای همکار" />);

    expect(screen.getByRole('button', { name: 'برندهای همکار' })).toBeInTheDocument();
  });

  it('renders one logo image per brand (first copy, not the aria-hidden repeats)', () => {
    render(<BrandsMarquee brands={brands} ctaLabel="برندها" />);

    expect(screen.getByAltText('برند یک')).toBeInTheDocument();
    expect(screen.getByAltText('لوگوی برند دو')).toBeInTheDocument();
    expect(screen.getByAltText('برند سه')).toBeInTheDocument();
  });

  it('names the section by the ariaLabel prop when given', () => {
    render(<BrandsMarquee brands={brands} ctaLabel="خرید عمده" ariaLabel="برندهای همکار ما" />);

    expect(screen.getByLabelText('برندهای همکار ما')).toBeInTheDocument();
  });

  it('falls back to the CTA label as the section name', () => {
    render(<BrandsMarquee brands={brands} ctaLabel="برندهای همکار" />);

    expect(screen.getByLabelText('برندهای همکار')).toBeInTheDocument();
  });

  it('renders the CTA as a link when ctaHref is set', () => {
    render(<BrandsMarquee brands={brands} ctaLabel="مشاهده برندها" ctaHref="/wholesale/brands" />);

    expect(screen.getByRole('link', { name: 'مشاهده برندها' })).toHaveAttribute(
      'href',
      '/wholesale/brands',
    );
  });

  it('does not render rows for empty brand lists beyond the first row', () => {
    const { container } = render(
      <BrandsMarquee brands={brands.slice(0, 2)} ctaLabel="برندها" rowCount={3} />,
    );

    // 2 brands → 2 rows; the third row is skipped entirely.
    const rows = container.querySelectorAll('section > div:nth-child(3) > div');
    expect(rows.length).toBe(2);
  });
});

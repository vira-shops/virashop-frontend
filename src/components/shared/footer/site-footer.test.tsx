import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SiteFooter } from './site-footer';
import { SITE_FOOTER_TRUST_BADGES, SITE_FOOTER_COPYRIGHT } from './constants';

describe('SiteFooter', () => {
  it('renders the brand heading', () => {
    render(<SiteFooter />);

    expect(screen.getByText('فروشگاه اینترنتی ویرا شاپس')).toBeInTheDocument();
  });

  it('renders every trust badge image', () => {
    render(<SiteFooter />);

    for (const badge of SITE_FOOTER_TRUST_BADGES) {
      expect(screen.getByAltText(badge.alt)).toBeInTheDocument();
    }
  });

  it('renders the copyright line', () => {
    render(<SiteFooter />);

    expect(screen.getByText(SITE_FOOTER_COPYRIGHT)).toBeInTheDocument();
  });

  it('links the description teaser to the about page', () => {
    render(<SiteFooter />);

    expect(screen.getByRole('link', { name: 'مشاهده بیشتر...' })).toHaveAttribute('href', '/about');
  });
});

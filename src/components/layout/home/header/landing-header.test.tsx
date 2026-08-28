import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { LandingHeader } from './landing-header';
import { landingHeaderConfig } from './constants';

describe('LandingHeader', () => {
  it('renders the logo with the configured alt text', () => {
    render(<LandingHeader />);

    const logos = screen.getAllByRole('link', { name: landingHeaderConfig.logo.alt });

    expect(logos.length).toBeGreaterThan(0);
    for (const logo of logos) {
      expect(logo).toBeInTheDocument();
    }
  });

  it('renders all nav items as links', () => {
    render(<LandingHeader />);

    for (const item of landingHeaderConfig.navItems) {
      const links = screen.getAllByRole('link', { name: item.label });

      expect(links.length).toBeGreaterThan(0);
    }
  });

  it('renders both CTA buttons as links with the configured href and color', () => {
    render(<LandingHeader />);

    for (const cta of landingHeaderConfig.ctas) {
      const ctaLink = screen.getAllByRole('link', { name: cta.label.trim() })[0];

      expect(ctaLink).toHaveAttribute('href', cta.href);
      expect(ctaLink).toHaveClass('button');
      expect(ctaLink).toHaveClass(`button-${cta.color}`);
    }
  });

  it('does not render the mobile drawer by default', () => {
    render(<LandingHeader />);

    expect(screen.queryByRole('dialog', { name: 'منوی موبایل' })).not.toBeInTheDocument();
  });

  it('opens the mobile drawer when the burger button is clicked', () => {
    render(<LandingHeader />);

    fireEvent.click(screen.getByRole('button', { name: 'منو' }));

    expect(screen.getByRole('dialog', { name: 'منوی موبایل' })).toBeInTheDocument();
  });

  it('renders nav items inside the mobile drawer', () => {
    render(<LandingHeader />);

    fireEvent.click(screen.getByRole('button', { name: 'منو' }));

    const drawer = screen.getByRole('dialog', { name: 'منوی موبایل' });

    for (const item of landingHeaderConfig.navItems) {
      expect(within(drawer).getByRole('link', { name: item.label })).toHaveAttribute(
        'href',
        item.href,
      );
    }
  });

  it('renders CTAs as full-width stacked links inside the mobile drawer', () => {
    render(<LandingHeader />);

    fireEvent.click(screen.getByRole('button', { name: 'منو' }));

    const drawer = screen.getByRole('dialog', { name: 'منوی موبایل' });

    for (const cta of landingHeaderConfig.ctas) {
      const ctaLink = within(drawer).getByRole('link', { name: cta.label.trim() });

      expect(ctaLink).toHaveClass('button-fullWidth');
      expect(ctaLink).toHaveClass(`button-${cta.color}`);
      expect(ctaLink).toHaveAttribute('href', cta.href);
    }
  });

  it('closes the mobile drawer when the cancel button is clicked', () => {
    render(<LandingHeader />);

    fireEvent.click(screen.getByRole('button', { name: 'منو' }));
    expect(screen.getByRole('dialog', { name: 'منوی موبایل' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'بستن' }));

    expect(screen.queryByRole('dialog', { name: 'منوی موبایل' })).not.toBeInTheDocument();
  });

  it('closes the mobile drawer when the Escape key is pressed', () => {
    render(<LandingHeader />);

    fireEvent.click(screen.getByRole('button', { name: 'منو' }));
    expect(screen.getByRole('dialog', { name: 'منوی موبایل' })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: 'منوی موبایل' })).not.toBeInTheDocument();
  });

  it('locks the body scroll while the mobile drawer is open and restores it after closing', () => {
    const { unmount } = render(<LandingHeader />);

    fireEvent.click(screen.getByRole('button', { name: 'منو' }));
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(screen.getByRole('button', { name: 'بستن' }));
    expect(document.body.style.overflow).not.toBe('hidden');

    unmount();
  });
});

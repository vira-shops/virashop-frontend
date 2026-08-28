import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { StoreHeader } from './store-header';
import { wholesaleConfig } from './wholesale-config';
import { retailConfig } from './retail-config';

const renderHeader = (
  config: typeof wholesaleConfig | typeof retailConfig,
  theme: 'wholesale' | 'retail' = 'wholesale',
) =>
  render(
    <div data-theme={theme}>
      <StoreHeader config={config} />
    </div>,
  );

describe('StoreHeader', () => {
  describe('wholesale config', () => {
    it('renders the logo, brand name and search bar', () => {
      renderHeader(wholesaleConfig, 'wholesale');

      expect(
        screen.getAllByRole('link', { name: wholesaleConfig.logo.alt }).length,
      ).toBeGreaterThan(0);
      expect(screen.getAllByText(wholesaleConfig.brandName).length).toBeGreaterThan(0);
      expect(screen.getAllByPlaceholderText('جستجو...').length).toBeGreaterThan(0);
    });

    it('renders all nav items as links', () => {
      renderHeader(wholesaleConfig, 'wholesale');

      for (const item of wholesaleConfig.navItems) {
        const links = screen.getAllByRole('link', { name: item.label });

        expect(links.length).toBeGreaterThan(0);
        for (const link of links) {
          expect(link).toHaveAttribute('href', item.href);
        }
      }
    });

    it('renders all user actions with aria labels', () => {
      renderHeader(wholesaleConfig, 'wholesale');

      for (const action of wholesaleConfig.userActions) {
        const role = action.href ? 'link' : 'button';
        const elements = screen.getAllByRole(role, { name: action.ariaLabel });

        expect(elements.length).toBeGreaterThan(0);
        for (const el of elements) {
          expect(el).toHaveClass('button');
        }
      }
    });

    it('opens the mobile drawer when the burger button is clicked', () => {
      renderHeader(wholesaleConfig, 'wholesale');

      fireEvent.click(screen.getByRole('button', { name: 'منو' }));

      expect(screen.getByRole('dialog', { name: 'منوی موبایل' })).toBeInTheDocument();
    });

    it('renders the search bar and user actions inside the mobile drawer', () => {
      renderHeader(wholesaleConfig, 'wholesale');

      fireEvent.click(screen.getByRole('button', { name: 'منو' }));

      const drawer = screen.getByRole('dialog', { name: 'منوی موبایل' });

      expect(within(drawer).getByPlaceholderText('جستجو...')).toBeInTheDocument();

      for (const action of wholesaleConfig.userActions) {
        const role = action.href ? 'link' : 'button';
        expect(within(drawer).getByRole(role, { name: action.ariaLabel })).toBeInTheDocument();
      }
    });

    it('closes the mobile drawer when the cancel button is clicked', () => {
      renderHeader(wholesaleConfig, 'wholesale');

      fireEvent.click(screen.getByRole('button', { name: 'منو' }));
      expect(screen.getByRole('dialog', { name: 'منوی موبایل' })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'بستن' }));

      expect(screen.queryByRole('dialog', { name: 'منوی موبایل' })).not.toBeInTheDocument();
    });
  });

  describe('retail config', () => {
    it('renders the retail logo and brand name', () => {
      renderHeader(retailConfig, 'retail');

      expect(screen.getAllByRole('link', { name: retailConfig.logo.alt }).length).toBeGreaterThan(
        0,
      );
      expect(screen.getAllByText(retailConfig.brandName).length).toBeGreaterThan(0);
    });

    it('renders the retail nav items as links', () => {
      renderHeader(retailConfig, 'retail');

      for (const item of retailConfig.navItems) {
        const links = screen.getAllByRole('link', { name: item.label });

        expect(links.length).toBeGreaterThan(0);
        for (const link of links) {
          expect(link).toHaveAttribute('href', item.href);
        }
      }
    });

    it('opens the mobile drawer with the retail logo', () => {
      renderHeader(retailConfig, 'retail');

      fireEvent.click(screen.getByRole('button', { name: 'منو' }));

      const dialog = screen.getByRole('dialog', { name: 'منوی موبایل' });

      expect(dialog).toBeInTheDocument();
      expect(within(dialog).getByRole('link', { name: retailConfig.logo.alt })).toBeInTheDocument();
    });
  });

  describe('drawer behavior', () => {
    it('locks the body scroll while the drawer is open and restores it after closing', () => {
      const { unmount } = renderHeader(wholesaleConfig, 'wholesale');

      fireEvent.click(screen.getByRole('button', { name: 'منو' }));
      expect(document.body.style.overflow).toBe('hidden');

      fireEvent.click(screen.getByRole('button', { name: 'بستن' }));
      expect(document.body.style.overflow).not.toBe('hidden');

      unmount();
    });

    it('closes the drawer when the Escape key is pressed', () => {
      renderHeader(wholesaleConfig, 'wholesale');

      fireEvent.click(screen.getByRole('button', { name: 'منو' }));
      expect(screen.getByRole('dialog', { name: 'منوی موبایل' })).toBeInTheDocument();

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(screen.queryByRole('dialog', { name: 'منوی موبایل' })).not.toBeInTheDocument();
    });
  });
});

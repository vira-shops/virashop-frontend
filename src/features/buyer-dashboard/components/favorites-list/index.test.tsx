import * as React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { FavoritesList } from '.';
// After the component: importing an endpoint module first would enter the
// contracts ↔ connections import cycle from the wrong end.
import { FAVORITES_MOCK } from '@/contracts/endpoints/favorites';

const removeButtons = () => screen.getAllByRole('button', { name: 'حذف از علاقه‌مندی‌ها' });

describe('FavoritesList', () => {
  it('renders one card per saved product', async () => {
    renderWithProviders(<FavoritesList />);

    await screen.findAllByRole('button', { name: 'حذف از علاقه‌مندی‌ها' });
    expect(removeButtons()).toHaveLength(FAVORITES_MOCK.length);
  });

  it('shows out-of-stock products without a cart button, and discounts with a badge', async () => {
    renderWithProviders(<FavoritesList />);

    await screen.findAllByRole('button', { name: 'حذف از علاقه‌مندی‌ها' });
    const outOfStock = FAVORITES_MOCK.filter((item) => !item.inStock).length;

    expect(screen.getAllByText('ناموجود')).toHaveLength(outOfStock);
    expect(screen.getAllByRole('link', { name: 'افزودن به سبد خرید' })).toHaveLength(
      FAVORITES_MOCK.length - outOfStock,
    );
    expect(screen.getAllByText('۲۰٪').length).toBeGreaterThan(0);
  });

  it('gives every card the same fixed rows, so a grid row lines up', async () => {
    const { container } = renderWithProviders(<FavoritesList />);

    await screen.findAllByRole('button', { name: 'حذف از علاقه‌مندی‌ها' });
    const cards = container.querySelectorAll('article');

    cards.forEach((card) => {
      // Two-line title box, the sale row (empty when not discounted) and the price row.
      expect(card.querySelector('h3')).toHaveClass('h-[2lh]');
      expect(card.querySelectorAll('.h-\\[1lh\\]')).toHaveLength(1);
      expect(card.querySelectorAll('.h-11')).not.toHaveLength(0);
    });
  });

  it('removes a product optimistically', async () => {
    renderWithProviders(<FavoritesList />);

    await screen.findAllByRole('button', { name: 'حذف از علاقه‌مندی‌ها' });
    fireEvent.click(removeButtons()[0]);

    await waitFor(() => expect(removeButtons()).toHaveLength(FAVORITES_MOCK.length - 1));
  });
});

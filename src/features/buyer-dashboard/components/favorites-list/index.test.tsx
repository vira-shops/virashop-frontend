import * as React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { FavoritesList } from '.';
// After the component: importing an endpoint module first would enter the
// contracts ↔ connections import cycle from the wrong end.
import { FAVORITES_MOCK } from '@/contracts/endpoints/favorites';

/** Both grids render (phone rows + desktop cards); count one layout's buttons. */
const removeButtons = () => screen.getAllByRole('button', { name: 'حذف از علاقه‌مندی‌ها' });

describe('FavoritesList', () => {
  it('renders every saved product in both layouts', async () => {
    renderWithProviders(<FavoritesList />);

    await screen.findAllByRole('button', { name: 'حذف از علاقه‌مندی‌ها' });
    expect(removeButtons()).toHaveLength(FAVORITES_MOCK.length * 2);
  });

  it('removes a product optimistically', async () => {
    renderWithProviders(<FavoritesList />);

    await screen.findAllByRole('button', { name: 'حذف از علاقه‌مندی‌ها' });
    fireEvent.click(removeButtons()[0]);

    await waitFor(() => expect(removeButtons()).toHaveLength((FAVORITES_MOCK.length - 1) * 2));
  });
});

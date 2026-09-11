import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchIcon, BasketIcon } from '@icons';
import { UserActions } from './user-actions';

const actions = [
  { icon: <SearchIcon />, ariaLabel: 'جستجو' },
  { icon: <BasketIcon />, ariaLabel: 'سبد خرید', href: '/cart' },
];

describe('UserActions', () => {
  it('renders one accessible control per action', () => {
    render(<UserActions actions={actions} />);

    expect(screen.getByRole('button', { name: 'جستجو' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'سبد خرید' })).toBeInTheDocument();
  });

  it('points action links at their configured href', () => {
    render(<UserActions actions={actions} />);

    expect(screen.getByRole('link', { name: 'سبد خرید' })).toHaveAttribute('href', '/cart');
  });
});

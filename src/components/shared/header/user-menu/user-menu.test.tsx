import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserMenu } from './index';

const user = { fullName: 'سارا احمدی', phone: '09123456789' };

describe('UserMenu', () => {
  it('renders a closed trigger with no visible name/phone/sign-out', () => {
    render(<UserMenu user={user} onSignOut={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'حساب کاربری' })).toBeInTheDocument();
    expect(screen.queryByText('سارا احمدی')).not.toBeInTheDocument();
    expect(screen.queryByText('خروج از حساب')).not.toBeInTheDocument();
  });

  it('opens the menu and shows the name, phone and sign-out item', () => {
    render(<UserMenu user={user} onSignOut={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'حساب کاربری' }));

    expect(screen.getByRole('menu', { name: 'حساب کاربری' })).toBeInTheDocument();
    expect(screen.getByText('سارا احمدی')).toBeInTheDocument();
    expect(screen.getByText('۰۹۱۲۳۴۵۶۷۸۹')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'خروج از حساب' })).toBeInTheDocument();
  });

  it('calls onSignOut and closes the menu when the sign-out item is clicked', () => {
    const handleSignOut = jest.fn();
    render(<UserMenu user={user} onSignOut={handleSignOut} />);

    fireEvent.click(screen.getByRole('button', { name: 'حساب کاربری' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'خروج از حساب' }));

    expect(handleSignOut).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('disables the sign-out item and shows a pending label while signing out', () => {
    render(<UserMenu user={user} onSignOut={jest.fn()} isPending />);

    fireEvent.click(screen.getByRole('button', { name: 'حساب کاربری' }));

    const signOutItem = screen.getByRole('menuitem', { name: 'در حال خروج...' });
    expect(signOutItem).toBeDisabled();
  });

  it('closes the menu on outside click', () => {
    render(
      <div>
        <UserMenu user={user} onSignOut={jest.fn()} />
        <button type="button">outside</button>
      </div>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'حساب کاربری' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('button', { name: 'outside' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the menu on Escape', () => {
    render(<UserMenu user={user} onSignOut={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'حساب کاربری' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

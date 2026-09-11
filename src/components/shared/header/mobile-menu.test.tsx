import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MobileMenu } from './mobile-menu';

const items = [
  { label: 'دسته‌بندی‌ها', href: '/retail/categories' },
  { label: 'پرفروش‌ها', href: '/retail/best-sellers' },
];

describe('MobileMenu', () => {
  it('opens the drawer with the nav items when the burger is clicked', () => {
    render(<MobileMenu items={items} />);

    fireEvent.click(screen.getByRole('button', { name: 'منو' }));

    const dialog = screen.getByRole('dialog', { name: 'منوی موبایل' });
    expect(within(dialog).getByRole('link', { name: 'دسته‌بندی‌ها' })).toHaveAttribute(
      'href',
      '/retail/categories',
    );
    expect(within(dialog).getByRole('link', { name: 'پرفروش‌ها' })).toBeInTheDocument();
  });

  it('closes the drawer on Escape', () => {
    render(<MobileMenu items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'منو' }));
    expect(screen.getByRole('dialog', { name: 'منوی موبایل' })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: 'منوی موبایل' })).not.toBeInTheDocument();
  });
});

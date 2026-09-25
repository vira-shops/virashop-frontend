import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { PATHS } from '@/routes/paths';
import { buyerDashboardConfig } from './buyer-config';
import { DashboardShell } from './dashboard-shell';
import { isNavItemActive } from './utils';

let mockPathname: string = PATHS.DASHBOARD.BUYER.ROOT;

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
}));

const user = { name: 'حسین حیدری' };

const renderShell = (onLogout = jest.fn()) =>
  render(
    <DashboardShell config={buyerDashboardConfig} user={user} onLogout={onLogout}>
      <p>محتوای صفحه</p>
    </DashboardShell>,
  );

/** The desktop column's nav (the drawer's copy only exists while open). */
const desktopNav = () => screen.getAllByRole('navigation', { name: 'منوی حساب کاربری' })[0];

describe('DashboardShell', () => {
  beforeEach(() => {
    mockPathname = PATHS.DASHBOARD.BUYER.ROOT;
  });

  it('applies the config theme and renders the page content', () => {
    const { container } = renderShell();

    expect(container.firstChild).toHaveAttribute('data-theme', 'wholesale');
    expect(screen.getByRole('main')).toHaveTextContent('محتوای صفحه');
    expect(screen.getAllByText('حسین حیدری').length).toBeGreaterThan(0);
  });

  it('renders every configured tile with PATHS hrefs', () => {
    renderShell();
    const nav = within(desktopNav());

    expect(nav.getByRole('link', { name: 'سفارش ها' })).toHaveAttribute(
      'href',
      PATHS.DASHBOARD.BUYER.ORDERS,
    );
    expect(nav.getByRole('link', { name: 'فروشگاه' })).toHaveAttribute('href', PATHS.RETAIL.ROOT);
    expect(nav.getByRole('button', { name: 'خروج' })).toBeInTheDocument();
    expect(nav.getAllByRole('listitem')).toHaveLength(9);
  });

  it('marks the dashboard tile active only on the exact root', () => {
    renderShell();

    expect(within(desktopNav()).getByRole('link', { name: 'داشبورد' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('keeps a section active on nested routes', () => {
    mockPathname = PATHS.DASHBOARD.BUYER.ORDER(42);
    renderShell();
    const nav = within(desktopNav());

    expect(nav.getByRole('link', { name: 'سفارش ها' })).toHaveAttribute('aria-current', 'page');
    expect(nav.getByRole('link', { name: 'داشبورد' })).not.toHaveAttribute('aria-current');
  });

  it('calls onLogout from the logout tile', () => {
    const onLogout = jest.fn();
    renderShell(onLogout);

    fireEvent.click(within(desktopNav()).getByRole('button', { name: 'خروج' }));

    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it('opens and closes the mobile drawer', () => {
    renderShell();

    fireEvent.click(screen.getByRole('button', { name: 'باز کردن منو' }));
    const drawer = screen.getByRole('dialog', { name: 'منوی حساب کاربری' });

    expect(within(drawer).getByRole('link', { name: 'پروفایل' })).toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole('link', { name: 'پروفایل' }));
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'باز کردن منو' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

describe('isNavItemActive', () => {
  const item = { key: 'orders', label: 'سفارش ها', icon: () => null, href: '/d/orders' };

  it('matches the exact path and nested paths', () => {
    expect(isNavItemActive(item, '/d/orders')).toBe(true);
    expect(isNavItemActive(item, '/d/orders/1')).toBe(true);
    expect(isNavItemActive(item, '/d/orders-archive')).toBe(false);
  });

  it('respects exact matching and action items', () => {
    expect(isNavItemActive({ ...item, exact: true }, '/d/orders/1')).toBe(false);
    expect(isNavItemActive({ ...item, href: undefined }, '/d/orders')).toBe(false);
    expect(isNavItemActive(item, null)).toBe(false);
  });
});

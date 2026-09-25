import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { PageHeading } from './page-heading';

describe('PageHeading', () => {
  it('renders the title as an h1 by default', () => {
    render(<PageHeading title="داشبورد" />);

    expect(screen.getByRole('heading', { level: 1, name: 'داشبورد' })).toBeInTheDocument();
    expect(screen.queryByRole('link')).toBeNull();
  });

  it('renders a Persian count chip only when count is positive', () => {
    const { rerender } = render(<PageHeading title="اعلان ها" count={2} />);
    expect(screen.getByText('۲')).toBeInTheDocument();

    rerender(<PageHeading title="اعلان ها" count={0} />);
    expect(screen.queryByText('۰')).toBeNull();
  });

  it('renders the back link and the actions slot', () => {
    render(
      <PageHeading
        title="جزئیات سفارش"
        as="h2"
        backHref="/dashboard/buyer/orders"
        actions={<a href="/invoice">مشاهده فاکتور</a>}
      />,
    );

    expect(screen.getByRole('link', { name: 'بازگشت' })).toHaveAttribute(
      'href',
      '/dashboard/buyer/orders',
    );
    expect(screen.getByRole('heading', { level: 2, name: 'جزئیات سفارش' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'مشاهده فاکتور' })).toBeInTheDocument();
  });
});

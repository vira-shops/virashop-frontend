import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from './logo';

describe('Logo', () => {
  it('renders the logo image inside a link home by default', () => {
    render(<Logo src="/images/logo.svg" alt="ویراشاپس" />);

    const link = screen.getByRole('link', { name: 'ویراشاپس' });
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByAltText('ویراشاپس')).toBeInTheDocument();
  });

  it('links to a custom href when given', () => {
    render(<Logo src="/images/logo.svg" alt="ویراشاپس خرده" href="/retail" />);

    expect(screen.getByRole('link', { name: 'ویراشاپس خرده' })).toHaveAttribute('href', '/retail');
  });
});

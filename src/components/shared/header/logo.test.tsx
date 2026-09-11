import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from './logo';

describe('Logo', () => {
  it('renders the logo image inside a link home by default', () => {
    render(<Logo src="/images/logo.svg" alt="ویراشاپ" />);

    const link = screen.getByRole('link', { name: 'ویراشاپ' });
    expect(link).toHaveAttribute('href', '/');
    expect(screen.getByAltText('ویراشاپ')).toBeInTheDocument();
  });

  it('links to a custom href when given', () => {
    render(<Logo src="/images/logo.svg" alt="ویراشاپ خرده" href="/retail" />);

    expect(screen.getByRole('link', { name: 'ویراشاپ خرده' })).toHaveAttribute('href', '/retail');
  });
});

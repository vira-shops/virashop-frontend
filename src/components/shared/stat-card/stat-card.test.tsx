import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { StatCard } from './stat-card';

describe('StatCard', () => {
  it('renders the label and a Persian-digit value', () => {
    render(<StatCard label="تحویل شده" value={14} icon={<svg data-testid="icon" />} />);

    expect(screen.getByText('تحویل شده')).toBeInTheDocument();
    expect(screen.getByText('۱۴')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders a string value as-is', () => {
    render(<StatCard label="مجموع" value="۲٬۵۰۰" icon={null} />);

    expect(screen.getByText('۲٬۵۰۰')).toBeInTheDocument();
  });

  it('becomes a link when href is given', () => {
    render(<StatCard label="لغو شده" value={0} icon={null} href="/orders?status=CANCELLED" />);

    expect(screen.getByRole('link')).toHaveAttribute('href', '/orders?status=CANCELLED');
  });

  it('shows a skeleton instead of the value while loading', () => {
    render(<StatCard label="درحال پردازش" value={3} icon={null} loading />);

    expect(screen.queryByText('۳')).toBeNull();
  });
});

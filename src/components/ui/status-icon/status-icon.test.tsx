import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { StatusIcon } from './status-icon';

describe('StatusIcon', () => {
  it.each([
    ['success', 'status-icon-success'],
    ['error', 'status-icon-error'],
    ['warning', 'status-icon-warning'],
  ] as const)('renders the %s status', (status, expected) => {
    render(<StatusIcon status={status} label="وضعیت" />);

    const icon = screen.getByRole('img', { name: 'وضعیت' });

    expect(icon).toHaveClass('status-icon', expected, 'status-icon-size-md');
    expect(icon.querySelector('svg')).toBeInTheDocument();
  });

  it('applies the small size', () => {
    render(<StatusIcon status="success" size="sm" label="پرداخت شده" />);

    expect(screen.getByRole('img', { name: 'پرداخت شده' })).toHaveClass('status-icon-size-sm');
  });

  it('is hidden from assistive tech without a label', () => {
    const { container } = render(<StatusIcon status="error" />);

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByRole('img')).toBeNull();
  });
});

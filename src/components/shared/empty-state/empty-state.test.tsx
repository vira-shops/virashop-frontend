import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  it('announces the message with the emphasised tail', () => {
    render(<EmptyState message="متاسفانه کالایی وجود" highlight="ندارد" />);

    const status = screen.getByRole('status');

    expect(status).toHaveTextContent('متاسفانه کالایی وجود ندارد');
    expect(screen.getByText('ندارد').tagName).toBe('STRONG');
    expect(status.querySelector('svg')).toBeInTheDocument();
  });

  it('drops the icon in the inline variant', () => {
    render(<EmptyState variant="inline" message="متاسفانه سفارشی وجود" highlight="ندارد" />);

    expect(screen.getByRole('status').querySelector('svg')).toBeNull();
  });

  it('renders a custom icon and an action', () => {
    render(
      <EmptyState
        message="خالی است"
        icon={<span data-testid="custom-icon" />}
        action={<button type="button">بازگشت به فروشگاه</button>}
      />,
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'بازگشت به فروشگاه' })).toBeInTheDocument();
  });
});

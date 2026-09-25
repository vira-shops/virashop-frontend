import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { DescriptionList } from './description-list';

describe('DescriptionList', () => {
  const items = [
    { label: 'کد پیگیری', value: '۱۲۳۴۵۶۷۸۹۱۵۴۲' },
    { label: 'نوع پرداخت', value: 'آنلاین' },
    { label: 'آدرس', value: 'یزد - خیابان ۱۷ شهریور', fullWidth: true },
  ];

  it('renders every label/value pair as dt/dd', () => {
    const { container } = render(<DescriptionList items={items} />);

    expect(container.querySelectorAll('dt')).toHaveLength(3);
    expect(container.querySelectorAll('dd')).toHaveLength(3);
    expect(screen.getByText('کد پیگیری').tagName).toBe('DT');
    expect(screen.getByText('آنلاین').tagName).toBe('DD');
  });

  it('spans full-width items across the grid and applies grid overrides', () => {
    const { container } = render(
      <DescriptionList items={items} className="md:grid-cols-4" itemClassName="md:border-e" />,
    );

    expect(container.firstChild).toHaveClass('md:grid-cols-4');
    expect(screen.getByText('آدرس').parentElement).toHaveClass('col-span-full', 'md:border-e');
  });

  it('accepts rich values', () => {
    render(<DescriptionList items={[{ label: 'وضعیت', value: <span data-testid="chip" /> }]} />);

    expect(screen.getByTestId('chip')).toBeInTheDocument();
  });
});

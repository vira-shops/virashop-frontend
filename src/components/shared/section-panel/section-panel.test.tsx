import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { SectionPanel } from './section-panel';

describe('SectionPanel', () => {
  it('renders a labelled region with its body', () => {
    render(
      <SectionPanel title="اطلاعات سفارش">
        <p>کد پیگیری</p>
      </SectionPanel>,
    );

    expect(screen.getByRole('region', { name: 'اطلاعات سفارش' })).toContainElement(
      screen.getByText('کد پیگیری'),
    );
    expect(screen.getByRole('heading', { level: 2, name: 'اطلاعات سفارش' })).toBeInTheDocument();
  });

  it('supports another heading level and header actions', () => {
    render(<SectionPanel title="محصولات" as="h3" actions={<button type="button">همه</button>} />);

    expect(screen.getByRole('heading', { level: 3, name: 'محصولات' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'همه' })).toBeInTheDocument();
  });
});

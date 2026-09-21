import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductPriceBlock } from './product-price-block';

describe('ProductPriceBlock', () => {
  it('renders the retail layout with compareAtPrice and discount badge', () => {
    render(
      <ProductPriceBlock
        price={450_000}
        compareAtPrice={600_000}
        discountPercent={25}
        formatPrice={(v) => v.toLocaleString('en-US')}
      />,
    );

    expect(screen.getByText('450,000 تومان')).toBeInTheDocument();
    expect(screen.getByText('600,000 تومان')).toBeInTheDocument();
    expect(screen.getByText('۲۵٪ تخفیف')).toBeInTheDocument();
  });

  it('renders the wholesale layout with MOQ, installment and tiers', () => {
    render(
      <ProductPriceBlock
        price={400_000}
        wholesale={{
          moq: 10,
          maxQty: 200,
          packMultiple: 5,
          cashPrice: 400_000,
          packPrice: 1_900_000,
          installment: { months: 3, monthlyFeePercent: 2 },
          tiers: [
            { minQty: 10, maxQty: 49, unitPrice: 400_000 },
            { minQty: 50, maxQty: null, unitPrice: 370_000 },
          ],
        }}
        formatPrice={(v) => v.toLocaleString('en-US')}
      />,
    );

    expect(screen.getAllByText('400,000 تومان').length).toBeGreaterThan(0);
    expect(screen.getByText('1,900,000 تومان')).toBeInTheDocument();
    expect(screen.getByText(/حداقل سفارش ۱۰ عدد/)).toBeInTheDocument();
    expect(screen.getByText(/اقساطی ۳ ماهه/)).toBeInTheDocument();
    expect(screen.getByText('370,000 تومان')).toBeInTheDocument();
  });
});

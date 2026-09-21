import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductFilterPanel } from './product-filter-panel';

const categories = [
  { id: 1, slug: 'poultry', label: 'مرغ و ماکیان', productCount: 12 },
  { id: 2, slug: 'red-meat', label: 'گوشت قرمز', productCount: 8 },
];

describe('ProductFilterPanel', () => {
  it('renders the price slider and category list', () => {
    render(
      <ProductFilterPanel
        priceMin={0}
        priceMax={1_000_000}
        priceValue={[0, 1_000_000]}
        categories={categories}
      />,
    );

    expect(screen.getByText('مرغ و ماکیان')).toBeInTheDocument();
    expect(screen.getByText('گوشت قرمز')).toBeInTheDocument();
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('calls onCategorySelect with the clicked category slug', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();
    render(
      <ProductFilterPanel
        priceMin={0}
        priceMax={1_000_000}
        priceValue={[0, 1_000_000]}
        categories={categories}
        onCategorySelect={handleSelect}
      />,
    );

    await user.click(screen.getByText('گوشت قرمز'));

    expect(handleSelect).toHaveBeenCalledWith('red-meat');
  });

  it('calls onClear when the clear button is clicked', async () => {
    const user = userEvent.setup();
    const handleClear = jest.fn();
    render(
      <ProductFilterPanel
        priceMin={0}
        priceMax={1_000_000}
        priceValue={[0, 1_000_000]}
        categories={categories}
        onClear={handleClear}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'حذف فیلترها' }));

    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('does not render a category section when categories is empty', () => {
    render(
      <ProductFilterPanel
        priceMin={0}
        priceMax={1_000_000}
        priceValue={[0, 1_000_000]}
        categories={[]}
      />,
    );

    expect(screen.queryByText('دسته‌بندی')).not.toBeInTheDocument();
  });
});

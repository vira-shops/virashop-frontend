import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductFilterPanel } from './product-filter-panel';

const categoryGroups = [
  {
    id: 'protein',
    label: 'پروتئینی',
    allLabel: 'همه پروتئینی',
    options: [
      { id: 1, slug: 'poultry', label: 'مرغ و ماکیان', productCount: 12 },
      { id: 2, slug: 'red-meat', label: 'گوشت قرمز', productCount: 8 },
    ],
  },
];

const priceProps = { priceMin: 0, priceMax: 1_000_000, priceValue: [0, 1_000_000] as const };

describe('ProductFilterPanel', () => {
  it('renders the price slider and the category tree', () => {
    render(
      <ProductFilterPanel
        {...priceProps}
        priceValue={[0, 1_000_000]}
        categoryGroups={categoryGroups}
      />,
    );

    expect(screen.getByText('قیمت')).toBeInTheDocument();
    expect(screen.getByText('دسته بندی')).toBeInTheDocument();
    expect(screen.getByText('مرغ و ماکیان')).toBeInTheDocument();
    expect(screen.getByText('گوشت قرمز')).toBeInTheDocument();
    expect(screen.getAllByRole('slider')).toHaveLength(2);
  });

  it('calls onCategoryToggle with the clicked option slug', async () => {
    const user = userEvent.setup();
    const handleToggle = jest.fn();
    render(
      <ProductFilterPanel
        {...priceProps}
        priceValue={[0, 1_000_000]}
        categoryGroups={categoryGroups}
        onCategoryToggle={handleToggle}
      />,
    );

    await user.click(screen.getByRole('checkbox', { name: 'گوشت قرمز' }));

    expect(handleToggle).toHaveBeenCalledWith('red-meat');
  });

  it('checks the option matching selectedCategorySlugs', () => {
    render(
      <ProductFilterPanel
        {...priceProps}
        priceValue={[0, 1_000_000]}
        categoryGroups={categoryGroups}
        selectedCategorySlugs={['poultry']}
      />,
    );

    expect(screen.getByRole('checkbox', { name: 'مرغ و ماکیان' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'گوشت قرمز' })).not.toBeChecked();
  });

  it('calls onClear when the clear button is clicked', async () => {
    const user = userEvent.setup();
    const handleClear = jest.fn();
    render(
      <ProductFilterPanel
        {...priceProps}
        priceValue={[0, 1_000_000]}
        categoryGroups={categoryGroups}
        onClear={handleClear}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'حذف فیلترها' }));

    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it('renders the in-stock switch only when a handler is given', async () => {
    const user = userEvent.setup();
    const handleInStock = jest.fn();
    const { rerender } = render(<ProductFilterPanel {...priceProps} priceValue={[0, 1_000_000]} />);

    expect(screen.queryByRole('switch')).not.toBeInTheDocument();

    rerender(
      <ProductFilterPanel
        {...priceProps}
        priceValue={[0, 1_000_000]}
        inStock={false}
        onInStockChange={handleInStock}
      />,
    );

    await user.click(screen.getByRole('switch', { name: 'کالای موجود' }));

    expect(handleInStock).toHaveBeenCalledWith(true);
  });

  it('does not render the category or brand sections without data', () => {
    render(<ProductFilterPanel {...priceProps} priceValue={[0, 1_000_000]} />);

    expect(screen.queryByText('دسته بندی')).not.toBeInTheDocument();
    expect(screen.queryByText('برند')).not.toBeInTheDocument();
  });
});

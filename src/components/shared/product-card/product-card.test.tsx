import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './product-card';

const baseProps = {
  image: { src: '/images/landing/big-offer/01.png', alt: 'پکیج صرفه‌جویی خانوار' },
  title: 'پکیج صرفه‌جویی خانوار',
  priceLabel: 'قیمت از',
  price: '۴۵۰٬۰۰۰',
  stockNote: 'در ۷۲ فروشگاه',
  action: { label: 'خرید', href: '/wholesale' },
};

describe('ProductCard', () => {
  it('renders the image, title, price row, stock note and buy action', () => {
    render(<ProductCard {...baseProps} />);

    expect(screen.getByAltText('پکیج صرفه‌جویی خانوار')).toBeInTheDocument();
    expect(screen.getByText('پکیج صرفه‌جویی خانوار')).toBeInTheDocument();
    expect(screen.getByText('قیمت از')).toBeInTheDocument();
    expect(screen.getByText('۴۵۰٬۰۰۰')).toBeInTheDocument();
    expect(screen.getByText('در ۷۲ فروشگاه')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'خرید' })).toHaveAttribute('href', '/wholesale');
  });

  it('renders «تومان» after the amount by default and honours an override', () => {
    const { rerender } = render(<ProductCard {...baseProps} />);

    expect(screen.getByText('تومان')).toBeInTheDocument();

    rerender(<ProductCard {...baseProps} priceCurrency="ریال" />);
    expect(screen.getByText('ریال')).toBeInTheDocument();
    expect(screen.queryByText('تومان')).not.toBeInTheDocument();

    rerender(<ProductCard {...baseProps} priceCurrency={null} />);
    expect(screen.queryByText('تومان')).not.toBeInTheDocument();
    expect(screen.getByText('۴۵۰٬۰۰۰')).toBeInTheDocument();
  });

  it('does not render a currency unit when there is no amount', () => {
    render(<ProductCard image={baseProps.image} title="فقط عنوان" />);

    expect(screen.queryByText('تومان')).not.toBeInTheDocument();
  });

  it('forwards the action override to the buy button itself', () => {
    render(<ProductCard {...baseProps} actionClassName="action-override" />);

    expect(screen.getByRole('link', { name: 'خرید' })).toHaveClass('action-override');
  });

  it('renders both badges in the row above the image from plain strings', () => {
    render(<ProductCard {...baseProps} startBadge="اقساط ۵ ماهه" endBadge="۲۰٪ تخفیف" />);

    expect(screen.getByText('اقساط ۵ ماهه')).toBeInTheDocument();
    expect(screen.getByText('۲۰٪ تخفیف')).toBeInTheDocument();
  });

  it('renders the buy action as a button when no href is given', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    render(<ProductCard {...baseProps} action={{ label: 'خرید', onClick: handleClick }} />);

    const button = screen.getByRole('button', { name: 'خرید' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('link', { name: 'خرید' })).not.toBeInTheDocument();
  });

  it('omits the price and stock rows when their props are missing', () => {
    render(<ProductCard image={baseProps.image} title="فقط عنوان" />);

    expect(screen.getByText('فقط عنوان')).toBeInTheDocument();
    expect(screen.queryByText('قیمت از')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'خرید' })).not.toBeInTheDocument();
  });

  it('forwards a custom className to the Card surface', () => {
    render(<ProductCard {...baseProps} className="custom-class" />);

    expect(screen.getByText('پکیج صرفه‌جویی خانوار').closest('[data-slot="card"]')).toHaveClass(
      'custom-class',
    );
  });

  it('applies style overrides to the internal parts', () => {
    render(
      <ProductCard
        {...baseProps}
        startBadge="اقساط ۵ ماهه"
        headerClassName="header-override"
        titleClassName="title-override"
        separatorClassName="separator-override"
        priceRowClassName="price-row-override"
        priceLabelClassName="price-label-override"
        priceClassName="price-override"
        stockNoteClassName="stock-override"
        actionRowClassName="action-row-override"
      />,
    );

    expect(screen.getByText('اقساط ۵ ماهه').parentElement).toHaveClass('header-override');
    expect(screen.getByText('پکیج صرفه‌جویی خانوار')).toHaveClass('title-override');
    expect(screen.getByText('قیمت از').closest('.price-row-override')).not.toBeNull();
    expect(screen.getByText('قیمت از')).toHaveClass('price-label-override');
    expect(screen.getByText('۴۵۰٬۰۰۰')).toHaveClass('price-override');
    expect(screen.getByText('در ۷۲ فروشگاه')).toHaveClass('stock-override');
    expect(screen.getByText('در ۷۲ فروشگاه').closest('.action-row-override')).not.toBeNull();
  });

  it('strikes through the original price under the current one', () => {
    render(<ProductCard {...baseProps} originalPrice="۵۰۰٬۰۰۰" originalPriceClassName="orig" />);

    const original = screen.getByText('۵۰۰٬۰۰۰');

    expect(original.tagName).toBe('DEL');
    expect(original).toHaveClass('orig');
  });

  it('renders a remove button only when onRemove is given', async () => {
    const onRemove = jest.fn();
    const { rerender } = render(<ProductCard {...baseProps} />);

    expect(screen.queryByRole('button', { name: 'حذف' })).toBeNull();

    rerender(<ProductCard {...baseProps} onRemove={onRemove} removeLabel="حذف از علاقه‌مندی‌ها" />);
    await userEvent.click(screen.getByRole('button', { name: 'حذف از علاقه‌مندی‌ها' }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});

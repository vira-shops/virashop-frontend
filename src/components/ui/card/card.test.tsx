import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './card';
import { Button } from '@/components/ui';

describe('Card', () => {
  it('renders with the default variant, radius and shadow', () => {
    render(<Card>محتوا</Card>);

    const card = screen.getByText('محتوا').closest('[data-slot="card"]')!;

    expect(card).toHaveClass('card');
    expect(card).toHaveClass('card-outline');
    expect(card).toHaveClass('card-radius-lg');
    expect(card).toHaveClass('card-shadow-sm');
    expect(card).toHaveAttribute('dir', 'rtl');
  });

  describe('variants', () => {
    it.each([
      ['outline', 'card-outline'],
      ['fill', 'card-fill'],
      ['ghost', 'card-ghost'],
    ] as const)('applies the %s variant class', (variant, expectedClass) => {
      render(<Card variant={variant}>محتوا</Card>);

      expect(screen.getByText('محتوا').closest('[data-slot="card"]')).toHaveClass(expectedClass);
    });
  });

  describe('radius', () => {
    it.each([
      ['sm', 'card-radius-sm'],
      ['md', 'card-radius-md'],
      ['lg', 'card-radius-lg'],
      ['xl', 'card-radius-xl'],
      ['2xl', 'card-radius-2xl'],
    ] as const)('applies the %s radius class', (radius, expectedClass) => {
      render(<Card radius={radius}>محتوا</Card>);

      expect(screen.getByText('محتوا').closest('[data-slot="card"]')).toHaveClass(expectedClass);
    });
  });

  describe('shadow', () => {
    it.each([
      ['sm', 'card-shadow-sm'],
      ['md', 'card-shadow-md'],
      ['lg', 'card-shadow-lg'],
    ] as const)('applies the %s shadow class', (shadow, expectedClass) => {
      render(<Card shadow={shadow}>محتوا</Card>);

      expect(screen.getByText('محتوا').closest('[data-slot="card"]')).toHaveClass(expectedClass);
    });

    it('does not apply a shadow class when shadow="none"', () => {
      render(<Card shadow="none">محتوا</Card>);

      const card = screen.getByText('محتوا').closest('[data-slot="card"]')!;

      expect(card.className).not.toMatch(/card-shadow-/);
    });
  });

  describe('content parts', () => {
    it('does not render image / title / description / price / action when omitted', () => {
      const { container } = render(<Card>فقط محتوای آزاد</Card>);

      expect(container.querySelector('.card-image-wrapper')).toBeNull();
      expect(container.querySelector('.card-title')).toBeNull();
      expect(container.querySelector('.card-description')).toBeNull();
      expect(container.querySelector('.card-price')).toBeNull();
      expect(container.querySelector('.card-action')).toBeNull();
    });

    it('renders the title and description inside a header', () => {
      render(<Card title="محصول" description="توضیحات" />);

      expect(screen.getByText('محصول')).toHaveClass('card-title');
      expect(screen.getByText('توضیحات')).toHaveClass('card-description');

      const title = screen.getByText('محصول');
      const description = screen.getByText('توضیحات');

      expect(title.parentElement).toBe(description.parentElement);
      expect(title.parentElement).toHaveClass('card-header');
    });

    it('renders the price with current, original and default currency', () => {
      render(
        <Card
          price={{
            current: '۱,۷۰۰,۰۰۰',
            original: '۲,۰۰۰,۰۰۰',
          }}
        />,
      );

      const current = screen.getByText('۱,۷۰۰,۰۰۰');
      const original = screen.getByText('۲,۰۰۰,۰۰۰');
      const currency = screen.getByText('تومان');

      expect(current).toHaveClass('card-price-current');
      expect(original).toHaveClass('card-price-original');
      expect(currency).toHaveClass('card-price-currency');
    });

    it('renders the price without the original price line when only current is given', () => {
      render(<Card price={{ current: '۵۰,۰۰۰' }} />);

      expect(screen.getByText('۵۰,۰۰۰')).toBeInTheDocument();
      expect(screen.queryByText(/۲,۰۰۰,۰۰۰/)).not.toBeInTheDocument();
    });

    it('does not render a price label row by default', () => {
      const { container } = render(<Card price={{ current: '۵۰,۰۰۰' }} />);

      expect(container.querySelector('.card-price-row')).toBeNull();
    });

    it('renders the price label with a divider row when provided', () => {
      render(<Card price={{ label: 'قیمت از', current: '۲,۵۴۰,۰۰۰' }} />);

      const label = screen.getByText('قیمت از');
      const row = label.closest('.card-price-row');

      expect(row).not.toBeNull();
      expect(row?.querySelector('.card-price-current')).not.toBeNull();
    });

    it('uses a custom currency when provided', () => {
      render(<Card price={{ current: '۵', currency: 'دلار' }} />);

      expect(screen.getByText('دلار')).toBeInTheDocument();
      expect(screen.queryByText('تومان')).not.toBeInTheDocument();
    });

    it('renders the action node inside card-action', () => {
      render(
        <Card
          action={
            <Button size="sm" fullWidth>
              خرید
            </Button>
          }
        />,
      );

      const action = screen.getByRole('button', { name: 'خرید' }).closest('.card-action');

      expect(action).not.toBeNull();
    });

    it('renders the stock node inside card-stock', () => {
      render(<Card stock={<span>۱۲ عدد موجود</span>} />);

      const stock = screen.getByText('۱۲ عدد موجود').closest('.card-stock');

      expect(stock).not.toBeNull();
    });

    it('renders stock without an action (stock-only row)', () => {
      render(<Card stock={<span>۱۲ عدد موجود</span>} />);

      const row = screen.getByText('۱۲ عدد موجود').closest('.card-action-row');

      expect(row).not.toBeNull();
      expect(row).toHaveClass('card-action-row');
      expect(row).not.toHaveClass('card-action-row-with-stock');
      expect(row?.querySelector('.card-action')).toBeNull();
    });

    it('renders action and stock in a single row when both are provided', () => {
      render(
        <Card
          action={
            <Button size="sm" fullWidth>
              خرید
            </Button>
          }
          stock={<span>۱۲ عدد موجود</span>}
        />,
      );

      const buy = screen.getByRole('button', { name: 'خرید' });
      const stock = screen.getByText('۱۲ عدد موجود');

      const buyRow = buy.closest('.card-action-row');
      const stockRow = stock.closest('.card-action-row');

      expect(buyRow).not.toBeNull();
      expect(buyRow).toBe(stockRow);
      expect(buyRow).toHaveClass('card-action-row-with-stock');
    });

    it('does not render the action row when neither action nor stock is provided', () => {
      render(<Card title="محصول" />);

      expect(document.querySelector('.card-action-row')).toBeNull();
    });
  });

  describe('image', () => {
    it('renders the image when provided', () => {
      render(<Card image={{ src: '/test.png', alt: 'تصویر محصول' }} />);

      const img = screen.getByAltText('تصویر محصول');

      expect(img).toBeInTheDocument();
      expect(img).toHaveClass('card-image');
    });

    it('renders the image badge inside the image wrapper', () => {
      render(
        <Card
          image={{
            src: '/test.png',
            alt: 'محصول',
            badge: <span data-testid="badge">۳۰٪</span>,
          }}
        />,
      );

      const badge = screen.getByTestId('badge');
      const wrapper = badge.closest('.card-image-wrapper');

      expect(wrapper).not.toBeNull();
    });

    it('renders a secondary badge on the opposite corner of the image', () => {
      render(
        <Card
          image={{
            src: '/test.png',
            alt: 'محصول',
            badge: <span data-testid="badge">اقساط ۵ ماهه</span>,
            secondaryBadge: <span data-testid="secondary-badge">۲۰٪ تخفیف</span>,
          }}
        />,
      );

      expect(screen.getByTestId('badge').closest('.card-image-badge')).not.toBeNull();
      expect(
        screen.getByTestId('secondary-badge').closest('.card-image-badge-secondary'),
      ).not.toBeNull();
    });

    it('wraps the image in a Link when href is provided', () => {
      render(<Card image={{ src: '/test.png', alt: 'محصول', href: '/products/1' }} />);

      const link = screen.getByRole('link');
      const img = screen.getByAltText('محصول');

      expect(link).toHaveAttribute('href', '/products/1');
      expect(link.contains(img)).toBe(true);
    });
  });

  it('merges a custom className without removing built-in classes', () => {
    render(<Card className="custom-class">محتوا</Card>);

    const card = screen.getByText('محتوا').closest('[data-slot="card"]')!;

    expect(card).toHaveClass('custom-class');
    expect(card).toHaveClass('card');
    expect(card).toHaveClass('card-outline');
  });

  it('forwards extra props to the root element', () => {
    render(
      <Card data-testid="my-card" aria-label="کارت محصول">
        محتوا
      </Card>,
    );

    const card = screen.getByTestId('my-card');

    expect(card).toHaveAttribute('aria-label', 'کارت محصول');
  });
});

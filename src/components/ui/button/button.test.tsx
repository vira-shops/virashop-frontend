import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>دکمه</Button>);

    const button = screen.getByRole('button', { name: 'دکمه' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('button');
    expect(button).toHaveClass('button-primary');
    expect(button).toHaveClass('button-fill');
    expect(button).toHaveClass('button-text-md');
    expect(button).not.toBeDisabled();
  });

  describe('variants', () => {
    it.each([
      ['fill', 'button-fill'],
      ['outline', 'button-outline'],
      ['ghost', 'button-ghost'],
    ] as const)('applies the %s variant class', (variant, expectedClass) => {
      render(<Button variant={variant}>کلیک</Button>);

      expect(screen.getByRole('button')).toHaveClass(expectedClass);
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'button-primary'],
      ['blue', 'button-blue'],
    ] as const)('applies the %s color class', (color, expectedClass) => {
      render(<Button color={color}>کلیک</Button>);

      expect(screen.getByRole('button')).toHaveClass(expectedClass);
    });
  });

  describe('sizes', () => {
    it.each([
      ['xs', 'button-text-xs'],
      ['sm', 'button-text-sm'],
      ['md', 'button-text-md'],
      ['lg', 'button-text-lg'],
      ['xl', 'button-text-xl'],
      ['xxl', 'button-text-xxl'],
    ] as const)('applies the %s size class', (size, expectedClass) => {
      render(<Button size={size}>کلیک</Button>);

      expect(screen.getByRole('button')).toHaveClass(expectedClass);
      expect(screen.getByRole('button')).not.toHaveClass('button-icon-xs');
    });
  });

  describe('icons', () => {
    const rightIcon = <span data-testid="right-icon" />;
    const leftIcon = <span data-testid="left-icon" />;

    it('renders a right icon before the children (RTL)', () => {
      render(<Button rightIcon={rightIcon}>متن</Button>);

      const button = screen.getByRole('button');

      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(button.firstChild).toHaveAttribute('data-testid', 'right-icon');
    });

    it('renders a left icon after the children (RTL)', () => {
      render(<Button leftIcon={leftIcon}>متن</Button>);

      const button = screen.getByRole('button');

      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(button.lastChild).toHaveAttribute('data-testid', 'left-icon');
    });

    it('renders both icons around the children in RTL order', () => {
      render(
        <Button rightIcon={rightIcon} leftIcon={leftIcon}>
          متن
        </Button>,
      );

      const button = screen.getByRole('button');
      const nodes = Array.from(button.childNodes);

      expect(nodes).toHaveLength(3);
      expect(nodes[0]).toHaveAttribute('data-testid', 'right-icon');
      expect(nodes[1].textContent).toBe('متن');
      expect(nodes[2]).toHaveAttribute('data-testid', 'left-icon');
    });

    it('renders icon-only mode and applies the icon size class', () => {
      render(<Button icon={<span data-testid="only-icon" />} size="lg" aria-label="افزودن" />);

      const button = screen.getByRole('button', { name: 'افزودن' });

      expect(button).toHaveClass('button-icon-lg');
      expect(button).not.toHaveClass('button-text-lg');
      expect(screen.getByTestId('only-icon')).toBeInTheDocument();
    });

    it('ignores children and side icons when icon-only mode is used', () => {
      render(
        <Button
          icon={<span data-testid="only-icon" />}
          rightIcon={<span data-testid="right-icon" />}
        >
          متن
        </Button>,
      );

      expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
      expect(screen.queryByText('متن')).not.toBeInTheDocument();
    });
  });

  describe('additional styles', () => {
    it('applies the full width class', () => {
      render(<Button fullWidth>کلیک</Button>);

      expect(screen.getByRole('button')).toHaveClass('button-fullWidth');
    });

    it('applies the full rounded class', () => {
      render(<Button fullRounded>کلیک</Button>);

      expect(screen.getByRole('button')).toHaveClass('button-fullRounded');
    });

    it('merges a custom className without removing built-in classes', () => {
      render(<Button className="custom-class">کلیک</Button>);

      const button = screen.getByRole('button');

      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('button');
      expect(button).toHaveClass('button-primary');
    });
  });

  describe('states', () => {
    it('is disabled and applies the disabled class', () => {
      render(<Button disabled>کلیک</Button>);

      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveClass('button-disabled');
    });

    it('does not fire onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          کلیک
        </Button>,
      );

      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it.each(['submit', 'reset'] as const)('supports the %s type', (type) => {
      render(<Button type={type}>کلیک</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('type', type);
    });
  });

  describe('events', () => {
    it('fires onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>کلیک</Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('passes through extra props', () => {
      render(
        <Button aria-label="ذخیره اطلاعات" data-testid="save-button">
          کلیک
        </Button>,
      );

      expect(screen.getByTestId('save-button')).toHaveAttribute('aria-label', 'ذخیره اطلاعات');
    });
  });

  describe('href (link mode)', () => {
    it('renders an anchor (Next.js Link) instead of a button when href is provided', () => {
      render(<Button href="/wholesale">ورود به فروشگاه</Button>);

      const link = screen.getByRole('link', { name: 'ورود به فروشگاه' });

      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/wholesale');
      expect(screen.queryByRole('button', { name: 'ورود به فروشگاه' })).not.toBeInTheDocument();
    });

    it('keeps the button class names when rendered as a link', () => {
      render(
        <Button href="/retail" color="retail" variant="outline" fullWidth>
          فروش خرده
        </Button>,
      );

      const link = screen.getByRole('link', { name: 'فروش خرده' });

      expect(link).toHaveClass('button');
      expect(link).toHaveClass('button-retail');
      expect(link).toHaveClass('button-outline');
      expect(link).toHaveClass('button-text-md');
      expect(link).toHaveClass('button-fullWidth');
    });

    it('renders the icon-only mode correctly when used as a link', () => {
      render(<Button href="/cart" icon={<span data-testid="cart-icon" />} aria-label="سبد خرید" />);

      const link = screen.getByRole('link', { name: 'سبد خرید' });

      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', '/cart');
      expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    });

    it('forwards extra anchor attributes to the link', () => {
      render(
        <Button href="https://example.com" target="_blank" rel="noopener noreferrer">
          خارجی
        </Button>,
      );

      const link = screen.getByRole('link', { name: 'خارجی' });

      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('does not render a button when href is provided', () => {
      render(<Button href="/foo">لینک</Button>);

      expect(screen.queryByRole('button', { name: 'لینک' })).not.toBeInTheDocument();
    });
  });
});

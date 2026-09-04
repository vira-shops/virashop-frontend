import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders with the default variant, color, size and radius', () => {
    render(<Badge>جدید</Badge>);

    const badge = screen.getByText('جدید');

    expect(badge.tagName).toBe('SPAN');
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('badge-fill');
    expect(badge).toHaveClass('badge-primary');
    expect(badge).toHaveClass('badge-size-sm');
    expect(badge).toHaveClass('badge-radius-full');
    expect(badge).toHaveAttribute('dir', 'rtl');
    expect(badge).toHaveAttribute('data-slot', 'badge');
  });

  describe('variants', () => {
    it.each([
      ['fill', 'badge-fill'],
      ['outline', 'badge-outline'],
      ['soft', 'badge-soft'],
    ] as const)('applies the %s variant class', (variant, expectedClass) => {
      render(<Badge variant={variant}>متن</Badge>);

      expect(screen.getByText('متن')).toHaveClass(expectedClass);
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'badge-primary'],
      ['warning-red', 'badge-warning-red'],
      ['warning-green', 'badge-warning-green'],
      ['warning-blue', 'badge-warning-blue'],
      ['yellow', 'badge-yellow'],
      ['blue', 'badge-blue'],
      ['gray', 'badge-gray'],
      ['dark', 'badge-dark'],
    ] as const)('applies the %s color class', (color, expectedClass) => {
      render(<Badge color={color}>متن</Badge>);

      expect(screen.getByText('متن')).toHaveClass(expectedClass);
    });
  });

  describe('sizes', () => {
    it.each([
      ['xs', 'badge-size-xs'],
      ['sm', 'badge-size-sm'],
      ['md', 'badge-size-md'],
    ] as const)('applies the %s size class', (size, expectedClass) => {
      render(<Badge size={size}>متن</Badge>);

      expect(screen.getByText('متن')).toHaveClass(expectedClass);
    });
  });

  describe('radius', () => {
    it.each([
      ['sm', 'badge-radius-sm'],
      ['md', 'badge-radius-md'],
      ['full', 'badge-radius-full'],
    ] as const)('applies the %s radius class', (radius, expectedClass) => {
      render(<Badge radius={radius}>متن</Badge>);

      expect(screen.getByText('متن')).toHaveClass(expectedClass);
    });
  });

  describe('icons', () => {
    const rightIcon = <span data-testid="right-icon" />;
    const leftIcon = <span data-testid="left-icon" />;

    it('renders the right icon before the children in RTL order', () => {
      render(<Badge rightIcon={rightIcon}>متن</Badge>);

      const badge = screen.getByText('متن');
      const nodes = Array.from(badge.childNodes);

      expect(nodes[0]).toHaveAttribute('data-testid', 'right-icon');
      expect(nodes[1].textContent).toBe('متن');
    });

    it('renders the left icon after the children in RTL order', () => {
      render(<Badge leftIcon={leftIcon}>متن</Badge>);

      const badge = screen.getByText('متن');
      const nodes = Array.from(badge.childNodes);

      expect(nodes[0].textContent).toBe('متن');
      expect(nodes[1]).toHaveAttribute('data-testid', 'left-icon');
    });

    it('renders both icons around the children in RTL order', () => {
      render(
        <Badge rightIcon={rightIcon} leftIcon={leftIcon}>
          متن
        </Badge>,
      );

      const badge = screen.getByText('متن');
      const nodes = Array.from(badge.childNodes);

      expect(nodes).toHaveLength(3);
      expect(nodes[0]).toHaveAttribute('data-testid', 'right-icon');
      expect(nodes[1].textContent).toBe('متن');
      expect(nodes[2]).toHaveAttribute('data-testid', 'left-icon');
    });
  });

  it('merges a custom className without removing built-in classes', () => {
    render(<Badge className="custom-class">متن</Badge>);

    const badge = screen.getByText('متن');

    expect(badge).toHaveClass('custom-class');
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('badge-primary');
  });

  it('forwards extra props to the root element', () => {
    render(
      <Badge data-testid="my-badge" aria-label="برچسب تخفیف">
        ۳۰٪
      </Badge>,
    );

    const badge = screen.getByTestId('my-badge');

    expect(badge).toHaveAttribute('aria-label', 'برچسب تخفیف');
  });
});

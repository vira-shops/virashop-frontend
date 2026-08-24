import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from './typography';

describe('Typography', () => {
  it('renders with the default variant and tag', () => {
    render(<Typography>متن نمونه</Typography>);

    const el = screen.getByText('متن نمونه');

    expect(el.tagName).toBe('P');
    expect(el).toHaveClass('typography');
    expect(el).toHaveClass('typography-body-md');
  });

  describe('variants', () => {
    it.each([
      ['h1', 'typography-h1'],
      ['h2', 'typography-h2'],
      ['h3', 'typography-h3'],
      ['h4', 'typography-h4'],
      ['h5', 'typography-h5'],
      ['h6', 'typography-h6'],
      ['body-xl', 'typography-body-xl'],
      ['body-md', 'typography-body-md'],
      ['body-sm', 'typography-body-sm'],
      ['body-xs', 'typography-body-xs'],
      ['caption-lg', 'typography-caption-lg'],
      ['caption-md', 'typography-caption-md'],
      ['overline-lg', 'typography-overline-lg'],
      ['overline-sm', 'typography-overline-sm'],
    ] as const)('applies the %s variant class', (variant, expectedClass) => {
      render(<Typography variant={variant}>متن</Typography>);

      expect(screen.getByText('متن')).toHaveClass(expectedClass);
    });
  });

  describe('heading tags', () => {
    it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
      'renders the %s tag by default for the %s variant',
      (tag) => {
        render(<Typography variant={tag}>عنوان</Typography>);

        expect(screen.getByText('عنوان').tagName).toBe(tag.toUpperCase());
      },
    );

    it('renders a non-heading tag when the as prop overrides it', () => {
      render(
        <Typography variant="h2" as="span">
          عنوان
        </Typography>,
      );

      expect(screen.getByText('عنوان').tagName).toBe('SPAN');
      expect(screen.getByText('عنوان')).toHaveClass('typography-h2');
    });
  });

  describe('colors', () => {
    it.each([
      ['primary', 'typography-primary'],
      ['blue', 'typography-blue'],
      ['gray', 'typography-gray'],
      ['black', 'typography-black'],
      ['white', 'typography-white'],
      ['warning-red', 'typography-warning-red'],
      ['warning-green', 'typography-warning-green'],
      ['warning-blue', 'typography-warning-blue'],
    ] as const)('applies the %s color class', (color, expectedClass) => {
      render(<Typography color={color}>متن</Typography>);

      expect(screen.getByText('متن')).toHaveClass(expectedClass);
    });
  });

  describe('modifiers', () => {
    it.each([
      ['right', 'text-right'],
      ['left', 'text-left'],
      ['center', 'text-center'],
      ['justify', 'text-justify'],
    ] as const)('applies %s alignment', (align, expectedClass) => {
      render(<Typography align={align}>متن</Typography>);

      expect(screen.getByText('متن')).toHaveClass(expectedClass);
    });

    it.each([
      ['uppercase', 'uppercase'],
      ['capitalize', 'capitalize'],
      ['lowercase', 'lowercase'],
    ] as const)('applies the %s transform', (transform, expectedClass) => {
      render(<Typography transform={transform}>text</Typography>);

      expect(screen.getByText('text')).toHaveClass(expectedClass);
    });

    it.each([
      ['underline', 'underline'],
      ['lineThrough', 'line-through'],
      ['overline', 'overline'],
    ] as const)('applies the %s decoration', (decoration, expectedClass) => {
      render(<Typography decoration={decoration}>متن</Typography>);

      expect(screen.getByText('متن')).toHaveClass(expectedClass);
    });

    it.each([1, 2, 3, 12] as const)('applies line-clamp-%i', (lineClamp) => {
      render(<Typography lineClamp={lineClamp}>متن</Typography>);

      expect(screen.getByText('متن')).toHaveClass(`line-clamp-${lineClamp}`);
    });

    it('applies truncate end and start', () => {
      const { rerender } = render(<Typography truncate="end">متن</Typography>);
      expect(screen.getByText('متن')).toHaveClass('truncate');

      rerender(<Typography truncate="start">متن</Typography>);
      expect(screen.getByText('متن')).toHaveClass('truncate-start');
    });

    it('applies the inherit class', () => {
      render(<Typography inherit>متن</Typography>);

      expect(screen.getByText('متن')).toHaveClass('typography-inherit');
    });

    it('merges a custom className without removing built-in classes', () => {
      render(<Typography className="custom-class">متن</Typography>);

      const el = screen.getByText('متن');

      expect(el).toHaveClass('custom-class');
      expect(el).toHaveClass('typography');
    });
  });

  describe('asChild', () => {
    it('merges classes into the child element instead of rendering a wrapper', () => {
      render(
        <Typography variant="h1" color="primary" asChild>
          <a href="/home">خانه</a>
        </Typography>,
      );

      const link = screen.getByRole('link', { name: 'خانه' });

      expect(link).toBeInTheDocument();
      expect(link).toHaveClass('typography-h1');
      expect(link).toHaveClass('typography-primary');
      expect(link.closest('[data-slot="typography"]')).toBeNull();
    });

    it('keeps the child own className', () => {
      render(
        <Typography asChild>
          <span className="child-class">متن</span>
        </Typography>,
      );

      const el = screen.getByText('متن');

      expect(el).toHaveClass('child-class');
      expect(el).toHaveClass('typography-body-md');
    });
  });

  it('sets dir and passes extra props through', () => {
    render(
      <Typography dir="rtl" data-testid="typo">
        متن
      </Typography>,
    );

    expect(screen.getByTestId('typo')).toHaveAttribute('dir', 'rtl');
  });
});

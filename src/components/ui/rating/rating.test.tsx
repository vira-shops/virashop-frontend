import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Rating } from './rating';

const filledCount = (root: HTMLElement) => root.querySelectorAll('.rating-star-filled').length;

describe('Rating', () => {
  it('renders max stars and fills the value, with a Persian accessible name', () => {
    render(<Rating value={4} />);

    const rating = screen.getByRole('img', { name: 'امتیاز ۴ از ۵' });

    expect(rating.querySelectorAll('.rating-star')).toHaveLength(5);
    expect(filledCount(rating)).toBe(4);
  });

  it('rounds and clamps the value', () => {
    const { rerender } = render(<Rating value={3.6} label="r" />);
    expect(filledCount(screen.getByRole('img', { name: 'r' }))).toBe(4);

    rerender(<Rating value={9} label="r" />);
    expect(filledCount(screen.getByRole('img', { name: 'r' }))).toBe(5);

    rerender(<Rating value={-2} label="r" />);
    expect(filledCount(screen.getByRole('img', { name: 'r' }))).toBe(0);
  });

  it('supports a custom max', () => {
    render(<Rating value={2} max={3} />);

    expect(screen.getByRole('img', { name: 'امتیاز ۲ از ۳' }).querySelectorAll('svg')).toHaveLength(
      3,
    );
  });

  it.each([
    ['sm', 'rating-size-sm'],
    ['md', 'rating-size-md'],
    ['lg', 'rating-size-lg'],
  ] as const)('applies the %s size', (size, expected) => {
    render(<Rating value={1} size={size} label="r" />);

    expect(screen.getByRole('img', { name: 'r' })).toHaveClass(expected);
  });
});

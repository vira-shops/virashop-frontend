import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './skeleton';

describe('Skeleton', () => {
  it('renders a decorative pulsing block with the base class', () => {
    render(<Skeleton className="h-12 w-48" data-testid="sk" />);

    const skeleton = screen.getByTestId('sk');

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('skeleton');
    expect(skeleton).toHaveClass('h-12');
    expect(skeleton).toHaveClass('w-48');
  });

  it('spreads extra props onto the element', () => {
    render(<Skeleton data-testid="extra" />);

    expect(screen.getByTestId('extra')).toBeInTheDocument();
  });

  it('merges custom classes without losing the base class', () => {
    render(<Skeleton className="custom-class rounded-full" data-testid="merged" />);

    const skeleton = screen.getByTestId('merged');

    expect(skeleton).toHaveClass('custom-class');
    expect(skeleton).toHaveClass('rounded-full');
    expect(skeleton).toHaveClass('skeleton');
  });

  it('is hidden from assistive technology', () => {
    render(<Skeleton data-testid="hidden" />);

    expect(screen.getByTestId('hidden')).toHaveAttribute('aria-hidden', 'true');
  });
});

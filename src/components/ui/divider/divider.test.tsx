import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Divider } from './divider';

describe('Divider', () => {
  it('renders a horizontal separator', () => {
    render(<Divider />);

    const divider = screen.getByRole('separator');

    expect(divider).toHaveClass('divider', 'divider-solid');
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
    expect(divider.querySelector('.divider-label')).toBeNull();
  });

  it('renders the caption before the line', () => {
    render(<Divider label="خوانده شده" />);

    const divider = screen.getByRole('separator');

    expect(divider.firstChild).toHaveTextContent('خوانده شده');
    expect(divider.lastChild).toHaveClass('divider-line');
  });

  it('applies the dashed variant and overrides', () => {
    render(<Divider variant="dashed" className="my-4" lineClassName="border-primary" />);

    const divider = screen.getByRole('separator');

    expect(divider).toHaveClass('divider-dashed', 'my-4');
    expect(divider.querySelector('.divider-line')).toHaveClass('border-primary');
  });
});

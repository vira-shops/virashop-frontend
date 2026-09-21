import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Stepper } from './stepper';

describe('Stepper', () => {
  it('renders the formatted value with its unit', () => {
    render(
      <Stepper
        value={3}
        onChange={jest.fn()}
        unit="شل"
        formatValue={(value) => `#${value}`}
        aria-label="تعداد شل"
      />,
    );

    expect(screen.getByRole('group', { name: 'تعداد شل' })).toHaveTextContent('#3 شل');
  });

  it('steps up and down', () => {
    const onChange = jest.fn();

    render(<Stepper value={3} onChange={onChange} aria-label="تعداد" />);

    fireEvent.click(screen.getByRole('button', { name: 'افزایش' }));
    expect(onChange).toHaveBeenCalledWith(4);

    fireEvent.click(screen.getByRole('button', { name: 'کاهش' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('clamps to the given bounds', () => {
    const onChange = jest.fn();

    render(<Stepper value={5} onChange={onChange} min={1} max={5} step={3} aria-label="تعداد" />);

    expect(screen.getByRole('button', { name: 'افزایش' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'کاهش' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('disables the decrement at the minimum', () => {
    render(<Stepper value={1} onChange={jest.fn()} min={1} aria-label="تعداد" />);

    expect(screen.getByRole('button', { name: 'کاهش' })).toBeDisabled();
  });

  it('is inert when disabled', () => {
    render(<Stepper value={3} onChange={jest.fn()} disabled aria-label="تعداد" />);

    expect(screen.getByRole('button', { name: 'افزایش' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'کاهش' })).toBeDisabled();
  });
});

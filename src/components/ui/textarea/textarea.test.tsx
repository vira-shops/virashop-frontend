import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('links the label to the field and applies default classes', () => {
    render(<Textarea label="آدرس" />);

    const field = screen.getByLabelText('آدرس');

    expect(field.tagName).toBe('TEXTAREA');
    expect(field).toHaveClass('textarea', 'input-outline', 'input-primary');
    expect(field).toHaveAttribute('rows', '4');
  });

  it.each([
    ['outline', 'input-outline'],
    ['fill', 'input-fill'],
    ['ghost', 'input-ghost'],
  ] as const)('applies the %s variant', (variant, expected) => {
    render(<Textarea aria-label="f" variant={variant} />);

    expect(screen.getByLabelText('f')).toHaveClass(expected);
  });

  it('shows the error state and message', () => {
    render(<Textarea aria-label="f" state="error" inputMessage="الزامی است" />);

    expect(screen.getByLabelText('f')).toHaveClass('input-error');
    expect(screen.getByLabelText('f')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('الزامی است')).toHaveClass('text-warning-red');
  });

  it('is disabled and forwards change events', () => {
    const onChange = jest.fn();
    const { rerender } = render(<Textarea aria-label="f" onChange={onChange} />);

    fireEvent.change(screen.getByLabelText('f'), { target: { value: 'یزد' } });
    expect(onChange).toHaveBeenCalledTimes(1);

    rerender(<Textarea aria-label="f" disabled />);
    expect(screen.getByLabelText('f')).toBeDisabled();
    expect(screen.getByLabelText('f')).toHaveClass('input-disabled');
  });
});

import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ValueSlider } from './value-slider';

describe('ValueSlider', () => {
  it('renders the bubble and both range ends through formatLabel', () => {
    render(
      <ValueSlider
        min={1}
        max={120}
        defaultValue={45}
        aria-label="مدت پرداخت"
        formatLabel={(value) => `${value} روز`}
      />,
    );

    expect(screen.getByText('45 روز')).toBeInTheDocument();
    expect(screen.getByText('1 روز')).toBeInTheDocument();
    expect(screen.getByText('120 روز')).toBeInTheDocument();
  });

  it('reports drags and commits on release', () => {
    const onValueChange = jest.fn();
    const onValueCommit = jest.fn();

    render(
      <ValueSlider
        min={0}
        max={10}
        defaultValue={2}
        aria-label="تعداد"
        onValueChange={onValueChange}
        onValueCommit={onValueCommit}
      />,
    );

    const input = screen.getByRole('slider', { name: 'تعداد' });

    fireEvent.change(input, { target: { value: '7' } });
    expect(onValueChange).toHaveBeenCalledWith(7);

    fireEvent.blur(input);
    expect(onValueCommit).toHaveBeenCalled();
  });

  it('clamps a controlled value into range', () => {
    render(<ValueSlider min={1} max={5} value={99} aria-label="تعداد" />);

    expect(screen.getByRole('slider', { name: 'تعداد' })).toHaveValue('5');
  });

  it('is inert when disabled', () => {
    render(<ValueSlider min={1} max={5} defaultValue={2} aria-label="تعداد" disabled />);

    expect(screen.getByRole('slider', { name: 'تعداد' })).toBeDisabled();
  });
});

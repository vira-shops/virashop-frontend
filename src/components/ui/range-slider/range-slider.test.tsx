import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RangeSlider } from './range-slider';

describe('RangeSlider', () => {
  it('renders two range inputs and formatted labels', () => {
    render(<RangeSlider min={0} max={100} defaultValue={[10, 90]} />);

    const inputs = screen.getAllByRole('slider');
    expect(inputs).toHaveLength(2);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();
  });

  it('formats labels with the caller-supplied formatter', () => {
    render(
      <RangeSlider
        min={0}
        max={100}
        defaultValue={[0, 100]}
        formatLabel={(value) => `${value} تومان`}
      />,
    );

    expect(screen.getByText('0 تومان')).toBeInTheDocument();
    expect(screen.getByText('100 تومان')).toBeInTheDocument();
  });

  it('moving the lower handle never exceeds the upper value', async () => {
    const handleChange = jest.fn();
    render(<RangeSlider min={0} max={100} defaultValue={[20, 50]} onValueChange={handleChange} />);

    const [lowerInput] = screen.getAllByRole('slider');
    fireChange(lowerInput, '80');

    expect(handleChange).toHaveBeenCalledWith([50, 50]);
  });

  it('moving the upper handle never goes below the lower value', () => {
    const handleChange = jest.fn();
    render(<RangeSlider min={0} max={100} defaultValue={[20, 50]} onValueChange={handleChange} />);

    const [, upperInput] = screen.getAllByRole('slider');
    fireChange(upperInput, '5');

    expect(handleChange).toHaveBeenCalledWith([20, 20]);
  });

  it('calls onValueCommit on release, not on every change', async () => {
    const user = userEvent.setup();
    const handleCommit = jest.fn();
    render(<RangeSlider min={0} max={100} defaultValue={[20, 50]} onValueCommit={handleCommit} />);

    const [lowerInput] = screen.getAllByRole('slider');
    fireChange(lowerInput, '30');
    expect(handleCommit).not.toHaveBeenCalled();

    await user.click(lowerInput);
    expect(handleCommit).toHaveBeenCalledTimes(1);
  });

  it('applies the disabled state to both inputs', () => {
    render(<RangeSlider min={0} max={100} defaultValue={[0, 100]} disabled />);

    for (const input of screen.getAllByRole('slider')) {
      expect(input).toBeDisabled();
    }
  });

  it('supports the value prop as a controlled slider', () => {
    render(<RangeSlider min={0} max={100} value={[30, 70]} onValueChange={jest.fn()} />);

    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument();
  });
});

function fireChange(element: HTMLElement, value: string) {
  const input = element as HTMLInputElement;
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!;
  setter.call(input, value);
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

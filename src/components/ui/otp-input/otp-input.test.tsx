import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OtpInput } from './otp-input';

const firstCell = () => screen.getByLabelText('کد تایید — رقم 1');

describe('OtpInput', () => {
  it('renders the expected number of digit cells', () => {
    render(<OtpInput label="کد تایید" />);

    expect(screen.getAllByRole('textbox')).toHaveLength(6);
  });

  it('fires onChange with the digits typed so far', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<OtpInput label="کد تایید" onChange={handleChange} />);

    await user.type(firstCell(), '1');
    await user.type(screen.getByLabelText('کد تایید — رقم 2'), '2');

    expect(handleChange).toHaveBeenNthCalledWith(1, '1');
    expect(handleChange).toHaveBeenNthCalledWith(2, '12');
  });

  it('fires onComplete when the last cell is filled', async () => {
    const user = userEvent.setup();
    const handleComplete = jest.fn();
    render(<OtpInput label="کد تایید" onComplete={handleComplete} />);

    for (let index = 1; index <= 6; index += 1) {
      await user.type(screen.getByLabelText(`کد تایید — رقم ${index}`), String(index));
    }

    expect(handleComplete).toHaveBeenCalledWith('123456');
  });

  it('normalizes Persian digits to ASCII', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<OtpInput label="کد تایید" onChange={handleChange} />);

    await user.type(firstCell(), '۱');

    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('advances focus to the next cell after typing', async () => {
    const user = userEvent.setup();
    render(<OtpInput label="کد تایید" />);

    await user.type(firstCell(), '1');

    expect(screen.getByLabelText('کد تایید — رقم 2')).toHaveFocus();
  });

  it('moves back and clears on backspace from an empty cell', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<OtpInput label="کد تایید" defaultValue="12" onChange={handleChange} />);

    const third = screen.getByLabelText('کد تایید — رقم 3');
    third.focus();
    await user.keyboard('{Backspace}');

    expect(screen.getByLabelText('کد تایید — رقم 2')).toHaveFocus();
    expect(handleChange).toHaveBeenLastCalledWith('1');
  });

  it('distributes pasted digits across cells', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<OtpInput label="کد تایید" onChange={handleChange} />);

    await user.click(firstCell());
    await user.paste('9۹8765');

    expect(handleChange).toHaveBeenLastCalledWith('998765');
  });

  it('supports the controlled value prop', () => {
    render(<OtpInput label="کد تایید" value="123456" onChange={jest.fn()} />);

    expect(firstCell()).toHaveValue('1');
    expect(screen.getByLabelText('کد تایید — رقم 6')).toHaveValue('6');
  });

  it.each([
    ['error', 'otp-input-error'],
    ['success', 'otp-input-success'],
  ] as const)('applies the %s state class to the group', (state, expectedClass) => {
    render(<OtpInput label="کد تایید" state={state} />);

    expect(screen.getByRole('group')).toHaveClass(expectedClass);
  });

  it('disables every cell and applies the disabled class', () => {
    render(<OtpInput label="کد تایید" disabled />);

    for (const input of screen.getAllByRole('textbox')) {
      expect(input).toBeDisabled();
    }
    expect(screen.getByRole('group')).toHaveClass('otp-input-disabled');
  });

  it.each([
    ['sm', 'otp-size-sm'],
    ['md', 'otp-size-md'],
    ['lg', 'otp-size-lg'],
  ] as const)('applies the %s size class', (size, expectedClass) => {
    render(<OtpInput label="کد تایید" size={size} />);

    expect(screen.getByRole('group')).toHaveClass(expectedClass);
  });

  it('renders the message with the state color', () => {
    render(<OtpInput label="کد تایید" state="error" message="کد نادرست است" />);

    expect(screen.getByText('کد نادرست است')).toHaveClass('otp-message', 'text-warning-red');
  });

  it('forwards the ref to the first cell', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<OtpInput label="کد تایید" ref={ref} />);

    expect(ref.current).toBe(firstCell());
  });
});

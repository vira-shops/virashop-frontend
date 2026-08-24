import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './text-input';

describe('TextInput', () => {
  it('renders an input with default props', () => {
    render(<TextInput placeholder="جست و جو" />);

    const input = screen.getByPlaceholderText('جست و جو');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toBeDisabled();
    expect(input.closest('.input')).toHaveClass('input-outline');
    expect(input.closest('.input')).toHaveClass('input-md');
  });

  it('accepts user input and fires onChange', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);

    await user.type(screen.getByRole('textbox'), 'متن');

    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it('supports the value prop as a controlled input', () => {
    render(<TextInput value="مقدار" onChange={jest.fn()} />);

    expect(screen.getByRole('textbox')).toHaveValue('مقدار');
  });

  describe('variants', () => {
    it.each([
      ['outline', 'input-outline'],
      ['ghost', 'input-ghost'],
    ] as const)('applies the %s variant class', (variant, expectedClass) => {
      render(<TextInput variant={variant} />);

      expect(screen.getByRole('textbox').closest('.input')).toHaveClass(expectedClass);
    });
  });

  describe('states', () => {
    it.each([
      ['error', 'input-error'],
      ['success', 'input-success'],
      ['warning', 'input-warning'],
    ] as const)('applies the %s state class to the box', (state, expectedClass) => {
      render(<TextInput state={state} />);

      expect(screen.getByRole('textbox').closest('.input')).toHaveClass(expectedClass);
    });

    it.each([
      ['error', 'text-warning-red'],
      ['success', 'text-warning-green'],
      ['warning', 'text-yellow-100'],
    ] as const)('colors the message for the %s state', (state, expectedClass) => {
      render(<TextInput state={state} inputMessage="پیام" />);

      expect(screen.getByText('پیام')).toHaveClass(expectedClass);
    });
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'input-sm'],
      ['md', 'input-md'],
      ['lg', 'input-lg'],
    ] as const)('applies the %s size class', (size, expectedClass) => {
      render(<TextInput size={size} />);

      expect(screen.getByRole('textbox').closest('.input')).toHaveClass(expectedClass);
    });
  });

  describe('label', () => {
    it('associates the label with the input', () => {
      render(<TextInput label="ایمیل" id="email" />);

      const input = screen.getByLabelText('ایمیل');

      expect(input).toHaveAttribute('id', 'email');
    });

    it('generates an id when none is provided', () => {
      render(<TextInput label="ایمیل" />);

      const input = screen.getByLabelText('ایمیل');

      expect(input).toHaveAttribute('id');
    });
  });

  describe('message', () => {
    it('renders the input message when provided', () => {
      render(<TextInput inputMessage="راهنما" />);

      expect(screen.getByText('راهنما')).toHaveClass('input-message');
    });

    it('does not render a message when it is not provided', () => {
      render(<TextInput />);

      expect(document.querySelector('.input-message')).not.toBeInTheDocument();
    });
  });

  describe('icons', () => {
    const rightIcon = <span data-testid="right-icon" />;
    const leftIcon = <span data-testid="left-icon" />;

    it('renders the right icon before the input (RTL)', () => {
      render(<TextInput rightIcon={rightIcon} />);

      const box = screen.getByRole('textbox').parentElement;

      expect(box?.firstElementChild).toHaveAttribute('data-testid', 'right-icon');
    });

    it('renders the left icon after the input (RTL)', () => {
      render(<TextInput leftIcon={leftIcon} />);

      const box = screen.getByRole('textbox').parentElement;

      expect(box?.lastElementChild).toHaveAttribute('data-testid', 'left-icon');
    });

    it('omits icon slots when icons are not provided', () => {
      render(<TextInput />);

      const box = screen.getByRole('textbox').parentElement;

      expect(box?.children).toHaveLength(1);
    });
  });

  describe('states of the field', () => {
    it('is disabled and applies the disabled class', () => {
      render(<TextInput disabled />);

      const input = screen.getByRole('textbox');

      expect(input).toBeDisabled();
      expect(input.closest('.input')).toHaveClass('input-disabled');
    });

    it('applies the full width class', () => {
      render(<TextInput fullWidth />);

      expect(screen.getByRole('textbox').closest('.input')).toHaveClass('input-fullWidth');
    });

    it('merges a custom className without removing built-in classes', () => {
      render(<TextInput className="custom-class" />);

      const box = screen.getByRole('textbox').closest('.input');

      expect(box).toHaveClass('custom-class');
      expect(box).toHaveClass('input');
    });

    it('supports other input types such as password', () => {
      const { container } = render(<TextInput type="password" />);

      expect(container.querySelector('input')).toHaveAttribute('type', 'password');
    });
  });

  it('forwards the ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<TextInput ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('textbox'));
  });

  it('passes through extra props', () => {
    render(<TextInput data-testid="my-input" aria-label="جستجو" />);

    expect(screen.getByTestId('my-input')).toHaveAttribute('aria-label', 'جستجو');
  });
});

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './select';

const options = (
  <>
    <option value="tehran">تهران</option>
    <option value="mashhad">مشهد</option>
  </>
);

describe('Select', () => {
  it('renders a select with default props', () => {
    render(<Select placeholder="انتخاب کنید">{options}</Select>);

    const select = screen.getByRole('combobox');

    expect(select).toBeInTheDocument();
    expect(select).not.toBeDisabled();
    expect(select.closest('.select')).toHaveClass('select-outline');
    expect(select.closest('.select')).toHaveClass('select-md');
  });

  it('renders a hidden disabled placeholder option', () => {
    render(<Select placeholder="انتخاب کنید">{options}</Select>);

    const placeholderOption = screen.getByText('انتخاب کنید') as HTMLOptionElement;

    expect(placeholderOption).toHaveAttribute('value', '');
    expect(placeholderOption).toBeDisabled();
  });

  it('does not render a placeholder option when placeholder is not set', () => {
    render(<Select>{options}</Select>);

    expect(screen.getByRole('combobox').children).toHaveLength(2);
  });

  it('selects an option and fires onChange', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <Select onChange={handleChange} placeholder="انتخاب کنید">
        {options}
      </Select>,
    );

    await user.selectOptions(screen.getByRole('combobox'), 'mashhad');

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('combobox')).toHaveValue('mashhad');
  });

  it('supports the value prop as a controlled select', () => {
    render(
      <Select value="tehran" onChange={jest.fn()}>
        {options}
      </Select>,
    );

    expect(screen.getByRole('combobox')).toHaveValue('tehran');
  });

  describe('variants', () => {
    it.each([
      ['outline', 'select-outline'],
      ['ghost', 'select-ghost'],
    ] as const)('applies the %s variant class', (variant, expectedClass) => {
      render(<Select variant={variant}>{options}</Select>);

      expect(screen.getByRole('combobox').closest('.select')).toHaveClass(expectedClass);
    });
  });

  describe('states', () => {
    it.each([
      ['error', 'select-error'],
      ['success', 'select-success'],
      ['warning', 'select-warning'],
    ] as const)('applies the %s state class to the box', (state, expectedClass) => {
      render(<Select state={state}>{options}</Select>);

      expect(screen.getByRole('combobox').closest('.select')).toHaveClass(expectedClass);
    });

    it.each([
      ['error', 'text-warning-red'],
      ['success', 'text-warning-green'],
      ['warning', 'text-yellow-100'],
    ] as const)('colors the message for the %s state', (state, expectedClass) => {
      render(
        <Select state={state} inputMessage="پیام">
          {options}
        </Select>,
      );

      expect(screen.getByText('پیام')).toHaveClass(expectedClass);
    });
  });

  describe('sizes', () => {
    it.each([
      ['sm', 'select-sm'],
      ['md', 'select-md'],
      ['lg', 'select-lg'],
    ] as const)('applies the %s size class', (size, expectedClass) => {
      render(<Select size={size}>{options}</Select>);

      expect(screen.getByRole('combobox').closest('.select')).toHaveClass(expectedClass);
    });
  });

  describe('label', () => {
    it('associates the label with the select', () => {
      render(
        <Select label="شهر" id="city">
          {options}
        </Select>,
      );

      const select = screen.getByLabelText('شهر');

      expect(select).toHaveAttribute('id', 'city');
    });

    it('generates an id when none is provided', () => {
      render(<Select label="شهر">{options}</Select>);

      expect(screen.getByLabelText('شهر')).toHaveAttribute('id');
    });
  });

  it('renders the input message when provided', () => {
    render(<Select inputMessage="راهنما">{options}</Select>);

    expect(screen.getByText('راهنما')).toHaveClass('select-message');
  });

  it('does not render a message when it is not provided', () => {
    render(<Select>{options}</Select>);

    expect(document.querySelector('.select-message')).not.toBeInTheDocument();
  });

  it('is disabled and applies the disabled class', () => {
    render(<Select disabled>{options}</Select>);

    const select = screen.getByRole('combobox');

    expect(select).toBeDisabled();
    expect(select.closest('.select')).toHaveClass('select-disabled');
  });

  it('applies the full width class', () => {
    render(<Select fullWidth>{options}</Select>);

    expect(screen.getByRole('combobox').closest('.select')).toHaveClass('select-fullWidth');
  });

  it('merges a custom className without removing built-in classes', () => {
    render(<Select className="custom-class">{options}</Select>);

    const box = screen.getByRole('combobox').closest('.select');

    expect(box).toHaveClass('custom-class');
    expect(box).toHaveClass('select');
  });

  it('renders the chevron icon', () => {
    const { container } = render(<Select>{options}</Select>);

    expect(container.querySelector('.select svg')).toBeInTheDocument();
  });

  it('forwards the ref to the select element', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select ref={ref}>{options}</Select>);

    expect(ref.current).toBe(screen.getByRole('combobox'));
  });

  it('passes through extra props', () => {
    render(
      <Select data-testid="my-select" aria-label="انتخاب شهر">
        {options}
      </Select>,
    );

    expect(screen.getByTestId('my-select')).toHaveAttribute('aria-label', 'انتخاب شهر');
  });

  describe('rightIcon', () => {
    it('renders the right icon before the select (RTL)', () => {
      render(
        <Select rightIcon={<span data-testid="right-icon" />} searchable>
          {options}
        </Select>,
      );

      const box = screen.getByRole('combobox').closest('.select');

      expect(box?.firstElementChild).toHaveAttribute('data-testid', 'right-icon');
    });

    it('renders the right icon in native mode too', () => {
      render(<Select rightIcon={<span data-testid="right-icon" />}>{options}</Select>);

      const box = screen.getByRole('combobox').closest('.select');

      expect(box?.firstElementChild).toHaveAttribute('data-testid', 'right-icon');
    });
  });

  describe('searchable', () => {
    it('renders a search input with a chevron toggle', () => {
      render(
        <Select searchable placeholder="جستجو">
          {options}
        </Select>,
      );

      const input = screen.getByRole('combobox');
      const toggle = screen.getByRole('button', { name: 'نمایش گزینه‌ها' });

      expect(input.tagName).toBe('INPUT');
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
      expect(toggle.querySelector('svg')).toBeInTheDocument();
    });

    it('shows a default search icon when no rightIcon is given', () => {
      const { container } = render(<Select searchable>{options}</Select>);

      expect(container.querySelector('.select > svg')).toBeInTheDocument();
    });

    it('opens the listbox with all items when the toggle is clicked', async () => {
      const user = userEvent.setup();
      render(
        <Select searchable placeholder="جستجو">
          {options}
        </Select>,
      );

      await user.click(screen.getByRole('button', { name: 'نمایش گزینه‌ها' }));

      expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getAllByRole('option')).toHaveLength(2);
    });

    it('closes the listbox when the toggle is clicked again', async () => {
      const user = userEvent.setup();
      render(<Select searchable>{options}</Select>);

      const toggle = screen.getByRole('button', { name: 'نمایش گزینه‌ها' });

      await user.click(toggle);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(toggle);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('opens the listbox on focus and filters options by query', async () => {
      const user = userEvent.setup();
      render(
        <Select searchable placeholder="جستجو">
          {options}
        </Select>,
      );

      const input = screen.getByRole('combobox');
      await user.click(input);

      expect(input).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getAllByRole('option')).toHaveLength(2);

      await user.type(input, 'ته');

      expect(screen.getAllByRole('option')).toHaveLength(1);
      expect(screen.getByRole('option', { name: 'تهران' })).toBeInTheDocument();
    });

    it('shows an empty state when nothing matches', async () => {
      const user = userEvent.setup();
      render(<Select searchable>{options}</Select>);

      await user.type(screen.getByRole('combobox'), 'xyz');

      expect(screen.getByText('گزینه‌ای یافت نشد')).toBeInTheDocument();
    });

    it('selects an option on click and closes the listbox', async () => {
      const user = userEvent.setup();
      const handleValueChange = jest.fn();
      render(
        <Select searchable onValueChange={handleValueChange} placeholder="جستجو">
          {options}
        </Select>,
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'مشهد' }));

      expect(handleValueChange).toHaveBeenCalledWith('mashhad');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      expect(screen.getByRole('combobox')).toHaveValue('مشهد');
    });

    it('fires onChange with the picked value', async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();
      render(
        <Select searchable onChange={handleChange}>
          {options}
        </Select>,
      );

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByRole('option', { name: 'مشهد' }));

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('selects the active option with the Enter key', async () => {
      const user = userEvent.setup();
      const handleValueChange = jest.fn();
      render(
        <Select searchable onValueChange={handleValueChange}>
          {options}
        </Select>,
      );

      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(handleValueChange).toHaveBeenCalledWith('mashhad');
    });

    it('closes the listbox with the Escape key', async () => {
      const user = userEvent.setup();
      render(<Select searchable>{options}</Select>);

      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{Escape}');

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('closes the listbox on outside click', async () => {
      const user = userEvent.setup();
      render(<Select searchable>{options}</Select>);

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.click(document.body);

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('marks the selected option with aria-selected', async () => {
      const user = userEvent.setup();
      render(
        <Select searchable defaultValue="tehran">
          {options}
        </Select>,
      );

      await user.click(screen.getByRole('combobox'));

      expect(screen.getByRole('option', { name: 'تهران' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });
  });
});

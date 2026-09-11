import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './tabs';

const items = [
  { value: 'buyer', label: 'خریدار' },
  { value: 'seller', label: 'فروشنده' },
  { value: 'both', label: 'هر دو' },
];

describe('Tabs', () => {
  it('renders a tablist with tab items', () => {
    render(<Tabs items={items} aria-label="نقش" />);

    expect(screen.getByRole('tablist', { name: 'نقش' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('selects the first item by default', () => {
    render(<Tabs items={items} />);

    expect(items[0]).toBeDefined();
    expect(screen.getByRole('tab', { name: 'خریدار' })).toHaveAttribute('aria-selected', 'true');
  });

  it('fires onChange with the selected value', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Tabs items={items} onChange={handleChange} />);

    await user.click(screen.getByRole('tab', { name: 'فروشنده' }));

    expect(handleChange).toHaveBeenCalledWith('seller');
  });

  it('supports the controlled value prop', () => {
    const handleChange = jest.fn();
    render(<Tabs items={items} value="both" onChange={handleChange} />);

    expect(screen.getByRole('tab', { name: 'هر دو' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'خریدار' })).toHaveAttribute('aria-selected', 'false');
  });

  it('moves selection with arrow keys (RTL)', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Tabs items={items} onChange={handleChange} />);

    const firstTab = screen.getByRole('tab', { name: 'خریدار' });
    firstTab.focus();
    // RTL: ArrowRight walks backwards from the first (rightmost) item.
    await user.keyboard('{ArrowLeft}');

    expect(handleChange).toHaveBeenLastCalledWith('seller');
  });

  it('roves tabIndex so only the active tab is in the tab order', () => {
    render(<Tabs items={items} defaultValue="seller" />);

    expect(screen.getByRole('tab', { name: 'فروشنده' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'خریدار' })).toHaveAttribute('tabindex', '-1');
  });

  it('does not fire onChange for a disabled item', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <Tabs
        items={[...items, { value: 'admin', label: 'مدیر', disabled: true }]}
        onChange={handleChange}
      />,
    );

    await user.click(screen.getByRole('tab', { name: 'مدیر' }));

    expect(handleChange).not.toHaveBeenCalled();
    expect(screen.getByRole('tab', { name: 'مدیر' })).toBeDisabled();
  });

  it('does not fire onChange when the whole control is disabled', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Tabs items={items} disabled onChange={handleChange} />);

    await user.click(screen.getByRole('tab', { name: 'خریدار' }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it.each([
    ['fill', 'tabs-fill'],
    ['outline', 'tabs-outline'],
  ] as const)('applies the %s variant class', (variant, expectedClass) => {
    render(<Tabs items={items} variant={variant} />);

    expect(screen.getByRole('tablist')).toHaveClass(expectedClass);
  });

  it.each([
    ['primary', 'tabs-primary'],
    ['blue', 'tabs-blue'],
    ['yellow', 'tabs-yellow'],
    ['retail', 'tabs-retail'],
    ['wholesale', 'tabs-wholesale'],
  ] as const)('applies the %s color class', (color, expectedClass) => {
    render(<Tabs items={items} color={color} />);

    expect(screen.getByRole('tablist')).toHaveClass(expectedClass);
  });

  it.each([
    ['sm', 'tabs-size-sm'],
    ['md', 'tabs-size-md'],
    ['lg', 'tabs-size-lg'],
  ] as const)('applies the %s size class', (size, expectedClass) => {
    render(<Tabs items={items} size={size} />);

    expect(screen.getByRole('tablist')).toHaveClass(expectedClass);
  });

  it('applies the full width class', () => {
    render(<Tabs items={items} fullWidth />);

    expect(screen.getByRole('tablist')).toHaveClass('tabs-fullWidth');
  });

  it('renders item icons before labels (RTL)', () => {
    render(
      <Tabs
        items={[{ value: 'buyer', label: 'خریدار', icon: <span data-testid="item-icon" /> }]}
      />,
    );

    const tab = screen.getByRole('tab', { name: /خریدار/ });

    expect(tab.firstElementChild).toHaveAttribute('data-testid', 'item-icon');
  });

  it('merges custom classNames without removing built-in classes', () => {
    render(<Tabs items={items} className="custom-tabs" itemClassName="custom-item" />);

    expect(screen.getByRole('tablist')).toHaveClass('custom-tabs');
    expect(screen.getAllByRole('tab')[0]).toHaveClass('custom-item');
  });
});

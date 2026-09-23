import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LandingBottomBar } from './bottom-bar';
import { LANDING_BOTTOM_BAR_ITEMS } from './constants';

describe('LandingBottomBar', () => {
  it('renders every chip from the given items', () => {
    render(<LandingBottomBar items={LANDING_BOTTOM_BAR_ITEMS} />);

    for (const item of LANDING_BOTTOM_BAR_ITEMS) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it('renders nothing when there are no items', () => {
    const { container } = render(<LandingBottomBar items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders a chip as a link once it has a destination', () => {
    render(
      <LandingBottomBar
        items={[
          { id: 'fruit', label: 'میوه', href: '/retail/category/fruits/products' },
          { id: 'bakery', label: 'نانوایی' },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: 'میوه' })).toHaveAttribute(
      'href',
      '/retail/category/fruits/products',
    );
    // Without an href the chip stays a button rather than a dead link.
    expect(screen.getByRole('button', { name: 'نانوایی' })).toBeInTheDocument();
  });

  it('reports the pressed chip through onItemSelect', async () => {
    const user = userEvent.setup();
    const onItemSelect = jest.fn();
    const items = [{ id: 'fruit', label: 'میوه' }];

    render(<LandingBottomBar items={items} onItemSelect={onItemSelect} />);
    await user.click(screen.getByRole('button', { name: 'میوه' }));

    expect(onItemSelect).toHaveBeenCalledWith(items[0]);
  });

  it('exposes the centre action by its accessible name', async () => {
    const user = userEvent.setup();
    const onAction = jest.fn();

    render(<LandingBottomBar items={LANDING_BOTTOM_BAR_ITEMS} onAction={onAction} />);
    await user.click(screen.getByRole('button', { name: 'دسته‌بندی‌های بیشتر' }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ListingSortSheet } from './index';

const renderSheet = (overrides: Partial<React.ComponentProps<typeof ListingSortSheet>> = {}) => {
  const props = {
    open: true,
    sort: 'newest' as const,
    theme: 'retail',
    onSelect: jest.fn(),
    onClose: jest.fn(),
    ...overrides,
  };

  render(<ListingSortSheet {...props} />);

  return props;
};

describe('ListingSortSheet', () => {
  it('renders every sort option as a radio, with the current one checked', () => {
    renderSheet();

    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBeGreaterThan(1);

    const checked = radios.filter((radio) => (radio as HTMLInputElement).checked);
    expect(checked).toHaveLength(1);
    expect((checked[0] as HTMLInputElement).value).toBe('newest');
  });

  it('paints the options with the design-system radio, not a native control', () => {
    renderSheet();

    // The sheet renders through a portal, so query the document, not the
    // render container. The ring + dot markup is what gives the sheet its
    // outlined-circle look instead of the browser's own radio.
    expect(document.querySelectorAll('.radio-ring').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('.radio-dot').length).toBeGreaterThan(0);
  });

  it('reports the picked option and closes the sheet', async () => {
    const user = userEvent.setup();
    const { onSelect, onClose } = renderSheet();

    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    const next = radios.find((radio) => !radio.checked)!;

    await user.click(next);

    expect(onSelect).toHaveBeenCalledWith(next.value);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

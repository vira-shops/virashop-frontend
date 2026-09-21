import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './pagination';

describe('Pagination', () => {
  it('renders nothing for a single page', () => {
    const { container } = render(<Pagination page={1} totalPages={1} onPageChange={jest.fn()} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders all pages when the total fits without collapsing', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={jest.fn()} />);

    for (const page of [1, 2, 3, 4, 5]) {
      expect(screen.getByRole('button', { name: String(page) })).toBeInTheDocument();
    }
  });

  it('marks the current page with aria-current', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={jest.fn()} />);

    expect(screen.getByRole('button', { name: '3' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: '2' })).not.toHaveAttribute('aria-current');
  });

  it('collapses a long range into an ellipsis around the current page', () => {
    render(<Pagination page={10} totalPages={50} onPageChange={jest.fn()} />);

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '50' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
    expect(screen.getAllByText('…').length).toBeGreaterThan(0);
    expect(screen.queryByRole('button', { name: '25' })).not.toBeInTheDocument();
  });

  it('calls onPageChange when a page number is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Pagination page={1} totalPages={5} onPageChange={handleChange} />);

    await user.click(screen.getByRole('button', { name: '3' }));

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('disables the previous button on the first page and next on the last', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'صفحه قبل' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'صفحه بعد' })).not.toBeDisabled();
  });

  it('advances one page via the next button', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={handleChange} />);

    await user.click(screen.getByRole('button', { name: 'صفحه بعد' }));

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('does not call onPageChange for the already-active page', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Pagination page={3} totalPages={5} onPageChange={handleChange} />);

    await user.click(screen.getByRole('button', { name: '3' }));

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('disables every control when disabled', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={jest.fn()} disabled />);

    for (const button of screen.getAllByRole('button')) {
      expect(button).toBeDisabled();
    }
  });
});

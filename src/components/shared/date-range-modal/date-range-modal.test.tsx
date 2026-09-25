import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DateRangeModal } from './date-range-modal';

describe('DateRangeModal', () => {
  it('renders nothing while closed', () => {
    render(<DateRangeModal open={false} onClose={jest.fn()} onSubmit={jest.fn()} />);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('shows the title, description and both fields', () => {
    render(<DateRangeModal open onClose={jest.fn()} onSubmit={jest.fn()} />);

    expect(screen.getByRole('dialog', { name: 'جستجو تاریخ' })).toBeInTheDocument();
    expect(screen.getByText('شروع و پایان تاریخ را انتخاب کنید')).toBeInTheDocument();
    expect(screen.getByLabelText('از تاریخ')).toBeInTheDocument();
    expect(screen.getByLabelText('تا تاریخ')).toBeInTheDocument();
  });

  it('submits the pre-filled range', () => {
    const onSubmit = jest.fn();
    render(
      <DateRangeModal
        open
        onClose={jest.fn()}
        onSubmit={onSubmit}
        initialRange={{ from: '2021-08-01', to: '2021-08-12' }}
      />,
    );

    expect(screen.getByLabelText('از تاریخ')).toHaveValue('۱۴۰۰/۰۵/۱۰');
    fireEvent.click(screen.getByRole('button', { name: 'جستجو' }));

    expect(onSubmit).toHaveBeenCalledWith({ from: '2021-08-01', to: '2021-08-12' });
  });

  it('blocks an inverted range', () => {
    const onSubmit = jest.fn();
    render(
      <DateRangeModal
        open
        onClose={jest.fn()}
        onSubmit={onSubmit}
        initialRange={{ from: '2021-08-12', to: '2021-08-01' }}
      />,
    );

    expect(screen.getByText('تاریخ پایان نباید قبل از تاریخ شروع باشد')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'جستجو' })).toBeDisabled();
  });

  it('closes from the close button', () => {
    const onClose = jest.fn();
    render(<DateRangeModal open onClose={onClose} onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'بستن' }));

    expect(onClose).toHaveBeenCalled();
  });
});

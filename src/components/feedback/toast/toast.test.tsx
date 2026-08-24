import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './toast';
import { ToastProvider, useToast } from './toast-provider';

describe('Toast', () => {
  it('renders the description with the variant class', () => {
    render(<Toast variant="success" description="پیام تایید" />);

    const toastEl = screen.getByRole('status');

    expect(toastEl).toHaveClass('toast');
    expect(toastEl).toHaveClass('toast-success');
    expect(screen.getByText('پیام تایید')).toHaveClass('toast-description');
  });

  it('renders without a header when no title is given', () => {
    render(<Toast description="پیام ساده" />);

    expect(document.querySelector('.toast-header')).not.toBeInTheDocument();
  });

  it('renders title, icon and close button for titled toasts', () => {
    const handleClose = jest.fn();
    render(<Toast variant="error" title="عنوان" description="متن" onClose={handleClose} />);

    expect(screen.getByText('عنوان')).toHaveClass('toast-title');
    expect(screen.getByRole('status').querySelector('.toast-icon')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'بستن' }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('omits the close button when onClose is not provided', () => {
    render(<Toast title="عنوان" description="متن" />);

    expect(screen.queryByRole('button', { name: 'بستن' })).not.toBeInTheDocument();
  });
});

describe('ToastProvider', () => {
  const Probe = () => {
    const { success, error, info, dismiss } = useToast();
    const [id, setId] = React.useState('');

    return (
      <div>
        <button type="button" onClick={() => setId(success('موفق شد', { title: 'تایید' }))}>
          success
        </button>
        <button type="button" onClick={() => error('خطا رخ داد')}>
          error
        </button>
        <button type="button" onClick={() => info('اطلاع‌رسانی', { duration: 100 })}>
          info
        </button>
        <button type="button" onClick={() => dismiss(id)}>
          dismiss
        </button>
      </div>
    );
  };

  const renderProvider = () =>
    render(
      <ToastProvider>
        <Probe />
      </ToastProvider>,
    );

  it('throws when useToast is used outside the provider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => render(<Probe />)).toThrow('useToast must be used within a ToastProvider');

    consoleError.mockRestore();
  });

  it('shows a success toast with title and icon', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', { name: 'success' }));

    expect(screen.getByRole('status')).toHaveClass('toast-success');
    expect(screen.getByText('موفق شد')).toBeInTheDocument();
    expect(screen.getByText('تایید')).toHaveClass('toast-title');
    expect(screen.getByRole('button', { name: 'بستن' })).toBeInTheDocument();
  });

  it('shows simple error and info toasts', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', { name: 'error' }));
    expect(screen.getByRole('status')).toHaveClass('toast-error');
    expect(screen.queryByRole('button', { name: 'بستن' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'info' }));
    expect(screen.getAllByRole('status')).toHaveLength(2);
  });

  it('dismisses a toast via the close button', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', { name: 'success' }));
    await user.click(screen.getByRole('button', { name: 'بستن' }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('dismisses via the dismiss api', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', { name: 'success' }));
    await user.click(screen.getByRole('button', { name: 'dismiss' }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('auto-dismisses after the given duration', async () => {
    const user = userEvent.setup();
    renderProvider();

    await user.click(screen.getByRole('button', { name: 'info' }));
    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument(), {
      timeout: 1000,
    });
  });
});

import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from './modal';

const renderModal = (props: Partial<React.ComponentProps<typeof Modal>> = {}) =>
  render(
    <Modal open onClose={jest.fn()} title="عنوان" {...props}>
      <p>محتوا</p>
    </Modal>,
  );

describe('Modal', () => {
  it('renders nothing when open is false', () => {
    render(
      <Modal open={false} onClose={jest.fn()} title="عنوان">
        محتوا
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders into a portal with title and content when open', () => {
    renderModal();

    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleName('عنوان');
    expect(screen.getByText('محتوا')).toBeInTheDocument();
    expect(screen.getByText('محتوا').closest('.modal-panel')).not.toBeNull();
  });

  it('closes via the close button', () => {
    const handleClose = jest.fn();
    renderModal({ onClose: handleClose });

    fireEvent.click(screen.getByRole('button', { name: 'بستن' }));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes via the Escape key', () => {
    const handleClose = jest.fn();
    renderModal({ onClose: handleClose });

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes via a backdrop click', () => {
    const handleClose = jest.fn();
    renderModal({ onClose: handleClose });

    fireEvent.click(screen.getByTestId('modal-backdrop'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on backdrop click when closeOnBackdrop is false', () => {
    const handleClose = jest.fn();
    renderModal({ onClose: handleClose, closeOnBackdrop: false });

    fireEvent.click(screen.getByTestId('modal-backdrop'));

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('does not close when clicking inside the panel', () => {
    const handleClose = jest.fn();
    renderModal({ onClose: handleClose });

    fireEvent.click(screen.getByText('محتوا'));

    expect(handleClose).not.toHaveBeenCalled();
  });

  it('renders the footer content', () => {
    renderModal({ footer: <button type="button">تایید</button> });

    expect(screen.getByRole('button', { name: 'تایید' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'تایید' }).closest('.modal-footer')).not.toBeNull();
  });

  it.each([
    ['sm', 'modal-sm'],
    ['md', 'modal-md'],
    ['lg', 'modal-lg'],
  ] as const)('applies the %s size class', (size, expectedClass) => {
    renderModal({ size });

    expect(screen.getByRole('dialog')).toHaveClass(expectedClass);
  });

  it('locks the body scroll while open and restores it after closing', () => {
    const { rerender } = render(
      <Modal open onClose={jest.fn()}>
        محتوا
      </Modal>,
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal open={false} onClose={jest.fn()}>
        محتوا
      </Modal>,
    );

    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('merges a custom className without removing built-in classes', () => {
    renderModal({ className: 'custom-class' });

    expect(screen.getByRole('dialog')).toHaveClass('custom-class');
    expect(screen.getByRole('dialog')).toHaveClass('modal-panel');
  });
});

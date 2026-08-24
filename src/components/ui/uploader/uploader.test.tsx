import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Uploader } from './uploader';

const pngFile = new File(['png-bytes'], 'cart.png', { type: 'image/png' });
const pdfFile = new File(['%PDF-1.4'], 'cart.pdf', { type: 'application/pdf' });
const txtFile = new File(['text'], 'note.txt', { type: 'text/plain' });

const renderUploader = (props: React.ComponentProps<typeof Uploader> = {}) =>
  render(<Uploader label="عنوان فیلد" placeholder="کارت ملی خود را بارگذاری کنید" {...props} />);

describe('Uploader', () => {
  it('renders the label, placeholder and hidden file input', () => {
    renderUploader();

    const input = screen.getByLabelText('عنوان فیلد');

    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('accept', 'image/*,application/pdf');
    expect(input).toHaveClass('hidden');
    expect(screen.getByText('کارت ملی خود را بارگذاری کنید')).toHaveClass('uploader-placeholder');
  });

  it('opens the file dialog when the tile is clicked', () => {
    renderUploader();

    const input = screen.getByLabelText('عنوان فیلد') as HTMLInputElement;
    const clickSpy = jest.spyOn(input, 'click');

    fireEvent.click(screen.getByRole('button', { name: 'کارت ملی خود را بارگذاری کنید' }));

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('accepts a valid image file and shows the preview', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderUploader({ onChange: handleChange });

    const input = screen.getByLabelText('عنوان فیلد');
    await user.upload(input, pngFile);

    expect(handleChange).toHaveBeenCalledWith(pngFile);
    expect(screen.getByAltText('cart.png')).toHaveClass('uploader-preview');
    expect(screen.queryByText('کارت ملی خود را بارگذاری کنید')).not.toBeInTheDocument();
  });

  it('removes the file when the remove button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderUploader({ onChange: handleChange });

    await user.upload(screen.getByLabelText('عنوان فیلد'), pngFile);
    await user.click(screen.getByRole('button', { name: 'حذف فایل' }));

    expect(handleChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByText('کارت ملی خود را بارگذاری کنید')).toBeInTheDocument();
  });

  it('shows the file name for a pdf instead of an image preview', async () => {
    const user = userEvent.setup();
    renderUploader();

    await user.upload(screen.getByLabelText('عنوان فیلد'), pdfFile);

    expect(screen.getByText('cart.pdf')).toHaveClass('uploader-file-name');
    expect(document.querySelector('.uploader-preview')).not.toBeInTheDocument();
  });

  it('rejects a file with a disallowed type and shows an error', () => {
    const handleChange = jest.fn();
    renderUploader({ onChange: handleChange });

    const input = screen.getByLabelText('عنوان فیلد');
    fireEvent.change(input, { target: { files: [txtFile] } });

    expect(screen.getByText('فرمت فایل مجاز نیست')).toHaveClass('uploader-error-message');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('rejects a file larger than maxSizeMb', async () => {
    const user = userEvent.setup();
    renderUploader({ maxSizeMb: 1 });

    const bigFile = new File(['x'.repeat(2 * 1024 * 1024)], 'big.png', { type: 'image/png' });
    await user.upload(screen.getByLabelText('عنوان فیلد'), bigFile);

    expect(screen.getByText('حجم فایل باید کمتر از 1 مگابایت باشد')).toBeInTheDocument();
  });

  it('clears the error when a valid file is selected afterwards', () => {
    renderUploader();

    const input = screen.getByLabelText('عنوان فیلد');
    fireEvent.change(input, { target: { files: [txtFile] } });
    expect(screen.getByText('فرمت فایل مجاز نیست')).toBeInTheDocument();

    fireEvent.change(input, { target: { files: [pngFile] } });
    expect(screen.queryByText('فرمت فایل مجاز نیست')).not.toBeInTheDocument();
  });

  it('accepts a dropped file', () => {
    const handleChange = jest.fn();
    renderUploader({ onChange: handleChange });

    const tile = screen.getByRole('button', { name: 'کارت ملی خود را بارگذاری کنید' });
    fireEvent.dragOver(tile);
    fireEvent.drop(tile, { dataTransfer: { files: [pngFile] } });

    expect(handleChange).toHaveBeenCalledWith(pngFile);
    expect(tile).not.toHaveClass('uploader-tile-dragover');
  });

  it('toggles the dragover class on drag events', () => {
    renderUploader();

    const tile = screen.getByRole('button', { name: 'کارت ملی خود را بارگذاری کنید' });

    fireEvent.dragOver(tile);
    expect(tile).toHaveClass('uploader-tile-dragover');

    fireEvent.dragLeave(tile);
    expect(tile).not.toHaveClass('uploader-tile-dragover');
  });

  it('ignores interactions when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderUploader({ disabled: true, onChange: handleChange });

    const input = screen.getByLabelText('عنوان فیلد');
    const clickSpy = jest.spyOn(input, 'click');

    await user.click(screen.getByRole('button', { name: 'کارت ملی خود را بارگذاری کنید' }));
    fireEvent.drop(screen.getByRole('button', { name: 'کارت ملی خود را بارگذاری کنید' }), {
      dataTransfer: { files: [pngFile] },
    });

    expect(clickSpy).not.toHaveBeenCalled();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('respects a controlled file prop', () => {
    const { rerender } = renderUploader({ file: pngFile });

    expect(screen.getByAltText('cart.png')).toBeInTheDocument();

    rerender(
      <Uploader
        label="عنوان فیلد"
        placeholder="کارت ملی خود را بارگذاری کنید"
        file={null}
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByText('کارت ملی خود را بارگذاری کنید')).toBeInTheDocument();
  });

  it('merges a custom className without removing built-in classes', () => {
    renderUploader({ className: 'custom-class' });

    const tile = screen.getByRole('button', { name: 'کارت ملی خود را بارگذاری کنید' });

    expect(tile).toHaveClass('custom-class');
    expect(tile).toHaveClass('uploader-tile');
  });
});

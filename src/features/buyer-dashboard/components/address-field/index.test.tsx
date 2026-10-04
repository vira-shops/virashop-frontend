import * as React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { AddressField } from '.';

// Leaflet needs a real browser — the stub map picks a fixed point.
jest.mock('next/dynamic', () => () => {
  const StubMap: React.FC<{ onChange: (value: { lat: number; lng: number }) => void }> = ({
    onChange,
  }) => (
    <button type="button" onClick={() => onChange({ lat: 32, lng: 54 })}>
      pick
    </button>
  );

  return StubMap;
});

describe('AddressField', () => {
  it('labels the textarea and marks it required', () => {
    renderWithProviders(
      <AddressField
        label="آدرس"
        requiredMark
        textareaProps={{ name: 'line', defaultValue: 'یزد' }}
        location={null}
        onLocationChange={jest.fn()}
        theme="retail"
      />,
    );

    expect(screen.getByRole('textbox', { name: 'آدرس' })).toHaveValue('یزد');
    expect(screen.getByText('*')).toHaveClass('input-required-mark');
    expect(screen.getByRole('button', { name: 'انتخاب روی نقشه' })).toBeInTheDocument();
  });

  it('reports a picked point and shows the error over the hint', () => {
    const onLocationChange = jest.fn();
    renderWithProviders(
      <AddressField
        label="آدرس"
        textareaProps={{ name: 'line' }}
        location={null}
        onLocationChange={onLocationChange}
        error="آدرس را کامل وارد کنید"
        hint="راهنما"
        theme="retail"
      />,
    );

    expect(screen.getByText('آدرس را کامل وارد کنید')).toHaveClass('text-warning-red');
    expect(screen.queryByText('راهنما')).toBeNull();
    expect(screen.getByRole('textbox', { name: 'آدرس' })).toHaveAttribute('aria-invalid', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'انتخاب روی نقشه' }));
    fireEvent.click(screen.getByRole('button', { name: 'pick' }));
    fireEvent.click(screen.getByRole('button', { name: 'تایید' }));

    expect(onLocationChange).toHaveBeenCalledWith({ lat: 32, lng: 54 });
  });

  it('locks text and map while disabled', () => {
    renderWithProviders(
      <AddressField
        label="آدرس"
        textareaProps={{ name: 'line' }}
        location={null}
        onLocationChange={jest.fn()}
        disabled
        theme="retail"
      />,
    );

    expect(screen.getByRole('textbox', { name: 'آدرس' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'انتخاب روی نقشه' })).toBeDisabled();
  });
});

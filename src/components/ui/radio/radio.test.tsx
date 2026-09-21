import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Radio } from './radio';

describe('Radio', () => {
  it('renders its label and links it to the control', () => {
    render(<Radio name="ship" value="express" label="ارسال پیشتاز" />);

    expect(screen.getByRole('radio', { name: 'ارسال پیشتاز' })).toBeInTheDocument();
  });

  it('reports selection', () => {
    const onChange = jest.fn();

    render(
      <>
        <Radio name="ship" value="express" label="ارسال پیشتاز" onChange={onChange} />
        <Radio name="ship" value="standard" label="پست معمولی" onChange={onChange} />
      </>,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'پست معمولی' }));

    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole('radio', { name: 'پست معمولی' })).toBeChecked();
  });

  it('honours a controlled checked state', () => {
    render(<Radio name="ship" value="express" label="ارسال پیشتاز" checked readOnly />);

    expect(screen.getByRole('radio', { name: 'ارسال پیشتاز' })).toBeChecked();
  });

  it('is inert when disabled', () => {
    render(<Radio name="ship" value="express" label="ارسال پیشتاز" disabled />);

    expect(screen.getByRole('radio', { name: 'ارسال پیشتاز' })).toBeDisabled();
  });
});

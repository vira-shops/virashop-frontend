import * as React from 'react';
import { render, screen } from '@testing-library/react';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import { DateInput } from './date-input';
import { dateObjectToIso, formatIsoAsJalali, isoToJalali } from './utils';

describe('date-input utils', () => {
  it('converts a Gregorian ISO day to a Jalali display string', () => {
    expect(formatIsoAsJalali('2021-08-12')).toBe('۱۴۰۰/۰۵/۲۱');
  });

  it('returns empty / null for blank or malformed input', () => {
    expect(formatIsoAsJalali(null)).toBe('');
    expect(formatIsoAsJalali('')).toBe('');
    expect(formatIsoAsJalali('12/08/2021')).toBe('');
    expect(isoToJalali('not-a-date')).toBeNull();
  });

  it('round-trips a Jalali pick back to Gregorian ISO with Latin digits', () => {
    const picked = new DateObject({ year: 1400, month: 5, day: 21, calendar: persian });

    expect(dateObjectToIso(picked)).toBe('2021-08-12');
    expect(dateObjectToIso(isoToJalali('1979-08-18')!)).toBe('1979-08-18');
  });
});

describe('DateInput', () => {
  it('renders a read-only labelled field showing the Jalali value', () => {
    render(<DateInput label="تاریخ تولد" value="2021-08-12" onChange={jest.fn()} />);

    const field = screen.getByLabelText('تاریخ تولد');

    expect(field).toHaveAttribute('readonly');
    expect(field).toHaveValue('۱۴۰۰/۰۵/۲۱');
  });

  it('shows the placeholder when empty', () => {
    render(<DateInput aria-label="از" placeholder="از .../.../..." />);

    expect(screen.getByLabelText('از')).toHaveValue('');
    expect(screen.getByPlaceholderText('از .../.../...')).toBeInTheDocument();
  });

  it('passes the error state through to the field', () => {
    render(<DateInput label="تاریخ" state="error" inputMessage="تاریخ نامعتبر است" />);

    expect(screen.getByText('تاریخ نامعتبر است')).toHaveClass('text-warning-red');
  });

  it('disables the trigger', () => {
    render(<DateInput label="تاریخ" disabled />);

    expect(screen.getByLabelText('تاریخ')).toBeDisabled();
  });
});

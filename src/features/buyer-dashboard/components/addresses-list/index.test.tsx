import * as React from 'react';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { AddressesList } from '.';
// After the component: importing an endpoint module first would enter the
// contracts ↔ connections import cycle from the wrong end.
import { ADDRESSES_MOCK } from '@/contracts/endpoints/addresses';

// Leaflet needs a real browser — the map is not under test here.
jest.mock('next/dynamic', () => () => () => null);

const FIRST = 'یزد - یزد';
const SECOND = 'یزد - اردکان';

describe('AddressesList', () => {
  it('lists the saved addresses by region, the default one selected', async () => {
    renderWithProviders(<AddressesList channel="RETAIL" />);

    const group = await screen.findByRole('radiogroup', { name: 'آدرس پیش فرض' });
    expect(within(group).getByRole('radio', { name: FIRST })).toBeChecked();
    expect(within(group).getByRole('radio', { name: SECOND })).not.toBeChecked();
    expect(screen.getByText(ADDRESSES_MOCK[1].line)).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: `${FIRST} روی نقشه` }).length).toBeGreaterThan(0);
  });

  it('switches the default address from the radio', async () => {
    renderWithProviders(<AddressesList channel="RETAIL" />);

    fireEvent.click(await screen.findByRole('radio', { name: SECOND }));

    await waitFor(() => expect(screen.getByRole('radio', { name: SECOND })).toBeChecked());
    expect(screen.getByRole('radio', { name: FIRST })).not.toBeChecked();
  });

  it('opens the inline form as «آدرس N» and validates it', async () => {
    renderWithProviders(<AddressesList channel="RETAIL" />);

    fireEvent.click(await screen.findByRole('button', { name: 'اضافه کردن آدرس جدید' }));
    const form = screen.getByRole('region', { name: 'آدرس ۳' });

    expect(within(form).getByRole('textbox', { name: 'آدرس ۳' })).toBeInTheDocument();
    expect(within(form).getByRole('button', { name: 'انتخاب روی نقشه' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'اضافه کردن آدرس جدید' })).toBeNull();

    fireEvent.click(within(form).getByRole('button', { name: 'ثبت' }));
    expect(await within(form).findByText('کد پستی باید ۱۰ رقم باشد')).toBeInTheDocument();
    expect(within(form).getByText('آدرس را کامل وارد کنید')).toBeInTheDocument();

    fireEvent.click(within(form).getByRole('button', { name: 'انصراف' }));
    expect(screen.queryByRole('region', { name: 'آدرس ۳' })).toBeNull();
  });

  it('edits an address from its «⋮» menu', async () => {
    renderWithProviders(<AddressesList channel="WHOLESALE" />);

    fireEvent.click(await screen.findByRole('button', { name: `گزینه‌های آدرس ${SECOND}` }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'ویرایش' }));

    const form = screen.getByRole('region', { name: 'آدرس ۲' });
    const line = within(form).getByRole('textbox', { name: 'آدرس ۲' });
    expect(line).toHaveValue(ADDRESSES_MOCK[1].line);
    expect(within(form).getByRole('textbox', { name: 'کد پستی' })).toHaveValue(
      ADDRESSES_MOCK[1].postalCode,
    );

    fireEvent.change(line, { target: { value: 'بلوار جمهوری اسلامی، کوچه ۱۲' } });
    fireEvent.click(within(form).getByRole('button', { name: 'ثبت' }));

    expect(await screen.findByText('بلوار جمهوری اسلامی، کوچه ۱۲')).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'آدرس ۲' })).toBeNull();
  });

  it('removes an address from its «⋮» menu', async () => {
    renderWithProviders(<AddressesList channel="RETAIL" />);

    fireEvent.click(await screen.findByRole('button', { name: `گزینه‌های آدرس ${FIRST}` }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'حذف' }));

    await waitFor(() => expect(screen.queryByRole('radio', { name: FIRST })).toBeNull());
    expect(screen.getByRole('radio', { name: SECOND })).toBeInTheDocument();
  });
});

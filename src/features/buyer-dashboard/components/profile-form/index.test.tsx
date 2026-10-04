import * as React from 'react';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { ProfileForm } from '.';
// After the component: importing an endpoint module first would enter the
// contracts ↔ connections import cycle from the wrong end.
import { PROFILE_MOCK } from '@/contracts/endpoints/profile';

const nationalIdField = () => screen.getByRole('textbox', { name: 'کد ملی' });

describe('ProfileForm', () => {
  it('shows the saved profile read-only until «ویرایش»', async () => {
    renderWithProviders(<ProfileForm channel="WHOLESALE" />);

    expect(await screen.findByDisplayValue(PROFILE_MOCK.business!.address)).toBeDisabled();
    expect(nationalIdField()).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'ذخیره تغییرات' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'ویرایش' }));

    expect(nationalIdField()).toBeEnabled();
    expect(screen.getByRole('button', { name: 'ذخیره تغییرات' })).toBeInTheDocument();
  });

  it('validates before saving', async () => {
    renderWithProviders(<ProfileForm channel="WHOLESALE" />);

    fireEvent.click(await screen.findByRole('button', { name: 'ویرایش' }));
    fireEvent.change(nationalIdField(), { target: { value: '12' } });
    fireEvent.click(screen.getByRole('button', { name: 'ذخیره تغییرات' }));

    expect(await screen.findByText('کد ملی باید ۱۰ رقم باشد')).toBeInTheDocument();
  });

  it('saves, confirms with a toast and locks the form again', async () => {
    renderWithProviders(<ProfileForm channel="WHOLESALE" />);

    fireEvent.click(await screen.findByRole('button', { name: 'ویرایش' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'نام و نام خانوادگی' }), {
      target: { value: 'حسین حیدری' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'ذخیره تغییرات' }));

    expect(await screen.findByText('اطلاعات با موفقیت ذخیره شد')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByDisplayValue('حسین حیدری')).toBeDisabled());
  });

  it('cancel restores the saved values', async () => {
    renderWithProviders(<ProfileForm channel="WHOLESALE" />);

    fireEvent.click(await screen.findByRole('button', { name: 'ویرایش' }));
    fireEvent.change(nationalIdField(), { target: { value: '9999999999' } });
    fireEvent.click(screen.getByRole('button', { name: 'انصراف' }));

    expect(nationalIdField()).toHaveValue(PROFILE_MOCK.personal.nationalId);
    expect(nationalIdField()).toBeDisabled();
  });

  it('retail shows «اطلاعات تکمیلی» with the home address and a map picker', async () => {
    renderWithProviders(<ProfileForm channel="RETAIL" />);

    expect(await screen.findByDisplayValue(PROFILE_MOCK.address!.line)).toBeDisabled();
    expect(screen.getByRole('region', { name: 'اطلاعات تکمیلی' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'اطلاعات کسب‌وکار' })).toBeNull();
    expect(screen.getByRole('button', { name: 'انتخاب روی نقشه' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'ویرایش' }));

    expect(screen.getByRole('button', { name: 'انتخاب روی نقشه' })).toBeEnabled();
  });

  it('retail saves without the business fields', async () => {
    renderWithProviders(<ProfileForm channel="RETAIL" />);

    fireEvent.click(await screen.findByRole('button', { name: 'ویرایش' }));
    fireEvent.click(screen.getByRole('button', { name: 'ذخیره تغییرات' }));

    expect(await screen.findByText('اطلاعات با موفقیت ذخیره شد')).toBeInTheDocument();
  });

  it('retail keeps one layout on phones (no tabs) and moves gender / birth date to «اطلاعات تکمیلی»', async () => {
    renderWithProviders(<ProfileForm channel="RETAIL" />);

    const extra = await screen.findByRole('region', { name: 'اطلاعات تکمیلی' });
    const personal = screen.getByRole('region', { name: 'اطلاعات شخصی' });

    expect(screen.queryByRole('tablist')).toBeNull();
    expect(within(extra).getByText('تاریخ تولد')).toBeInTheDocument();
    expect(within(extra).getByText('جنسیت')).toBeInTheDocument();
    expect(within(extra).getByRole('textbox', { name: 'ایمیل' })).toBeInTheDocument();
    expect(within(extra).getByRole('textbox', { name: 'شغل' })).toBeInTheDocument();
    expect(within(personal).queryByText('تاریخ تولد')).toBeNull();
    // Required marks per the design: name, mobile, national id, birth date, address.
    expect(within(personal).getAllByText('*')).toHaveLength(3);
    expect(within(extra).getAllByText('*')).toHaveLength(2);
  });

  it('retail validates the email', async () => {
    renderWithProviders(<ProfileForm channel="RETAIL" />);

    fireEvent.click(await screen.findByRole('button', { name: 'ویرایش' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'ایمیل' }), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'ذخیره تغییرات' }));

    expect(await screen.findByText('ایمیل معتبر نیست')).toBeInTheDocument();
  });

  it('wholesale keeps the phone tabs and the birth date in the personal card', async () => {
    renderWithProviders(<ProfileForm channel="WHOLESALE" />);

    const personal = await screen.findByRole('region', { name: 'اطلاعات شخصی' });

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(within(personal).getByText('تاریخ تولد')).toBeInTheDocument();
    expect(within(personal).queryByText('*')).toBeNull();
  });
});

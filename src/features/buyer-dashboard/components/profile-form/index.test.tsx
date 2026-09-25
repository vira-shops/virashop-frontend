import * as React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/features/buyer-dashboard/test-utils';
import { ProfileForm } from '.';
// After the component: importing an endpoint module first would enter the
// contracts ↔ connections import cycle from the wrong end.
import { PROFILE_MOCK } from '@/contracts/endpoints/profile';

const nationalIdField = () => screen.getByRole('textbox', { name: 'کد ملی' });

describe('ProfileForm', () => {
  it('shows the saved profile read-only until «ویرایش»', async () => {
    renderWithProviders(<ProfileForm />);

    expect(await screen.findByDisplayValue(PROFILE_MOCK.business.address)).toBeDisabled();
    expect(nationalIdField()).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'ذخیره تغییرات' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'ویرایش' }));

    expect(nationalIdField()).toBeEnabled();
    expect(screen.getByRole('button', { name: 'ذخیره تغییرات' })).toBeInTheDocument();
  });

  it('validates before saving', async () => {
    renderWithProviders(<ProfileForm />);

    fireEvent.click(await screen.findByRole('button', { name: 'ویرایش' }));
    fireEvent.change(nationalIdField(), { target: { value: '12' } });
    fireEvent.click(screen.getByRole('button', { name: 'ذخیره تغییرات' }));

    expect(await screen.findByText('کد ملی باید ۱۰ رقم باشد')).toBeInTheDocument();
  });

  it('saves, confirms with a toast and locks the form again', async () => {
    renderWithProviders(<ProfileForm />);

    fireEvent.click(await screen.findByRole('button', { name: 'ویرایش' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'نام و نام خانوادگی' }), {
      target: { value: 'حسین حیدری' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'ذخیره تغییرات' }));

    expect(await screen.findByText('اطلاعات با موفقیت ذخیره شد')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByDisplayValue('حسین حیدری')).toBeDisabled());
  });

  it('cancel restores the saved values', async () => {
    renderWithProviders(<ProfileForm />);

    fireEvent.click(await screen.findByRole('button', { name: 'ویرایش' }));
    fireEvent.change(nationalIdField(), { target: { value: '9999999999' } });
    fireEvent.click(screen.getByRole('button', { name: 'انصراف' }));

    expect(nationalIdField()).toHaveValue(PROFILE_MOCK.personal.nationalId);
    expect(nationalIdField()).toBeDisabled();
  });
});

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { UserIdentity } from './user-identity';

describe('UserIdentity', () => {
  it('renders the avatar, name and subtitle', () => {
    render(<UserIdentity name="حسین حیدری" subtitle="فروشگاه ویرا شاپس" />);

    expect(screen.getByRole('img', { name: 'حسین حیدری' })).toBeInTheDocument();
    expect(screen.getByText('حسین حیدری')).toBeInTheDocument();
    expect(screen.getByText('فروشگاه ویرا شاپس')).toBeInTheDocument();
  });

  it('renders the photo when given', () => {
    render(<UserIdentity name="حسین حیدری" avatarSrc="/images/landing/hero/story-1.png" />);

    expect(screen.getByRole('img', { name: 'حسین حیدری' }).tagName).toBe('IMG');
  });

  it('hides the text in compact mode but keeps the accessible name', () => {
    render(<UserIdentity name="حسین حیدری" subtitle="ویرا" compact />);

    expect(screen.getByRole('img', { name: 'حسین حیدری' })).toBeInTheDocument();
    expect(screen.queryByText('ویرا')).toBeNull();
  });
});

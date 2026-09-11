'use client';

import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/components/feedback';
import { AuthWizard } from '.';
import { useAuthFlowStore, useAuthStore, type AuthFlowDraft } from '@/features/auth/store';
import { useOtpRequest, useOtpVerify, useSignUp } from '@/hooks';
import type { AuthUser } from '@/contracts/endpoints/auth';

const mockPush = jest.fn();

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useOtpRequest: jest.fn(),
  useSignUp: jest.fn(),
  useOtpVerify: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams('channel=RETAIL'),
}));

const mockUseOtpRequest = useOtpRequest as jest.MockedFunction<typeof useOtpRequest>;
const mockUseSignUp = useSignUp as jest.MockedFunction<typeof useSignUp>;
const mockUseOtpVerify = useOtpVerify as jest.MockedFunction<typeof useOtpVerify>;

/** Mutation-shaped hook result — components read `mutateAsync` + `isPending`. */
const mockMutation = (impl?: jest.Mock) =>
  ({ mutateAsync: impl ?? jest.fn(), isPending: false, isError: false }) as never;

const sellerUser: AuthUser = {
  id: 1,
  phone: '09123456789',
  firstName: 'علی',
  lastName: 'رضایی',
  fullName: 'علی رضایی',
  roles: ['RETAIL_BUYER', 'RETAIL_SELLER'],
  accountStatus: 'ACTIVE',
  phoneVerified: true,
  activityType: 'STORE',
  guildType: null,
  seller: { id: 1, kind: 'RETAIL', status: 'PENDING', shopName: null, profileComplete: false },
};

const buyerUser: AuthUser = {
  ...sellerUser,
  firstName: 'سارا',
  lastName: 'کریمی',
  fullName: 'سارا کریمی',
  roles: ['RETAIL_BUYER'],
  activityType: 'GROCERY',
  guildType: 'FOOD',
  seller: null,
};

const seedOtpStep = (draft: Partial<AuthFlowDraft>) => {
  useAuthFlowStore.setState({
    step: 'otp',
    mode: 'signup',
    otpSentAt: Date.now(),
    draft: { ...useAuthFlowStore.getState().draft, phone: '09123456789', ...draft },
  });
};

const renderWizard = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthWizard initialMode="login" />
      </ToastProvider>
    </QueryClientProvider>,
  );
};

const fillCredentials = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('نام'), 'سارا');
  await user.type(screen.getByLabelText('نام خانوادگی'), 'کریمی');
  await user.type(screen.getByLabelText('شماره موبایل'), '09123456789');
};

const fillOtp = async (user: ReturnType<typeof userEvent.setup>) => {
  for (let index = 1; index <= 6; index += 1) {
    await user.type(screen.getByLabelText(`کد تایید — رقم ${index}`), String(index));
  }
};

describe('AuthWizard', () => {
  beforeEach(() => {
    useAuthFlowStore.getState().reset();
    useAuthStore.getState().clearSession();
    mockPush.mockClear();

    mockUseOtpRequest.mockReturnValue(mockMutation());
    mockUseSignUp.mockReturnValue(mockMutation());
    mockUseOtpVerify.mockReturnValue(mockMutation());
  });

  it('starts on the credentials step', () => {
    renderWizard();

    expect(screen.getByText('ایجاد حساب کاربری')).toBeInTheDocument();
    expect(screen.getByLabelText('نام')).toBeInTheDocument();
    expect(screen.getByLabelText('شماره موبایل')).toBeInTheDocument();
  });

  it('goes to the OTP step when the phone already has an account', async () => {
    const user = userEvent.setup();
    mockUseOtpRequest.mockReturnValue(mockMutation(jest.fn().mockResolvedValue({ otpSent: true })));

    renderWizard();
    await fillCredentials(user);
    await user.click(screen.getByRole('button', { name: 'ادامه' }));

    await waitFor(() => {
      expect(screen.getByText(/کد ۶ رقمی به شماره/)).toBeInTheDocument();
    });
    expect(useAuthFlowStore.getState().mode).toBe('login');
    expect(useAuthFlowStore.getState().step).toBe('otp');
  });

  it('goes to the role step when the phone is unknown (signup path)', async () => {
    const user = userEvent.setup();
    mockUseOtpRequest.mockReturnValue(
      mockMutation(
        jest.fn().mockRejectedValue({
          status: 404,
          message: 'not found',
          errorCode: 'ACCOUNT_NOT_FOUND',
        }),
      ),
    );

    renderWizard();
    await fillCredentials(user);
    await user.click(screen.getByRole('button', { name: 'ادامه' }));

    await waitFor(() => {
      expect(screen.getByText('نقش خود را انتخاب کنید')).toBeInTheDocument();
    });
    expect(useAuthFlowStore.getState().mode).toBe('signup');
    expect(useAuthFlowStore.getState().step).toBe('role');
  });

  it('shows a Persian message for a rejected OTP request', async () => {
    const user = userEvent.setup();
    mockUseOtpRequest.mockReturnValue(
      mockMutation(
        jest.fn().mockRejectedValue({
          status: 400,
          message: 'Invalid phone',
          errorCode: 'INVALID_PHONE',
        }),
      ),
    );

    renderWizard();
    await fillCredentials(user);
    await user.click(screen.getByRole('button', { name: 'ادامه' }));

    await waitFor(() => {
      expect(screen.getByText('شماره موبایل نامعتبر است')).toBeInTheDocument();
    });
  });

  it('renders the credentials form when the OTP step has no phone', () => {
    useAuthFlowStore.setState({ step: 'otp', mode: 'login' });

    renderWizard();

    // The guard is derived — invalid persisted steps render as step 1.
    expect(screen.getByText('ایجاد حساب کاربری')).toBeInTheDocument();
  });

  it('does NOT enter the site after verify — seller signup continues to the booth form', async () => {
    const user = userEvent.setup();
    seedOtpStep({ accountType: 'SELLER' });
    mockUseOtpVerify.mockReturnValue(
      mockMutation(jest.fn().mockResolvedValue({ accessToken: 'test-token', user: sellerUser })),
    );

    renderWizard();
    await fillOtp(user);

    await waitFor(() => {
      expect(screen.getByText('تکمیل اطلاعات غرفه')).toBeInTheDocument();
    });
    expect(useAuthStore.getState().accessToken).toBe('test-token');
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('finishes for buyer signup after verify — session set and redirected', async () => {
    const user = userEvent.setup();
    seedOtpStep({ accountType: 'BUYER' });
    mockUseOtpVerify.mockReturnValue(
      mockMutation(jest.fn().mockResolvedValue({ accessToken: 'test-token', user: buyerUser })),
    );

    renderWizard();
    await fillOtp(user);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/retail');
    });
    expect(useAuthStore.getState().accessToken).toBe('test-token');
    expect(useAuthStore.getState().user?.firstName).toBe('سارا');
  });

  it('renders the credentials form for the booth step when no session exists', () => {
    useAuthFlowStore.setState({ step: 'booth', mode: 'signup' });
    useAuthStore.getState().clearSession();

    renderWizard();

    expect(screen.getByText('ایجاد حساب کاربری')).toBeInTheDocument();
  });
});

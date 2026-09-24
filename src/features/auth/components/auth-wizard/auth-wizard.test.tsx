'use client';

import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@/components/feedback';
import { AuthWizard } from '.';
import { useAuthFlowStore, useAuthStore, type AuthFlowDraft } from '@/features/auth/store';
import { useOtpRequest, useOtpVerify, useSignupStep1, useSignupStep2 } from '@/hooks';
import type { AuthUser } from '@/contracts/endpoints/auth';

const mockPush = jest.fn();

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useOtpRequest: jest.fn(),
  useSignupStep1: jest.fn(),
  useSignupStep2: jest.fn(),
  useOtpVerify: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => new URLSearchParams('channel=RETAIL'),
}));

const mockUseOtpRequest = useOtpRequest as jest.MockedFunction<typeof useOtpRequest>;
const mockUseSignupStep1 = useSignupStep1 as jest.MockedFunction<typeof useSignupStep1>;
const mockUseSignupStep2 = useSignupStep2 as jest.MockedFunction<typeof useSignupStep2>;
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

const seedRoleStep = (draft: Partial<AuthFlowDraft>) => {
  useAuthFlowStore.setState({
    step: 'role',
    mode: 'signup',
    otpSentAt: Date.now(),
    draft: { ...useAuthFlowStore.getState().draft, phone: '09123456789', ...draft },
  });
};

const renderWizard = (initialMode: 'login' | 'signup' = 'login') => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthWizard initialMode={initialMode} />
      </ToastProvider>
    </QueryClientProvider>,
  );
};

const fillSignupCredentials = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText('نام'), 'سارا');
  await user.type(screen.getByLabelText('نام خانوادگی'), 'کریمی');
  await user.type(screen.getByLabelText('شماره موبایل'), '09123456789');
};

const fillOtp = async (user: ReturnType<typeof userEvent.setup>) => {
  for (let index = 1; index <= 6; index += 1) {
    await user.type(screen.getByLabelText(`کد تایید — رقم ${index}`), String(index));
  }
};

/** Role form's selects are the non-filterable custom-listbox mode — open, then click the option. */
const chooseOption = async (
  user: ReturnType<typeof userEvent.setup>,
  label: string,
  optionName: string,
) => {
  await user.click(screen.getByLabelText(label));
  await user.click(await screen.findByRole('option', { name: optionName }));
};

describe('AuthWizard', () => {
  beforeEach(() => {
    useAuthFlowStore.getState().reset();
    useAuthStore.getState().clearSession();
    mockPush.mockClear();

    mockUseOtpRequest.mockReturnValue(mockMutation());
    mockUseSignupStep1.mockReturnValue(mockMutation());
    mockUseSignupStep2.mockReturnValue(mockMutation());
    mockUseOtpVerify.mockReturnValue(mockMutation());
  });

  describe('login entry (phone only)', () => {
    it('starts on the login step — phone only, no name fields', () => {
      renderWizard('login');

      expect(screen.getByText('ورود به ویراشاپس')).toBeInTheDocument();
      expect(screen.getByLabelText('شماره موبایل')).toBeInTheDocument();
      expect(screen.queryByLabelText('نام')).not.toBeInTheDocument();
    });

    it('goes to the OTP step once the login OTP is requested', async () => {
      const user = userEvent.setup();
      mockUseOtpRequest.mockReturnValue(
        mockMutation(jest.fn().mockResolvedValue({ otpSent: true })),
      );

      renderWizard('login');
      await user.type(screen.getByLabelText('شماره موبایل'), '09123456789');
      await user.click(screen.getByRole('button', { name: 'تایید و ادامه' }));

      await waitFor(() => {
        expect(screen.getByText('کد تایید را وارد کنید')).toBeInTheDocument();
      });
      expect(useAuthFlowStore.getState().mode).toBe('login');
      expect(useAuthFlowStore.getState().step).toBe('otp');
    });

    it('shows a Persian message when the phone has no account', async () => {
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

      renderWizard('login');
      await user.type(screen.getByLabelText('شماره موبایل'), '09123456789');
      await user.click(screen.getByRole('button', { name: 'تایید و ادامه' }));

      await waitFor(() => {
        expect(screen.getByText('حسابی با این شماره پیدا نشد')).toBeInTheDocument();
      });
    });

    it('renders the login form when the OTP step has no phone', () => {
      useAuthFlowStore.setState({ step: 'otp', mode: 'login' });

      renderWizard('login');

      // The guard is derived — invalid persisted steps render as step 1.
      expect(screen.getByText('ورود به ویراشاپس')).toBeInTheDocument();
    });
  });

  describe('signup entry (name + phone)', () => {
    it('starts on the credentials step', () => {
      renderWizard('signup');

      expect(screen.getByText('ایجاد حساب کاربری')).toBeInTheDocument();
      expect(screen.getByLabelText('نام')).toBeInTheDocument();
      expect(screen.getByLabelText('شماره موبایل')).toBeInTheDocument();
    });

    it('starts signup/step1 and goes to the OTP step', async () => {
      const user = userEvent.setup();
      mockUseSignupStep1.mockReturnValue(
        mockMutation(jest.fn().mockResolvedValue({ otpSent: true })),
      );

      renderWizard('signup');
      await fillSignupCredentials(user);
      await user.click(screen.getByRole('button', { name: 'ثبت' }));

      await waitFor(() => {
        expect(screen.getByText('کد تایید را وارد کنید')).toBeInTheDocument();
      });
      expect(useAuthFlowStore.getState().mode).toBe('signup');
      expect(useAuthFlowStore.getState().step).toBe('otp');
    });

    it('shows a Persian message when the phone is already registered', async () => {
      const user = userEvent.setup();
      mockUseSignupStep1.mockReturnValue(
        mockMutation(
          jest.fn().mockRejectedValue({
            status: 409,
            message: 'already registered',
            errorCode: 'PHONE_ALREADY_REGISTERED',
          }),
        ),
      );

      renderWizard('signup');
      await fillSignupCredentials(user);
      await user.click(screen.getByRole('button', { name: 'ثبت' }));

      await waitFor(() => {
        expect(screen.getByText('این شماره قبلاً ثبت‌نام کرده است؛ وارد شوید')).toBeInTheDocument();
      });
    });

    it('renders the credentials form when the OTP step has no phone', () => {
      useAuthFlowStore.setState({ step: 'otp', mode: 'signup' });

      renderWizard('signup');

      expect(screen.getByText('ایجاد حساب کاربری')).toBeInTheDocument();
    });
  });

  it('goes to the role step when OTP verify reports a fresh signup draft', async () => {
    const user = userEvent.setup();
    useAuthFlowStore.setState({
      step: 'otp',
      mode: 'signup',
      otpSentAt: Date.now(),
      draft: {
        ...useAuthFlowStore.getState().draft,
        phone: '09123456789',
        firstName: 'سارا',
        lastName: 'کریمی',
      },
    });
    mockUseOtpVerify.mockReturnValue(
      mockMutation(
        jest.fn().mockResolvedValue({
          needsStep2: true,
          phone: '09123456789',
          firstName: 'سارا',
          lastName: 'کریمی',
        }),
      ),
    );

    renderWizard('signup');
    await fillOtp(user);

    await waitFor(() => {
      expect(screen.getByText('اطلاعات کاربری')).toBeInTheDocument();
    });
    expect(useAuthFlowStore.getState().step).toBe('role');
    expect(useAuthStore.getState().accessToken).toBeNull();
  });

  it('does NOT enter the site after login verify — seller with an incomplete booth continues there', async () => {
    const user = userEvent.setup();
    useAuthFlowStore.setState({
      step: 'otp',
      mode: 'login',
      otpSentAt: Date.now(),
      draft: { ...useAuthFlowStore.getState().draft, phone: '09123456789' },
    });
    mockUseOtpVerify.mockReturnValue(
      mockMutation(jest.fn().mockResolvedValue({ accessToken: 'test-token', user: sellerUser })),
    );

    renderWizard('login');
    await fillOtp(user);

    await waitFor(() => {
      expect(screen.getByText('تکمیل اطلاعات غرفه')).toBeInTheDocument();
    });
    expect(useAuthStore.getState().accessToken).toBe('test-token');
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('finishes for login verify with a buyer session — session set and redirected', async () => {
    const user = userEvent.setup();
    useAuthFlowStore.setState({
      step: 'otp',
      mode: 'login',
      otpSentAt: Date.now(),
      draft: { ...useAuthFlowStore.getState().draft, phone: '09123456789' },
    });
    mockUseOtpVerify.mockReturnValue(
      mockMutation(jest.fn().mockResolvedValue({ accessToken: 'test-token', user: buyerUser })),
    );

    renderWizard('login');
    await fillOtp(user);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/retail');
    });
    expect(useAuthStore.getState().accessToken).toBe('test-token');
    expect(useAuthStore.getState().user?.firstName).toBe('سارا');
  });

  it('finishes for a buyer step 2 — no success screen, straight into the site', async () => {
    const user = userEvent.setup();
    seedRoleStep({ accountType: 'BUYER' });
    mockUseSignupStep2.mockReturnValue(
      mockMutation(jest.fn().mockResolvedValue({ accessToken: 'test-token', user: buyerUser })),
    );

    renderWizard('signup');

    await screen.findByText('اطلاعات کاربری');
    await chooseOption(user, 'نوع فعالیت', 'خواربار و سوپرمارکت');
    await chooseOption(user, 'نوع صنف', 'مواد غذایی');
    await user.click(screen.getByRole('button', { name: 'تایید و ثبت‌نام' }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/retail');
    });
    expect(useAuthStore.getState().accessToken).toBe('test-token');
  });

  it('shows the success screen after step 2 for a seller signup', async () => {
    const user = userEvent.setup();
    seedRoleStep({ accountType: 'SELLER' });
    mockUseSignupStep2.mockReturnValue(
      mockMutation(jest.fn().mockResolvedValue({ accessToken: 'test-token', user: sellerUser })),
    );

    renderWizard('signup');

    await screen.findByText('اطلاعات کاربری');
    await user.click(screen.getByRole('tab', { name: 'فروشنده' }));
    await chooseOption(user, 'دسته‌بندی', 'تنقلات');
    await chooseOption(user, 'نوع صنف', 'صنایع غذایی');
    await chooseOption(user, 'نوع فعالیت', 'مغازه و فروشگاه');

    const file = new File(['id'], 'national-id.png', { type: 'image/png' });
    const uploadInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    await user.upload(uploadInput, file);

    await user.click(screen.getByRole('button', { name: 'تایید و ثبت‌نام' }));

    await waitFor(() => {
      expect(screen.getByText('حساب کاربری شما با موفقیت ایجاد شد!')).toBeInTheDocument();
    });
    expect(useAuthFlowStore.getState().step).toBe('success');
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('finishes when skipping the success screen for a seller signup', async () => {
    useAuthFlowStore.setState({ step: 'success', mode: 'signup' });
    useAuthStore.getState().setSession('test-token', sellerUser);

    renderWizard('signup');

    await screen.findByText('حساب کاربری شما با موفقیت ایجاد شد!');
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'بعداً انجام می‌دهم' }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/retail');
    });
  });

  it('moves to the booth step when completing the profile from the success screen', async () => {
    useAuthFlowStore.setState({ step: 'success', mode: 'signup' });
    useAuthStore.getState().setSession('test-token', sellerUser);

    renderWizard('signup');

    await screen.findByText('حساب کاربری شما با موفقیت ایجاد شد!');
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'تکمیل اطلاعات پروفایل' }));

    await waitFor(() => {
      expect(screen.getByText('تکمیل اطلاعات غرفه')).toBeInTheDocument();
    });
  });

  it('renders the credentials form for the booth step when no session exists', () => {
    useAuthFlowStore.setState({ step: 'booth', mode: 'signup' });
    useAuthStore.getState().clearSession();

    renderWizard('signup');

    expect(screen.getByText('ایجاد حساب کاربری')).toBeInTheDocument();
  });
});

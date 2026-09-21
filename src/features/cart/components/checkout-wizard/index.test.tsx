import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CheckoutWizard } from './index';
import { useCartStore, useCheckoutStore } from '@/hooks';
import type { CartLine } from '@/hooks';

let searchParams = new URLSearchParams();
const pushState = jest.spyOn(window.history, 'pushState');

jest.mock('next/navigation', () => ({
  usePathname: () => '/cart',
  useSearchParams: () => searchParams,
}));

const renderWizard = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0, staleTime: 0 } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <CheckoutWizard channel="RETAIL" />
    </QueryClientProvider>,
  );
};

const line = (overrides: Partial<Omit<CartLine, 'id'>> = {}): Omit<CartLine, 'id'> => ({
  productSlug: 'protein-1',
  name: 'سینه مرغ تازه',
  imageUrl: null,
  seller: { id: 1, shopName: 'پارس کالا', logoUrl: null },
  unitPrice: 1_200_000,
  commissionPercent: 5,
  shrinks: 2,
  units: 0,
  prepayment: 0,
  ...overrides,
});

/** Opens the wizard on a given step for the seeded seller. */
const openStep = (step: string, sellerId = 1) => {
  searchParams = new URLSearchParams({ invoice: String(sellerId), step });
};

describe('CheckoutWizard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    searchParams = new URLSearchParams();
    useCartStore.getState().reset();
    useCheckoutStore.getState().reset();
  });

  it('invites the buyer back to the storefront when the cart is empty', async () => {
    renderWizard();

    expect(await screen.findByText('سبد خرید شما خالی است')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'مشاهده محصولات' })).toHaveAttribute('href', '/retail');
  });

  it('lists one invoice per seller with its own total', async () => {
    useCartStore.getState().addLine(line());
    useCartStore
      .getState()
      .addLine(line({ seller: { id: 2, shopName: 'نیک کالا', logoUrl: null } }));

    renderWizard();

    const invoices = await screen.findAllByRole('article');

    expect(invoices).toHaveLength(2);
    expect(within(invoices[0]).getByText('پارس کالا')).toBeInTheDocument();
    expect(within(invoices[0]).getByText(/۲٬۴۰۰٬۰۰۰/)).toBeInTheDocument();
  });

  it('opens one invoice from the list', async () => {
    useCartStore.getState().addLine(line());

    renderWizard();

    // The step bar carries a «پرداخت» label too, so scope to the invoice card.
    const [invoice] = await screen.findAllByRole('article');
    fireEvent.click(within(invoice).getByRole('button', { name: 'پرداخت' }));

    expect(pushState).toHaveBeenCalledWith(null, '', '/cart?invoice=1&step=cart');
  });

  it('shows the seller’s lines and retotals as quantities change', async () => {
    useCartStore.getState().addLine(line());
    openStep('cart');

    renderWizard();

    expect(await screen.findByText('فاکتور فروشگاه پارس کالا')).toBeInTheDocument();

    const [shrinkStepper] = screen.getAllByRole('group', { name: 'تعداد شل سینه مرغ تازه' });

    fireEvent.click(within(shrinkStepper).getByRole('button', { name: 'افزایش' }));

    expect(useCartStore.getState().lines[0].shrinks).toBe(3);
  });

  it('keeps «ادامه» disabled until shipping is fully chosen', async () => {
    useCartStore.getState().addLine(line());
    openStep('shipping');

    renderWizard();

    const cont = await screen.findByRole('button', { name: 'ادامه' });
    expect(cont).toBeDisabled();

    fireEvent.click(await screen.findByRole('radio', { name: /انبار/ }));
    fireEvent.click(screen.getByRole('radio', { name: 'ارسال پیشتاز' }));
    fireEvent.click(screen.getByRole('radio', { name: /سه شنبه/ }));
    fireEvent.click(screen.getByRole('radio', { name: 'ساعت ۸-۱۲' }));

    expect(screen.getByRole('button', { name: 'ادامه' })).toBeEnabled();
  });

  it('remembers the shipping choices in the draft', async () => {
    useCartStore.getState().addLine(line());
    openStep('shipping');

    renderWizard();

    fireEvent.click(await screen.findByRole('radio', { name: /فروشگاه/ }));

    expect(useCheckoutStore.getState().drafts[1]).toMatchObject({ addressId: 2 });
  });

  it('settles the invoice and returns to the list once paid', async () => {
    useCartStore.getState().addLine(line());
    useCheckoutStore.getState().patchDraft(1, { paymentMethodId: 'online' });
    openStep('payment');

    renderWizard();

    // Scope past the step bar's own «پرداخت» entry to the summary's CTA.
    const payButtons = await screen.findAllByRole('button', { name: 'پرداخت' });
    fireEvent.click(payButtons[payButtons.length - 1]);

    expect(useCartStore.getState().lines).toHaveLength(0);
    expect(useCheckoutStore.getState().drafts[1]).toBeUndefined();
    expect(pushState).toHaveBeenCalledWith(null, '', '/cart');
  });

  it('falls back to the invoice list when the invoice is unknown', async () => {
    useCartStore.getState().addLine(line());
    openStep('payment', 99);

    renderWizard();

    expect(await screen.findAllByRole('article')).toHaveLength(1);
    expect(screen.queryByText('نوع پرداخت')).not.toBeInTheDocument();
  });
});

'use client';

import * as React from 'react';
import { Button, Skeleton, Typography } from '@/components/ui';
import { CartTable } from '@/features/cart/components/cart-table';
import { CheckoutSteps } from '@/features/cart/components/checkout-steps';
import { CheckoutSummary } from '@/features/cart/components/checkout-summary';
import { FreeShippingCard } from '@/features/cart/components/free-shipping-card';
import { InvoiceHeader } from '@/features/cart/components/invoice-header';
import { InvoiceList } from '@/features/cart/components/invoice-list';
import { PaymentForm } from '@/features/cart/components/payment-form';
import { ShippingForm } from '@/features/cart/components/shipping-form';
import { useCheckout } from './use-checkout';
import {
  CONTINUE_LABEL,
  EMPTY_CART_ACTION,
  EMPTY_CART_TITLE,
  PAY_LABEL,
} from '@/features/cart/constants';
import type { CheckoutWizardProps } from './types';

const CheckoutSkeleton: React.FC = () => (
  <div className="flex flex-col gap-6">
    <Skeleton className="rounded-8 h-14 w-full" />
    <Skeleton className="rounded-9 h-40 w-full" />
  </div>
);

const EmptyCart: React.FC<{ href: string }> = ({ href }) => (
  <div className="flex flex-col items-center gap-5 py-20">
    <Typography variant="body-md" className="text-gray-300">
      {EMPTY_CART_TITLE}
    </Typography>
    <Button variant="fill" color="primary" size="md" href={href}>
      {EMPTY_CART_ACTION}
    </Button>
  </div>
);

export const CheckoutWizard: React.FC<CheckoutWizardProps> = ({ channel }) => {
  const {
    step,
    invoices,
    invoice,
    totals,
    draft,
    addresses,
    shippingMethods,
    deliveryDays,
    paymentMethods,
    optionsLoading,
    isReady,
    canContinue,
    openInvoice,
    goToStep,
    goNext,
    patchDraft,
    setShrinks,
    setUnits,
    setPrepayment,
    payInvoice,
    storefrontHref,
  } = useCheckout(channel);

  if (!isReady) return <CheckoutSkeleton />;

  if (invoices.length === 0) return <EmptyCart href={storefrontHref} />;

  /** The aside's call to action is what the current step hands over to. */
  const action =
    step === 'invoices'
      ? undefined
      : step === 'payment'
        ? { label: PAY_LABEL, onClick: payInvoice, disabled: !canContinue }
        : { label: CONTINUE_LABEL, onClick: goNext, disabled: !canContinue };

  return (
    <div className="flex flex-col gap-6">
      <CheckoutSteps current={step} onStepClick={goToStep} />

      {invoice && <InvoiceHeader seller={invoice.seller} />}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex w-full flex-col gap-4 lg:order-2 lg:w-64 lg:shrink-0">
          <CheckoutSummary
            totals={totals}
            variant={step === 'payment' ? 'total' : 'full'}
            action={action}
          />
          <FreeShippingCard />
        </div>

        <div className="min-w-0 flex-1 lg:order-1">
          {step === 'invoices' && <InvoiceList invoices={invoices} onOpen={openInvoice} />}

          {step === 'cart' && invoice && (
            <CartTable
              lines={invoice.lines}
              onShrinksChange={setShrinks}
              onUnitsChange={setUnits}
              onPrepaymentChange={setPrepayment}
            />
          )}

          {step === 'shipping' && (
            <ShippingForm
              addresses={addresses}
              methods={shippingMethods}
              days={deliveryDays}
              isLoading={optionsLoading}
              draft={draft}
              onChange={patchDraft}
            />
          )}

          {step === 'payment' && (
            <PaymentForm
              methods={paymentMethods}
              isLoading={optionsLoading}
              draft={draft}
              onChange={patchDraft}
            />
          )}
        </div>
      </div>
    </div>
  );
};

CheckoutWizard.displayName = 'CheckoutWizard';

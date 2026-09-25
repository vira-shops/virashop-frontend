import type { PaymentMethod } from '@/contracts/endpoints/checkout';
import type { CheckoutDraft } from '@/hooks';

export interface PaymentFormProps {
  methods: PaymentMethod[];
  isLoading: boolean;
  draft: CheckoutDraft;
  onChange: (patch: Partial<CheckoutDraft>) => void;
}

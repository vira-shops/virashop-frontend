import type { ReactNode } from 'react';
import type { Address, DeliveryDay, ShippingMethod } from '@/contracts/endpoints/checkout';
import type { CheckoutDraft } from '@/hooks';

export type DraftChange = (patch: Partial<CheckoutDraft>) => void;

export interface ShippingFormProps {
  addresses: Address[];
  methods: ShippingMethod[];
  days: DeliveryDay[];
  isLoading: boolean;
  draft: CheckoutDraft;
  onChange: DraftChange;
  onAddAddress?: () => void;
}

export interface ShippingSectionProps {
  title: string;
  children: ReactNode;
  /** The last section has no divider under it. */
  last?: boolean;
}

export interface OptionRadioProps {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onSelect: () => void;
}

export interface DayPickerProps {
  days: DeliveryDay[];
  selectedId: string | null;
  onSelect: (dayId: string) => void;
}

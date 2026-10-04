import type { Address } from '@/contracts/endpoints/addresses';
import type { AddressFormValues } from '@/features/buyer-dashboard/validation/address-schema';
import type { BuyerChannelProps } from '@/features/buyer-dashboard/types';

export type AddressesListProps = BuyerChannelProps;

export interface AddressRowProps {
  address: Address;
  /** «استان - شهر», already resolved to labels. */
  region: string;
  /** Radio group name — one default address per list. */
  groupName: string;
  onSelect: (id: number) => void;
  onEdit: (address: Address) => void;
  onRemove: (id: number) => void;
  /** The form is open — row actions are locked. */
  disabled?: boolean;
}

export interface AddressFormProps {
  /** 1-based number for the «آدرس N» label. */
  index: number;
  defaultValues: AddressFormValues;
  saving: boolean;
  onSubmit: (values: AddressFormValues) => void | Promise<void>;
  onCancel: () => void;
  /** `data-theme` for the portaled map modal. */
  theme: string;
}

/** `null` = closed, `'new'` = adding, an address = editing it. */
export type AddressEditorTarget = Address | 'new' | null;

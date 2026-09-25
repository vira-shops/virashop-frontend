import type { SellerBoothResponse } from '@/contracts/endpoints/auth';
import type { BoothValues } from '@/features/auth/validation/schema';

export interface BoothFormProps {
  onSuccess: (booth: SellerBoothResponse) => void;
}

/** Label + placeholder of one booth field. */
export interface BoothFieldCopy {
  label: string;
  placeholder?: string;
}

export type BoothFieldsCopy = Record<keyof BoothValues, BoothFieldCopy>;

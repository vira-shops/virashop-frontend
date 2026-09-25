import type { UseFormReturn } from 'react-hook-form';
import type { AuthSession } from '@/contracts/endpoints/auth';
import type { AuthSelectOption } from '@/features/auth/types';
import type { RoleValues } from '@/features/auth/validation/schema';

export interface RoleFormProps {
  onSuccess: (session: AuthSession) => void;
  onBack: () => void;
}

export interface RoleSelectFieldProps {
  name: 'activityType' | 'guildType' | 'industryType' | 'category';
  label: string;
  options: AuthSelectOption[];
}

export interface RoleFieldGroupProps {
  form: UseFormReturn<RoleValues>;
}

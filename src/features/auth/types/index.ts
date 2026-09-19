import type { AccountType, Channel, DocumentType } from '@/contracts/endpoints/auth';

/* =========================================================
   Wizard flow (persisted via `auth-flow-store`)
   ========================================================= */

export type AuthFlowStep = 'credentials' | 'otp' | 'role' | 'success' | 'booth';

export type AuthFlowMode = 'login' | 'signup';

export interface AuthFlowDraft {
  firstName: string;
  lastName: string;
  phone: string;
  channel: Channel;
  accountType: AccountType | null;
  activityType: string;
  guildType: string;
  industryType: string;
  category: string;
  documentType: DocumentType;
}

/* =========================================================
   Shared select-option shape for auth catalogs
   ========================================================= */

export interface AuthSelectOption<T extends string = string> {
  value: T;
  label: string;
}

export type {
  AccountType,
  AuthSession,
  AuthUser,
  Channel,
  DocumentType,
  NeedsStep2,
  SalesType,
  SellerBoothResponse,
  SellerSummary,
} from '@/contracts/endpoints/auth';

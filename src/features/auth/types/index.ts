/**
 * Auth feature types — store shapes, wizard state, and shared option types
 * in one place (sections kept in sync with the feature anatomy).
 */

import type { AccountType, Channel, DocumentType } from '@/contracts/endpoints/auth';

/* =========================================================
   Wizard flow (persisted via `auth-flow-store`)
   ========================================================= */

export type AuthFlowStep = 'credentials' | 'role' | 'otp' | 'booth';

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

/* Re-exported so feature modules can import wire types from one place. */
export type {
  AccountType,
  AuthUser,
  Channel,
  DocumentType,
  SalesType,
  SellerBoothResponse,
  SellerSummary,
} from '@/contracts/endpoints/auth';

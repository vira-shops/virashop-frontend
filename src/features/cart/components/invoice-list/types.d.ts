import type { CartInvoice } from '@/hooks';

export interface InvoiceListProps {
  invoices: CartInvoice[];
  /** Opens one invoice's checkout. */
  onOpen: (sellerId: number) => void;
}

export interface InvoiceCardProps {
  invoice: CartInvoice;
  onOpen: () => void;
}

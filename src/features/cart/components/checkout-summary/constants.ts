export const CHECKOUT_SUMMARY_COPY = {
  itemsTotal: 'قیمت کالاها',
  shipping: 'حمل نقل',
  savings: (percent: string) => `سود شما (${percent}٪)`,
  payable: 'مبلغ کل',
  free: 'رایگان',
} as const;

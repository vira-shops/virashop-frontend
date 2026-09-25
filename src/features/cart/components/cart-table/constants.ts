export const CART_COLUMNS = {
  unitPrice: 'مبلغ ( ۱ شل )',
  commission: 'کارمزد',
  shrinks: 'شل',
  units: 'دانه',
  prepayment: 'پیش پرداخت',
  total: 'جمع کل',
} as const;

/** Desktop header cells after the (unlabelled) product column. */
export const HEAD_CELLS = [
  CART_COLUMNS.unitPrice,
  CART_COLUMNS.commission,
  CART_COLUMNS.shrinks,
  CART_COLUMNS.units,
  CART_COLUMNS.prepayment,
  CART_COLUMNS.total,
];

/** Accessible names of each line's steppers. */
export const STEPPER_LABELS = {
  shrinks: (name: string) => `تعداد شل ${name}`,
  units: (name: string) => `تعداد دانه ${name}`,
  prepayment: (name: string) => `پیش پرداخت ${name}`,
};

/** Step of the «پیش پرداخت» stepper, in tomans. */
export const PREPAYMENT_STEP = 100_000;

/**
 * Header and rows share one grid so the columns line up: the product cell
 * takes the slack and every other column sizes to its content, matching the
 * design's 277/97/34/88/88/177/97 rhythm without pinning pixel widths.
 */
export const ROW_GRID_CLASS =
  'grid grid-cols-[minmax(0,1fr)_auto_auto_auto_auto_auto_auto] items-center gap-10 px-7';

/** The design draws all three steppers as one 40px Gray/2 pill. */
export const STEPPER_CLASS = 'h-12 gap-3 px-3 justify-self-center';

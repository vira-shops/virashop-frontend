import {
  FREE_SHIPPING_THRESHOLD,
  cartLineId,
  lineTotal,
  selectInvoices,
  selectTotals,
  useCartStore,
} from './cart-store';
import type { CartLine } from './types';

const seller = (id: number, shopName: string) => ({ id, shopName, logoUrl: null });

const line = (overrides: Partial<Omit<CartLine, 'id'>> = {}): Omit<CartLine, 'id'> => ({
  productSlug: 'protein-1',
  name: 'سینه مرغ',
  imageUrl: null,
  seller: seller(1, 'پارس کالا'),
  unitPrice: 1_200_000,
  commissionPercent: 5,
  shrinks: 1,
  units: 0,
  prepayment: 0,
  ...overrides,
});

describe('cart store', () => {
  beforeEach(() => useCartStore.getState().reset());

  it('adds a line with a seller-scoped id', () => {
    useCartStore.getState().addLine(line());

    expect(useCartStore.getState().lines).toHaveLength(1);
    expect(useCartStore.getState().lines[0].id).toBe(cartLineId(1, 'protein-1'));
  });

  it('folds quantities into an existing line instead of duplicating it', () => {
    useCartStore.getState().addLine(line({ shrinks: 2, units: 1 }));
    useCartStore.getState().addLine(line({ shrinks: 3, units: 4 }));

    const lines = useCartStore.getState().lines;

    expect(lines).toHaveLength(1);
    expect(lines[0]).toMatchObject({ shrinks: 5, units: 5 });
  });

  it('keeps the same product from two sellers apart', () => {
    useCartStore.getState().addLine(line());
    useCartStore.getState().addLine(line({ seller: seller(2, 'نیک کالا') }));

    expect(useCartStore.getState().lines).toHaveLength(2);
  });

  it('never lets a quantity go negative', () => {
    useCartStore.getState().addLine(line());
    const [{ id }] = useCartStore.getState().lines;

    useCartStore.getState().setShrinks(id, -5);
    useCartStore.getState().setUnits(id, -1);
    useCartStore.getState().setPrepayment(id, -100);

    expect(useCartStore.getState().lines[0]).toMatchObject({
      shrinks: 0,
      units: 0,
      prepayment: 0,
    });
  });

  it('drops a whole seller once its invoice is paid', () => {
    useCartStore.getState().addLine(line());
    useCartStore.getState().addLine(line({ seller: seller(2, 'نیک کالا') }));

    useCartStore.getState().removeSeller(1);

    expect(useCartStore.getState().lines).toHaveLength(1);
    expect(useCartStore.getState().lines[0].seller.id).toBe(2);
  });
});

describe('cart selectors', () => {
  const withId = (input: Omit<CartLine, 'id'>): CartLine => ({
    ...input,
    id: cartLineId(input.seller.id, input.productSlug),
  });

  it('prices a line from its packs plus its loose units', () => {
    // 2 packs plus 6 loose of a 12-per-pack product = 2.5 packs.
    expect(lineTotal(withId(line({ unitPrice: 1_200, shrinks: 2, units: 6 })))).toBe(3_000);
  });

  it('groups lines into one invoice per seller', () => {
    const invoices = selectInvoices([
      withId(line()),
      withId(line({ productSlug: 'protein-2' })),
      withId(line({ seller: seller(2, 'نیک کالا') })),
    ]);

    expect(invoices).toHaveLength(2);
    expect(invoices[0].lines).toHaveLength(2);
    expect(invoices[0].total).toBe(2_400_000);
  });

  it('reports the commission as the buyer saving', () => {
    const totals = selectTotals([withId(line({ unitPrice: 1_000_000, commissionPercent: 10 }))]);

    expect(totals.itemsTotal).toBe(1_000_000);
    expect(totals.savings).toBe(100_000);
    expect(totals.savingsPercent).toBe(10);
  });

  it('charges shipping below the free threshold and nothing above it', () => {
    const small = selectTotals([withId(line({ unitPrice: 1_000_000, commissionPercent: 0 }))]);
    const large = selectTotals([
      withId(line({ unitPrice: FREE_SHIPPING_THRESHOLD, commissionPercent: 0 })),
    ]);

    expect(small.shipping).toBeGreaterThan(0);
    expect(large.shipping).toBe(0);
    expect(large.grandTotal).toBe(FREE_SHIPPING_THRESHOLD);
  });

  it('zeroes out on an empty cart', () => {
    expect(selectTotals([])).toMatchObject({
      itemsTotal: 0,
      shipping: 0,
      savings: 0,
      savingsPercent: 0,
      grandTotal: 0,
    });
  });
});

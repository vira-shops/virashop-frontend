import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductDetails } from './index';
import { useProduct, useSellerOffer, useSellerOffers } from '@/hooks';

/** Selection lives in the URL, so the view reads `useSearchParams`. */
let searchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  usePathname: () => '/retail/protein-1',
  useSearchParams: () => searchParams,
}));

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useProduct: jest.fn(),
  useSellerOffers: jest.fn(),
  useSellerOffer: jest.fn(),
}));

const mockUseProduct = useProduct as jest.MockedFunction<typeof useProduct>;
const mockUseSellerOffers = useSellerOffers as jest.MockedFunction<typeof useSellerOffers>;
const mockUseSellerOffer = useSellerOffer as jest.MockedFunction<typeof useSellerOffer>;

/** The best-sellers section at the bottom runs its own (unmocked) query. */
const renderDetails = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0, staleTime: 0 } },
  });

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

const product = {
  id: 1,
  slug: 'protein-1',
  name: 'سینه مرغ تازه',
  imageKey: null,
  imageUrl: null,
  price: 250_000,
  compareAtPrice: 300_000,
  discountPercent: 15,
  badges: ['اقساط ۵ ماهه'],
  stockStatus: 'IN_STOCK' as const,
  seller: { id: 1, shopName: 'ویراشاپس', logoKey: null, logoUrl: null },
  storeCount: 1,
  channel: 'RETAIL' as const,
  shortDescription: 'محصول تازه و باکیفیت',
  description: 'توضیحات کامل محصول',
  brand: null,
  sku: null,
  gallery: [],
  specs: [
    { key: 'weight', label: 'وزن', value: '۱ کیلوگرم' },
    { key: 'pack', label: 'بسته‌بندی', value: 'بسته ۶ عددی' },
  ],
  productionDate: null,
  expiryDate: null,
  category: { id: 2, slug: 'protein-poultry', name: 'مرغ و ماکیان' },
  wholesale: null,
  related: [],
};

const offer = (id: number, shopName: string, price: number) => ({
  id,
  seller: { id, shopName, logoKey: null, logoUrl: null },
  isFeatured: id === 1,
  price,
  discountPercent: 20,
  installmentMonths: 12,
  commissionPercent: 5,
  city: 'یزد',
  membershipYears: 1,
  shippingType: 'باربری',
  stockLabel: '۵تن (فروش عمده و خرده)',
  updatedAt: '2026-02-27',
});

const offers = {
  items: [
    offer(1, 'بازرگانی پارس کالا', 250_000),
    offer(2, 'هایپر کالای مرکزی', 255_000),
    offer(3, 'پخش سراسری آرین', 262_000),
    offer(4, 'فروشگاه نیک‌کالا', 245_000),
  ],
  total: 28,
};

const offerDetail = {
  ...offer(1, 'بازرگانی پارس کالا', 250_000),
  tariffs: [
    { id: 'consumer', label: 'قیمت مصرف کننده', value: '۱۰۰٬۰۰۰ تومان', isStruck: true },
    { id: 'base', label: 'قیمت پایه (اقساطی یا چکی)', value: '۹۰٬۰۰۰ تومان', isStruck: false },
  ],
  installmentRows: [
    { id: 'unit', label: 'نقدی دانه', value: '۲۵۰٬۰۰۰ تومان', isStruck: false },
    { id: 'months', label: 'تعداد اقساط', value: '۱۲ ماهه', isStruck: false },
  ],
  shrinkTiers: [{ id: 'tier-1', label: '۱ تا ۵ شل', value: '۳٬۰۰۰٬۰۰۰ تومان', isStruck: false }],
  shrinkNote: 'قیمت هر شل',
  attributes: [
    { id: 'produced', label: 'تاریخ تولید', value: '۱۴۰۲/۰۵/۱۷', isStruck: false },
    { id: 'colors', label: '۵ رنگ', value: '', isStruck: false },
  ],
  colors: ['#F87171', '#22C55E'],
  calculator: {
    note: 'چک ۱۰ روزه نقدی محاسبه می‌شود.',
    terms: [
      { id: 'cash', label: 'نقدی', price: 1_000_000 },
      { id: 'month-1', label: 'یک ماهه', price: 1_040_000 },
    ],
    defaultTermId: 'cash',
    quantity: { id: 'shrink', unit: 'شل', min: 1, max: 45, defaultValue: 3, ariaLabel: 'تعداد شل' },
    sliders: [
      { id: 'days', unit: 'روز', min: 1, max: 120, defaultValue: 45, ariaLabel: 'مدت پرداخت' },
    ],
  },
};

const selectSeller = (id: number) => {
  searchParams = new URLSearchParams({ seller: String(id) });

  mockUseSellerOffer.mockReturnValue({
    data: offerDetail,
    isLoading: false,
  } as unknown as ReturnType<typeof useSellerOffer>);
};

const setSellerOffers = (data: typeof offers | undefined, isLoading = false) =>
  mockUseSellerOffers.mockReturnValue({ data, isLoading } as unknown as ReturnType<
    typeof useSellerOffers
  >);

describe('ProductDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    searchParams = new URLSearchParams();

    mockUseSellerOffer.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as unknown as ReturnType<typeof useSellerOffer>);

    mockUseProduct.mockReturnValue({
      data: product,
      isLoading: false,
    } as unknown as ReturnType<typeof useProduct>);

    setSellerOffers(offers);
  });

  it('renders the summary card with the spec bullets and the «قیمت از» row', () => {
    renderDetails(<ProductDetails channel="RETAIL" slug="protein-1" />);

    expect(screen.getByRole('heading', { name: 'سینه مرغ تازه' })).toBeInTheDocument();
    expect(screen.getByText('۱ کیلوگرم')).toBeInTheDocument();
    expect(screen.getByText('بسته ۶ عددی')).toBeInTheDocument();
    expect(screen.getByText('قیمت از')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'افزودن به علاقه‌مندی‌ها' })).toBeInTheDocument();
  });

  it('renders the discount and installment badges', () => {
    renderDetails(<ProductDetails channel="RETAIL" slug="protein-1" />);

    expect(screen.getByText('اقساط ۵ ماهه')).toBeInTheDocument();
    expect(screen.getByText('۱۵٪ تخفیف')).toBeInTheDocument();
  });

  it('renders the marketplace buy bar', () => {
    renderDetails(<ProductDetails channel="RETAIL" slug="protein-1" />);

    const bar = screen.getByRole('link', { name: /خرید از ویراشاپس/ });

    expect(bar).toHaveAttribute('href', '/retail/protein-1');
    expect(within(bar).getByText('ارزان ترین')).toBeInTheDocument();
  });

  it('lists the first sellers with their terms and hides the rest behind a link', () => {
    renderDetails(<ProductDetails channel="RETAIL" slug="protein-1" />);

    expect(screen.getByRole('heading', { name: 'فروشنده ها' })).toBeInTheDocument();
    expect(screen.getByText('بازرگانی پارس کالا')).toBeInTheDocument();
    expect(screen.getByText('پخش سراسری آرین')).toBeInTheDocument();
    // Fourth seller stays hidden until the list is expanded.
    expect(screen.queryByText('فروشگاه نیک‌کالا')).not.toBeInTheDocument();
    expect(screen.getAllByText('اقساط ۱۲ ماهه')).toHaveLength(3);
    expect(screen.getAllByText('آخرین تغییرات ۱۴۰۴/۱۲/۸')).toHaveLength(3);

    fireEvent.click(screen.getByRole('button', { name: 'نمایش ۲۵ فروشگاه دیگر' }));

    expect(screen.getByText('فروشگاه نیک‌کالا')).toBeInTheDocument();
  });

  it('switches the seller ordering tab', () => {
    renderDetails(<ProductDetails channel="RETAIL" slug="protein-1" />);

    expect(screen.getByRole('tab', { name: 'ارزان ترین' })).toHaveAttribute(
      'aria-selected',
      'true',
    );

    fireEvent.click(screen.getByRole('tab', { name: 'نزدیک ترین' }));

    expect(screen.getByRole('tab', { name: 'نزدیک ترین' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(mockUseSellerOffers).toHaveBeenLastCalledWith(
      'protein-1',
      { channel: 'RETAIL', sort: 'nearest' },
      product.price,
    );
  });

  it('links each seller row to its own terms', () => {
    renderDetails(<ProductDetails channel="RETAIL" slug="protein-1" />);

    const [buyLink] = screen.getAllByRole('link', { name: 'خرید' });

    expect(buyLink).toHaveAttribute('href', '/retail/protein-1?seller=1');
  });

  it('shows the selected seller terms instead of the seller list', () => {
    selectSeller(1);

    renderDetails(<ProductDetails channel="RETAIL" slug="protein-1" />);

    // The list and the marketplace buy bar give way to the seller's own view.
    expect(screen.queryByRole('heading', { name: 'فروشنده ها' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /خرید از ویراشاپس/ })).not.toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'افزودن به سبد خرید' })).toBeInTheDocument();
    expect(screen.getByText('تعرفه‌ها')).toBeInTheDocument();
    expect(screen.getByText('قیمت / اقساط')).toBeInTheDocument();
    expect(screen.getByText('طرح فروش شیرینگ')).toBeInTheDocument();
    expect(screen.getByText('مشخصات محصول / شرایط پرداخت')).toBeInTheDocument();
    expect(screen.getByText('قیمت مصرف کننده')).toBeInTheDocument();
    // The card's own price row gives way to the buy panel's.
    expect(screen.queryByText('قیمت از')).not.toBeInTheDocument();
  });

  it('reprices the calculator terms as the quantity changes', () => {
    selectSeller(1);

    renderDetails(<ProductDetails channel="RETAIL" slug="protein-1" />);

    const terms = screen.getByRole('radiogroup', { name: 'شرایط پرداخت' });

    // Default quantity is 3 shrinks → 3 × ۱٬۰۰۰٬۰۰۰.
    expect(within(terms).getByText('۳٬۰۰۰٬۰۰۰ تومان')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'افزایش' }));

    expect(within(terms).getByText('۴٬۰۰۰٬۰۰۰ تومان')).toBeInTheDocument();
  });

  it('selects a payment term', () => {
    selectSeller(1);

    renderDetails(<ProductDetails channel="RETAIL" slug="protein-1" />);

    expect(screen.getByRole('radio', { name: /۳٬۰۰۰٬۰۰۰/ })).toHaveAttribute(
      'aria-checked',
      'true',
    );

    fireEvent.click(screen.getByRole('radio', { name: /۳٬۱۲۰٬۰۰۰/ }));

    expect(screen.getByRole('radio', { name: /۳٬۱۲۰٬۰۰۰/ })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('renders nothing when there is no product and not loading', () => {
    mockUseProduct.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as unknown as ReturnType<typeof useProduct>);

    const { container } = renderDetails(<ProductDetails channel="RETAIL" slug="missing" />);

    expect(container).toBeEmptyDOMElement();
  });
});

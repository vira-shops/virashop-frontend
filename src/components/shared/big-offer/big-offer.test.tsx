import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { BigOfferSection } from './big-offer';
import { useBigOffers } from '@/hooks';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useBigOffers: jest.fn(),
}));

const mockUseBigOffers = useBigOffers as jest.MockedFunction<typeof useBigOffers>;

const offers = [
  {
    id: '1',
    title: 'روغن سرخ‌کردنی آفتابگردان',
    image: '/images/offer-1.png',
    imageAlt: 'روغن',
    priceLabel: 'تومان',
    price: '۹۸٬۰۰۰',
    stockNote: 'محدود',
    actionLabel: 'خرید',
    href: '/retail/oil',
  },
];

describe('BigOfferSection', () => {
  it('renders the section title, description and the scoped view-all link', () => {
    mockUseBigOffers.mockReturnValue({
      data: offers,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useBigOffers>);

    render(
      <BigOfferSection
        link={{ label: 'مشاهده همه', href: '/wholesale/offers' }}
        className="my-14 bg-blue-50 sm:my-20"
      />,
    );

    expect(screen.getByText('تخفیف بزرگ')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'مشاهده همه' })).toHaveAttribute(
      'href',
      '/wholesale/offers',
    );
  });

  it('renders one product card per big-offer item', () => {
    mockUseBigOffers.mockReturnValue({
      data: offers,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useBigOffers>);

    render(<BigOfferSection link={{ label: 'مشاهده همه', href: '/wholesale/offers' }} />);

    expect(screen.getByText('روغن سرخ‌کردنی آفتابگردان')).toBeInTheDocument();
  });

  it('renders the skeleton while the query is loading', () => {
    mockUseBigOffers.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as unknown as ReturnType<typeof useBigOffers>);

    render(<BigOfferSection link={{ label: 'مشاهده همه', href: '/wholesale/offers' }} />);

    expect(screen.queryByText('تخفیف بزرگ')).not.toBeInTheDocument();
  });
});

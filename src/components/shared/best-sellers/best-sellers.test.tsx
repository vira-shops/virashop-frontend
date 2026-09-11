import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { BestSellersSection } from './best-sellers';
import { useBestSellers } from '@/hooks';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useBestSellers: jest.fn(),
}));

const mockUseBestSellers = useBestSellers as jest.MockedFunction<typeof useBestSellers>;

const bestSellers = [
  {
    id: '1',
    title: 'برنج ایرانی طارم',
    image: '/images/best-seller-1.png',
    imageAlt: 'برنج ایرانی',
    priceLabel: 'تومان',
    price: '۲۵۰٬۰۰۰',
    stockNote: 'موجود',
    actionLabel: 'خرید',
    href: '/retail/rice',
  },
];

describe('BestSellersSection', () => {
  it('renders the section title, description and the scoped view-all link', () => {
    mockUseBestSellers.mockReturnValue({
      data: bestSellers,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useBestSellers>);

    render(
      <BestSellersSection
        link={{ label: 'مشاهده همه', href: '/wholesale/best-sellers' }}
        className="my-11 bg-blue-50 sm:my-10"
      />,
    );

    expect(screen.getByText('پرفروش‌ترین‌ها')).toBeInTheDocument();
    expect(screen.getByText('حراج محصولات تا %55 تخفیف')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'مشاهده همه' })).toHaveAttribute(
      'href',
      '/wholesale/best-sellers',
    );
  });

  it('renders one product card per best-seller item', () => {
    mockUseBestSellers.mockReturnValue({
      data: bestSellers,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useBestSellers>);

    render(<BestSellersSection link={{ label: 'مشاهده همه', href: '/wholesale/best-sellers' }} />);

    expect(screen.getByText('برنج ایرانی طارم')).toBeInTheDocument();
  });

  it('renders the skeleton while the query is loading', () => {
    mockUseBestSellers.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as unknown as ReturnType<typeof useBestSellers>);

    const { container } = render(
      <BestSellersSection link={{ label: 'مشاهده همه', href: '/wholesale/best-sellers' }} />,
    );

    expect(screen.queryByText('پرفروش‌ترین‌ها')).not.toBeInTheDocument();
    expect(container.querySelector('.bg-blue-50')).toBeNull();
  });
});

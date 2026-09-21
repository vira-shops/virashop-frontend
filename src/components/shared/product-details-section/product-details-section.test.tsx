import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductDetailsSection } from './product-details-section';
import { useProduct } from '@/hooks';

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useProduct: jest.fn(),
}));

const mockUseProduct = useProduct as jest.MockedFunction<typeof useProduct>;

const product = {
  id: 1,
  slug: 'protein-1',
  name: 'سینه مرغ تازه',
  imageKey: null,
  imageUrl: null,
  price: 250_000,
  compareAtPrice: 300_000,
  discountPercent: 15,
  badges: [],
  stockStatus: 'IN_STOCK' as const,
  seller: { id: 1, shopName: 'ویراشاپس', logoKey: null, logoUrl: null },
  storeCount: 1,
  channel: 'RETAIL' as const,
  shortDescription: 'محصول تازه و باکیفیت',
  description: 'توضیحات کامل محصول',
  brand: null,
  sku: null,
  gallery: [],
  specs: [{ key: 'weight', label: 'وزن', value: '۱ کیلوگرم' }],
  productionDate: null,
  expiryDate: null,
  category: { id: 2, slug: 'protein-poultry', name: 'مرغ و ماکیان' },
  wholesale: null,
  related: [],
};

describe('ProductDetailsSection', () => {
  it('renders the product name, seller, price block and specs', () => {
    mockUseProduct.mockReturnValue({
      data: product,
      isLoading: false,
    } as unknown as ReturnType<typeof useProduct>);

    render(
      <ProductDetailsSection
        channel="RETAIL"
        slug="protein-1"
        hrefForProduct={(slug) => `/retail/${slug}`}
        hrefForCategory={(slug) => `/retail/category/${slug}`}
      />,
    );

    expect(screen.getByRole('heading', { name: 'سینه مرغ تازه' })).toBeInTheDocument();
    expect(screen.getByText('فروشنده: ویراشاپس')).toBeInTheDocument();
    expect(screen.getByText('وزن')).toBeInTheDocument();
    expect(screen.getByText('۱ کیلوگرم')).toBeInTheDocument();
  });

  it('renders nothing when there is no product and not loading', () => {
    mockUseProduct.mockReturnValue({
      data: undefined,
      isLoading: false,
    } as unknown as ReturnType<typeof useProduct>);

    const { container } = render(
      <ProductDetailsSection
        channel="RETAIL"
        slug="missing"
        hrefForProduct={(slug) => `/retail/${slug}`}
        hrefForCategory={(slug) => `/retail/category/${slug}`}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});

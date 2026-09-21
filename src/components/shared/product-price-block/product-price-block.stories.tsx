import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductPriceBlock } from './product-price-block';
import { formatToman } from '@/utils/format';

const meta: Meta<typeof ProductPriceBlock> = {
  title: 'Shared/ProductPriceBlock',
  component: ProductPriceBlock,
  tags: ['autodocs'],
  args: { formatPrice: formatToman },
};

export default meta;
type Story = StoryObj<typeof ProductPriceBlock>;

export const Retail: Story = {
  args: { price: 450_000, compareAtPrice: 600_000, discountPercent: 25 },
};

export const RetailNoDiscount: Story = {
  args: { price: 320_000 },
};

export const Wholesale: Story = {
  args: {
    price: 400_000,
    wholesale: {
      moq: 10,
      maxQty: 200,
      packMultiple: 5,
      cashPrice: 400_000,
      packPrice: 1_900_000,
      installment: { months: 3, monthlyFeePercent: 2 },
      tiers: [
        { minQty: 10, maxQty: 49, unitPrice: 400_000 },
        { minQty: 50, maxQty: null, unitPrice: 370_000 },
      ],
    },
  },
};

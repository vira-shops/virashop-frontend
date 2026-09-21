import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductFilterPanel } from './product-filter-panel';
import { formatToman } from '@/utils/format';

const categories = [
  { id: 1, slug: 'poultry', label: 'مرغ و ماکیان', productCount: 12 },
  { id: 2, slug: 'red-meat', label: 'گوشت قرمز', productCount: 8 },
  { id: 3, slug: 'fish', label: 'ماهی و میگو', productCount: 5 },
];

const meta: Meta<typeof ProductFilterPanel> = {
  title: 'Shared/ProductFilterPanel',
  component: ProductFilterPanel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductFilterPanel>;

export const Default: Story = {
  render: () => {
    function Controlled() {
      const [price, setPrice] = useState<[number, number]>([0, 1_000_000]);
      const [activeSlug, setActiveSlug] = useState('poultry');

      return (
        <div className="w-80">
          <ProductFilterPanel
            priceMin={0}
            priceMax={1_000_000}
            priceValue={price}
            formatPrice={formatToman}
            onPriceChange={setPrice}
            categories={categories}
            activeCategorySlug={activeSlug}
            onCategorySelect={setActiveSlug}
            onClear={() => {
              setPrice([0, 1_000_000]);
              setActiveSlug('poultry');
            }}
          />
        </div>
      );
    }
    return <Controlled />;
  },
};

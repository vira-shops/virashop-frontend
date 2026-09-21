import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProductFilterPanel } from './product-filter-panel';
import { formatToman } from '@/utils/format';

const categoryGroups = [
  {
    id: 'protein',
    label: 'کالای اساسی',
    allLabel: 'همه کالای اساسی',
    options: [
      { id: 1, slug: 'bread', label: 'نان', productCount: 12 },
      { id: 2, slug: 'meat', label: 'گوشت', productCount: 8 },
      { id: 3, slug: 'rice', label: 'برنج', productCount: 5 },
    ],
  },
  {
    id: 'dairy',
    label: 'لبنیات',
    allLabel: 'همه لبنیات',
    options: [
      { id: 4, slug: 'milk', label: 'شیر', productCount: 6 },
      { id: 5, slug: 'cheese', label: 'پنیر', productCount: 4 },
    ],
  },
];

const brands = [
  { id: 1, slug: 'kaleh', label: 'کاله' },
  { id: 2, slug: 'mihan', label: 'میهن' },
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
      const [price, setPrice] = useState<[number, number]>([0, 2_540_000]);
      const [selected, setSelected] = useState<string[]>(['bread']);
      const [inStock, setInStock] = useState(true);

      const toggle = (slug: string) =>
        setSelected((prev) =>
          prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug],
        );

      return (
        <div className="w-72">
          <ProductFilterPanel
            priceMin={0}
            priceMax={2_540_000}
            priceValue={price}
            formatPrice={formatToman}
            onPriceChange={setPrice}
            categoryGroups={categoryGroups}
            selectedCategorySlugs={selected}
            onCategoryToggle={toggle}
            onCategoryGroupToggle={(slugs, selectAll) =>
              setSelected((prev) =>
                selectAll
                  ? Array.from(new Set([...prev, ...slugs]))
                  : prev.filter((slug) => !slugs.includes(slug)),
              )
            }
            brands={brands}
            inStock={inStock}
            onInStockChange={setInStock}
            onClear={() => {
              setPrice([0, 2_540_000]);
              setSelected([]);
              setInStock(false);
            }}
          />
        </div>
      );
    }
    return <Controlled />;
  },
};

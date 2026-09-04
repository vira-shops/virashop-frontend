import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicator,
  CarouselGrid,
  CarouselGridItem,
} from './carousel';
import { Card } from '@/components/ui';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const SampleCard = ({ index }: { index: number }) => (
  <Card
    image={{ src: '/images/home/game-1.png', alt: `محصول ${index}` }}
    title={`محصول ${index}`}
    description="دسته‌بندی نمونه"
    price={{ current: '۱,۷۰۰,۰۰۰', original: '۲,۰۰۰,۰۰۰' }}
    action={
      <button type="button" className="bg-primary rounded px-11 py-5 text-white">
        افزودن به سبد
      </button>
    }
  />
);

export const WithoutIndicator: Story = {
  name: 'بدون نشانگر (با دکمه‌های ناوبری)',
  render: () => (
    <div className="w-full max-w-2xl p-11">
      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <CarouselItem key={i} className="basis-3/4 pl-11 md:basis-1/2 lg:basis-1/3">
              <SampleCard index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Minimal: Story = {
  name: 'مینیمال (بدون هیچ کنترلی)',
  render: () => (
    <div className="w-full max-w-2xl p-11">
      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((i) => (
            <CarouselItem key={i} className="basis-full pl-0">
              <div className="from-primary-50 to-primary rounded-6 flex h-64 w-full items-center justify-center bg-gradient-to-br text-white">
                <span className="text-h4 font-bold">اسلاید {i}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ),
};

export const WithIndicators: Story = {
  name: 'با نشانگر',
  render: () => (
    <div className="w-full max-w-2xl p-11">
      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <CarouselItem key={i} className="basis-3/4 pl-11 md:basis-1/2 lg:basis-1/3">
              <SampleCard index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicator />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  name: 'عمودی',
  render: () => (
    <div className="p-11">
      <Carousel orientation="vertical" className="mx-auto w-72">
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((i) => (
            <CarouselItem key={i} className="pt-11">
              <SampleCard index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const MultiplePerView: Story = {
  name: 'چند آیتم در هر نما',
  render: () => (
    <div className="w-full max-w-3xl p-11">
      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <CarouselItem key={i} className="basis-1/2 pl-11 md:basis-1/3 lg:basis-1/4">
              <SampleCard index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const SingleItem: Story = {
  name: 'تک آیتم',
  render: () => (
    <div className="p-11">
      <Carousel className="mx-auto w-72">
        <CarouselContent>
          {[1, 2, 3].map((i) => (
            <CarouselItem key={i} className="basis-full">
              <SampleCard index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Grid: Story = {
  name: 'گرید (چند محصول در یک اسلاید)',
  render: () => (
    <div className="w-full max-w-4xl p-11">
      <CarouselGrid itemsPerSlide={4} gridCols={2} gridRows={2} className="w-full">
        {Array.from({ length: 12 }, (_, i) => (
          <CarouselGridItem key={i}>
            <SampleCard index={i + 1} />
          </CarouselGridItem>
        ))}
      </CarouselGrid>
    </div>
  ),
};

export const RetailTheme: Story = {
  name: 'تم خرده (retail)',
  render: () => (
    <div data-theme="retail" className="w-full max-w-2xl p-11">
      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CarouselItem key={i} className="basis-3/4 pl-11 md:basis-1/2 lg:basis-1/3">
              <SampleCard index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicator />
      </Carousel>
    </div>
  ),
};

export const WholesaleTheme: Story = {
  name: 'تم عمده (wholesale)',
  render: () => (
    <div data-theme="wholesale" className="w-full max-w-2xl p-11">
      <Carousel className="w-full">
        <CarouselContent>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CarouselItem key={i} className="basis-3/4 pl-11 md:basis-1/2 lg:basis-1/3">
              <SampleCard index={i} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselIndicator />
      </Carousel>
    </div>
  ),
};

// "تخفیف بزرگ" — big-discount product carousel
type DiscountBadge = { type: 'percent'; value: number } | { type: 'flash' };

type DiscountProduct = {
  image: string;
  title: string;
  price: string;
  storeCount: number;
  badge?: DiscountBadge;
  outOfStock?: boolean;
};

const DiscountProductCard = ({
  image,
  title,
  price,
  storeCount,
  badge,
  outOfStock,
}: DiscountProduct) => (
  <div className="rounded-8 flex h-full flex-col border border-gray-100 bg-white p-9 shadow-sm">
    <div className="rounded-6 relative mb-9 aspect-square overflow-hidden bg-gray-50">
      {/* eslint-disable-next-line @next/next/no-img-element -- static story assets, no optimization needed */}
      <img src={image} alt={title} className="h-full w-full object-cover" />

      {badge?.type === 'percent' && (
        <span className="absolute top-5 right-5 rounded-full bg-green-100 px-5 py-0.5 text-xs font-medium text-green-700">
          {`٪${badge.value} تخفیف`}
        </span>
      )}
      {badge?.type === 'flash' && (
        <span className="absolute top-5 right-5 rounded-full bg-amber-100 px-5 py-0.5 text-xs font-medium text-amber-700">
          شگفت‌انگیز
        </span>
      )}
      {outOfStock && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <span className="rounded-full bg-white px-9 py-1 text-sm font-semibold text-red-500 shadow">
            ناموجود
          </span>
        </div>
      )}
    </div>

    <p className="mb-5 line-clamp-2 flex-1 text-sm leading-6 text-gray-700">{title}</p>

    <div className="mb-9">
      <span className="block text-xs text-gray-400">قیمت از</span>
      <span className="text-base font-bold text-gray-900">
        {price} <span className="text-xs font-normal text-gray-500">تومان</span>
      </span>
    </div>

    {outOfStock ? (
      <button
        type="button"
        disabled
        className="rounded-6 w-full cursor-not-allowed bg-gray-100 py-5 text-sm font-medium text-gray-400"
      >
        ناموجود
      </button>
    ) : (
      <button
        type="button"
        className="rounded-6 w-full bg-rose-500 py-5 text-sm font-medium text-white transition-colors hover:bg-rose-600"
      >
        خرید
      </button>
    )}

    <span className="mt-5 text-center text-xs text-gray-400">{`در ${storeCount} فروشگاه`}</span>
  </div>
);

const discountProducts: DiscountProduct[] = [
  {
    image: '/images/home/game-1.png',
    title: 'گوشت خرد شده مخلوط گوسفند و گوشت گاو پرتقالی ۱ کیلوگرم',
    price: '۲,۵۴۰,۰۰۰',
    storeCount: 163,
    badge: { type: 'flash' },
  },
  {
    image: '/images/home/game-1.png',
    title: 'گوشت خرد شده مخلوط گوسفند و گوشت گاو پرتقالی ۱ کیلوگرم',
    price: '۲,۵۴۰,۰۰۰',
    storeCount: 163,
    outOfStock: true,
  },
  {
    image: '/images/home/game-1.png',
    title: 'گوشت خرد شده مخلوط گوسفند و گوشت گاو پرتقالی ۱ کیلوگرم',
    price: '۲,۵۴۰,۰۰۰',
    storeCount: 163,
    badge: { type: 'percent', value: 20 },
  },
  {
    image: '/images/home/game-1.png',
    title: 'گوشت خرد شده مخلوط گوسفند و گوشت گاو پرتقالی ۱ کیلوگرم',
    price: '۲,۵۴۰,۰۰۰',
    storeCount: 163,
    badge: { type: 'percent', value: 20 },
  },
  {
    image: '/images/home/game-1.png',
    title: 'گوشت خرد شده مخلوط گوسفند و گوشت گاو پرتقالی ۱ کیلوگرم',
    price: '۲,۵۴۰,۰۰۰',
    storeCount: 163,
    badge: { type: 'percent', value: 30 },
  },
  {
    image: '/images/home/game-1.png',
    title: 'گوشت خرد شده مخلوط گوسفند و گوشت گاو پرتقالی ۱ کیلوگرم',
    price: '۲,۵۴۰,۰۰۰',
    storeCount: 163,
  },
];

export const BigDiscount: Story = {
  name: 'تخفیف بزرگ (کارت محصول)',
  render: () => (
    <div className="rounded-9 w-full max-w-6xl bg-sky-50/60 p-12">
      <div dir="rtl" className="mb-11 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">تخفیف بزرگ</h3>
        <a href="#" className="text-sm font-medium text-emerald-600 hover:underline">
          مشاهده همه
        </a>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {discountProducts.map((product, index) => (
            <CarouselItem key={index} className="basis-1/2 pl-11 sm:basis-1/3 lg:basis-1/5">
              <DiscountProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ),
};

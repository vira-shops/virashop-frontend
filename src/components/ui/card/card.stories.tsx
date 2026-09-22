import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card } from './card';
import { Badge, Button, Typography } from '@/components/ui';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['outline', 'fill', 'ghost'] },
    radius: { control: 'radio', options: ['sm', 'md', 'lg', 'xl', '2xl'] },
    shadow: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const sampleImage = '/images/home/game-1.png';

export const Basic: Story = {
  args: {
    children: 'ویراشاپس، فروشگاه آنلاین',
  },
  render: (args) => <Card {...args}>{args.children}</Card>,
};

export const Full: Story = {
  name: 'تصویر + عنوان + توضیحات + قیمت + دکمه خرید',
  render: () => (
    <div className="w-72">
      <Card
        image={{ src: sampleImage, alt: 'محصول نمونه' }}
        title="محصول نمونه"
        description="توضیحات کوتاه درباره محصول"
        price={{ current: '۱,۷۰۰,۰۰۰', original: '۲,۰۰۰,۰۰۰' }}
        action={
          <Button color="primary" variant="fill">
            افزودن به سبد خرید
          </Button>
        }
      />
    </div>
  ),
};

export const WithoutImage: Story = {
  name: 'بدون تصویر',
  render: () => (
    <div className="w-72">
      <Card
        title="محصول نمونه"
        description="توضیحات کوتاه"
        price={{ current: '۱,۷۰۰,۰۰۰' }}
        action={<Button color="primary">خرید</Button>}
      />
    </div>
  ),
};

export const WithDiscountBadge: Story = {
  name: 'با نشان تخفیف روی تصویر',
  render: () => (
    <div className="w-72">
      <Card
        image={{
          src: sampleImage,
          alt: 'محصول تخفیف‌خورده',
          badge: <Badge color="warning-red">۳۰٪</Badge>,
        }}
        title="محصول تخفیف‌خورده"
        price={{ current: '۱,۷۰۰,۰۰۰', original: '۲,۴۰۰,۰۰۰' }}
        action={
          <Button fullWidth color="primary">
            افزودن به سبد خرید
          </Button>
        }
      />
    </div>
  ),
};

export const TwoImageBadgesWithPriceLabel: Story = {
  name: 'دو نشان روی تصویر + برچسب قیمت + موجودی فروشگاه',
  render: () => (
    <div className="w-72">
      <Card
        radius="xl"
        image={{
          src: sampleImage,
          alt: 'گوشت چرخ کرده مخلوط گوساله و گوسفند',
          badge: (
            <Badge variant="soft" color="yellow">
              اقساط ۵ ماهه
            </Badge>
          ),
          secondaryBadge: (
            <Badge variant="soft" color="warning-green">
              ۲۰٪ تخفیف
            </Badge>
          ),
        }}
        title="گوشت چرخ کرده مخلوط گوساله و گوسفند پویا پروتئین - ۱ کیلوگرم"
        price={{ label: 'قیمت از', current: '۲,۵۴۰,۰۰۰' }}
        stock={
          <Badge variant="soft" color="gray">
            در ۷۲+ فروشگاه
          </Badge>
        }
        action={<Button color="primary">خرید</Button>}
      />
    </div>
  ),
};

export const WithStock: Story = {
  name: 'با موجودی کنار دکمه خرید',
  render: () => (
    <div className="grid w-80 grid-cols-1 gap-11">
      <Card
        image={{ src: sampleImage, alt: 'محصول' }}
        title="محصول موجود"
        description="دسته‌بندی نمونه"
        price={{ current: '۱,۷۰۰,۰۰۰' }}
        stock={
          <Typography variant="caption-md" color="gray">
            ۱۲ عدد موجود
          </Typography>
        }
        action={<Button color="primary">افزودن به سبد خرید</Button>}
      />

      <Card
        image={{ src: sampleImage, alt: 'محصول' }}
        title="تنها ۲ عدد باقی مانده"
        description="دسته‌بندی نمونه"
        price={{ current: '۱,۷۰۰,۰۰۰' }}
        stock={
          <Badge variant="soft" color="yellow">
            ۲ عدد باقی مانده
          </Badge>
        }
        action={<Button color="primary">افزودن به سبد</Button>}
      />

      <Card
        image={{ src: sampleImage, alt: 'محصول' }}
        title="ناموجود"
        description="دسته‌بندی نمونه"
        price={{ current: '۱,۷۰۰,۰۰۰' }}
        stock={
          <Typography variant="caption-md" color="warning-red">
            ناموجود
          </Typography>
        }
        action={
          <Button fullWidth color="primary" disabled>
            افزودن به سبد
          </Button>
        }
      />
    </div>
  ),
};

export const OnlyImageAndTitle: Story = {
  name: 'فقط تصویر و عنوان',
  render: () => (
    <div className="w-72">
      <Card image={{ src: sampleImage, alt: 'محصول' }} title="محصول نمونه" />
    </div>
  ),
};

export const Variants: Story = {
  name: 'انواع ظاهر',
  render: () => (
    <div className="flex flex-wrap gap-11">
      <div className="w-60">
        <Card
          variant="outline"
          title="Outline"
          description="با حاشیه"
          price={{ current: '۱,۰۰۰,۰۰۰' }}
        />
      </div>
      <div className="w-60">
        <Card
          variant="fill"
          title="Fill"
          description="پس‌زمینه خاکستری"
          price={{ current: '۱,۰۰۰,۰۰۰' }}
        />
      </div>
      <div className="rounded-6 w-60 bg-gray-50 p-5">
        <Card
          variant="ghost"
          title="Ghost"
          description="بدون پس‌زمینه"
          price={{ current: '۱,۰۰۰,۰۰۰' }}
        />
      </div>
    </div>
  ),
};

export const Radius: Story = {
  name: 'انواع گردی گوشه',
  render: () => (
    <div className="flex flex-wrap gap-11">
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((radius) => (
        <div key={radius} className="w-40">
          <Card
            radius={radius}
            title={radius}
            description="نمونه گردی گوشه"
            price={{ current: '۱۰,۰۰۰' }}
          />
        </div>
      ))}
    </div>
  ),
};

export const Shadow: Story = {
  name: 'انواع سایه',
  render: () => (
    <div className="flex flex-wrap gap-12 bg-gray-50 p-12">
      {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
        <div key={shadow} className="w-52">
          <Card
            shadow={shadow}
            title={`shadow: ${shadow}`}
            description="نمونه سایه"
            price={{ current: '۱۰,۰۰۰' }}
          />
        </div>
      ))}
    </div>
  ),
};

export const RetailTheme: Story = {
  name: 'تم خرده (retail)',
  render: () => (
    <div data-theme="retail" className="flex flex-wrap gap-11 p-11">
      <div className="w-72">
        <Card
          image={{ src: sampleImage, alt: 'محصول' }}
          title="خرده فروشی"
          description="تم نارنجی"
          price={{ current: '۱,۷۰۰,۰۰۰', original: '۲,۰۰۰,۰۰۰' }}
          action={
            <Button fullWidth color="primary">
              افزودن به سبد
            </Button>
          }
        />
      </div>
    </div>
  ),
};

export const WholesaleTheme: Story = {
  name: 'تم عمده (wholesale)',
  render: () => (
    <div data-theme="wholesale" className="flex flex-wrap gap-11 p-11">
      <div className="w-72">
        <Card
          image={{ src: sampleImage, alt: 'محصول' }}
          title="عمده فروشی"
          description="تم فیروزه‌ای"
          price={{ current: '۱,۷۰۰,۰۰۰', original: '۲,۰۰۰,۰۰۰' }}
          action={
            <Button fullWidth color="primary">
              افزودن به سبد
            </Button>
          }
        />
      </div>
    </div>
  ),
};

export const ProductGrid: Story = {
  name: 'گرید محصولات',
  render: () => (
    <div className="grid grid-cols-2 gap-11 md:grid-cols-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Card
          key={i}
          image={{
            src: sampleImage,
            alt: `محصول ${i}`,
            badge: i % 2 === 0 ? <Badge color="warning-red">۳۰٪</Badge> : undefined,
          }}
          title={`محصول ${i}`}
          description="دسته‌بندی نمونه"
          price={{ current: '۱,۷۰۰,۰۰۰', original: i % 2 === 0 ? '۲,۰۰۰,۰۰۰' : undefined }}
          stock={<Typography variant="caption-md">موجودی +178</Typography>}
          action={<Button size="sm">افزودن به سبد</Button>}
        />
      ))}
    </div>
  ),
};

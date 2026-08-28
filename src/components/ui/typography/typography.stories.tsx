import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Typography } from './typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body-xl',
        'body-md',
        'body-sm',
        'body-xs',
        'caption-lg',
        'caption-md',
        'overline-lg',
        'overline-sm',
      ],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'blue',
        'gray',
        'black',
        'white',
        'warning-red',
        'warning-green',
        'warning-blue',
      ],
    },
    align: { control: 'radio', options: ['right', 'left', 'center', 'justify'] },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Basic: Story = {
  args: {
    children: 'ویراشاپ، فروشگاه آنلاین',
    variant: 'body-md',
  },
};

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">هدینگ یک — h1</Typography>
      <Typography variant="h2">هدینگ دو — h2</Typography>
      <Typography variant="h3">هدینگ سه — h3</Typography>
      <Typography variant="h4">هدینگ چهار — h4</Typography>
      <Typography variant="h5">هدینگ پنج — h5</Typography>
      <Typography variant="h6">هدینگ شش — h6</Typography>
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="body-xl">بدون ایکس‌ال — body-xl</Typography>
      <Typography variant="body-md">بدون ام‌دی — body-md</Typography>
      <Typography variant="body-sm">بدون اس‌ام — body-sm</Typography>
      <Typography variant="body-xs">بدون ایکس‌اس — body-xs</Typography>
    </div>
  ),
};

export const CaptionsAndOverlines: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="caption-lg">کپشن بزرگ — caption-lg</Typography>
      <Typography variant="caption-md">کپشن کوچک — caption-md</Typography>
      <Typography variant="overline-lg">اورلاین بزرگ — overline-lg</Typography>
      <Typography variant="overline-sm">اورلاین کوچک — overline-sm</Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography color="primary" variant="body-md">
        رنگ اصلی
      </Typography>
      <Typography color="blue" variant="body-md">
        آبی تیره
      </Typography>
      <Typography color="gray" variant="body-md">
        خاکستری
      </Typography>
      <Typography color="black" variant="body-md">
        مشکی
      </Typography>
      <Typography color="warning-red" variant="body-md">
        هشدار قرمز
      </Typography>
      <Typography color="warning-green" variant="body-md">
        هشدار سبز
      </Typography>
      <Typography color="warning-blue" variant="body-md">
        هشدار آبی
      </Typography>
      <div className="bg-black p-2">
        <Typography color="white" variant="body-md">
          سفید
        </Typography>
      </div>
    </div>
  ),
};

export const AlignmentAndDecoration: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography align="center" variant="body-md">
        وسط‌چین
      </Typography>
      <Typography decoration="underline" variant="body-md">
        زیرخط‌دار
      </Typography>
      <Typography transform="uppercase" variant="overline-lg">
        uppercase overline
      </Typography>
      <Typography lineClamp={1} variant="body-md" className="max-w-40">
        متن طولانی که در یک خط بریده می‌شود و ادامه آن با سه نقطه نمایش داده می‌شود
      </Typography>
      <Typography truncate="start" variant="body-md" className="max-w-40">
        متن طولانی که بریده می‌شود و ادامه آن با سه نقطه نمایش داده می‌شود
      </Typography>
    </div>
  ),
};

export const Links: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Typography variant="h5" color="primary" href="/about">
        لینک عنوان
      </Typography>
      <Typography variant="body-md" href="/link1">
        لینک بدنه متنی
      </Typography>
      <Typography variant="caption-lg" color="gray" href="/contact">
        لینک کپشن
      </Typography>
    </div>
  ),
};

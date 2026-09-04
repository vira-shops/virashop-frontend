import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from './skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  render: () => <Skeleton className="h-12 w-48" />,
};

export const Shapes: Story = {
  name: 'اشکال رایج',
  render: () => (
    <div className="flex flex-wrap items-center gap-11">
      <Skeleton className="size-16 rounded-full" />
      <Skeleton className="rounded-8 h-24 w-36" />
      <Skeleton className="rounded-9 h-32 w-64" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};

export const CardSkeleton: Story = {
  name: 'کارت محصول',
  render: () => (
    <div className="rounded-9 w-product-card bg-white p-5 shadow-sm">
      <Skeleton className="aspect-product-card rounded-6 w-full" />
      <Skeleton className="mt-5 h-4 w-3/4" />
      <Skeleton className="mt-3 h-4 w-1/2" />
    </div>
  ),
};

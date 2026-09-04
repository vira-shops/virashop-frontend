import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StoryTrigger, StoryTriggerList, StoryViewer } from './story';
import type { StoryItem } from './types';

const meta: Meta = {
  title: 'UI/Story',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const sampleItems: StoryItem[] = [
  {
    src: '/images/home/game-1.png',
    title: 'تخفیف ویژه',
    description: 'تا ۵۰٪ تخفیف فقط امروز',
  },
  {
    src: '/images/home/game-1.png',
    title: 'محصول جدید',
    description: 'تازه رسیده‌ها را ببینید',
  },
  {
    src: '/images/home/game-1.png',
    title: 'ارسال رایگان',
  },
  {
    src: '/images/home/game-1.png',
    title: 'پشتیبانی ۲۴/۷',
  },
  {
    src: '/images/home/game-1.png',
    title: 'فروش ویژه آخر هفته',
    description: 'فرصت رو از دست نده',
  },
];

const InteractiveTemplate = (): React.ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center gap-12 bg-gray-50 p-11">
      <div className="text-h5">استوری‌ها</div>

      <StoryTriggerList
        items={sampleItems}
        onSelect={(index) => {
          setStartIndex(index);
          setOpen(true);
        }}
      />

      <StoryViewer
        items={sampleItems}
        open={open}
        startIndex={startIndex}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const Interactive: Story = {
  name: 'تعاملی (کامل)',
  render: () => <InteractiveTemplate />,
};

const SingleTriggerTemplate = (): React.ReactElement => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center gap-12 bg-gray-50 p-11">
      <StoryTrigger item={sampleItems[0]} onOpen={() => setOpen(true)} />

      <StoryViewer items={sampleItems} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export const SingleTrigger: Story = {
  name: 'تک آواتار',
  render: () => <SingleTriggerTemplate />,
};

const AlwaysOpenTemplate = (): React.ReactElement => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-11 bg-gray-900 p-11">
    <p className="text-white">استوری همیشه باز (برای نمایش)</p>
    <StoryViewer items={sampleItems} open onClose={() => undefined} />
  </div>
);

export const AlwaysOpen: Story = {
  name: 'نمایش باز (همه آیتم‌ها)',
  render: () => <AlwaysOpenTemplate />,
};

const OnlyTitleTemplate = (): React.ReactElement => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-11 bg-gray-900 p-11">
    <p className="text-white">استوری فقط با تایتل (بدون description)</p>
    <StoryViewer
      items={sampleItems.filter((item) => !item.description)}
      open
      onClose={() => undefined}
    />
  </div>
);

export const OnlyTitle: Story = {
  name: 'فقط با تایتل',
  render: () => <OnlyTitleTemplate />,
};

const SeenTemplate = (): React.ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center gap-12 bg-gray-50 p-11">
      <p className="text-body-sm text-gray-700">
        دو استوری اول دیده شده (خاکستری)، بقیه دیده نشده (گرادینتی)
      </p>

      <StoryTriggerList
        items={sampleItems}
        onSelect={(index) => {
          setStartIndex(index);
          setOpen(true);
        }}
        seenIndices={[0, 1]}
      />

      <StoryViewer
        items={sampleItems}
        open={open}
        startIndex={startIndex}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export const WithSeen: Story = {
  name: 'با حالت seen',
  render: () => <SeenTemplate />,
};

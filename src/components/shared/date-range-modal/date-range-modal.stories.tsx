import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { Button } from '@/components/ui';
import { DateRangeModal } from './date-range-modal';
import type { DateRange } from './types';

const meta: Meta<typeof DateRangeModal> = {
  title: 'Shared/DateRangeModal',
  component: DateRangeModal,
  tags: ['autodocs'],
  args: { fieldsClassName: 'md:grid-cols-2' },
  render: (args) => {
    function Controlled() {
      const [open, setOpen] = React.useState(true);
      const [range, setRange] = React.useState<DateRange>(
        args.initialRange ?? { from: null, to: null },
      );

      return (
        <div className="flex flex-col items-start gap-5 p-10">
          <Button onClick={() => setOpen(true)}>انتخاب بازه</Button>
          <code className="text-caption-md">{JSON.stringify(range)}</code>
          <DateRangeModal
            {...args}
            open={open}
            initialRange={range}
            onClose={() => setOpen(false)}
            onSubmit={(next) => {
              setRange(next);
              setOpen(false);
            }}
          />
        </div>
      );
    }

    return <Controlled />;
  },
};

export default meta;
type Story = StoryObj<typeof DateRangeModal>;

export const Empty: Story = {};

export const Prefilled: Story = {
  args: { initialRange: { from: '2021-08-01', to: '2021-08-12' } },
};

export const CompareTitle: Story = {
  name: 'عنوان مقایسه (موبایل)',
  args: { title: 'مقایسه کنید', fieldsClassName: undefined },
};

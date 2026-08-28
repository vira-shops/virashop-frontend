import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { Modal } from './modal';
import type { ModalProps } from './types';
import { Button } from '@/components/ui';

const meta: Meta<typeof Modal> = {
  title: 'Shared/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalTrigger: React.FC<Omit<ModalProps, 'open' | 'onClose'>> = (props) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        باز کردن مودال
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} {...props} />
    </>
  );
};

export const Basic: Story = {
  render: () => (
    <ModalTrigger
      title="عنوان"
      footer={
        <Button fullWidth onClick={() => {}}>
          دکمه
        </Button>
      }
    >
      <label htmlFor="modal-textarea" className="text-body-sm font-medium text-black">
        عنوان لینک
      </label>
      <textarea
        id="modal-textarea"
        placeholder="متن..."
        className="text-body-sm mt-2 min-h-40 flex-1 resize-none rounded-md bg-blue-50 p-4 text-gray-700 placeholder:text-blue-300 focus:outline-none"
      />
    </ModalTrigger>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ModalTrigger key={size} size={size} title={`مودال ${size}`}>
          <p className="text-body-sm text-gray-700">محتوای مودال با سایز {size}</p>
        </ModalTrigger>
      ))}
    </div>
  ),
};

export const WithoutFooter: Story = {
  render: () => (
    <ModalTrigger title="بدون فوتر">
      <p className="text-body-sm text-gray-700">این مودال فوتر ندارد.</p>
    </ModalTrigger>
  ),
};

export const WithoutBackdropClose: Story = {
  render: () => (
    <ModalTrigger title="بستن با کلیک بیرون غیرفعال" closeOnBackdrop={false}>
      <p className="text-body-sm text-gray-700">
        این مودال فقط با دکمه بستن یا کلید Escape بسته می‌شود.
      </p>
    </ModalTrigger>
  ),
};

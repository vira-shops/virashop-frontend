import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EditIcon, TrashIcon } from '@icons';
import { ActionMenu } from './action-menu';

const meta: Meta<typeof ActionMenu> = {
  title: 'Shared/ActionMenu',
  component: ActionMenu,
  tags: ['autodocs'],
  args: {
    label: 'گزینه‌های آدرس',
    items: [
      { key: 'edit', label: 'ویرایش', icon: EditIcon, onSelect: () => undefined },
      { key: 'remove', label: 'حذف', icon: TrashIcon, tone: 'danger', onSelect: () => undefined },
    ],
  },
  decorators: [
    (Story) => (
      <div className="flex h-48 justify-center p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ActionMenu>;

export const Default: Story = {};

export const AlignStart: Story = { args: { align: 'start' } };

export const Disabled: Story = { args: { disabled: true } };

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Button } from '@/components/ui';
import { LocationPicker } from './location-picker';
import { LocationPickerField } from './location-picker-field';
import { LocationPickerModal } from './location-picker-modal';
import { MapThumbnail } from './map-thumbnail';
import type { LatLng } from './types';

const queryClient = new QueryClient();

const meta: Meta<typeof LocationPicker> = {
  title: 'Shared/LocationPicker',
  component: LocationPicker,
  tags: ['autodocs'],
  // The modal's place search runs through React Query.
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LocationPicker>;

const DEMO_POINT: LatLng = { lat: 31.8974, lng: 54.3569 };

export const Inline: Story = {
  render: () => {
    function Controlled() {
      const [value, setValue] = React.useState<LatLng | null>(null);

      return (
        <div className="flex max-w-2xl flex-col gap-5 p-10">
          <LocationPicker value={value} onChange={setValue} />
          <code className="text-caption-md">{JSON.stringify(value)}</code>
        </div>
      );
    }

    return <Controlled />;
  },
};

export const InModal: Story = {
  name: 'مودال «انتخاب روی نقشه»',
  render: () => {
    function Controlled() {
      const [open, setOpen] = React.useState(true);
      const [value, setValue] = React.useState<LatLng | null>(null);

      return (
        <div data-theme="retail" className="flex flex-col items-start gap-5 p-10">
          <Button onClick={() => setOpen(true)}>انتخاب روی نقشه</Button>
          <code className="text-caption-md">{JSON.stringify(value)}</code>
          <LocationPickerModal
            open={open}
            initialValue={value}
            onClose={() => setOpen(false)}
            onConfirm={(point) => {
              setValue(point);
              setOpen(false);
            }}
          />
        </div>
      );
    }

    return <Controlled />;
  },
};

export const Field: Story = {
  name: 'دکمه «انتخاب روی نقشه»',
  render: () => {
    function Controlled() {
      const [value, setValue] = React.useState<LatLng | null>(null);

      return (
        <div data-theme="retail" className="flex flex-col gap-7 p-10">
          <LocationPickerField value={value} onChange={setValue} theme="retail" />
          <LocationPickerField value={DEMO_POINT} onChange={() => undefined} />
          <LocationPickerField value={null} onChange={() => undefined} disabled />
        </div>
      );
    }

    return <Controlled />;
  },
};

export const Thumbnail: Story = {
  name: 'پیش‌نمایش ثابت نقشه',
  render: () => (
    <div className="flex items-end gap-7 p-10">
      <MapThumbnail value={DEMO_POINT} />
      <MapThumbnail value={DEMO_POINT} className="size-22" />
      <MapThumbnail value={DEMO_POINT} className="h-26 w-56" />
    </div>
  ),
};

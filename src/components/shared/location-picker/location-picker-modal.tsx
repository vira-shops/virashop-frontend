'use client';

import * as React from 'react';
import { Button, Typography } from '@/components/ui';
import { Modal } from '@/components/shared/modal';
import { LOCATION_PICKER_COPY } from './constants';
import { LocationPicker } from './location-picker';
import { PlaceSearch } from './place-search';
import type { LatLng, LocationPickerModalProps } from './types';

/** «آدرس خود را روی نقشه انتخاب کنید» — the map in a modal, confirmed with one button. */
export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  open,
  onClose,
  onConfirm,
  initialValue = null,
  title = LOCATION_PICKER_COPY.title,
  description = LOCATION_PICKER_COPY.description,
  confirmLabel = LOCATION_PICKER_COPY.confirm,
  theme,
}) => {
  const [point, setPoint] = React.useState<LatLng | null>(initialValue);

  // Re-seed from the caller each time the modal opens ("adjust state while rendering").
  const [wasOpen, setWasOpen] = React.useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setPoint(initialValue);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="lg"
      theme={theme}
      titleClassName="text-primary"
    >
      <div className="flex flex-col gap-7">
        <Typography variant="body-md" as="p" className="text-black">
          {description}
        </Typography>
        <PlaceSearch onFound={setPoint} />
        <LocationPicker value={point} onChange={setPoint} className="h-96" />
        <Button
          size="sm"
          className="self-end"
          disabled={!point}
          onClick={() => point && onConfirm(point)}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};

LocationPickerModal.displayName = 'LocationPickerModal';

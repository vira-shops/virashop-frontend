import * as React from 'react';
import { Radio, Typography } from '@/components/ui';
import { ActionMenu, MapThumbnail } from '@/components/shared';
import { EditIcon, TrashIcon } from '@icons';
import { ADDRESS_COPY } from './constants';
import type { AddressRowProps } from './types';

/**
 * One saved address: default radio · «استان - شهر» + street line · map
 * preview · «⋮» (ویرایش / حذف). Phones tuck the preview under the text.
 */
export const AddressRow: React.FC<AddressRowProps> = ({
  address,
  region,
  groupName,
  onSelect,
  onEdit,
  onRemove,
  disabled = false,
}) => {
  const thumbnail = address.location ? (
    <MapThumbnail value={address.location} label={`${region} روی نقشه`} />
  ) : null;

  return (
    <div className="flex items-start gap-5 py-7 md:items-center">
      <Radio
        name={groupName}
        checked={address.isDefault}
        onChange={() => onSelect(address.id)}
        aria-label={region}
        className="mt-1 md:mt-0"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-baseline md:gap-5">
        <Typography variant="body-sm" as="h3" className="shrink-0 font-bold text-black">
          {region}
        </Typography>
        <Typography variant="body-xs" as="p" className="text-gray-700">
          {address.line}
        </Typography>
        {thumbnail && <div className="md:hidden">{thumbnail}</div>}
      </div>

      {thumbnail && <div className="max-md:hidden">{thumbnail}</div>}

      <ActionMenu
        label={ADDRESS_COPY.rowMenu(region)}
        disabled={disabled}
        items={[
          {
            key: 'edit',
            label: ADDRESS_COPY.edit,
            icon: EditIcon,
            onSelect: () => onEdit(address),
          },
          {
            key: 'remove',
            label: ADDRESS_COPY.remove,
            icon: TrashIcon,
            tone: 'danger',
            onSelect: () => onRemove(address.id),
          },
        ]}
      />
    </div>
  );
};

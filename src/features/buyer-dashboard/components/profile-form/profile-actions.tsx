import * as React from 'react';
import { EditIcon } from '@icons';
import { Button } from '@/components/ui';
import { PROFILE_LABELS as L } from './constants';
import type { ProfileEditButtonProps, ProfileFormActionsProps } from './types';

/** «ویرایش» — the page heading's action; unlocks the fields. */
export const ProfileEditButton: React.FC<ProfileEditButtonProps> = ({ onClick }) => (
  <Button
    variant="ghost"
    size="xs"
    onClick={onClick}
    rightIcon={<EditIcon className="size-9" />}
    className="text-blue-300"
  >
    {L.edit}
  </Button>
);

/** Save / cancel row shown under the cards while editing. */
export const ProfileFormActions: React.FC<ProfileFormActionsProps> = ({ saving, onCancel }) => (
  <div className="flex flex-wrap justify-end gap-5">
    <Button variant="outline" onClick={onCancel}>
      {L.cancel}
    </Button>
    <Button type="submit" disabled={saving}>
      {L.save}
    </Button>
  </div>
);

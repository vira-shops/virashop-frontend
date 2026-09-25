'use client';

import * as React from 'react';
import { Uploader } from '@/components/ui';
import { cn } from '@/utils/ui';
import {
  DOCUMENT_ACCEPT,
  DOCUMENT_MAX_SIZE_MB,
  PROFILE_LABEL_CLASS,
  PROFILE_LABELS as L,
  PROFILE_PANEL_CLASS,
} from './constants';
import type { DocumentFieldProps } from './types';

/**
 * «احراز هویت» — national card / business license picker. Kept local for now:
 * there is no upload route yet, so the file is not sent with the profile.
 */
export const DocumentField: React.FC<DocumentFieldProps> = ({ disabled }) => {
  const [file, setFile] = React.useState<File | null>(null);

  return (
    <div className="flex flex-col gap-4 md:col-span-2">
      <span className={PROFILE_LABEL_CLASS}>{L.document}</span>
      <div className={cn(PROFILE_PANEL_CLASS, 'flex justify-center')}>
        <Uploader
          placeholder={L.documentPlaceholder}
          accept={DOCUMENT_ACCEPT}
          maxSizeMb={DOCUMENT_MAX_SIZE_MB}
          file={file}
          onChange={setFile}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

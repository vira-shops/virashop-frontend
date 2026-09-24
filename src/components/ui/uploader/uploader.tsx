'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import { CancelIcon, GalleryIcon } from '@icons';
import { UploaderProps } from './types';

const DocumentIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 2.5h8l4 4v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-18a1 1 0 0 1 1-1Z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 2.5v4h4" />
    <path strokeLinecap="round" d="M8.5 13h7M8.5 17h5" />
  </svg>
);

export const Uploader: React.FC<UploaderProps> = ({
  variant = 'tile',
  label,
  placeholder,
  accept = 'image/*,application/pdf',
  maxSizeMb = 5,
  file: fileProp,
  disabled,
  onChange,
  className,
  wrapperClassName,
  labelClassName,
  previewClassName,
  fileNameClassName,
  placeholderClassName,
  removeClassName,
  errorMessageClassName,
}) => {
  const autoId = React.useId();
  const inputId = `uploader-${autoId}`;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [innerFile, setInnerFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const file = fileProp !== undefined ? fileProp : innerFile;
  const isImage = Boolean(file?.type.startsWith('image/'));

  const previewUrl = React.useMemo(() => {
    if (!file || !isImage) return null;

    return URL.createObjectURL(file);
  }, [file, isImage]);

  React.useEffect(() => {
    if (!previewUrl) return;

    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const validate = (candidate: File): string | null => {
    const acceptedTypes = accept.split(',').map((type) => type.trim().toLowerCase());
    const fileType = candidate.type.toLowerCase();
    const isAllowed = acceptedTypes.some(
      (type) =>
        type === fileType || (type.endsWith('/*') && fileType.startsWith(type.slice(0, -1))),
    );

    if (!isAllowed) return 'فرمت فایل مجاز نیست';
    if (candidate.size > maxSizeMb * 1024 * 1024) {
      return `حجم فایل باید کمتر از ${maxSizeMb} مگابایت باشد`;
    }

    return null;
  };

  const handleFiles = (files: FileList | null) => {
    const candidate = files?.[0];

    if (!candidate) return;

    const validationError = validate(candidate);

    if (validationError) {
      setError(validationError);

      return;
    }

    setError(null);
    setInnerFile(candidate);
    onChange?.(candidate);
  };

  const handleRemove = () => {
    setInnerFile(null);
    setError(null);

    if (inputRef.current) inputRef.current.value = '';

    onChange?.(null);
  };

  const handleDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    handleFiles(event.dataTransfer.files);
  };

  const hiddenInput = (
    <input
      ref={inputRef}
      id={inputId}
      type="file"
      accept={accept}
      className="hidden"
      aria-hidden="true"
      tabIndex={-1}
      onChange={(event) => handleFiles(event.target.files)}
    />
  );

  if (variant === 'bar') {
    return (
      <div dir="rtl" className={cn('flex w-full flex-col items-start gap-2', wrapperClassName)}>
        {label && (
          <label htmlFor={inputId} className={cn('uploader-label', labelClassName)}>
            {label}
          </label>
        )}
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'uploader-bar',
            isDragging && 'uploader-bar-dragover',
            error && 'uploader-bar-error',
            disabled && 'uploader-disabled',
            className,
          )}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {file ? (
            <span className={cn('uploader-bar-filename', fileNameClassName)}>{file.name}</span>
          ) : (
            <span className={cn('uploader-bar-text', placeholderClassName)}>{placeholder}</span>
          )}
          {file && !disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="حذف فایل"
              className={cn('uploader-bar-remove', removeClassName)}
              onClick={(event) => {
                event.stopPropagation();
                handleRemove();
              }}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                event.stopPropagation();
                handleRemove();
              }}
            >
              <CancelIcon />
            </span>
          )}
        </button>
        {hiddenInput}
        {error && <p className={cn('uploader-error-message', errorMessageClassName)}>{error}</p>}
      </div>
    );
  }

  return (
    <div dir="rtl" className={cn('flex flex-col items-start gap-4', wrapperClassName)}>
      {label && (
        <label htmlFor={inputId} className={cn('uploader-label', labelClassName)}>
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'uploader-tile',
            isDragging && 'uploader-tile-dragover',
            error && 'uploader-tile-error',
            disabled && 'uploader-disabled',
            className,
          )}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <svg className="uploader-tile-outline" aria-hidden="true">
            <rect />
          </svg>
          {file ? (
            isImage ? (
              /* eslint-disable-next-line @next/next/no-img-element -- blob preview cannot use next/image */
              <img
                src={previewUrl ?? undefined}
                alt={file.name}
                className={cn('uploader-preview', previewClassName)}
              />
            ) : (
              <>
                <DocumentIcon />
                <span className={cn('uploader-file-name', fileNameClassName)}>{file.name}</span>
              </>
            )
          ) : (
            <>
              <GalleryIcon />
              {placeholder && (
                <span className={cn('uploader-placeholder', placeholderClassName)}>
                  {placeholder}
                </span>
              )}
            </>
          )}
        </button>
        {file && !disabled && (
          <button
            type="button"
            aria-label="حذف فایل"
            className={cn('uploader-remove', removeClassName)}
            onClick={handleRemove}
          >
            <CancelIcon />
          </button>
        )}
      </div>
      {hiddenInput}
      {error && <p className={cn('uploader-error-message', errorMessageClassName)}>{error}</p>}
    </div>
  );
};

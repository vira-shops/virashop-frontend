'use client';

import * as React from 'react';
import { cn } from '@/utils/ui';
import { SelectProps, SelectVariant, SelectColor, SelectState, SelectSize } from './types';

/** Combines an internal ref with a caller-supplied one (e.g. RHF's `field.ref`). */
function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') ref(node);
      else (ref as React.RefObject<T | null>).current = node;
    }
  };
}

const variantClasses: Record<SelectVariant, string> = {
  outline: 'select-outline',
  fill: 'select-fill',
  ghost: 'select-ghost',
};

const colorClasses: Record<SelectColor, string> = {
  primary: 'select-primary',
  blue: 'select-blue',
  yellow: 'select-yellow',
};

const stateClasses: Record<SelectState, string> = {
  error: 'select-error',
  success: 'select-success',
  warning: 'select-warning',
};

const stateMessageClasses: Record<SelectState, string> = {
  error: 'text-warning-red',
  success: 'text-warning-green',
  warning: 'text-yellow-100',
};

const sizeClasses: Record<SelectSize, string> = {
  sm: 'select-sm',
  md: 'select-md',
  lg: 'select-lg',
};

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
  </svg>
);

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="m20 20-3.5-3.5" />
  </svg>
);

interface SelectOptionData {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

const flattenOptions = (
  nodes: React.ReactNode,
  result: SelectOptionData[] = [],
): SelectOptionData[] => {
  React.Children.forEach(nodes, (node) => {
    if (!React.isValidElement(node)) return;

    const nodeType = node.type as unknown;

    if (nodeType === React.Fragment) {
      flattenOptions((node.props as { children?: React.ReactNode }).children, result);
      return;
    }

    const props = node.props as {
      value?: string | number;
      children?: React.ReactNode;
      disabled?: boolean;
    };

    if (nodeType === 'optgroup') {
      flattenOptions(props.children, result);
      return;
    }

    result.push({
      value: String(props.value ?? ''),
      label: props.children,
      disabled: props.disabled,
    });
  });

  return result;
};

export const Select: React.FC<SelectProps> = ({
  variant = 'outline',
  color = 'primary',
  state,
  size = 'md',
  label,
  inputMessage,
  placeholder,
  searchable = false,
  filterable = true,
  rightIcon,
  onValueChange,
  fullWidth,
  disabled,
  dir = 'rtl',
  className,
  wrapperClassName,
  labelClassName,
  fieldClassName,
  listClassName,
  optionClassName,
  messageClassName,
  children,
  onChange,
  ref,
  ...props
}) => {
  const autoId = React.useId();
  const selectId = props.id ?? autoId;
  const showMessage = Boolean(inputMessage);

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [innerValue, setInnerValue] = React.useState(
    props.defaultValue !== undefined ? String(props.defaultValue) : '',
  );
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const currentValue = props.value !== undefined ? String(props.value) : innerValue;

  const optionList = React.useMemo(() => flattenOptions(children), [children]);

  const selectedLabel = optionList.find((option) => option.value === currentValue)?.label;
  const canFilter = searchable && filterable;
  const filteredOptions = canFilter
    ? optionList.filter(
        (option) =>
          typeof option.label === 'string' &&
          option.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : optionList;

  const commitValue = React.useCallback(
    (value: string) => {
      setInnerValue(value);
      onChange?.({ target: { value } } as unknown as React.ChangeEvent<HTMLSelectElement>);
      onValueChange?.(value);
    },
    [onChange, onValueChange],
  );

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  const handleNativeChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  const handleSelect = (option: SelectOptionData) => {
    if (option.disabled) return;

    commitValue(option.value);
    setOpen(false);
    setQuery('');
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => Math.min(index + 1, filteredOptions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const option = filteredOptions[activeIndex];

      if (option) handleSelect(option);
    } else if (event.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  };

  const toggleListbox = () => {
    if (disabled) return;

    setOpen((prev) => !prev);
    setQuery('');
    setActiveIndex(0);
    inputRef.current?.focus();
  };

  const triggerClasses = cn(
    'select',
    variantClasses[variant],
    colorClasses[color],
    state && stateClasses[state],
    sizeClasses[size],
    disabled && 'select-disabled',
    fullWidth && 'select-fullWidth',
    className,
  );

  return (
    <div
      dir={dir}
      className={cn('flex flex-col items-start gap-5', fullWidth && 'w-full', wrapperClassName)}
    >
      {label && (
        <label htmlFor={selectId} className={cn('select-label', labelClassName)}>
          {label}
        </label>
      )}
      <div ref={rootRef} className={cn('relative', fullWidth && 'w-full')}>
        <div className={triggerClasses}>
          {searchable ? (
            <>
              {rightIcon !== undefined ? rightIcon : canFilter ? <SearchIcon /> : null}
              <input
                // Safe to forward the external ref here (focus only): this
                // field is driven by `FormSelect` via `useController`, a
                // fully controlled value/onChange pair — RHF never reads
                // this DOM node's `.value` (which would be the human
                // -readable label, not the option value) to get the field's
                // value.
                ref={mergeRefs(inputRef, ref as unknown as React.Ref<HTMLInputElement> | undefined)}
                id={selectId}
                name={props.name}
                autoFocus={props.autoFocus}
                required={props.required}
                tabIndex={props.tabIndex}
                aria-label={props['aria-label']}
                dir={dir}
                type="text"
                role="combobox"
                aria-expanded={open}
                aria-controls={`${selectId}-listbox`}
                aria-autocomplete="list"
                autoComplete="off"
                readOnly={!canFilter}
                disabled={disabled}
                placeholder={placeholder}
                value={
                  canFilter && open
                    ? query
                    : typeof selectedLabel === 'string' || typeof selectedLabel === 'number'
                      ? String(selectedLabel)
                      : currentValue
                }
                onChange={(event) => {
                  setQuery(event.target.value);
                  setOpen(true);
                  setActiveIndex(0);
                }}
                onFocus={() => setOpen(true)}
                onBlur={props.onBlur as unknown as React.FocusEventHandler<HTMLInputElement>}
                onKeyDown={handleSearchKeyDown}
                className={cn(
                  'h-full w-full flex-1 bg-transparent text-inherit focus:outline-none',
                  canFilter ? 'cursor-text' : 'cursor-pointer',
                  fieldClassName,
                )}
              />
              <button
                type="button"
                tabIndex={-1}
                aria-label="نمایش گزینه‌ها"
                aria-expanded={open}
                disabled={disabled}
                className={cn('select-toggle', open && 'select-toggle-open')}
                onMouseDown={(event) => event.preventDefault()}
                onClick={toggleListbox}
              >
                <ChevronDownIcon />
              </button>
            </>
          ) : (
            <>
              {rightIcon}
              <select
                {...props}
                id={selectId}
                ref={ref}
                dir={dir}
                disabled={disabled}
                onChange={handleNativeChange}
                className={fieldClassName}
              >
                {placeholder !== undefined && (
                  <option value="" disabled hidden>
                    {placeholder}
                  </option>
                )}
                {children}
              </select>
              <ChevronDownIcon />
            </>
          )}
        </div>
        {searchable && open && (
          <ul
            id={`${selectId}-listbox`}
            role="listbox"
            className={cn('select-listbox', listClassName)}
          >
            {filteredOptions.length === 0 && (
              <li className="select-option select-option-empty">گزینه‌ای یافت نشد</li>
            )}
            {filteredOptions.map((option, index) => (
              <li
                key={option.value}
                role="option"
                aria-selected={option.value === currentValue}
                aria-disabled={option.disabled || undefined}
                className={cn(
                  'select-option',
                  index === activeIndex && 'select-option-active',
                  option.value === currentValue && 'select-option-selected',
                  option.disabled && 'select-option-disabled',
                  optionClassName,
                )}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      {showMessage && (
        <p className={cn('select-message', state && stateMessageClasses[state], messageClassName)}>
          {inputMessage}
        </p>
      )}
    </div>
  );
};

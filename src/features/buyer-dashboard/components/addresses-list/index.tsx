'use client';

import * as React from 'react';
import { Button, Skeleton } from '@/components/ui';
import { EmptyState, PageHeading } from '@/components/shared';
import { AddCircleIcon } from '@icons';
import { PAGE_TITLES, getBuyerChannel } from '@/features/buyer-dashboard/constants';
import {
  EMPTY_ADDRESS_FORM,
  toAddressFormValues,
} from '@/features/buyer-dashboard/validation/address-schema';
import { AddressForm } from './address-form';
import { AddressRow } from './address-row';
import { ADDRESSES_EMPTY, ADDRESS_CARD_CLASS, ADDRESS_COPY, SKELETON_COUNT } from './constants';
import type { AddressesListProps } from './types';
import { useAddressEditor } from './use-address-editor';

/**
 * «آدرس ها» — one card: the saved addresses (radio = default), then either
 * the inline add / edit form or the «اضافه کردن آدرس جدید» link.
 */
export const AddressesList: React.FC<AddressesListProps> = ({ channel }) => {
  const { theme } = getBuyerChannel(channel);
  const editor = useAddressEditor();
  const groupName = React.useId();
  const { items, target } = editor;

  return (
    <>
      <PageHeading title={PAGE_TITLES.addresses} />

      {editor.loading ? (
        <div className="flex flex-col gap-5" aria-busy="true">
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <Skeleton key={index} className="rounded-8 h-22" />
          ))}
        </div>
      ) : (
        <div className={ADDRESS_CARD_CLASS}>
          {items.length > 0 && (
            <div
              role="radiogroup"
              aria-label={ADDRESS_COPY.defaultGroup}
              className="flex flex-col divide-y divide-blue-100"
            >
              {items.map((address) => (
                <AddressRow
                  key={address.id}
                  address={address}
                  region={editor.regionOf(address)}
                  groupName={groupName}
                  onSelect={editor.selectDefault}
                  onEdit={editor.startEditing}
                  onRemove={editor.removeAddress}
                  disabled={target !== null}
                />
              ))}
            </div>
          )}

          {items.length === 0 && target === null && (
            <EmptyState
              variant="inline"
              message={ADDRESSES_EMPTY.message}
              highlight={ADDRESSES_EMPTY.highlight}
              className="border-0 px-0 pt-7 pb-0"
            />
          )}

          {target !== null ? (
            <AddressForm
              // Fresh defaults for every add / edit session.
              key={target === 'new' ? 'new' : target.id}
              index={editor.formIndex}
              defaultValues={target === 'new' ? EMPTY_ADDRESS_FORM : toAddressFormValues(target)}
              saving={editor.saving}
              onSubmit={editor.submit}
              onCancel={editor.close}
              theme={theme}
            />
          ) : (
            <div className="py-5">
              <Button
                variant="ghost"
                color="blue"
                size="sm"
                rightIcon={<AddCircleIcon className="size-7" />}
                onClick={editor.startAdding}
                className="px-0 text-gray-300 hover:bg-transparent hover:text-gray-700"
              >
                {ADDRESS_COPY.add}
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

'use client';

import * as React from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { PencilIcon } from '@icons';
import {
  Avatar,
  Button,
  DateInput,
  Radio,
  Skeleton,
  Tabs,
  Textarea,
  Typography,
  Uploader,
} from '@/components/ui';
import { Form, FormInput, FormSelect, PageHeading } from '@/components/shared';
import { useToast } from '@/components/feedback';
import { useCities, useProfile, useProvinces, useUpdateProfile } from '@/hooks';
import { cn } from '@/utils/ui';
import {
  BUY_TYPE_OPTIONS,
  DOCUMENT_ACCEPT,
  DOCUMENT_MAX_SIZE_MB,
  GENDER_OPTIONS,
  PAGE_TITLES,
  PROFILE_LABELS as L,
  PROFILE_SECTIONS,
} from '@/features/buyer-dashboard/constants';
import {
  ProfileFormSchema,
  toProfileFormValues,
  toProfileUpdateRequest,
  type ProfileFormValues,
} from '@/features/buyer-dashboard/validation/profile-schema';

type ProfileSection = 'personal' | 'business';

const CARD = 'rounded-8 flex flex-col gap-9 border border-blue-100 bg-white p-7';

/** Field chrome shared by every input in both cards — the design's soft-filled boxes. */
const FIELD = { variant: 'ghost', fullWidth: true, className: 'bg-blue-50' } as const;

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="h6" as="h2" className="text-primary">
    {children}
  </Typography>
);

interface CardProps {
  form: UseFormReturn<ProfileFormValues>;
  editing: boolean;
  /** Mobile tabs hide the card that is not selected; desktop always shows both. */
  hiddenOnMobile: boolean;
}

const PersonalCard: React.FC<CardProps & { avatarSrc: string | null }> = ({
  form,
  editing,
  hiddenOnMobile,
  avatarSrc,
}) => (
  <section
    aria-label={PROFILE_SECTIONS.personal}
    className={cn(CARD, hiddenOnMobile && 'max-lg:hidden')}
  >
    <div className="lg:hidden">
      <SectionTitle>{PROFILE_SECTIONS.personal}</SectionTitle>
    </div>
    <Avatar src={avatarSrc} alt={L.avatar} size="xl" className="mx-auto max-lg:size-14" />

    <FormInput<ProfileFormValues>
      name="fullName"
      label={L.fullName}
      disabled={!editing}
      {...FIELD}
    />
    <FormInput<ProfileFormValues>
      name="mobile"
      label={L.mobile}
      readOnly
      disabled={!editing}
      {...FIELD}
    />
    <FormInput<ProfileFormValues>
      name="nationalId"
      label={L.nationalId}
      inputMode="numeric"
      disabled={!editing}
      {...FIELD}
    />
    <Controller
      control={form.control}
      name="birthDate"
      render={({ field, fieldState }) => (
        <DateInput
          label={L.birthDate}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          disabled={!editing}
          state={fieldState.error ? 'error' : undefined}
          inputMessage={fieldState.error?.message}
          {...FIELD}
        />
      )}
    />
    <FormSelect<ProfileFormValues>
      name="gender"
      label={L.gender}
      placeholder={L.genderPlaceholder}
      searchable
      filterable={false}
      disabled={!editing}
      variant="ghost"
      fullWidth
      className="bg-blue-50"
    >
      {GENDER_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FormSelect>
  </section>
);

const BusinessCard: React.FC<CardProps> = ({ form, editing, hiddenOnMobile }) => {
  const provinces = useProvinces();
  const cities = useCities();
  const [document, setDocument] = React.useState<File | null>(null);
  const addressError = form.formState.errors.address?.message;

  return (
    <section
      aria-label={PROFILE_SECTIONS.business}
      className={cn(CARD, hiddenOnMobile && 'max-lg:hidden')}
    >
      <SectionTitle>{PROFILE_SECTIONS.business}</SectionTitle>

      <div className="grid grid-cols-1 gap-9 md:grid-cols-2">
        <FormInput<ProfileFormValues>
          name="businessName"
          label={L.businessName}
          disabled={!editing}
          {...FIELD}
        />
        <FormInput<ProfileFormValues>
          name="businessPhone"
          label={L.businessPhone}
          inputMode="tel"
          disabled={!editing}
          {...FIELD}
        />

        <fieldset className="flex flex-col gap-4">
          <legend className="input-label mb-4">{L.location}</legend>
          <div className="grid grid-cols-2 gap-5">
            <FormSelect<ProfileFormValues>
              name="province"
              aria-label={L.province}
              searchable
              disabled={!editing}
              variant="ghost"
              fullWidth
              className="bg-blue-50"
            >
              {(provinces.data ?? []).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormSelect>
            <FormSelect<ProfileFormValues>
              name="city"
              aria-label={L.city}
              searchable
              disabled={!editing}
              variant="ghost"
              fullWidth
              className="bg-blue-50"
            >
              {(cities.data ?? []).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FormSelect>
          </div>
        </fieldset>

        <FormInput<ProfileFormValues>
          name="postalCode"
          label={L.postalCode}
          inputMode="numeric"

          disabled={!editing}
          {...FIELD}
        />

        <Controller
          control={form.control}
          name="buyType"
          render={({ field }) => (
            <fieldset
              disabled={!editing}
              className="rounded-5 flex flex-col gap-5 bg-blue-50 p-7 disabled:opacity-60"
            >
              <legend className="input-label float-start mb-5 w-full">{L.buyType}</legend>
              {BUY_TYPE_OPTIONS.map((option) => (
                <Radio
                  key={option.value}
                  name={field.name}
                  value={option.value}
                  label={option.label}
                  size="sm"
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  onBlur={field.onBlur}
                />
              ))}
            </fieldset>
          )}
        />

        <Textarea
          label={L.address}
          disabled={!editing}
          variant="ghost"
          fullWidth
          rows={5}
          className="bg-blue-50"
          state={addressError ? 'error' : undefined}
          inputMessage={addressError}
          {...form.register('address')}
        />

        <div className="flex flex-col gap-4 md:col-span-2">
          <span className="input-label">{L.document}</span>
          <div className="rounded-5 flex justify-center bg-blue-50 p-7">
            <Uploader
              placeholder={L.documentPlaceholder}
              accept={DOCUMENT_ACCEPT}
              maxSizeMb={DOCUMENT_MAX_SIZE_MB}
              file={document}
              onChange={setDocument}
              disabled={!editing}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfileSkeleton: React.FC = () => (
  <div
    className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
    aria-busy="true"
  >
    <Skeleton className="rounded-8 h-[36rem]" />
    <Skeleton className="rounded-8 h-[36rem] max-lg:hidden" />
  </div>
);

/**
 * Profile view / edit. Both cards are one form; «ویرایش» unlocks the fields
 * and reveals save / cancel. On phones tabs switch between the two cards.
 */
export const ProfileForm: React.FC = () => {
  const profile = useProfile();
  const update = useUpdateProfile();
  const toast = useToast();
  const [editing, setEditing] = React.useState(false);
  const [section, setSection] = React.useState<ProfileSection>('personal');

  const handleSubmit = async (values: ProfileFormValues) => {
    try {
      await update.mutateAsync(toProfileUpdateRequest(values));
      toast.success(L.saved);
      setEditing(false);
    } catch {
      toast.error(L.saveFailed);
    }
  };

  return (
    <>
      <PageHeading
        title={PAGE_TITLES.profile}
        actions={
          !editing && profile.data ? (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setEditing(true)}
              rightIcon={<PencilIcon className="size-9" />}
              className="text-blue-300"
            >
              {L.edit}
            </Button>
          ) : null
        }
      />

      <div className="border-b border-blue-100 lg:hidden">
        <Tabs
          aria-label={PAGE_TITLES.profile}
          variant="underline"
          items={[
            { value: 'personal', label: PROFILE_SECTIONS.personal },
            { value: 'business', label: PROFILE_SECTIONS.business },
          ]}
          value={section}
          onChange={(value) => setSection(value as ProfileSection)}
          itemClassName="pb-4"
        />
      </div>

      {profile.isLoading && <ProfileSkeleton />}

      {profile.data && (
        <Form<ProfileFormValues>
          // Re-mount with fresh defaults whenever the saved profile changes.
          key={JSON.stringify(profile.data)}
          schema={ProfileFormSchema}
          defaultValues={toProfileFormValues(profile.data)}
          onSubmit={handleSubmit}
          className="gap-7"
        >
          {(form) => (
            <>
              <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <PersonalCard
                  form={form}
                  editing={editing}
                  hiddenOnMobile={section !== 'personal'}
                  avatarSrc={profile.data!.personal.avatarUrl}
                />
                <BusinessCard
                  form={form}
                  editing={editing}
                  hiddenOnMobile={section !== 'business'}
                />
              </div>

              {editing && (
                <div className="flex flex-wrap justify-end gap-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setEditing(false);
                    }}
                  >
                    {L.cancel}
                  </Button>
                  <Button type="submit" disabled={update.isPending}>
                    {L.save}
                  </Button>
                </div>
              )}
            </>
          )}
        </Form>
      )}
    </>
  );
};

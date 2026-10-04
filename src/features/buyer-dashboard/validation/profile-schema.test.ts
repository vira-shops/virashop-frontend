import { PROFILE_MOCK } from '@/contracts/endpoints/profile';
import {
  PROFILE_FORM_SCHEMAS,
  ProfileFormSchema,
  toProfileFormValues,
  toProfileUpdateRequest,
} from './profile-schema';

describe('profile form schema', () => {
  it('accepts the mock profile as-is, for both variants', () => {
    expect(ProfileFormSchema.safeParse(toProfileFormValues(PROFILE_MOCK, 'business')).success).toBe(
      true,
    );
    expect(
      PROFILE_FORM_SCHEMAS.address.safeParse(toProfileFormValues(PROFILE_MOCK, 'address')).success,
    ).toBe(true);
  });

  it('rejects malformed national id, postal code and phone', () => {
    const result = ProfileFormSchema.safeParse({
      ...toProfileFormValues(PROFILE_MOCK, 'business'),
      nationalId: '123',
      postalCode: 'abc',
      businessPhone: '912',
    });

    expect(result.success).toBe(false);
    const paths = result.error!.issues.map((issue) => issue.path[0]);
    expect(paths).toEqual(expect.arrayContaining(['nationalId', 'postalCode', 'businessPhone']));
  });

  it('skips the business fields for the address variant', () => {
    const values = {
      ...toProfileFormValues({ ...PROFILE_MOCK, business: null }, 'address'),
      postalCode: '',
    };

    expect(PROFILE_FORM_SCHEMAS.address.safeParse(values).success).toBe(true);
    expect(ProfileFormSchema.safeParse(values).success).toBe(false);
  });

  it('round-trips form values into the update request', () => {
    const values = {
      ...toProfileFormValues(PROFILE_MOCK, 'business'),
      fullName: '  حسین حیدری ',
      gender: '' as const,
    };
    const request = toProfileUpdateRequest(values, 'business');

    expect(request.personal.fullName).toBe('حسین حیدری');
    expect(request.personal.gender).toBeNull();
    expect(request.business?.buyType).toBe(PROFILE_MOCK.business!.buyType);
    expect(request.personal).not.toHaveProperty('mobile');
    expect(request).not.toHaveProperty('address');
  });

  it('sends only the address card for the address variant', () => {
    const location = { lat: 31.9, lng: 54.35 };
    const request = toProfileUpdateRequest(
      { ...toProfileFormValues(PROFILE_MOCK, 'address'), location },
      'address',
    );

    expect(request.address).toEqual({ line: PROFILE_MOCK.address!.line, location });
    expect(request).not.toHaveProperty('business');
  });

  it('requires a birth date only on the retail (address) variant', () => {
    const values = { ...toProfileFormValues(PROFILE_MOCK, 'address'), birthDate: null };

    expect(PROFILE_FORM_SCHEMAS.address.safeParse(values).success).toBe(false);
    expect(
      ProfileFormSchema.safeParse({
        ...toProfileFormValues(PROFILE_MOCK, 'business'),
        birthDate: null,
      }).success,
    ).toBe(true);
  });

  it('accepts an empty email but rejects a malformed one, and sends blanks as null', () => {
    const base = toProfileFormValues(PROFILE_MOCK, 'address');

    expect(PROFILE_FORM_SCHEMAS.address.safeParse({ ...base, email: '' }).success).toBe(true);
    expect(PROFILE_FORM_SCHEMAS.address.safeParse({ ...base, email: 'x@' }).success).toBe(false);
    expect(
      toProfileUpdateRequest({ ...base, email: ' ', occupation: '' }, 'address').personal,
    ).toMatchObject({
      email: null,
      occupation: null,
    });
  });
});

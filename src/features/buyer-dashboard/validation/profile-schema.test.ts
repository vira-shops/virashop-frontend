import { PROFILE_MOCK } from '@/contracts/endpoints/profile';
import { ProfileFormSchema, toProfileFormValues, toProfileUpdateRequest } from './profile-schema';

describe('profile form schema', () => {
  it('accepts the mock profile as-is', () => {
    expect(ProfileFormSchema.safeParse(toProfileFormValues(PROFILE_MOCK)).success).toBe(true);
  });

  it('rejects malformed national id, postal code and phone', () => {
    const result = ProfileFormSchema.safeParse({
      ...toProfileFormValues(PROFILE_MOCK),
      nationalId: '123',
      postalCode: 'abc',
      businessPhone: '912',
    });

    expect(result.success).toBe(false);
    const paths = result.error!.issues.map((issue) => issue.path[0]);
    expect(paths).toEqual(expect.arrayContaining(['nationalId', 'postalCode', 'businessPhone']));
  });

  it('round-trips form values into the update request', () => {
    const values = {
      ...toProfileFormValues(PROFILE_MOCK),
      fullName: '  حسین حیدری ',
      gender: '' as const,
    };
    const request = toProfileUpdateRequest(values);

    expect(request.personal.fullName).toBe('حسین حیدری');
    expect(request.personal.gender).toBeNull();
    expect(request.business.buyType).toBe(PROFILE_MOCK.business.buyType);
    expect(request.personal).not.toHaveProperty('mobile');
  });
});

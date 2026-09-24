import { ORDERS_MOCK } from '@/contracts/endpoints/orders';
import { PROFILE_MOCK } from '@/contracts/endpoints/profile';
import { filterOrders } from './use-orders';
import { mergeProfileUpdate } from './use-profile';

describe('filterOrders', () => {
  it('returns everything without filters', () => {
    expect(filterOrders(ORDERS_MOCK, {})).toHaveLength(ORDERS_MOCK.length);
  });

  it('filters by status', () => {
    const delivered = filterOrders(ORDERS_MOCK, { status: 'DELIVERED' });

    expect(delivered.length).toBeGreaterThan(0);
    expect(delivered.every((order) => order.status === 'DELIVERED')).toBe(true);
  });

  it('keeps both ends of the date range inclusive', () => {
    const range = filterOrders(ORDERS_MOCK, { from: '2021-08-09', to: '2021-08-12' });

    expect(range.map((order) => order.id)).toEqual([1001, 1002, 1003, 1004]);
  });

  it('matches the tracking code and applies the limit last', () => {
    expect(filterOrders(ORDERS_MOCK, { q: '1545' }).map((order) => order.id)).toEqual([1004]);
    expect(filterOrders(ORDERS_MOCK, { status: 'PROCESSING', limit: 2 })).toHaveLength(2);
  });
});

describe('mergeProfileUpdate', () => {
  it('overlays the submitted sections and keeps server-only fields', () => {
    const merged = mergeProfileUpdate(
      { ...PROFILE_MOCK, personal: { ...PROFILE_MOCK.personal, avatarUrl: '/a.png' } },
      {
        personal: {
          fullName: 'نام جدید',
          nationalId: '1111111111',
          birthDate: null,
          gender: 'MALE',
        },
        business: { ...PROFILE_MOCK.business, name: 'فروشگاه جدید' },
      },
    );

    expect(merged.personal.fullName).toBe('نام جدید');
    expect(merged.personal.avatarUrl).toBe('/a.png');
    expect(merged.personal.mobile).toBe(PROFILE_MOCK.personal.mobile);
    expect(merged.business.name).toBe('فروشگاه جدید');
  });
});

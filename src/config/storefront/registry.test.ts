import { STOREFRONT_SEGMENTS, getStorefrontChannel } from './registry';

describe('storefront channel registry', () => {
  it('resolves a config for every known segment', () => {
    for (const segment of STOREFRONT_SEGMENTS) {
      expect(getStorefrontChannel(segment)).not.toBeNull();
    }
  });

  it('returns null for an unknown segment', () => {
    expect(getStorefrontChannel('not-a-channel')).toBeNull();
  });

  it('matches segment, channel, and paths consistently', () => {
    for (const segment of STOREFRONT_SEGMENTS) {
      const config = getStorefrontChannel(segment);

      expect(config?.segment).toBe(segment);
      expect(config?.paths.ROOT).toBe(`/${segment}`);
    }
  });

  // Regression guard: the wholesale desktop nav and mobile sidebar used to
  // render retail-hardcoded links (`DESKTOP_NAV_ITEMS` / `MOBILE_NAV_ITEMS`
  // in store-header/constants.ts), so every /retail or /wholesale nav href
  // silently pointed at the wrong storefront for one of the two channels.
  it('never carries a nav href pointing at a different storefront segment', () => {
    for (const segment of STOREFRONT_SEGMENTS) {
      const config = getStorefrontChannel(segment);
      const otherSegments = STOREFRONT_SEGMENTS.filter((s) => s !== segment);

      const allHrefs = [
        ...(config?.header.navItems ?? []),
        ...(config?.header.mobileNavItems ?? []),
      ].map((item) => item.href);

      for (const href of allHrefs) {
        for (const other of otherSegments) {
          expect(href.startsWith(`/${other}`)).toBe(false);
        }
      }
    }
  });
});

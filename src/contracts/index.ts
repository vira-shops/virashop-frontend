import { bannersContracts } from './endpoints/banners';
import { brandsContracts } from './endpoints/brands';
import { citiesContracts } from './endpoints/cities';
import { postsContracts } from './endpoints/posts';
import { storefrontsContracts } from './endpoints/storefronts';
import { storiesContracts } from './endpoints/stories';

export * from './common';

/** Central contracts registry — `api(namespace, endpoint)` looks entries up here. */
export const contracts = {
  ...bannersContracts,
  ...brandsContracts,
  ...citiesContracts,
  ...postsContracts,
  ...storefrontsContracts,
  ...storiesContracts,
} as const;

import { authContracts } from './endpoints/auth';
import { bannersContracts } from './endpoints/banners';
import { brandsContracts } from './endpoints/brands';
import { categoriesContracts } from './endpoints/categories';
import { citiesContracts } from './endpoints/cities';
import { postsContracts } from './endpoints/posts';
import { storefrontsContracts } from './endpoints/storefronts';
import { storiesContracts } from './endpoints/stories';

export * from './common';

/** Central contracts registry — `api(namespace, endpoint)` looks entries up here. */
export const contracts = {
  ...authContracts,
  ...bannersContracts,
  ...brandsContracts,
  ...categoriesContracts,
  ...citiesContracts,
  ...postsContracts,
  ...storefrontsContracts,
  ...storiesContracts,
} as const;

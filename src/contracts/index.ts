import { authContracts } from './endpoints/auth';
import { bannersContracts } from './endpoints/banners';
import { brandsContracts } from './endpoints/brands';
import { categoriesContracts } from './endpoints/categories';
import { citiesContracts } from './endpoints/cities';
import { postsContracts } from './endpoints/posts';
import { productsContracts } from './endpoints/products';
import { searchContracts } from './endpoints/search';
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
  ...productsContracts,
  ...searchContracts,
  ...storefrontsContracts,
  ...storiesContracts,
} as const;

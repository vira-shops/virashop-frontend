<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Virashop Frontend

Next.js 16 (App Router) · React 19 · RTL Persian e-commerce · pnpm

Three page surfaces, two storefront themes:

- **Home landing** (`/`) — shared hero + landing sections — default theme
- **Retail storefront** (`/retail`) — amber primary (`#FFAC00` base) — `retail-layout` sets `data-theme="retail"`
- **Wholesale storefront** (`/wholesale`) — teal primary (`#00ACAC` base) — `wholesale-layout` sets `data-theme="wholesale"`
- Shared palette (blue, gray, yellow, white/black, warnings) is used across the whole project.

## Commands

```bash
pnpm dev            # next dev (port 3000)
pnpm build          # production build
pnpm lint           # eslint
pnpm test:unit      # jest
pnpm dev:storybook  # storybook on port 6006
pnpm test:e2e       # playwright
```

After ANY change run, and keep green:

1. `npx tsc --noEmit`
2. `pnpm lint`
3. `npx jest`

## Architecture (feature-based)

```
src/
  app/                   # pages: page.tsx (home), retail/page.tsx, wholesale/page.tsx,
                         #  auth/login/page.tsx, auth/register/page.tsx
  routes/paths.ts        # centralized route constants (static + dynamic functions)
  config/metadata.ts     # centralized metadata (root template, home/retail/wholesale/auth)
  config/env.ts          # environment variables
  features/
    landing/             # shared landing sections (hero, offer-banner, partner-brands, tech-news, …)
    retail/              # retail storefront sections (retail-hero, promo-slider, weekly-offer,
                         #  promo-banners, best-sellers, big-offer, popular-brands)
    wholesale/           # wholesale storefront sections (wholesale-hero, category-showcase,
                         #  special-offers, partner-brands, best-sellers, features-grid)
    auth/                # auth wizard + role/otp/credentials/booth forms, local hooks/store/types/validation
  hooks/                 # shared React Query hooks + query-keys (cities, stories, categories,
                         #  banners, brands, posts, storefronts) — the ONLY cross-feature data layer;
                         #  auth/ subfolder holds auth-domain server hooks (consumed by features/auth
                         #  AND providers/auth-provider, so they stay app-level, not feature-owned)
  components/
    ui/                  # design system (badge, button, card, carousel, otp-input, select, skeleton,
                         #  tabs, text-input, typography, uploader)
    shared/              # modal, story, breadcrumb, header/footer primitives, icons, form,
                         #  hero primitives (HeroSearchBar, CitySelect, StoryBar), category-card,
                         #  category-showcase, brands-marquee, campaign-banner, image-carousel,
                         #  product-card, card-section, news-card
    feedback/            # toast
    layout/
      home/              # LandingHeader + Footer (thin re-export of shared SiteFooter)
      store/
        store-header/    # StoreHeader (desktop + mobile sidebar) + constants.ts + retail/wholesale configs
        store-footer/    # StoreFooter (pre-section + SiteFooter) + retail/wholesale configs
  contracts/             # API contracts (see Contracts section below)
  connections/           # transport layer used by contracts (see Connections section below)
  providers/             # app-level React providers (QueryClient, auth session, etc.)
  validations/           # shared primitive zod schemas (IDSchema, EmailSchema, etc.)
  layouts/               # home-layout, retail-layout, wholesale-layout, auth-layout, root-layout
  styles/
    tailwind.css         # single Tailwind v4 theme source (NO tailwind.config file)
    components/ui/styles.css  # imports every ui component's css
  utils/ui.ts            # cn() = clsx + tailwind-merge
```

Layouts are thin: `StoreHeader config` + feature sections + `StoreFooter config`.
Section layouts set the theme once with `<div data-theme="retail">` (or `"wholesale"`); everything inside uses `primary` tokens.

### Feature anatomy

Every feature follows the same anatomy: a `components/index.ts` barrel, a
feature barrel (`index.ts`) that re-exports the components barrel + feature
constants, and data constants at the level where they are used
(`features/auth` additionally has `hooks/`, `store/`, `types/`,
`validation/`). Retail and wholesale are flat section folders; landing
sections keep their section-local `constants.ts` where the data belongs to a
single section:

```
src/features/retail/
├── components/
│   ├── index.ts                 # components barrel (mirrors features/auth)
│   ├── retail-hero/            # composed section (hero: search + stories + category tiles)
│   ├── promo-slider/           # thin section feeding the shared ImageCarousel
│   ├── weekly-offer/           # wires API data into the shared CampaignBanner
│   ├── popular-brands/         # TV-ticker marquee (data in constants)
│   ├── best-sellers/           # thin wrapper scoping the shared BestSellersSection
│   └── …
├── constants.ts                # titles, labels, campaign deadlines, brand lists
└── index.ts                    # feature barrel: `export * from './components'` + constants
```

Sections that are byte-for-byte the same across storefronts MUST NOT be
copied — promote them to `components/shared` and let each feature wrap them
with its own scope (see `BestSellersSection` / `BigOfferSection`, wrapped by
landing, retail and wholesale).

**No mock data in `app/` pages or in `components/`.** A page imports a feature
section; the feature owns data fetching via React Query hooks or feature
constants. Feature components import shared components — never the reverse.
**No feature may use another feature's hooks.** Cross-feature DATA access goes
through the shared hooks in `src/hooks` (`@/hooks` — the single data layer
every feature reads from); never import another feature's section components.
**Contract mocks are the single source of mock payloads**: components that
still render static data read the endpoint's exported mock (e.g.
`POPULAR_CATEGORIES_MOCK` from `@/contracts/endpoints/categories`) — never a
local copy; tests import the same symbols. Static UI lists that are NOT API
data (nav items, section titles) live in a `constants.ts` beside the layout
(e.g. `store-header/constants.ts`) and build hrefs via `PATHS`.

## Storefront Header & Footer (config-driven)

Both the header and the footer are shared structural components — retail and
wholesale differ **only by config**. Swap configs, not components.

```
components/shared/header/    # Logo, SearchBar, UserActions, MobileMenu,
                             # CategoriesDropdown, LocationBadge, types
components/shared/footer/    # SiteFooter (brand band + trust badges + copyright)
components/layout/store/
  store-header/              # StoreHeader (desktop + mobile sidebar accordion)
    ├── retail-config.tsx    #   retailConfig      (StoreHeaderConfig)
    ├── wholesale-config.tsx #   wholesaleConfig   (StoreHeaderConfig)
  store-footer/              # StoreFooter (pre-section + SiteFooter)
    ├── retail-config.ts     #   retailStoreFooterConfig    (StoreFooterConfig)
    └── wholesale-config.ts  #   wholesaleStoreFooterConfig (StoreFooterConfig)
```

- `StoreHeaderConfig`: logo, brandName, navItems, userActions,
  optional `channel` (`'RETAIL' | 'WHOLESALE'` — carried into the auth wizard
  as `?channel=`) and optional `location.city` (fallback city for the header
  badge until the location endpoint is wired)
- Header nav lists and section titles live in `store-header/constants.ts`
  (they are static UI config, not test fixtures)
- `StoreFooterConfig`: features (icon tiles), link columns, contact
  (phone + socials), optional `scrollTargetId` (footer ribbon scroll target —
  omit to hide the ribbon; e.g. wholesale)
- All footer items center on mobile and align by the grid rhythm on desktop
  (first cell hugs start, middle cells centered, last hugs end)
- The mobile sidebar is a 2-level accordion driven by the SAME category data
  tree as the desktop mega menu (see Contracts below)

## Contracts — API contracts (single source of truth)

Every backend endpoint is described as a typed contract. Pages and hooks
**never hardcode paths, methods, or response shapes** — they go through the
contracts layer so a wire change is a one-file edit.

```
src/contracts/
├── common/                       # reusable request/response schemas
├── endpoints/
│   ├── auth/                      # session, otp, signup, seller booth
│   ├── banners/                  # big offers + best sellers (identical shape)
│   ├── brands/                   # partner brands
│   ├── categories/               # popular categories + 3-level category tree
│   ├── cities/                   # city select
│   ├── posts/                    # tech news
│   ├── storefronts/              # storefront showcase
│   └── stories/                  # active stories
└── index.ts                      # central registry — spreads every endpoint
```

### Popular categories — 3-level tree

`PopularCategorySchema` powers the desktop mega menu AND the mobile sidebar
accordion from ONE payload:

```
category (مواد غذایی)
└── subcategories[]        (سرگروه: کالای اساسی، روغن و چاشنی، …)
    └── items[]            (زیرمجموعه: نان، ماکارونی، …)
```

- Desktop mega menu: active category → subcategory groups in a 4-column grid
- Mobile sidebar: category accordion → group accordion → item links
- `products[]` remains on the payload for other consumers

### Endpoint contract anatomy

```ts
export const categoriesContracts = {
  categories: {
    getPopular: {
      method: 'GET',
      path: '/categories/popular',
      request: EmptyRequestSchema,
      response: apiResponseWrapper(PopularCategoriesResponseSchema),
      mockData: mockDataWrapper(POPULAR_CATEGORIES_MOCK),
    },
  },
} as const satisfies Contracts;
```

- `mockData` lives inside `contract.ts`; large arrays stay at the top of the
  same file; mocks that need route strings build them with `PATHS.*` builders
  (see the categories mock), never hardcoded literals
- The contract object MUST end with `as const satisfies Contracts`

### Central registry

`src/contracts/index.ts` spreads every endpoint's contract object. To add a
new endpoint: create `endpoints/<feature>/{schemas,contract,index}.ts`, spread
it into `contracts`, and the fetcher auto-picks it up.

## Connections — transport layer

The fetcher is the only place that knows about `fetch`, base URLs, mock
fallback, and the `Contracts` shape.

```ts
const response = await api('cities', 'getList');
if (response.status === 200) {
  // response.data is already narrowed to City[]
}
```

- Omitting `useMock` resolves the contract's `mockData` when
  `NEXT_PUBLIC_API_BASE_URL` is unset — wiring the API later is a one-env-var
  change. Pass `useMock: true` only to force mocks (Storybook, unit tests).
- `pathParams` substitutes `{name}` segments; `query` appends a query string;
  `body` is JSON-serialized automatically.
- `auth-token.ts` is a registry the auth feature fills at module load
  (`setAuthTokenProvider`) so the fetcher can attach `Authorization` without
  importing feature stores — dependency direction stays features → connections.
- `next.config.ts` proxies API calls via a `/backend/:path*` rewrite (the API
  sends no CORS headers); API paths have no `/api` prefix.

## React Query integration

Shared data hooks live in `src/hooks/` — one file per query, with a
centralized `query-keys.ts` (tuple form) for hierarchical invalidation:

```ts
// src/hooks/use-cities.ts
export const useCities = (): UseQueryResult<City[], FailedApiResponse> =>
  useQuery<City[], FailedApiResponse>({
    queryKey: queryKeys.citiesList(),
    queryFn: async () => { … },
  });
```

- Every feature imports these via `@/hooks` — no feature owns its own
  data-fetching hooks, and no feature may import hooks from another feature.
- A hook that is only ever used by ONE feature may live in that feature
  folder, but move it to `src/hooks` the moment a second consumer appears.

## Validations — shared primitive schemas

`src/validations/primitives.ts` exposes reusable zod schemas (`IDSchema`,
`UUIDSchema`, `SlugSchema`, `EmailSchema`, `MobileSchema`,
`PaginationQuerySchema`). Anything used by more than one contract belongs
here; otherwise keep it in the endpoint's own `schemas.ts`.

## Design System — Tailwind v4 CSS-first

All tokens live in `src/styles/tailwind.css` via `@theme` / `@theme inline`
blocks.

### Three-layer color theming

1. **Raw palettes** in `:root` — single source of truth:
   `--wholesale-50/500/600/900` (teal) and `--retail-50/500/600/900` (amber)
2. **Static scales** registered in `@theme inline`: `retail-*` and `wholesale-*`.
   Use them only on pages that show BOTH palettes at once (the main landing).
3. **Themed aliases**: `[data-theme='retail']` / `[data-theme='wholesale']`
   remap `--primary-50/500/600/900`. Default (`:root`) = wholesale.

**CRITICAL — never chain theme tokens.** An alias must point to a raw variable,
not to another theme token:

```css
/* WRONG — resolves at :root, breaks data-theme scoping */
--color-primary: var(--color-primary-500);
/* RIGHT — resolves per element, theme-aware */
--color-primary: var(--primary-500);
```

### Palette rules

- **Canonical scales (design system v2)** are registered in full in
  `tailwind.css`: `primary-50..950`, `secondary-50..950`, `neutral-0..900`,
  `success/info/warning/error-50..900`.
- **Wholesale/retail palettes remain the storefront sources**: the themed
  steps they define re-point `--primary-*` inside `[data-theme]` sections; the
  remaining primary steps come from the v2 scale. Never hardcode a storefront
  hex — use `primary-*` inside themed sections and `retail-*/wholesale-*` only
  on the shared landing.
- Legacy aliases (`gray-*`, `blue-*`, `yellow-*`, `warning-red/green/blue`,
  `white`, `black`) still exist for older components — prefer the canonical
  scales in new code. NOTE: the legacy aliases carry bespoke hex values that do
  NOT match the canonical scales (e.g. `gray-700 #757575` ≠ `neutral-700
  #27272a`), so migrating a component off them changes rendered colors — treat
  it as a design decision with visual QA, never a mechanical rename.
- NOTE: the retail palette has no `700` step, so `[data-theme='retail']` leaves
  `--primary-700` pointing at the wholesale value. Avoid `primary-700` on
  retail-themed pages until a real retail hex is decided with design.
- Typography tokens: `--text-display-1..3`, `--text-h1..h6`, `--text-body-1..15`
  (design system v2 — font weights ride on the tokens) plus legacy roles
  (`--text-body-xl/md/sm/xs`, `--text-caption-lg/md`, `--text-overline-lg/sm`)
  and the base scale `--text-xs..xxl`, each with a paired `--line-height`.
- **Spacing** uses the design-system scale via `--spacing-1..22`
  (4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 72, 80, 88, 96, 104,
  128, 144, 184 px); numeric utilities `p-1..22`, `gap-*`, `w-*`, … resolve to
  these values, and numbers outside the list keep Tailwind's 4px multiplier
  (e.g. `p-0.5`, `w-56.5`).
- **Radius** has the numeric scale `--radius-0..11`
  (0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 32 px → `rounded-1..11`) plus the
  legacy named tokens (`--radius-xxs..4xl`) and `rounded-full`.
- Gradients are custom utilities: `gradient-sky|violet|fuchsia|purple|rose|coral|orange|yellow|green`
  (135deg).

### Custom utilities & animations

- `no-scrollbar` — hides the scrollbar while keeping an element scrollable
  (product rows inside banners).
- `animate-marquee` — TV-ticker marquee (`marquee 40s linear infinite`).
  Track pattern: duplicate the item list, `flex w-max` in an
  `overflow-hidden` LTR wrapper, each tile carries its own `mx-2` so the
  `-50%` shift equals exactly one copy → seamless loop, uniform speed.
- `animate-wiggle` — gentle ±1.5deg wobble (3s ease-in-out infinite) for the
  wholesale brands title banner.
- Respect reduced motion: `motion-reduce:animate-none` on animated tracks.

### Responsiveness policy

- **UI primitives stay breakpoint-neutral** — `components/ui/*` and
  `components/shared/*` never hardcode `sm:`/`md:` breakpoints (device-aware
  exceptions: modal bottom-sheet via `max-md:`, story viewer sizing, carousel
  embla breakpoints).
- **Composition owns breakpoints** — features and layouts (`app/`, `features/`,
  header/footer) decide the responsive layout.
- **Type sizes come from the design-system scale** — heading tokens
  (`--text-h1..h6`) are fixed per the v2 spec (28→14px @160%); never fix font
  sizes at usage sites.
- **Touch targets** — the two smallest button sizes grow to ~44px height on
  coarse pointers via the `pointer: coarse` block in `button.css`; keep that
  override in sync when adding new sizes.

## UI Component Conventions

Every `src/components/ui/<component>/` ships six files:

```
types.d.ts   component.tsx   component.css   index.ts   <c>.stories.tsx   <c>.test.tsx
```

- **CSS composition pattern** (see button.css): base class + color/variant/state
  classes in `@layer components` (`.button-primary.button-fill`, …), sizes and
  icon-sizes as `@utility` (`button-text-xs..xxl`, `button-icon-xs..xxl`),
  extras like `button-fullWidth` / `button-fullRounded`.
- The TSX only composes class names through **static string maps**
  (`Record<Props, string>`). Never build class names with template literals —
  Tailwind's scanner must see literal class strings.
- `cn()` from `@/utils/ui` merges classes. No `class-variance-authority`,
  no Radix `Slot` (not installed) — `asChild` is done via `cloneElement`.
- **Style overrides**: every multi-part component (`Card`, `ProductCard`,
  `CardSection`, …) exposes a `*ClassName` escape hatch per part, merged last
  via `cn()`. Tailwind's `utilities` layer outranks `@layer components`, so a
  passed utility overrides the part's baked-in class without editing the
  component. Never hardcode style edits inside a component to restyle one
  usage — pass the override instead.
- **RTL**: `<html dir="rtl">` — the first DOM child renders on the right.
  Icon props are named by visual side (`rightIcon` is rendered first).
- Stories must cover all variants × colors × sizes × states (incl. disabled);
  tests use Testing Library + `@testing-library/jest-dom` and must pass.
- Dark mode exists (`.dark` class + `@custom-variant dark`) but is not
  theme-aware yet.

## Shared components (beyond ui/)

Shared sections used by more than one storefront live in
`components/shared/` and ship stories + tests:

- **`CampaignBanner`** (`campaign-banner/`) — full-width primary-bg banner:
  horizontally scrollable product card row (~72% width, embla Carousel) +
  title/subtitle/live countdown (`useCountdown`, Persian digits) + view-all.
  Content-agnostic — title, subtitle, `endsAt`, and `items` come from the
  caller.
- **`ImageCarousel`** (`image-carousel/`) — pass images, get one full-bleed
  slide per image; white dot navigation overlaid on the image, no arrows,
  optional autoplay. Viewport padding zeroed so neighboring slides never leak.
- **`CategoryCard`** — white square tile, image centered, title outside below;
  `moreLabel` renders a "…more" overlay (truncated mobile rows).
- **`CategoryShowcase`** (`category-showcase/`) — gradient icon-tile showcase:
  title/subtitle header, optional detached first tile with a dashed strip
  (`soonLabel`, e.g. «بزودی»), responsive grid of gradient tiles. Icons come
  in via `iconMap` + `fallbackIcon`; loading skeleton built in. Content-agnostic.
- **`BrandsMarquee`** (`brands-marquee/`) — TV-ticker brand-logo marquee:
  logos distributed round-robin across rows (`rowCount`, default 3), uniform
  linear speed, center CTA (`ctaLabel`, link via `ctaHref`). Brand glow
  shadows are caller-side styling via `ctaClassName`.
- **`SiteFooter`** (`footer/`) — site-wide blue brand band + trust badges +
  copyright; composed INSIDE `StoreFooter` for storefronts and rendered
  directly by the home layout.
- **Hero primitives** (`hero/`) — the search/stories/city trio every storefront
  hero composes: `HeroSearchBar` (controlled/uncontrolled search input with
  `placeholder` support), `CitySelect` (searchable select over `useCities`
  data, `aria-label` with «انتخاب شهر» default), `StoryBar` +
  `StoryBarSkeleton` (story triggers over shared `StoryTrigger`). They live in
  shared because landing, retail AND wholesale heroes consume them.
- **`Form`** (`form/`) — RHF-wired field primitives (`Form`, `FormInput`,
  `FormSelect`) used by the auth wizard forms.
- **`BestSellersSection`** / **`BigOfferSection`** (`best-sellers/`,
  `big-offer/`) — CardSection sections wired to their shared React Query
  hook; the caller scopes the view-all `link` and spacing/background via
  props. Wrapped by the landing, retail and wholesale features.
- `CardSection` / `ProductCard` — product card sections on embla.

## Icons

- Icons are generated from `src/assets/icons` into
  `src/components/shared/icons` by `pnpm generate:icons` (add `--force` to
  overwrite existing files).
- Import icons ONLY via the `@icons` alias:
  `import { SearchIcon } from '@icons';` — any other path into
  `src/components/shared/icons` is blocked by ESLint.
- Generated icons use `currentColor` — recolor them with `text-*` utilities,
  never by editing the generated files.

## Import Conventions

- **Always use barrel imports** for `ui/` and `shared/`:

```ts
// ✅ Correct
import { Button, Typography } from '@/components/ui';
import { Modal, Breadcrumb } from '@/components/shared';
import type { StoreHeaderConfig } from '@/components/shared';

// ❌ Wrong — deep path imports
import { Button } from '@/components/ui/button';
import { StoreHeaderConfig } from '@/components/shared/header/types';
```

- The **only exceptions** are internal cross-references within the same
  directory (e.g., `typography.tsx` importing `ColorVariant` from
  `@/components/ui/types`) and same-tree shared primitives (e.g.
  `campaign-banner` importing `@/components/shared/product-card` — mirrors
  `card-section`).
- Icons are always imported via `@icons` — never via barrel or deep paths.
- **Feature-internal imports use `@/features/<feature>/…` aliases** — the
  pre-commit hook REJECTS relative parent imports (`../../`) in staged files.
  Never import a feature section from another feature's folder; cross-feature
  data access goes through the shared hooks (`@/hooks` — the single data layer
  every feature reads from). Shared components also import hooks from `@/hooks`,
  never from another feature.

## Routing & Metadata

- All routes are defined in `src/routes/paths.ts` — never hardcode route
  strings. Supports static strings (`PATHS.ABOUT`) and dynamic functions
  (`PATHS.WHOLESALE.PRODUCT(slug)`).
- Metadata is centralized in `src/config/metadata.ts`:
  - Root metadata with title template: `%s | ویراشاپ`
  - Section-specific: `homeMetadata`, `retailMetadata`, `wholesaleMetadata`,
    `loginMetadata`, `registerMetadata`
  - Per-page shorthand: `aboutMetadata`, `contactMetadata`, etc.
- Each `page.tsx` exports `metadata` from the config.

## Storefront pages

Page files are thin — they compose feature sections inside a layout:

```tsx
<RetailLayout>          {/* data-theme="retail" + StoreHeader/Footer */}
  <RetailHero />        {/* hero: search + stories + category tiles */}
  <PromoSlider />       {/* banner image carousel */}
  <WeeklyOffers />      {/* CampaignBanner with countdown */}
  <PromoBanners />
  <BestSellers />
  <BigOffer />
  <PopularBrands />     {/* TV-ticker brand marquee */}
</RetailLayout>
```

Wholesale mirrors this with its own sections (`WholesaleHero` with city
select, `OfferBanner` ×2, gradient `CategoryShowcase`, `SpecialOffers`,
`PartnerBrandsStrip` 3-row marquee, `BestSellers`, `FeaturesGrid`). The page
never imports shared components directly — only feature sections.

## Workflow Rules

- Never commit unless explicitly asked. Commits go through husky +
  commitlint (conventional) + lint-staged (prettier + eslint).
- The pre-commit hook REJECTS relative parent imports (`../../`) in staged
  TS/TSX files — use `@/` aliases. It also lints each staged file with
  `--max-warnings=0` but only real TS/TSX sources under `src/` (generated
  icons, husky files, and assets are skipped — see `.husky/pre-commit.js`).
- Keep the `nextjs-agent-rules` block at the top of this file intact.
- UI copy is Persian (فارسی); code, identifiers, and comments are English.
- Package manager is **pnpm** — do not use npm/yarn lockfiles.
- After code changes keep the graphify knowledge graph fresh:
  `graphify update .` (no API cost) — see `graphify-out/GRAPH_REPORT.md` for
  the built-from commit hash.

# Virashop Frontend

RTL Persian e-commerce frontend — one codebase, two storefronts:

- **Wholesale** (عمده) — teal primary (`#00ACAC`), the default theme
- **Retail** (خرده) — amber primary (`#FFAC00`), enabled with `data-theme="retail"`
- A shared landing page (`/`) that shows both palettes side by side

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** (CSS-first
config), **React Query**, **Zustand**, **React Hook Form + Zod**, and **Leaflet** for
the address map picker.

## Getting Started

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

### Environment

| Variable                   | Purpose                                                                                                                                                                                                                       |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL the fetcher calls — set it to `/backend` to go through the Next.js proxy. **Leave it unset to run on the contract mocks** (no backend needed) — endpoints without `mockData`, such as auth, still need the real API. |
| `API_ORIGIN`               | Backend origin the `/backend/:path*` rewrite forwards to (see [`next.config.ts`](next.config.ts)). The API sends no CORS headers, so the browser always goes through this proxy.                                              |

API paths have no `/api` prefix (e.g. `/auth/otp/verify`).

## Commands

| Command               | Description                   |
| --------------------- | ----------------------------- |
| `pnpm dev`            | Dev server (port 3000)        |
| `pnpm build`          | Production build              |
| `pnpm start`          | Serve the production build    |
| `pnpm lint`           | ESLint                        |
| `pnpm format`         | Prettier (write)              |
| `pnpm test:unit`      | Jest unit tests               |
| `pnpm test:e2e`       | Playwright end-to-end tests   |
| `pnpm dev:storybook`  | Storybook (port 6006)         |
| `pnpm generate:icons` | Regenerate `@icons` from SVGs |

Before pushing, keep these green: `npx tsc --noEmit`, `pnpm lint`, `npx jest`.

## Routes

Every route is built from [`src/routes/paths.ts`](src/routes/paths.ts) (`PATHS.*`) —
never hardcode a path. `{store}` is `retail` or `wholesale`.

| Route                               | Page                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `/`                                 | Shared landing (both storefronts)                                                                                   |
| `/{store}`                          | Storefront landing                                                                                                  |
| `/{store}/category/[slug]`          | Category landing («shop»): hero tiles, banners, carousels                                                           |
| `/{store}/category/[slug]/products` | Product listing — filters, sort, pagination                                                                         |
| `/{store}/search`                   | Search results                                                                                                      |
| `/{store}/[slug]`                   | Product page; `?seller=<id>` opens one seller's offer                                                               |
| `/cart`                             | Checkout wizard: invoices → cart → shipping → payment                                                               |
| `/auth/login`, `/auth/register`     | OTP auth wizard (`?channel=`, `?returnTo=`)                                                                         |
| `/dashboard/[role]/…`               | Buyer dashboard (`retail-buyer` / `wholesale-buyer`): orders, favorites, notifications, reviews, profile, addresses |

## Theming & Design Tokens

All tokens live in [`src/styles/tailwind.css`](src/styles/tailwind.css) — there is
no `tailwind.config` file. Each storefront sets its theme once; components only
consume themed tokens:

```tsx
<div data-theme="retail">
  {/* every primary-* token inside renders in amber */}
  <Button variant="fill">خرده</Button>
</div>
```

- `primary-*` — the active storefront colour.
- `--surface-tint` — pale storefront wash for bands such as the footer and filter
  cards (cream on retail, blue on wholesale/landing): `bg-(--surface-tint)`.
- `retail-*` / `wholesale-*` — explicit scales, only for pages that show both
  palettes at once (the main landing).
- Layout follows the Figma grid: `.container` is a **1224px** column at desktop
  (108px margins at 1440) with **16px** gutters on phones.
- Spacing (`p-1`…`p-22`) and radius (`rounded-1`…`rounded-11`) use the design
  scales, not Tailwind's defaults — see the token file for the exact values.

Design source: the **ViraShops-UI** Figma file. See [`AGENTS.md`](AGENTS.md) for the
full design-system, architecture and contribution rules.

## Project Structure

```
src/
  app/             # App Router pages (thin — compose feature sections)
  features/        # landing, storefront, catalog, search, product, cart,
                   # auth, buyer-dashboard
  components/
    ui/            # design system (button, select, tabs, …)
    shared/        # cross-feature components (header, footer, hero, cards, …)
    layout/        # store / home / dashboard shells
  hooks/           # shared React Query hooks + query-keys (single data layer)
  contracts/       # typed API contracts: endpoints, zod schemas, mock payloads
  connections/     # transport (fetcher, auth-token registry, geocoding)
  layouts/         # root, home, retail, wholesale, auth, dashboard layouts
  config/          # env, fonts, metadata, per-storefront config
  routes/          # centralized route constants (PATHS)
  providers/       # app-level providers (React Query, auth session)
  validations/     # shared primitive zod schemas
  styles/          # Tailwind v4 theme + component css imports
  utils/           # cn() and helpers
```

Data rules in short: pages never hold data; features fetch through `@/hooks`; every
endpoint is a contract in `src/contracts` whose `mockData` is the single source of
mock payloads (used by tests and by the mock fallback).

## Git Workflow

- **Branches:** work on `dev`; `main` is the release branch — don't commit to it
  directly. Short-lived feature branches are deleted once merged into `dev`.
- **Hooks:** husky → lint-staged (prettier + eslint on staged files, zero
  warnings) → commitlint. Relative parent imports (`../../`) are rejected — use
  `@/` aliases.
- **Commit messages:** conventional commits (`feat`, `fix`, `refactor`, `style`,
  `perf`, `test`, `docs`, `build`, `ops`, `chore`), and the subject must start
  with one of: `add`, `change`, `update`, `remove`, `fix`, `upgrade`,
  `implement`, `refactor`, `revert`, `resolve`, `enhance`.

  ```
  fix(cart): fix the delivery-day strip overflowing the shipping card
  ```

- Package manager is **pnpm** — don't generate npm/yarn lockfiles.

# Virashop Frontend

RTL Persian e-commerce frontend — one codebase, two storefronts:

- **Wholesale** (عمده) — teal primary (`#00ACAC`), the default theme
- **Retail** (خرده) — amber primary (`#FFAC00`), enabled with `data-theme="retail"`
- A shared landing page that uses both palettes side by side

Built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4** (CSS-first config).

## Getting Started

```bash
pnpm install
pnpm dev            # start dev server on http://localhost:3000
```

## Commands

| Command              | Description                 |
| -------------------- | --------------------------- |
| `pnpm dev`           | Dev server (port 3000)      |
| `pnpm build`         | Production build            |
| `pnpm lint`          | ESLint                      |
| `pnpm test:unit`     | Jest unit tests             |
| `pnpm dev:storybook` | Storybook (port 6006)       |
| `pnpm test:e2e`      | Playwright end-to-end tests |
| `pnpm format`        | Prettier (write)            |

## Theming

Tailwind v4 with CSS-first config — all design tokens live in
[`src/styles/tailwind.css`](src/styles/tailwind.css). Each storefront sets its
theme once; components only consume `primary-*` tokens:

```tsx
<div data-theme="retail">
  {/* every button/typography inside renders in amber */}
  <Button variant="fill">خرده</Button>
</div>
```

Pages that show both palettes at once (the main landing) use the explicit
`retail-*` / `wholesale-*` utility scales instead.

See [`AGENTS.md`](AGENTS.md) for the full design-system and contribution rules.

## Project Structure

```
src/
  app/             # Next.js App Router pages
  features/        # domain sections (landing, retail, wholesale, auth)
  components/      # ui/ design system, shared/ primitives, layout/ shells
  hooks/           # shared React Query hooks + query-keys (single data layer)
  contracts/       # typed API contracts (endpoints, schemas, mock data)
  connections/     # transport layer (fetcher + auth token registry)
  layouts/         # root layout (rtl, fa) + section layouts
  providers/       # app-level providers (React Query, auth session)
  validations/     # shared primitive zod schemas
  config/          # env, fonts, metadata
  routes/          # centralized route constants (PATHS)
  styles/          # Tailwind v4 theme + component css imports
  utils/           # cn() and helpers
```

## Git Hooks

Commits run husky → commitlint (conventional commits) → lint-staged
(prettier + eslint). Package manager is **pnpm** — please don't generate
npm/yarn lockfiles.

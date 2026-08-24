<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Virashop Frontend

Next.js 16 (App Router) · React 19 · RTL Persian e-commerce · pnpm

Two storefronts share one landing page:

- **Wholesale** (عمده) — teal primary (`#00ACAC` base) — default theme
- **Retail** (خرده) — amber primary (`#FFAC00` base) — opt-in via `data-theme="retail"`
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
3. `npx jest` (unit tests)

## Architecture (feature-based)

```
src/
  features/<feature>/   # domain components — compose from ui/, never the reverse
  components/ui/        # design system (button, typography, shared types.d.ts)
  styles/tailwind.css   # single Tailwind v4 theme source (NO tailwind.config file)
  styles/components/ui/styles.css  # imports every ui component's css
  layouts/              # root-layout (html dir=rtl lang=fa) + section layouts
  utils/ui.ts           # cn() = clsx + tailwind-merge
```

Section layouts set the theme once with `<div data-theme="retail">` (or `"wholesale"`); everything inside uses `primary` tokens.

## Design System — Tailwind v4 CSS-first

All tokens live in `src/styles/tailwind.css` via `@theme` / `@theme inline` blocks.

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

- Only the exact brand hexes exist — never invent intermediate steps.
- Scale steps in use: `50` (light tint), `500` (base), `600` (hover), `900` (darkest).
- Shared colors: `blue-50/100/200/300/900`, `gray-50/100/300/700`,
  `yellow-50/100`, `white #FFFFFF`, `black #222222`,
  `warning-red #FF6464`, `warning-green #35CB98`, `warning-blue #61AFFD`.
- Typography tokens: `--text-h1..h6`, `--text-body-xl/md/sm/xs`,
  `--text-caption-lg/md`, `--text-overline-lg/sm` — each with a paired
  `--line-height`. Base scale `--text-xs..xxl` also exists.
- Gradients are custom utilities: `gradient-sky|violet|fuchsia|purple|rose|coral|orange|yellow|green` (135deg).

## UI Component Conventions

Every `src/components/ui/<component>/` ships six files:

```
types.d.ts   component.tsx   component.css   index.ts   <c>.stories.tsx   <c>.test.tsx
```

- **CSS composition pattern** (see button.css): base class + color/variant/state
  classes in `@layer components` (`.button-primary.button-fill`,
  `.button-*.button-disabled`), sizes/icon-sizes as `@utility`
  (`button-text-xs..xxl`, `button-icon-xs..xxl`), extras like
  `button-fullWidth` / `button-fullRounded`.
- The TSX only composes class names through **static string maps**
  (`Record<Props, string>`). Never build class names with template literals —
  Tailwind's scanner must see literal class strings.
- `cn()` from `@/utils/ui` merges classes. No `class-variance-authority`,
  no Radix `Slot` (not installed) — `asChild` is done via `cloneElement`.
- **RTL**: `<html dir="rtl">` — the first DOM child renders on the right.
  Icon props are named by visual side (`rightIcon` is rendered first).
- Stories must cover all variants × colors × sizes × states (incl. disabled);
  tests use Testing Library + `@testing-library/jest-dom` and must pass.
- Dark mode exists (`.dark` class + `@custom-variant dark`) but is not
  theme-aware yet.

## Icons

- Icons are generated from `src/assets/icons` into `src/components/shared/icons`
  by `pnpm generate:icons` (add `--force` to overwrite existing files).
- Import icons ONLY via the `@icons` alias:
  `import { SearchIcon } from '@icons';` — any other path into
  `src/components/shared/icons` is blocked by ESLint.
- Generated icons use `currentColor` — recolor them with `text-*` utilities,
  never by editing the generated files.

## Workflow Rules

- Never commit unless explicitly asked. Commits go through husky +
  commitlint (conventional) + lint-staged (prettier + eslint).
- Keep the `nextjs-agent-rules` block at the top of this file intact.
- UI copy is Persian (فارسی); code, identifiers, and comments are English.
- Package manager is **pnpm** — do not use npm/yarn lockfiles.

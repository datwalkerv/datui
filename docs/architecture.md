# datui architecture

## Repository

```
packages/datui        the published library
  src/components/<Name>/{<Name>.tsx, <Name>.test.tsx, index.ts}
  src/hooks/          shared public hooks (useControllableState, useMediaQuery, …)
  src/lib/            internal helpers (cn, spacing scale, portal, keyboard)
  src/styles/         tokens.css (raw --dt-* values), theme.css (Tailwind mapping), index.css (entry)
  src/index.ts        explicit public exports — nothing is exported implicitly
  test/               vitest setup + axe helper
apps/docs             Next.js documentation site
tests/e2e             Playwright suites run against the docs site
tests/consumer        standalone Next.js app that installs the packed tarball
scripts/              repo tooling (inventory check)
```

## Styling

- Tailwind v4 utilities only. Colors, radii, shadows, heights, type sizes, motion and z-index come from tokens
  (`bg-primary`, `rounded-lg`, `h-control-m`, `text-title-2`, `duration-normal`, `z-modal`). No hex values or
  magic pixel numbers in components; if a value is missing, add a token.
- Raw values live in `--dt-*` custom properties (`tokens.css`); component-specific tokens live in
  `styles/groups/<group>.css`, each with light and dark values. Light is the default, dark is `[data-theme="dark"]`,
  compact density is `[data-density="compact"]` and shrinks control/cell heights. A custom theme is any selector
  that overrides `--dt-*` variables.
- `cn()` (`src/lib/utils.ts`) merges classes; it knows datui's type scale so `text-title-1 text-primary` survives.
- Variants use `class-variance-authority`. Export the `cva` function as `<name>Variants` when it is useful to consumers.
- Focus: `focus-visible:focus-ring`. Disabled: `disabled:opacity-(--dt-opacity-disabled)` / `aria-disabled:`.
- Motion uses `duration-*` tokens, which collapse to 0 under `prefers-reduced-motion`. JS-driven transitions check
  `useTransitionMotion()`.

## Component conventions

- `React.forwardRef` to the outermost DOM element; spread remaining props onto it; always accept `className`.
- Sizes: `size?: "s" | "m" | "l"`. Color intent: `appearance` (`accent | positive | negative | neutral | overlay`).
  Visual weight: `variant`. Don't invent a new prop name for a concept that already has one.
- Slots are props named `before`, `after`, `subtitle`, `extraSubtitle`, `caption`, `icon` (ReactNode).
- Controlled/uncontrolled pairs: `value`/`defaultValue`/`onChange(value)`, `open`/`defaultOpen`/`onOpenChange(open)`,
  `checked`/`defaultChecked`/`onCheckedChange(checked)`. Use `useControllableState`. Native inputs keep native `onChange(event)`.
- Interactive surfaces build on `Tappable` (hover/press/focus/disabled feedback) or `Clickable` (semantics only).
- Overlays portal through `Portal`/`usePortalContainer()` (`src/lib/portal.tsx`) so they inherit theme and density
  from `AppRoot`. Radix primitives receive that container via their `Portal container` prop.
- Icons come from `lucide-react`, sized with `size-icon-*` utilities, `aria-hidden`. Motion comes from the
  `dt-icon-*` classes in `styles/groups/icons.css` (draw, pop, turn, nudge, tilt), never from a JS animation library.
- Built-in strings (e.g. "Close", "Loading…") are props with English defaults so apps can localize them.
- Structural responsive behavior (sheet vs dialog, split layout) reads `useAdaptivity()`; pure visual changes use
  Tailwind breakpoints (`tablet:`, `desktop:`).
- Components must render on the server: no `window`/`document` access during render.

## Foundations

| Need | Package |
|---|---|
| Dialog, Popover, Tooltip, Menu, Select, Tabs, Accordion, Checkbox, Radio, Switch, Slider, Separator, Avatar | `radix-ui` |
| Focus scope | `@radix-ui/react-focus-scope` |
| Icons | `lucide-react` |
| Calendar grid / date math | `react-day-picker`, `date-fns` |
| Gallery / carousel | `embla-carousel-react` |
| Bottom sheets | `vaul` |
| Free positioning (onboarding tooltip, popper) | `@floating-ui/react` |
| Drag reordering | `@dnd-kit/*` |
| Option lists (CustomSelect, ChipsSelect) | own listbox + `@floating-ui/react` positioning |

## Packaging

- `tsup` bundles `src/index.ts` to ESM + CJS with declarations; `scripts/postbuild.mjs` marks both bundles
  `"use client"` (the bundler's tree-shaking drops module directives) and copies the stylesheets.
- `dist/styles.css` imports the token files and contains `@source "./"`, so the consumer's Tailwind build
  generates every utility the compiled components reference.
- Public declarations must not expose third-party types; wrap them in datui types (e.g. `ListAnnouncements`,
  `CustomSelectDropdownPlacement`) so consumers with `skipLibCheck: false` don't type-check dependency internals.
- `tests/consumer` installs the packed tarball with npm in a standalone Next.js app (strict lib checking) and renders
  datui from a server component.

## SSR and hydration

- No `window`/`document` during render. Media queries go through `useMediaQuery` (`useSyncExternalStore` with a
  server snapshot), and `usePortalContainer()` returns `null` until hydration finishes, so overlays that are open on
  first render hydrate cleanly.
- Values that depend on "now" (calendar today markers, default times) differ between a static build and the
  browser; docs examples that show them are marked `clientOnly`.

## Testing

Every public component has `<Name>.test.tsx`: rendering, variant classes, interactions with `userEvent`,
controlled + uncontrolled behavior, keyboard, disabled/error states and `expectNoA11yViolations` from `test/axe.ts`.
Behavior jsdom can't model (layout, contrast, real focus order across portals, gestures) is covered by Playwright:
`tests/e2e/pages.spec.ts` renders every docs page in light and dark on desktop and mobile with axe (including
color contrast), no console errors and no horizontal overflow; `tests/e2e/widgets.spec.ts` drives keyboard and focus
behavior of overlays and composite widgets.

## Design decisions

- datui has a single visual design. The only environmental axes are color scheme, density (`compact`/`regular`) and
  horizontal size class (`useAdaptivity().sizeX`); there are no per-platform looks.
- Inventory entries marked `internal` are building blocks folded into a public component; entries marked `replaced`
  are concepts covered by another datui component. `docs/component-inventory.md` names the component for each.

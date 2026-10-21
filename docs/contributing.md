# Contributing to datui

Read `docs/architecture.md` first — it defines tokens, prop naming and foundations.

## Setup

```sh
pnpm install
pnpm docs:dev        # docs at http://localhost:3100, compiles the library from source
pnpm check           # Biome + typecheck + unit tests + library build + inventory check
```

## Adding or changing a component

1. **Code** — `packages/datui/src/components/<Name>/<Name>.tsx` plus `index.ts` that re-exports the public API
   (`export * from "./<Name>";`). Related public parts (e.g. `TabsItem`) can get their own folder or live in the parent's.
   Building blocks that must not be public go in `packages/datui/src/internal/<Name>/`.
2. **Defaults** — destructure prop defaults in the function signature (`variant = "primary"`) or document them with
   `/** @default … */`; the docs props tables read them from there.
3. **Index** — run `pnpm --filter datui gen:index` (regenerates `src/index.ts` from the folder list). Don't hand-edit it.
4. **Tests** — `<Name>.test.tsx` next to the component: rendering, variants, user interaction (`userEvent`),
   controlled + uncontrolled behavior, keyboard, disabled/error/empty states, and `expectNoA11yViolations`
   from `packages/datui/test/axe.ts`. Run one folder with `pnpm --filter datui exec vitest run src/components/<Name>`.
5. **Docs** — `apps/docs/content/<slug>/meta.ts` (see `apps/docs/lib/types.ts` for `DocMeta`) and one
   `<example>.tsx` per example with `"use client"` and a default-exported component that imports from `"datui"`.
   Examples must use real props only; playground controls may list only props that work. Run
   `node apps/docs/scripts/generate.mjs` then `pnpm --filter docs exec tsc --noEmit` to typecheck examples.
6. **Inventory** — update the component's row in `docs/component-inventory.md`:
   `Implemented` → `Tested` → `Documented`. Never mark a status the code doesn't meet.

## Rules

- Tokens through Tailwind utilities only (`bg-primary`, `h-control-m`, `text-subhead`, `rounded-lg`). If a token is
  missing, add it to `src/styles/tokens.css` (light + dark) and `src/styles/theme.css` instead of hard-coding.
- Prefer Radix primitives (`radix-ui`) and the listed ecosystem packages to hand-rolled behavior. Don't add a
  dependency without updating the foundations table in `docs/architecture.md`.
- Semantic HTML first; ARIA only where HTML has no equivalent. Every interactive element is keyboard reachable
  and has a visible `focus-visible:focus-ring`.
- No `any`, `@ts-ignore`, skipped tests or blanket lint suppressions. A targeted `biome-ignore` needs a reason.
- Biome formats and lints: `pnpm format`.

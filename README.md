# datui

A complete, accessible React component library built with Tailwind CSS v4, Radix primitives and TypeScript.

- **packages/datui** — the npm package (`datui`)
- **apps/docs** — documentation site with live examples, playgrounds and props tables
- **tests/e2e** — Playwright suites (keyboard, focus, themes, responsive) run against the docs
- **tests/consumer** — standalone Next.js app that installs the packed tarball

## Development

```sh
pnpm install
pnpm docs:dev     # http://localhost:3100
pnpm check        # lint, typecheck, unit tests, build, inventory check
pnpm e2e          # Playwright (builds and serves the docs)
```

Documentation for contributors: [docs/architecture.md](docs/architecture.md), [docs/contributing.md](docs/contributing.md).
Component coverage and status: [docs/component-inventory.md](docs/component-inventory.md).

## Using datui

See [packages/datui/README.md](packages/datui/README.md) or the Installation page of the docs site.

## License

MIT

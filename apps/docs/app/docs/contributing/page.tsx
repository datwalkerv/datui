import { Code, Prose } from "@/components/prose";

export const metadata = { title: "Contributing" };

export default function Contributing() {
  return (
    <Prose>
      <h1>Contributing</h1>
      <p>The repository is a pnpm workspace with the library, this site and end-to-end tests.</p>
      <Code>{`pnpm install
pnpm --filter datui build --watch   # library
pnpm docs:dev                      # http://localhost:3100
pnpm check                         # lint, typecheck, unit tests, build`}</Code>
      <h2>Adding a component</h2>
      <ul>
        <li>
          Create <code>packages/datui/src/components/Name/</code> with <code>Name.tsx</code>, <code>Name.test.tsx</code>{" "}
          and <code>index.ts</code>, and export it from <code>src/index.ts</code>.
        </li>
        <li>Use tokens through Tailwind utilities; never hard-code colors or sizes.</li>
        <li>Test rendering, variants, interaction, keyboard and run the axe helper.</li>
        <li>
          Add <code>apps/docs/content/name/meta.ts</code> plus one <code>.tsx</code> file per example.
        </li>
        <li>
          Update its row in <code>docs/component-inventory.md</code>.
        </li>
      </ul>
      <p>
        See <code>docs/architecture.md</code> and <code>docs/contributing.md</code> in the repository for the full
        conventions.
      </p>
    </Prose>
  );
}

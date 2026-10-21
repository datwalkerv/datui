import { Code, Prose } from "@/components/prose";

export const metadata = { title: "Installation" };

export default function Installation() {
  return (
    <Prose>
      <h1>Installation</h1>
      <p>
        datui ships compiled ESM and CommonJS builds, TypeScript declarations and a stylesheet that plugs into your
        Tailwind CSS v4 build.
      </p>
      <h2>Requirements</h2>
      <ul>
        <li>React 18.2 or newer (React 19 recommended)</li>
        <li>Tailwind CSS 4.x</li>
        <li>Any React framework; tested with Next.js 16 (App Router)</li>
      </ul>
      <h2>1. Install</h2>
      <Code>{"pnpm add datui"}</Code>
      <p>
        <code>react</code> and <code>react-dom</code> are peer dependencies; everything else installs with datui.
      </p>
      <h2>2. Import the styles</h2>
      <p>
        In the CSS file where you import Tailwind, add datui after it. This registers the design tokens, the dark theme
        and tells Tailwind to generate the utilities datui components use.
      </p>
      <Code label="app/globals.css">{`@import "tailwindcss";\n@import "datui/styles.css";`}</Code>
      <h2>3. Wrap your app</h2>
      <p>
        <code>ConfigProvider</code> holds app-wide settings (color scheme, locale, direction). <code>AppRoot</code>{" "}
        applies them to the DOM and hosts the layer overlays render into, so dialogs and popovers pick up the right
        theme.
      </p>
      <Code label="app/providers.tsx">{`"use client";

import { AppRoot, ConfigProvider } from "datui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider colorScheme="system">
      <AppRoot>{children}</AppRoot>
    </ConfigProvider>
  );
}`}</Code>
      <h2>4. Use components</h2>
      <Code>{`import { Button } from "datui";

export function Save() {
  return <Button variant="primary">Save</Button>;
}`}</Code>
      <h2>Server components</h2>
      <p>
        The package entry is marked <code>"use client"</code>, so datui components can be rendered from server
        components; they hydrate on the client. Components never touch <code>window</code> during render.
      </p>
    </Prose>
  );
}

# datui

Accessible React components built with Tailwind CSS v4 and Radix primitives — layout, typography, buttons, forms,
navigation, overlays, data display and feedback, sharing one set of design tokens with light and dark themes.

## Install

```sh
pnpm add datui
```

Peer dependencies: `react` and `react-dom` 18.2+. Requires Tailwind CSS 4.

```css
/* app/globals.css */
@import "tailwindcss";
@import "datui/styles.css";
```

```tsx
"use client";
import { AppRoot, Button, ConfigProvider } from "datui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider colorScheme="system">
      <AppRoot>{children}</AppRoot>
    </ConfigProvider>
  );
}

export const Save = () => <Button>Save</Button>;
```

## Theming

Every visual value is a `--dt-*` CSS variable. Override them under any selector to create a theme; dark mode is
`[data-theme="dark"]`, set by `AppRoot` from `ConfigProvider colorScheme`.

## License

MIT

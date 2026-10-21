"use client";

import { AppRoot, ConfigProvider, Text } from "datui";

/**
 * Typical setup (in your root layout):
 *
 *   <ConfigProvider colorScheme="system">
 *     <AppRoot>{children}</AppRoot>
 *   </ConfigProvider>
 *
 * `mode="embedded"` keeps AppRoot inside an existing page, as below.
 */
export default function Example() {
  return (
    <ConfigProvider colorScheme="dark">
      <AppRoot mode="embedded" density="compact" className="rounded-lg p-4">
        <Text>An embedded, dark, compact-density datui root.</Text>
      </AppRoot>
    </ConfigProvider>
  );
}

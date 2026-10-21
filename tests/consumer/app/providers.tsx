"use client";

import { AppRoot, ConfigProvider } from "datui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider colorScheme="light">
      <AppRoot>{children}</AppRoot>
    </ConfigProvider>
  );
}

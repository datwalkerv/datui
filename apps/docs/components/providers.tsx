"use client";

import { AppRoot, type ColorSchemePreference, ConfigProvider } from "datui";
import * as React from "react";

const ThemeContext = React.createContext<{
  scheme: ColorSchemePreference;
  setScheme: (s: ColorSchemePreference) => void;
}>({ scheme: "system", setScheme: () => {} });

export const useDocsTheme = () => React.useContext(ThemeContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [scheme, setSchemeState] = React.useState<ColorSchemePreference>("system");
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("datui-docs-theme");
      if (saved === "light" || saved === "dark" || saved === "system") setSchemeState(saved);
    } catch {}
  }, []);
  const setScheme = React.useCallback((s: ColorSchemePreference) => {
    setSchemeState(s);
    try {
      localStorage.setItem("datui-docs-theme", s);
    } catch {}
  }, []);
  return (
    <ThemeContext.Provider value={{ scheme, setScheme }}>
      <ConfigProvider colorScheme={scheme}>
        <AppRoot>{children}</AppRoot>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

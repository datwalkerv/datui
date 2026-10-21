import * as React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export type ColorScheme = "light" | "dark";
export type ColorSchemePreference = ColorScheme | "system";

const ColorSchemeContext = React.createContext<ColorScheme | null>(null);

export interface ColorSchemeProviderProps {
  /** `system` follows the operating system preference. */
  value: ColorSchemePreference;
  children?: React.ReactNode;
}

/** Provides the resolved color scheme to descendants. `AppRoot` applies it as `data-theme`. */
export function ColorSchemeProvider({ value, children }: ColorSchemeProviderProps) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const resolved: ColorScheme = value === "system" ? (prefersDark ? "dark" : "light") : value;
  return <ColorSchemeContext.Provider value={resolved}>{children}</ColorSchemeContext.Provider>;
}

/** The nearest resolved color scheme; falls back to the OS preference outside a provider. */
export function useColorScheme(): ColorScheme {
  const ctx = React.useContext(ColorSchemeContext);
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  return ctx ?? (prefersDark ? "dark" : "light");
}

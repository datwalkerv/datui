import * as React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import {
  type ColorSchemePreference,
  ColorSchemeProvider,
  useColorScheme,
} from "../ColorSchemeProvider/ColorSchemeProvider";
import { DirectionProvider, type TextDirection, useDirection } from "../DirectionProvider/DirectionProvider";
import { LocaleProvider, useLocale } from "../LocaleProvider/LocaleProvider";

/** Unset props inherit from the nearest parent `ConfigProvider`, so nested providers override single keys. */
export interface ConfigProviderProps {
  /** @default "system" */
  colorScheme?: ColorSchemePreference;
  /** @default "en" */
  locale?: string;
  /** @default "ltr" */
  direction?: TextDirection;
  /** Disables panel and modal transitions. Reduced-motion users get this automatically. @default true */
  transitionMotionEnabled?: boolean;
  children?: React.ReactNode;
}

const MotionContext = React.createContext(true);

/** Single entry point for app-wide datui settings. Combine with `AppRoot`, which applies them to the DOM. */
export function ConfigProvider({
  colorScheme,
  locale,
  direction,
  transitionMotionEnabled,
  children,
}: ConfigProviderProps) {
  // Outside any provider these hooks return the root defaults (OS scheme, "en", "ltr", motion on).
  const parentScheme = useColorScheme();
  const parentLocale = useLocale();
  const parentDirection = useDirection();
  const parentMotion = React.useContext(MotionContext);
  return (
    <ColorSchemeProvider value={colorScheme ?? parentScheme}>
      <LocaleProvider value={locale ?? parentLocale}>
        <DirectionProvider value={direction ?? parentDirection}>
          <MotionContext.Provider value={transitionMotionEnabled ?? parentMotion}>{children}</MotionContext.Provider>
        </DirectionProvider>
      </LocaleProvider>
    </ColorSchemeProvider>
  );
}

/** Whether JS-driven transitions should run: enabled in config and not opted out via reduced motion. */
export function useTransitionMotion(): boolean {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return React.useContext(MotionContext) && !reduced;
}

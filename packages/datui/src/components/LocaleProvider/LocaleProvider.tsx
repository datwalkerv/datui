import * as React from "react";

const LocaleContext = React.createContext("en");

export interface LocaleProviderProps {
  /** BCP 47 language tag used for dates, numbers and built-in labels. */
  value: string;
  children?: React.ReactNode;
}

export function LocaleProvider({ value, children }: LocaleProviderProps) {
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): string {
  return React.useContext(LocaleContext);
}

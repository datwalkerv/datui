import { Direction } from "radix-ui";
import * as React from "react";

export type TextDirection = "ltr" | "rtl";

const DirectionContext = React.createContext<TextDirection>("ltr");

export interface DirectionProviderProps {
  value: TextDirection;
  children?: React.ReactNode;
}

/** Sets text direction for datui components and the Radix primitives underneath them. */
export function DirectionProvider({ value, children }: DirectionProviderProps) {
  return (
    <DirectionContext.Provider value={value}>
      <Direction.Provider dir={value}>{children}</Direction.Provider>
    </DirectionContext.Provider>
  );
}

export function useDirection(): TextDirection {
  return React.useContext(DirectionContext);
}

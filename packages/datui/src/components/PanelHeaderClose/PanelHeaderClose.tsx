import { X } from "lucide-react";
import * as React from "react";
import { PanelHeaderButton, type PanelHeaderButtonProps } from "../PanelHeaderButton/PanelHeaderButton";

export interface PanelHeaderCloseProps extends Omit<PanelHeaderButtonProps, "label" | "children"> {
  /** Accessible name. @default "Close" */
  label?: string;
}

/** Close (×) button for `PanelHeader` and modal headers. */
export const PanelHeaderClose = React.forwardRef<HTMLElement, PanelHeaderCloseProps>(function PanelHeaderClose(
  { label = "Close", ...rest },
  ref,
) {
  return (
    <PanelHeaderButton ref={ref} aria-label={label} {...rest}>
      <X aria-hidden />
    </PanelHeaderButton>
  );
});

import { Check } from "lucide-react";
import * as React from "react";
import { PanelHeaderButton, type PanelHeaderButtonProps } from "../PanelHeaderButton/PanelHeaderButton";

export interface PanelHeaderSubmitProps extends Omit<PanelHeaderButtonProps, "label" | "children"> {
  /** Accessible name. @default "Done" */
  label?: string;
}

/** Confirm (✓) button for `PanelHeader`. */
export const PanelHeaderSubmit = React.forwardRef<HTMLElement, PanelHeaderSubmitProps>(function PanelHeaderSubmit(
  { label = "Done", ...rest },
  ref,
) {
  return (
    <PanelHeaderButton ref={ref} aria-label={label} primary {...rest}>
      <Check aria-hidden />
    </PanelHeaderButton>
  );
});

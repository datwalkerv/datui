import { ChevronLeft } from "lucide-react";
import * as React from "react";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { PanelHeaderButton, type PanelHeaderButtonProps } from "../PanelHeaderButton/PanelHeaderButton";

export interface PanelHeaderBackProps extends Omit<PanelHeaderButtonProps, "label" | "children"> {
  /** Accessible name, and visible text with `showLabel`. @default "Back" */
  label?: string;
  showLabel?: boolean;
  /** Render nothing on desktop layouts, where a side navigation handles going back. */
  hideOnDesktop?: boolean;
}

/** Back button for `PanelHeader`. The chevron mirrors in right-to-left layouts. */
export const PanelHeaderBack = React.forwardRef<HTMLElement, PanelHeaderBackProps>(function PanelHeaderBack(
  { label = "Back", showLabel = false, hideOnDesktop = false, ...rest },
  ref,
) {
  const { isDesktop } = useAdaptivity();
  if (hideOnDesktop && isDesktop) return null;
  return (
    <PanelHeaderButton
      ref={ref}
      aria-label={showLabel ? undefined : label}
      label={showLabel ? label : undefined}
      primary
      {...rest}
    >
      <ChevronLeft aria-hidden className="dt-icon-nudge-back rtl:-scale-x-100" />
    </PanelHeaderButton>
  );
});

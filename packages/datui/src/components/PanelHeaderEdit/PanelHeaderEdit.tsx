import { Check, Pencil } from "lucide-react";
import * as React from "react";
import { PanelHeaderButton, type PanelHeaderButtonProps } from "../PanelHeaderButton/PanelHeaderButton";

export interface PanelHeaderEditProps extends Omit<PanelHeaderButtonProps, "label" | "children"> {
  /** Edit mode is on: shows the "done" state. */
  isActive?: boolean;
  /** @default "Edit" */
  editLabel?: string;
  /** @default "Done" */
  doneLabel?: string;
}

/** Toggle between "edit" and "done" for `PanelHeader`. The consumer flips `isActive` in `onClick`. */
export const PanelHeaderEdit = React.forwardRef<HTMLElement, PanelHeaderEditProps>(function PanelHeaderEdit(
  { isActive = false, editLabel = "Edit", doneLabel = "Done", ...rest },
  ref,
) {
  return (
    <PanelHeaderButton
      ref={ref}
      aria-label={isActive ? doneLabel : editLabel}
      aria-pressed={isActive}
      primary={isActive}
      {...rest}
    >
      {isActive ? <Check aria-hidden className="dt-icon-draw" /> : <Pencil aria-hidden className="dt-icon-pop" />}
    </PanelHeaderButton>
  );
});

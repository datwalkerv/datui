import { X } from "lucide-react";
import * as React from "react";
import { ModalOutsideButton } from "../ModalOutsideButton/ModalOutsideButton";
import type { TappableProps } from "../Tappable/Tappable";

export interface ModalDismissButtonProps extends Omit<TappableProps, "feedback" | "activated" | "children"> {
  /** Accessible label. @default "Close" */
  children?: string;
}

/** Round X button that closes a modal. ModalPage and ModalCard render it for you. */
export const ModalDismissButton = React.forwardRef<HTMLElement, ModalDismissButtonProps>(function ModalDismissButton(
  { children = "Close", ...rest },
  ref,
) {
  return (
    <ModalOutsideButton ref={ref} aria-label={children} {...rest}>
      <X className="dt-icon-turn" />
    </ModalOutsideButton>
  );
});

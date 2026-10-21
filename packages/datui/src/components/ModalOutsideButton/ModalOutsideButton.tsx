import * as React from "react";
import { cn } from "../../lib/utils";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

export interface ModalOutsideButtonProps extends Omit<TappableProps, "feedback" | "activated"> {
  /** Accessible name; the button shows only an icon. */
  "aria-label": string;
  /** The icon (`size-icon-md`). */
  children: React.ReactNode;
}

/** Round icon button that sits outside a modal sheet, next to its dismiss button. Renders a link with `href`. */
export const ModalOutsideButton = React.forwardRef<HTMLElement, ModalOutsideButtonProps>(function ModalOutsideButton(
  { className, children, ...rest },
  ref,
) {
  return (
    <Tappable
      ref={ref}
      as={rest.href ? "a" : "button"}
      className={cn(
        "inline-flex size-control-m shrink-0 items-center justify-center rounded-full bg-overlay text-white [&_svg]:size-icon-md",
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="contents">
        {children}
      </span>
    </Tappable>
  );
});

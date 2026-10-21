import * as React from "react";
import { devWarning } from "../../internal/devWarning/devWarning";
import { cn } from "../../lib/utils";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

export interface IconButtonProps extends Omit<TappableProps, "feedback"> {
  /** Visually hidden accessible name. Alternatively pass `aria-label`. */
  label?: string;
  /** `m` is a 44px (regular density) hit area with a 24px icon, `s` is 36px with 20px. @default "m" */
  size?: "s" | "m";
}

/** Square icon-only button. Needs `label` or `aria-label`. Renders `<a>` with `href`. */
export const IconButton = React.forwardRef<HTMLElement, IconButtonProps>(function IconButton(
  { label, size = "m", className, children, ...rest },
  ref,
) {
  if (!label && !rest["aria-label"] && !rest["aria-labelledby"]) {
    devWarning("IconButton needs an accessible name: pass `label` or `aria-label`.");
  }
  return (
    <Tappable
      ref={ref}
      as={rest.href ? "a" : "button"}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-md border-0 bg-transparent p-0 text-icon-secondary",
        size === "m" ? "size-control-l [&_svg]:size-icon-lg" : "size-control-m [&_svg]:size-icon-md",
        className,
      )}
      {...rest}
    >
      <span aria-hidden className="inline-flex">
        {children}
      </span>
      {label && <span className="sr-only">{label}</span>}
    </Tappable>
  );
});

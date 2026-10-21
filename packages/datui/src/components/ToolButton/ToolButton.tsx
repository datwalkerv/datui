import * as React from "react";
import { AdaptiveIconRenderer } from "../../internal/AdaptiveIconRenderer/AdaptiveIconRenderer";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../Button/Button";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

export interface ToolButtonProps extends Omit<TappableProps, "feedback"> {
  /** Icon; sized 24px at regular density and 20px at compact. */
  icon?: React.ReactNode;
  /** Explicit icon for compact density (with `iconRegular`). */
  iconCompact?: React.ReactNode;
  /** Explicit icon for regular density (with `iconCompact`). */
  iconRegular?: React.ReactNode;
  /** @default "primary" */
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  /** @default "accent" */
  appearance?: "accent" | "neutral";
  /** Icon beside (`row`) or above (`column`) the text. @default "row" */
  direction?: "row" | "column";
  /** Pill shape. Ignored for `column` buttons with text. */
  rounded?: boolean;
}

/** Toolbar button with a density-adaptive icon and optional text. Icon-only needs `aria-label`. */
export const ToolButton = React.forwardRef<HTMLElement, ToolButtonProps>(function ToolButton(
  {
    icon,
    iconCompact,
    iconRegular,
    variant = "primary",
    appearance = "accent",
    direction = "row",
    rounded,
    className,
    children,
    ...rest
  },
  ref,
) {
  const hasText = children !== undefined && children !== null && children !== false;
  const column = direction === "column" && hasText;
  return (
    <Tappable
      ref={ref}
      as={rest.href ? "a" : "button"}
      data-direction={direction}
      className={cn(
        buttonVariants({ variant, appearance, size: "m", rounded: rounded && !column, iconOnly: !hasText }),
        "[&_svg]:size-icon-lg in-data-[density=compact]:[&_svg]:size-icon-md",
        column && "h-auto flex-col gap-1 px-3 py-2 text-caption-1",
        className,
      )}
      {...rest}
    >
      <AdaptiveIconRenderer iconRegular={iconRegular ?? icon} iconCompact={iconCompact} />
      {hasText && <span className="min-w-0 truncate">{children}</span>}
    </Tappable>
  );
});

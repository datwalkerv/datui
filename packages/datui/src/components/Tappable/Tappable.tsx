import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Clickable, type ClickableProps } from "../Clickable/Clickable";

export const tappableVariants = cva(
  [
    "relative isolate cursor-pointer select-none outline-none transition-[background-color,opacity] duration-fast",
    "focus-visible:focus-ring",
    "aria-disabled:cursor-default aria-disabled:opacity-(--dt-opacity-disabled) disabled:cursor-default disabled:opacity-(--dt-opacity-disabled)",
  ],
  {
    variants: {
      /** Feedback on hover/press. `background` tints the surface; `opacity` fades it. */
      feedback: {
        background: [
          "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-foreground after:opacity-0 after:transition-opacity after:duration-fast after:content-['']",
          "hover:after:opacity-(--dt-opacity-hover) active:after:opacity-(--dt-opacity-active)",
          "aria-disabled:after:hidden disabled:after:hidden",
        ],
        opacity: "hover:opacity-80 active:opacity-60 aria-disabled:opacity-(--dt-opacity-disabled)",
        none: "",
      },
      /** Keep the pressed look, e.g. for the active item of a list. */
      activated: { true: "after:opacity-(--dt-opacity-active)", false: "" },
    },
    defaultVariants: { feedback: "background", activated: false },
  },
);

export interface TappableProps extends ClickableProps, VariantProps<typeof tappableVariants> {}

/** Interactive surface with consistent hover, press, focus and disabled feedback. Base of buttons, cells and tabs. */
export const Tappable = React.forwardRef<HTMLElement, TappableProps>(function Tappable(
  { feedback, activated, className, ...rest },
  ref,
) {
  const interactive = Boolean(rest.onClick || rest.href || rest.as);
  return (
    <Clickable
      ref={ref}
      className={cn(tappableVariants({ feedback: interactive ? feedback : "none", activated }), className)}
      {...rest}
    />
  );
});

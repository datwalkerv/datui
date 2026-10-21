import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

export const buttonGroupVariants = cva("flex", {
  variants: {
    mode: { horizontal: "flex-row flex-wrap items-center", vertical: "flex-col" },
    gap: { none: "gap-0", space: "gap-px", s: "gap-1", m: "gap-2" },
    stretched: { true: "w-full", false: "" },
    align: { left: "justify-start", center: "justify-center", right: "justify-end" },
  },
  compoundVariants: [
    { mode: "horizontal", stretched: true, class: "flex-nowrap [&>*]:flex-1" },
    { mode: "vertical", stretched: true, class: "[&>*]:w-full" },
    { mode: "vertical", align: "left", class: "items-start" },
    { mode: "vertical", align: "center", class: "items-center" },
    { mode: "vertical", align: "right", class: "items-end" },
  ],
  defaultVariants: { mode: "horizontal", gap: "m", stretched: false, align: "left" },
});

export interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {}

/** Lays out related buttons in a row or column. Exposes `role="group"`; give it an `aria-label`. */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { mode, gap, stretched, align, className, ...rest },
  ref,
) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a fieldset would add form semantics and default styling to plain button rows
    <div
      ref={ref}
      role="group"
      className={cn(buttonGroupVariants({ mode, gap, stretched, align }), className)}
      {...rest}
    />
  );
});

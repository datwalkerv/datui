import { cva } from "class-variance-authority";

export type SelectType = "default" | "plain" | "accent";

/** Text style of a select's displayed value. `accent` is a borderless, colored "link-like" select. */
export const selectTypographyVariants = cva("min-w-0 flex-1 text-body", {
  variants: {
    selectType: { default: "text-foreground", plain: "text-foreground", accent: "font-medium text-primary" },
    empty: { true: "text-muted-foreground", false: "" },
  },
  defaultVariants: { selectType: "default", empty: false },
});

/** FormField mode for a select type: only `default` keeps the border. */
export const selectTypeMode = (selectType: SelectType = "default") => (selectType === "default" ? "default" : "plain");

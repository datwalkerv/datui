import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "dir" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Form field name shared by the options. */
  name?: string;
  /** Layout and arrow-key axis. @default "vertical" */
  mode?: "vertical" | "horizontal";
  disabled?: boolean;
  required?: boolean;
}

/**
 * Container for `Radio` options (Radix RadioGroup). Tab enters the group at the selected option;
 * arrow keys move focus and select. Give it a label with `aria-label` or `aria-labelledby`.
 */
export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { mode = "vertical", className, ...rest },
  ref,
) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      orientation={mode}
      className={cn("flex", mode === "vertical" ? "flex-col" : "flex-row flex-wrap", className)}
      {...rest}
    />
  );
});

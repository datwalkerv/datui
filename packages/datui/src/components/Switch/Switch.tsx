import { Switch as SwitchPrimitive } from "radix-ui";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultChecked" | "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Focusable and announced, but toggling is blocked. */
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

/** On/off toggle (Radix Switch, `role="switch"`). Space and Enter toggle. Needs a label. */
export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { readOnly, onCheckedChange, checked, defaultChecked, className, ...rest },
  ref,
) {
  // Radix has no readOnly: pin the value and swallow changes.
  const [readOnlyValue] = React.useState(checked ?? defaultChecked ?? false);
  return (
    <SwitchPrimitive.Root
      ref={ref}
      checked={readOnly ? (checked ?? readOnlyValue) : checked}
      defaultChecked={defaultChecked}
      onCheckedChange={readOnly ? undefined : onCheckedChange}
      aria-readonly={readOnly || undefined}
      className={cn(
        "relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-control-track p-0.5 outline-none transition-colors duration-fast",
        "focus-visible:focus-ring data-[state=checked]:bg-primary disabled:cursor-default disabled:opacity-(--dt-opacity-disabled)",
        className,
      )}
      {...rest}
    >
      <SwitchPrimitive.Thumb className="block size-5 rounded-full bg-control-thumb shadow-sm transition-transform duration-fast data-[state=checked]:translate-x-4 rtl:data-[state=checked]:-translate-x-4" />
    </SwitchPrimitive.Root>
  );
});

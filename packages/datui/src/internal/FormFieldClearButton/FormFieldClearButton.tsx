import { X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";

export interface FormFieldClearButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Accessible label. @default "Clear" */
  label?: string;
}

/**
 * Small icon button for a FormField `after` slot that clears the value.
 * It does not take focus on mouse down, so the caret stays in the field.
 */
export const FormFieldClearButton = React.forwardRef<HTMLButtonElement, FormFieldClearButtonProps>(
  function FormFieldClearButton({ label = "Clear", className, onMouseDown, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        onMouseDown={(e) => {
          onMouseDown?.(e);
          e.preventDefault();
        }}
        className={cn(
          "inline-flex size-control-s shrink-0 cursor-pointer items-center justify-center rounded-full text-icon-secondary outline-none transition-colors duration-fast",
          "hover:text-foreground focus-visible:focus-ring disabled:cursor-default disabled:opacity-(--dt-opacity-disabled)",
          className,
        )}
        {...rest}
      >
        <X className="dt-icon-turn size-icon-sm" aria-hidden />
      </button>
    );
  },
);

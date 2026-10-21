import * as React from "react";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsomorphicLayoutEffect";
import { setRefs } from "../../internal/formUtils/formUtils";
import {
  type TextAlign,
  textAlignClass,
  unstyledTextFieldClass,
} from "../../internal/UnstyledTextField/UnstyledTextField";
import { cn } from "../../lib/utils";
import { FormField, type FormFieldProps } from "../FormField/FormField";
import { useFormItemControl } from "../FormItem/FormItemContext";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Pick<FormFieldProps, "status" | "mode" | "before" | "after" | "beforeAlign" | "afterAlign"> {
  /** Grow with the content (up to `maxHeight`, then scroll). @default true */
  grow?: boolean;
  /** Called after an auto-grow changed the textarea height. */
  onResize?: (element: HTMLTextAreaElement) => void;
  /** Max height in px before the content scrolls. */
  maxHeight?: number;
  /** Text alignment. @default "left" */
  align?: TextAlign;
  /** Props for the FormField shell. `className` and `style` also go to the shell. */
  slotProps?: { root?: FormFieldProps & { ref?: React.Ref<HTMLDivElement> } };
}

/**
 * Multi-line native `<textarea>` in a FormField that grows with its content.
 * Controlled (`value` + `onChange(event)`) or uncontrolled; `ref` points at the textarea.
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    rows = 2,
    grow = true,
    onResize,
    maxHeight,
    align = "left",
    status: statusProp,
    mode,
    before,
    after,
    beforeAlign,
    afterAlign = "end",
    slotProps,
    className,
    style,
    disabled,
    onChange,
    ...rest
  },
  ref,
) {
  const { status, control } = useFormItemControl({ ...rest, status: statusProp });
  const innerRef = React.useRef<HTMLTextAreaElement>(null);
  const lastHeight = React.useRef<string>("");
  const onResizeRef = React.useRef(onResize);
  onResizeRef.current = onResize;

  const resize = React.useCallback(() => {
    const el = innerRef.current;
    if (!grow || !el) return;
    el.style.height = "auto";
    const next = `${el.scrollHeight}px`;
    el.style.height = next;
    if (lastHeight.current && lastHeight.current !== next) onResizeRef.current?.(el);
    lastHeight.current = next;
  }, [grow]);

  // Re-measure when a controlled value changes from outside.
  useIsomorphicLayoutEffect(resize, [resize, rest.value]);

  return (
    <FormField
      status={status}
      mode={mode}
      before={before}
      after={after}
      beforeAlign={beforeAlign}
      afterAlign={afterAlign}
      disabled={disabled}
      style={style}
      {...slotProps?.root}
      className={cn(className, slotProps?.root?.className)}
    >
      <textarea
        ref={(node) => setRefs(node, innerRef, ref)}
        rows={rows}
        disabled={disabled}
        onChange={(e) => {
          onChange?.(e);
          resize();
        }}
        {...rest}
        {...control}
        style={{ maxHeight }}
        className={cn(
          unstyledTextFieldClass,
          "resize-none",
          grow && "overflow-y-hidden",
          maxHeight !== undefined && "overflow-y-auto",
          textAlignClass[align],
        )}
      />
    </FormField>
  );
});

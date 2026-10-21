import * as React from "react";
import { cn } from "../../lib/utils";
import { Textarea, type TextareaProps } from "../Textarea/Textarea";

export interface WriteBarProps
  extends Omit<
    TextareaProps,
    "children" | "status" | "mode" | "before" | "after" | "grow" | "onResize" | "beforeAlign" | "afterAlign"
  > {
  /** Actions before the field, e.g. an attach `WriteBarIcon`. */
  before?: React.ReactNode;
  /** Actions inside the field, at its end (emoji, stickers). */
  inlineAfter?: React.ReactNode;
  /** Actions after the field, e.g. a send `WriteBarIcon`. */
  after?: React.ReactNode;
  /** Called whenever the auto-growing textarea changes height. */
  onHeightChange?: () => void;
  /** Lift the bar with a shadow (when floating over content). @default false */
  shadow?: boolean;
  /** Props for the outer bar. */
  slotProps?: { root?: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> } };
}

/**
 * Message composer: an auto-growing textarea with action slots. `ref` points at the textarea.
 * Enter handling is up to you, e.g. send on Enter and insert a newline on Shift+Enter in `onKeyDown`.
 */
export const WriteBar = React.forwardRef<HTMLTextAreaElement, WriteBarProps>(function WriteBar(
  {
    before,
    inlineAfter,
    after,
    onHeightChange,
    shadow = false,
    slotProps,
    className,
    style,
    rows = 1,
    maxHeight = 160,
    ...rest
  },
  ref,
) {
  return (
    <div
      {...slotProps?.root}
      style={style}
      className={cn(
        "flex items-end gap-1 bg-background px-2 py-1 pb-[max(--spacing(1),env(safe-area-inset-bottom))]",
        shadow && "shadow-md",
        className,
        slotProps?.root?.className,
      )}
    >
      {before && <div className="flex shrink-0 items-center">{before}</div>}
      <Textarea
        ref={ref}
        rows={rows}
        mode="plain"
        maxHeight={maxHeight}
        after={inlineAfter}
        onResize={onHeightChange}
        slotProps={{ root: { className: "min-h-control-l flex-1" } }}
        {...rest}
      />
      {after && <div className="flex shrink-0 items-center">{after}</div>}
    </div>
  );
});

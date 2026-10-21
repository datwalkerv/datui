import { CircleMinus } from "lucide-react";
import type * as React from "react";

export interface FormRemovableProps {
  /** `true` shows a remove button after the content; `"indent"` only reserves its space for alignment. */
  removable?: boolean | "indent" | undefined;
  onRemove?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
  /** Accessible label of the remove button. */
  removeLabel?: string | undefined;
  children?: React.ReactNode;
}

/** Wraps form content with a trailing remove button (or its empty indent). */
export function FormRemovable({ removable, onRemove, removeLabel = "Remove", children }: FormRemovableProps) {
  if (!removable) return <>{children}</>;
  return (
    <div className="flex items-end gap-2">
      <div className="min-w-0 flex-1">{children}</div>
      {removable === "indent" ? (
        <span aria-hidden className="size-control-l shrink-0" />
      ) : (
        <button
          type="button"
          aria-label={removeLabel}
          onClick={onRemove}
          className="inline-flex size-control-l shrink-0 cursor-pointer items-center justify-center rounded-md text-destructive outline-none hover:bg-destructive/8 focus-visible:focus-ring"
        >
          <CircleMinus className="size-icon-lg" aria-hidden />
        </button>
      )}
    </div>
  );
}

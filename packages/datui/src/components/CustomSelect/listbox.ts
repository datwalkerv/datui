import * as React from "react";

/** Shared listbox helpers for CustomSelect and ChipsSelect (not public). */

/** Next enabled index from `from` in direction `step` (±1); stays put at the ends. `from = -1` with step 1 finds the first. */
export function nextEnabled(
  items: ReadonlyArray<{ disabled?: boolean | undefined }>,
  from: number,
  step: 1 | -1,
): number {
  for (let i = from + step; i >= 0 && i < items.length; i += step) {
    if (!items[i]?.disabled) return i;
  }
  return from;
}

export const firstEnabled = (items: ReadonlyArray<{ disabled?: boolean | undefined }>) => nextEnabled(items, -1, 1);
export const lastEnabled = (items: ReadonlyArray<{ disabled?: boolean | undefined }>) =>
  nextEnabled(items, items.length, -1);

/** Case-insensitive "label contains query". */
export const defaultFilterFn = (query: string, label: string) =>
  label.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());

/** Printable single character key without modifiers (used for type-ahead). */
export const isPrintableKey = (e: { key: string; ctrlKey: boolean; metaKey: boolean; altKey: boolean }) =>
  e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;

/**
 * While `active`, Escape is caught in the window capture phase so it closes only this popup and does not reach
 * document-level listeners of an enclosing dialog or popover.
 */
export function useEscapeWhileOpen(active: boolean, onEscape: () => void): void {
  const ref = React.useRef(onEscape);
  ref.current = onEscape;
  React.useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      e.stopPropagation();
      e.preventDefault();
      ref.current();
    };
    window.addEventListener("keydown", handler, true);
    return () => window.removeEventListener("keydown", handler, true);
  }, [active]);
}

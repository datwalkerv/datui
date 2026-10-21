import type * as React from "react";

/** Assign one node to several refs (callback or object). */
export function setRefs<T>(node: T | null, ...refs: Array<React.Ref<T> | undefined>): void {
  for (const ref of refs) {
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.RefObject<T | null>).current = node;
  }
}

/**
 * Set a native input/textarea value and dispatch `input`, so React's `onChange(event)` fires
 * exactly as if the user had typed it. Works for controlled and uncontrolled fields.
 */
export function setNativeValue(el: HTMLInputElement | HTMLTextAreaElement, value: string): void {
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value")?.set?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

/** Join space-separated id lists, dropping empty parts. */
export function joinIds(...ids: Array<string | undefined | false | null>): string | undefined {
  const joined = ids.filter(Boolean).join(" ");
  return joined || undefined;
}

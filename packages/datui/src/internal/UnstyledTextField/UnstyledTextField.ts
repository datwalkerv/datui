/** UA-reset classes for a bare `input`/`textarea` living inside a FormField. */
export const unstyledTextFieldClass =
  "min-w-0 flex-1 appearance-none border-0 bg-transparent px-3 py-2.5 text-body text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-default read-only:cursor-default";

export type TextAlign = "left" | "center" | "right";

export const textAlignClass: Record<TextAlign, string> = {
  left: "text-start",
  center: "text-center",
  right: "text-end",
};

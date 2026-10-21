import * as FocusScope from "@radix-ui/react-focus-scope";
import * as React from "react";

export interface FocusTrapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Trap Tab/Shift+Tab inside. @default true */
  trapped?: boolean;
  /** Focus the first focusable element on mount. @default true */
  autoFocus?: boolean;
  /** Return focus to the previously focused element on unmount. @default true */
  restoreFocus?: boolean;
  /** Called on Escape. */
  onEscape?: (event: KeyboardEvent) => void;
}

/** Keeps keyboard focus inside its children; used by overlays and available for custom ones. */
export const FocusTrap = React.forwardRef<HTMLDivElement, FocusTrapProps>(function FocusTrap(
  { trapped = true, autoFocus = true, restoreFocus = true, onEscape, onKeyDown, ...rest },
  ref,
) {
  // FocusScope owns its root's onKeyDown, so key handling lives on a layout-neutral wrapper.
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: delegates key events bubbling from focusable children
    <div
      className="contents"
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.key === "Escape" && onEscape && !e.defaultPrevented) {
          e.stopPropagation();
          onEscape(e.nativeEvent);
        }
      }}
    >
      <FocusScope.Root
        ref={ref}
        loop
        trapped={trapped}
        onMountAutoFocus={(e) => {
          if (!autoFocus) e.preventDefault();
        }}
        onUnmountAutoFocus={(e) => {
          if (!restoreFocus) e.preventDefault();
        }}
        {...rest}
      />
    </div>
  );
});

import * as React from "react";

export interface ClickableProps extends React.HTMLAttributes<HTMLElement> {
  /** Element to render. Defaults to `a` with `href`, `button` with `onClick`, otherwise `div`. */
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const NATIVE_INTERACTIVE = new Set(["a", "button", "input", "select", "textarea", "label", "summary"]);

/**
 * Renders the right interactive element for its props and gives non-native elements
 * button semantics (role, tab stop, Enter/Space activation).
 */
export const Clickable = React.forwardRef<HTMLElement, ClickableProps>(function Clickable(
  { as, href, disabled, onClick, onKeyDown, type, role, tabIndex, ...rest },
  ref,
) {
  const Component: React.ElementType = as ?? (href ? "a" : onClick ? "button" : "div");
  const interactive = Boolean(href || onClick);
  const isNative = typeof Component === "string" ? NATIVE_INTERACTIVE.has(Component) : true;
  const isButton = Component === "button";

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || isNative || !interactive || disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <Component
      ref={ref}
      href={disabled ? undefined : href}
      type={isButton ? (type ?? "button") : type}
      disabled={isButton ? disabled : undefined}
      aria-disabled={!isButton && disabled ? true : undefined}
      role={role ?? (!isNative && interactive ? "button" : undefined)}
      tabIndex={tabIndex ?? (!isNative && interactive && !disabled ? 0 : undefined)}
      onClick={interactive || onClick ? handleClick : undefined}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
});

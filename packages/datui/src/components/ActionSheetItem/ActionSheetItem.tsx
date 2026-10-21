import { Check } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { useActionSheet } from "../ActionSheet/ActionSheet";
import { Tappable } from "../Tappable/Tappable";

export interface ActionSheetItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  /** @default "default" */
  mode?: "default" | "destructive";
  /** Icon before the label. */
  before?: React.ReactNode;
  /** Content at the end. */
  after?: React.ReactNode;
  /** Muted text at the end, before `after`. */
  meta?: React.ReactNode;
  /** Second line under the label. */
  subtitle?: React.ReactNode;
  /** Behave as one option of a single-choice group (`menuitemradio` in menu mode). */
  selectable?: boolean;
  /** Checked state of a selectable item. */
  checked?: boolean;
  /** Keep the sheet open after activation. */
  autoCloseDisabled?: boolean;
  /** Let the label wrap instead of truncating. */
  multiline?: boolean;
  disabled?: boolean;
  href?: string;
  target?: string;
  /** Runs after the sheet has closed. */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Runs right away, before the sheet starts closing. */
  onImmediateClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

/** One action row of an `ActionSheet`. */
export const ActionSheetItem = React.forwardRef<HTMLElement, ActionSheetItemProps>(function ActionSheetItem(
  {
    mode = "default",
    before,
    after,
    meta,
    subtitle,
    selectable = false,
    checked = false,
    autoCloseDisabled = false,
    multiline = false,
    disabled,
    href,
    target,
    onClick,
    onImmediateClick,
    className,
    children,
    ...rest
  },
  ref,
) {
  const sheet = useActionSheet();
  const menu = sheet.mode === "menu";
  const centered = !menu && !before && !after && !meta && !selectable;
  return (
    <Tappable
      ref={ref}
      as={href ? "a" : "button"}
      href={href}
      target={target}
      disabled={disabled}
      role={menu ? (selectable ? "menuitemradio" : "menuitem") : undefined}
      aria-checked={selectable ? checked : undefined}
      tabIndex={menu ? -1 : undefined}
      className={cn(
        "flex w-full items-center gap-3 text-start",
        menu ? "min-h-control-l rounded-md px-3 text-subhead" : "min-h-cell px-4 text-body",
        centered && "justify-center text-center",
        mode === "destructive" ? "text-destructive" : menu ? "text-popover-foreground" : "text-primary",
        className,
      )}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        onImmediateClick?.(event);
        if (autoCloseDisabled) {
          onClick?.(event);
          return;
        }
        // A click with detail 0 came from the keyboard (Enter/Space).
        sheet.close(event.detail === 0 ? "keydown-item" : "click-action-item", onClick && (() => onClick(event)));
      }}
      {...rest}
    >
      {before && (
        <span aria-hidden className="inline-flex shrink-0 [&_svg]:size-icon-md">
          {before}
        </span>
      )}
      <span className={cn("min-w-0", !centered && "flex-1")}>
        <span className={cn("block", !multiline && "truncate")}>{children}</span>
        {subtitle && <span className="block text-footnote text-subtle-foreground">{subtitle}</span>}
      </span>
      {meta && <span className="shrink-0 text-subhead text-subtle-foreground">{meta}</span>}
      {after && <span className="inline-flex shrink-0">{after}</span>}
      {selectable && (
        <Check aria-hidden className={cn("size-icon-md shrink-0 text-primary", !checked && "invisible")} />
      )}
    </Tappable>
  );
});

import * as React from "react";
import { useModalShell } from "../../internal/ModalShell/ModalShell";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";

export type GroupMode = "card" | "plain";

export interface GroupContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** `card` is a rounded surface, `plain` is flush. Auto: `card` at regular width, `plain` on compact screens. */
  mode?: GroupMode;
  /** Vertical padding inside a card. @default "m" */
  padding?: "s" | "m";
  /** Divider after the group: `auto` between siblings only, `show` always, `hide` never. @default "auto" */
  separator?: "auto" | "show" | "hide";
  /** @default "section" */
  as?: React.ElementType;
}

/** The group surface without header/description slots. `role="tabpanel"` makes it focusable. */
export const GroupContainer = React.forwardRef<HTMLElement, GroupContainerProps>(function GroupContainer(
  { mode: modeProp, padding = "m", separator = "auto", as: Component = "section", tabIndex, className, ...rest },
  ref,
) {
  const { sizeX } = useAdaptivity();
  // Inside a modal the surface is already a card, so nested groups default to plain.
  const inModal = useModalShell() !== null;
  const mode = modeProp ?? (sizeX === "regular" && !inModal ? "card" : "plain");
  const card = mode === "card";
  return (
    <>
      <Component
        ref={ref}
        data-mode={mode}
        tabIndex={tabIndex ?? (rest.role === "tabpanel" ? 0 : undefined)}
        className={cn(
          "block outline-none focus-visible:focus-ring",
          card ? "rounded-xl bg-card text-card-foreground" : "bg-background",
          card && (padding === "m" ? "py-2" : "py-1"),
          className,
        )}
        {...rest}
      />
      {separator !== "hide" && (
        <div
          aria-hidden
          data-group-separator={separator}
          className={cn(card ? "h-3" : "py-2", separator === "auto" && "last:hidden")}
        >
          {!card && <div className="mx-4 h-px bg-separator" />}
        </div>
      )}
    </>
  );
});

export type GroupHeaderProps = React.HTMLAttributes<HTMLDivElement>;

/** Wrapper for the group's `Header`. */
export const GroupHeader = React.forwardRef<HTMLDivElement, GroupHeaderProps>(function GroupHeader(props, ref) {
  return <div ref={ref} {...props} />;
});

export type GroupDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

/** Footnote under the group content. */
export const GroupDescription = React.forwardRef<HTMLDivElement, GroupDescriptionProps>(function GroupDescription(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn("px-4 pt-1 pb-3 text-footnote text-muted-foreground", className)} {...rest} />;
});

export interface GroupExpandedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lay children out in a row (`inline`, scrolls horizontally) or a column. @default "inline" */
  direction?: "inline" | "block";
}

/** Content that runs edge to edge inside the group, e.g. a horizontal scroller. */
export const GroupExpandedContent = React.forwardRef<HTMLDivElement, GroupExpandedContentProps>(
  function GroupExpandedContent({ direction = "inline", className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2 py-2",
          direction === "inline" ? "flex-row overflow-x-auto px-4" : "flex-col",
          className,
        )}
        {...rest}
      />
    );
  },
);

export interface GroupProps extends GroupContainerProps {
  /** Usually a `Header`. Labels the section via `aria-labelledby`. */
  header?: React.ReactNode;
  /** Footnote after the content. */
  description?: React.ReactNode;
}

const GroupRoot = React.forwardRef<HTMLElement, GroupProps>(function Group(
  { header, description, children, ...rest },
  ref,
) {
  const headerId = React.useId();
  const hasHeader = header !== undefined && header !== null && header !== false;
  const labelled = hasHeader && !rest["aria-label"] && !rest["aria-labelledby"];
  return (
    <GroupContainer ref={ref} aria-labelledby={labelled ? headerId : undefined} {...rest}>
      {hasHeader && <GroupHeader id={headerId}>{header}</GroupHeader>}
      {children}
      {description !== undefined && description !== null && <GroupDescription>{description}</GroupDescription>}
    </GroupContainer>
  );
});

/** Content section — a card or a plain block — with header, description and dividers between siblings. */
export const Group = Object.assign(GroupRoot, {
  Container: GroupContainer,
  Header: GroupHeader,
  Description: GroupDescription,
  ExpandedContent: GroupExpandedContent,
});

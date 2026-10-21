import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible } from "radix-ui";
import * as React from "react";
import { useControllableState } from "../../hooks/useControllableState";
import { cn } from "../../lib/utils";
import { SimpleCell, type SimpleCellProps } from "../SimpleCell/SimpleCell";

interface AccordionContextValue {
  open: boolean;
  summaryId: string;
  unmountOnCollapse: boolean;
}
const AccordionContext = React.createContext<AccordionContextValue | null>(null);
function useAccordion(part: string) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error(`${part} must be used inside <Accordion>`);
  return ctx;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  /** @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  /** Remove the content from the DOM when collapsed (after the closing animation). @default false */
  unmountOnCollapse?: boolean;
}

const AccordionBase = React.forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { open: openProp, defaultOpen = false, onOpenChange, disabled, unmountOnCollapse = false, ...rest },
  ref,
) {
  const [open, setOpen] = useControllableState({ value: openProp, defaultValue: defaultOpen, onChange: onOpenChange });
  const summaryId = React.useId();
  const ctx = React.useMemo(() => ({ open, summaryId, unmountOnCollapse }), [open, summaryId, unmountOnCollapse]);
  return (
    <AccordionContext.Provider value={ctx}>
      <Collapsible.Root ref={ref} open={open} onOpenChange={setOpen} disabled={disabled} {...rest} />
    </AccordionContext.Provider>
  );
});

export interface AccordionIconProps {
  /** Icon shown while collapsed. @default ChevronDown */
  expandIcon?: React.ElementType;
  /** Icon shown while expanded. @default ChevronUp */
  collapseIcon?: React.ElementType;
  className?: string;
}

/** Expand/collapse icon bound to the surrounding Accordion's state, for custom summaries. */
export function AccordionIcon({ expandIcon = ChevronDown, collapseIcon = ChevronUp, className }: AccordionIconProps) {
  const { open } = useAccordion("Accordion.Icon");
  const Icon = open ? collapseIcon : expandIcon;
  return (
    <Icon
      aria-hidden
      data-state={open ? "open" : "closed"}
      className={cn("size-icon-lg shrink-0 text-icon-secondary", className)}
    />
  );
}

export interface AccordionSummaryProps extends Omit<SimpleCellProps, "chevron" | "chevronSize"> {
  /** Where the expand icon sits; `none` hides it. @default "after" */
  iconPosition?: "before" | "after" | "none";
  /** @default ChevronDown */
  expandIcon?: React.ElementType;
  /** @default ChevronUp */
  collapseIcon?: React.ElementType;
}

/** Header row that toggles the Accordion. A `button` with `aria-expanded` and `aria-controls`. */
export const AccordionSummary = React.forwardRef<HTMLElement, AccordionSummaryProps>(function AccordionSummary(
  { iconPosition = "after", expandIcon, collapseIcon, before, after, ...rest },
  ref,
) {
  const { summaryId } = useAccordion("Accordion.Summary");
  const icon = <AccordionIcon expandIcon={expandIcon} collapseIcon={collapseIcon} />;
  return (
    <Collapsible.Trigger asChild>
      <SimpleCell
        ref={ref}
        id={summaryId}
        before={
          iconPosition === "before" ? (
            <span className="flex items-center gap-3">
              {icon}
              {before}
            </span>
          ) : (
            before
          )
        }
        after={
          iconPosition === "after" ? (
            <span className="flex items-center gap-3">
              {after}
              {icon}
            </span>
          ) : (
            after
          )
        }
        {...rest}
      />
    </Collapsible.Trigger>
  );
});

export type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;

/** Collapsible body. A `region` labelled by the summary, hidden from assistive tech while collapsed. */
export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(function AccordionContent(
  { className, children, ...rest },
  ref,
) {
  const { open, summaryId, unmountOnCollapse } = useAccordion("Accordion.Content");
  if (unmountOnCollapse) {
    // Radix keeps the node mounted until the closing animation ends, then removes it.
    return (
      <Collapsible.Content
        ref={ref}
        role="region"
        aria-labelledby={summaryId}
        className={cn(
          "overflow-hidden",
          "data-[state=open]:animate-[dt-collapsible-down_var(--dt-duration-normal)_var(--dt-ease-standard)]",
          "data-[state=closed]:animate-[dt-collapsible-up_var(--dt-duration-normal)_var(--dt-ease-standard)]",
          className,
        )}
        {...rest}
      >
        {children}
      </Collapsible.Content>
    );
  }
  // Kept mounted: animate grid rows 0fr ↔ 1fr; `visibility` flips after the transition, `inert` hides it at once.
  return (
    <Collapsible.Content
      ref={ref}
      forceMount
      role="region"
      aria-labelledby={summaryId}
      inert={!open}
      className={cn(
        "grid transition-[grid-template-rows,visibility] duration-normal ease-standard",
        open ? "grid-rows-[1fr]" : "invisible grid-rows-[0fr]",
        className,
      )}
      {...rest}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </Collapsible.Content>
  );
});

/** Single expandable section: `Accordion.Summary` row plus `Accordion.Content` body. */
export const Accordion = Object.assign(AccordionBase, {
  Summary: AccordionSummary,
  Content: AccordionContent,
  Icon: AccordionIcon,
});

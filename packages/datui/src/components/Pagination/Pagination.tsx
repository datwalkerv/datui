import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Tappable } from "../Tappable/Tappable";

export type PaginationItem = number | "start-ellipsis" | "end-ellipsis";

const range = (from: number, to: number) => Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);

/**
 * Pages to show: `boundaryCount` pages at each end, `siblingCount` around `current`, and an ellipsis for each gap.
 * A gap of exactly one page shows that page instead, so the item count stays constant while paging.
 */
export function getPaginationItems(
  current: number,
  total: number,
  siblingCount = 1,
  boundaryCount = 1,
): PaginationItem[] {
  if (total < 1) return [];
  const page = Math.min(Math.max(1, current), total);
  const start = range(1, Math.min(boundaryCount, total));
  const end = range(Math.max(total - boundaryCount + 1, boundaryCount + 1), total);
  const siblingsStart = Math.max(
    Math.min(page - siblingCount, total - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2,
  );
  const siblingsEnd = Math.min(
    Math.max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    end.length > 0 ? (end[0] ?? total) - 2 : total - 1,
  );
  const items: PaginationItem[] = [...start];
  if (siblingsStart > boundaryCount + 2) items.push("start-ellipsis");
  else if (boundaryCount + 1 < total - boundaryCount) items.push(boundaryCount + 1);
  items.push(...range(siblingsStart, siblingsEnd));
  if (siblingsEnd < total - boundaryCount - 1) items.push("end-ellipsis");
  else if (total - boundaryCount > boundaryCount) items.push(total - boundaryCount);
  items.push(...end);
  return items;
}

export interface PaginationButtonRenderProps {
  className: string;
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  "aria-label": string;
  "aria-current"?: "page";
  children: React.ReactNode;
}

export interface PaginationPageRenderProps extends PaginationButtonRenderProps {
  page: number;
  isCurrent: boolean;
}

export interface PaginationNavigationRenderProps extends PaginationButtonRenderProps {
  direction: "prev" | "next";
  page: number;
}

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Current page (1-based). Leave undefined to let the component track it. */
  currentPage?: number;
  /** Initial page when uncontrolled. @default 1 */
  defaultCurrentPage?: number;
  /** @default 1 */
  totalPages?: number;
  /** Pages shown on each side of the current one. @default 1 */
  siblingCount?: number;
  /** Pages always shown at each end. @default 1 */
  boundaryCount?: number;
  onChange?: (page: number, event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  /** @default "icon" */
  navigationButtonsStyle?: "icon" | "caption" | "both";
  /** @default "Previous" */
  prevButtonCaption?: string;
  /** @default "Next" */
  nextButtonCaption?: string;
  /** @default "Previous page" */
  prevButtonLabel?: string;
  /** @default "Next page" */
  nextButtonLabel?: string;
  /** Hidden heading that labels the navigation landmark. @default "Pages" */
  navigationLabel?: string;
  /** Accessible name of a page button. @default `Page ${page}` */
  getPageLabel?: (page: number, isCurrent: boolean) => string;
  /** Render a page button yourself, e.g. as a router link. Spread the props onto it. */
  renderPageButton?: (props: PaginationPageRenderProps) => React.ReactNode;
  renderNavigationButton?: (props: PaginationNavigationRenderProps) => React.ReactNode;
}

const buttonClass =
  "inline-flex min-h-control-m min-w-control-m items-center justify-center gap-1 rounded-md px-2 text-subhead font-medium text-foreground no-underline [&_svg]:size-icon-md";

/** Page navigation with previous/next buttons, boundary and sibling pages and ellipses. */
export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    currentPage: currentProp,
    defaultCurrentPage = 1,
    totalPages = 1,
    siblingCount = 1,
    boundaryCount = 1,
    onChange,
    disabled = false,
    navigationButtonsStyle = "icon",
    prevButtonCaption = "Previous",
    nextButtonCaption = "Next",
    prevButtonLabel = "Previous page",
    nextButtonLabel = "Next page",
    navigationLabel = "Pages",
    getPageLabel = (page) => `Page ${page}`,
    renderPageButton,
    renderNavigationButton,
    className,
    ...rest
  },
  ref,
) {
  const [inner, setInner] = React.useState(defaultCurrentPage);
  const current = currentProp ?? inner;
  const headingId = `${React.useId()}-heading`;
  const go = (page: number) => (event: React.MouseEvent<HTMLElement>) => {
    if (disabled || page === current || page < 1 || page > totalPages) return;
    if (currentProp === undefined) setInner(page);
    onChange?.(page, event);
  };

  const navButton = (direction: "prev" | "next") => {
    const prev = direction === "prev";
    const page = prev ? current - 1 : current + 1;
    const Icon = prev ? ChevronLeft : ChevronRight;
    const caption = prev ? prevButtonCaption : nextButtonCaption;
    const icon = navigationButtonsStyle !== "caption" && <Icon aria-hidden className="rtl:-scale-x-100" />;
    const text = navigationButtonsStyle !== "icon" && <span aria-hidden>{caption}</span>;
    const props: PaginationNavigationRenderProps = {
      direction,
      page,
      className: cn(buttonClass, navigationButtonsStyle !== "icon" && "px-3"),
      disabled: disabled || (prev ? current <= 1 : current >= totalPages),
      onClick: go(page),
      "aria-label": prev ? prevButtonLabel : nextButtonLabel,
      children: prev ? (
        <>
          {icon}
          {text}
        </>
      ) : (
        <>
          {text}
          {icon}
        </>
      ),
    };
    if (renderNavigationButton) return renderNavigationButton(props);
    const { direction: _d, page: _p, children, ...button } = props;
    return <Tappable {...button}>{children}</Tappable>;
  };

  return (
    <nav ref={ref} aria-labelledby={headingId} className={cn("flex", className)} {...rest}>
      <h2 id={headingId} className="sr-only">
        {navigationLabel}
      </h2>
      <ul className="flex flex-wrap items-center gap-1">
        <li>{navButton("prev")}</li>
        {getPaginationItems(current, totalPages, siblingCount, boundaryCount).map((item) => {
          if (typeof item !== "number") {
            return (
              <li key={item} aria-hidden className="inline-flex min-w-control-m justify-center text-muted-foreground">
                …
              </li>
            );
          }
          const isCurrent = item === current;
          const props: PaginationPageRenderProps = {
            page: item,
            isCurrent,
            className: cn(buttonClass, isCurrent && "bg-primary text-primary-foreground"),
            disabled,
            onClick: go(item),
            "aria-label": getPageLabel(item, isCurrent),
            "aria-current": isCurrent ? "page" : undefined,
            children: item,
          };
          if (renderPageButton) return <li key={item}>{renderPageButton(props)}</li>;
          const { page: _p, isCurrent: _c, children, ...button } = props;
          return (
            <li key={item}>
              <Tappable {...button}>{children}</Tappable>
            </li>
          );
        })}
        <li>{navButton("next")}</li>
      </ul>
    </nav>
  );
});

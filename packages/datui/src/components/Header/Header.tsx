import * as React from "react";
import { cn } from "../../lib/utils";
import { Typography } from "../Typography/Typography";

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** `xl` page-level title … `s` small caps label. @default "m" */
  size?: "s" | "m" | "l" | "xl";
  /** Heading element for the title. @default "h2" */
  as?: React.ElementType;
  subtitle?: React.ReactNode;
  /** @default "span" */
  subtitleAs?: React.ElementType;
  /** Content before the whole header, e.g. an avatar. */
  before?: React.ReactNode;
  /** Content at the end, e.g. a `Link` or `Button`. */
  after?: React.ReactNode;
  /** Secondary value right after the title, e.g. a count. */
  indicator?: React.ReactNode;
  /** Icons around the title / subtitle text. Decorative. */
  beforeTitle?: React.ReactNode;
  afterTitle?: React.ReactNode;
  beforeSubtitle?: React.ReactNode;
  afterSubtitle?: React.ReactNode;
  /** Wrap long text instead of truncating it. */
  multiline?: boolean;
}

const titleClass = {
  xl: "text-title-2 font-semibold",
  l: "text-title-3 font-semibold",
  m: "text-headline-1 font-medium",
  s: "text-footnote font-medium uppercase tracking-wide text-subtle-foreground",
} as const;
const subtitleClass = { xl: "text-subhead", l: "text-subhead", m: "text-footnote", s: "text-footnote" } as const;

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span aria-hidden className="inline-flex shrink-0 [&_svg]:size-icon-sm">
      {children}
    </span>
  );
}

/** Section heading with optional subtitle, indicator and before/after slots. */
export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(function Header(
  {
    size = "m",
    as = "h2",
    subtitle,
    subtitleAs = "span",
    before,
    after,
    indicator,
    beforeTitle,
    afterTitle,
    beforeSubtitle,
    afterSubtitle,
    multiline,
    className,
    children,
    ...rest
  },
  ref,
) {
  const text = multiline ? "break-words" : "truncate";
  return (
    <div ref={ref} className={cn("flex items-center gap-3 px-4 pt-4 pb-2", className)} {...rest}>
      {before && <span className="inline-flex shrink-0">{before}</span>}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex min-w-0 items-center gap-1.5">
          {beforeTitle && <Icon>{beforeTitle}</Icon>}
          <Typography as={as} className={cn("min-w-0 text-foreground", titleClass[size], text)}>
            {children}
          </Typography>
          {afterTitle && <Icon>{afterTitle}</Icon>}
          {indicator !== undefined && indicator !== null && (
            <span className={cn("shrink-0 text-muted-foreground", subtitleClass[size])}>{indicator}</span>
          )}
        </div>
        {subtitle !== undefined && subtitle !== null && (
          <div className="flex min-w-0 items-center gap-1 text-muted-foreground">
            {beforeSubtitle && <Icon>{beforeSubtitle}</Icon>}
            <Typography as={subtitleAs} className={cn("min-w-0", subtitleClass[size], text)}>
              {subtitle}
            </Typography>
            {afterSubtitle && <Icon>{afterSubtitle}</Icon>}
          </div>
        )}
      </div>
      {after && <span className="inline-flex shrink-0 items-center text-subhead">{after}</span>}
    </div>
  );
});

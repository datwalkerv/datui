import * as React from "react";
import { ModalTitle } from "../../internal/ModalShell/ModalShell";
import { cn } from "../../lib/utils";
import { Separator } from "../Separator/Separator";

export interface ModalPageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Content at the start, e.g. a back button. */
  before?: React.ReactNode;
  /** Content at the end, e.g. an action button. */
  after?: React.ReactNode;
  /** @default false */
  noSeparator?: boolean;
  /** Element for the title; it labels the dialog. @default "h2" */
  titleAs?: React.ElementType;
}

/** Title bar of a `ModalPage`. The title becomes the dialog's accessible name. */
export const ModalPageHeader = React.forwardRef<HTMLDivElement, ModalPageHeaderProps>(function ModalPageHeader(
  { before, after, noSeparator = false, titleAs: TitleTag = "h2", className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn("shrink-0", className)} {...rest}>
      <div className="flex min-h-panel-header items-center gap-2 px-2 tablet:pe-12">
        <div className="flex min-w-10 shrink-0 items-center">{before}</div>
        <ModalTitle asChild>
          <TitleTag className="m-0 min-w-0 flex-1 truncate text-center text-title-3 font-semibold tablet:text-start">
            {children}
          </TitleTag>
        </ModalTitle>
        <div className="flex min-w-10 shrink-0 items-center justify-end">{after}</div>
      </div>
      {!noSeparator && <Separator />}
    </div>
  );
});

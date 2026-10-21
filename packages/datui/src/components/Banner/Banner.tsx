import { ChevronRight, X } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Clickable } from "../Clickable/Clickable";
import { IconButton } from "../IconButton/IconButton";

export interface BannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onClick"> {
  /** `tint` is a soft surface, `image` puts the content over `background`. @default "tint" */
  variant?: "tint" | "image";
  /** @default "s" */
  size?: "s" | "m";
  before?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  extraSubtitle?: React.ReactNode;
  /** Usually a `Button` or `ButtonGroup`. */
  actions?: React.ReactNode;
  /** `dismiss` shows a close button, `chevron` hints at navigation, or pass any node. */
  after?: "dismiss" | "chevron" | React.ReactNode;
  onDismiss?: (event: React.MouseEvent<HTMLElement>) => void;
  /** @default "Dismiss" */
  dismissLabel?: string;
  /** Image or gradient behind the content in `image` mode. Decorative. */
  background?: React.ReactNode;
  /** Text color over the image: `dark` images get light text. @default "dark" */
  imageTheme?: "light" | "dark";
  /** Makes the whole banner activatable (the title becomes the button/link). */
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Promo/announcement block. When clickable, the title is the real button/link stretched over the
 * banner, so the dismiss button and actions stay separate controls.
 */
export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(function Banner(
  {
    variant = "tint",
    size = "s",
    before,
    title,
    subtitle,
    extraSubtitle,
    actions,
    after,
    onDismiss,
    dismissLabel = "Dismiss",
    background,
    imageTheme = "dark",
    onClick,
    href,
    target,
    rel,
    className,
    ...rest
  },
  ref,
) {
  const image = variant === "image";
  const interactive = Boolean(onClick || href);
  const lightText = image && imageTheme === "dark";
  const muted = lightText ? "text-white/72" : image ? "text-black/64" : "text-subtle-foreground";
  return (
    <div
      ref={ref}
      className={cn(
        "relative isolate flex items-start gap-3 overflow-hidden rounded-xl",
        size === "m" ? "p-5" : "p-4",
        image ? (lightText ? "text-white" : "text-black") : "bg-secondary text-foreground",
        interactive &&
          "transition-[filter] duration-fast has-[[data-banner-main]:hover]:brightness-97 has-[[data-banner-main]:focus-visible]:focus-ring",
        className,
      )}
      {...rest}
    >
      {image && background && (
        <div aria-hidden className="absolute inset-0 -z-1 [&>*]:size-full [&>img]:object-cover">
          {background}
        </div>
      )}
      {before && <div className="shrink-0">{before}</div>}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {title !== undefined &&
          (interactive ? (
            <Clickable
              data-banner-main=""
              href={href}
              target={target}
              rel={rel}
              onClick={onClick}
              className={cn(
                "m-0 border-0 bg-transparent p-0 text-start text-inherit no-underline outline-none [font:inherit]",
                "after:absolute after:inset-0 after:content-['']",
              )}
            >
              <span className={cn("block font-semibold", size === "m" ? "text-title-3" : "text-headline-1")}>
                {title}
              </span>
            </Clickable>
          ) : (
            <span className={cn("block font-semibold", size === "m" ? "text-title-3" : "text-headline-1")}>
              {title}
            </span>
          ))}
        {subtitle && <span className={cn("block text-subhead", muted)}>{subtitle}</span>}
        {extraSubtitle && <span className={cn("block text-subhead", muted)}>{extraSubtitle}</span>}
        {actions && <div className="relative z-1 mt-2">{actions}</div>}
      </div>
      {after === "dismiss" ? (
        <IconButton
          size="s"
          label={dismissLabel}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            onDismiss?.(event);
          }}
          className={cn("relative z-1 -m-2 shrink-0", image && "text-current")}
        >
          <X />
        </IconButton>
      ) : after === "chevron" ? (
        <ChevronRight aria-hidden className={cn("size-icon-md shrink-0 self-center", muted)} />
      ) : (
        after && <div className="relative z-1 shrink-0">{after}</div>
      )}
    </div>
  );
});

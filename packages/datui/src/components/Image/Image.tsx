import { Image as ImageIcon } from "lucide-react";
import * as React from "react";
import { ImageBase, type ImageBaseProps } from "../../internal/ImageBase/ImageBase";
import { cn } from "../../lib/utils";
import { Clickable } from "../Clickable/Clickable";

type Radius = "s" | "m" | "l";

export interface ImageProps extends Omit<ImageBaseProps, "fallback"> {
  /** Square size in px. Use `widthSize`/`heightSize` for other shapes. @default 48 */
  size?: number;
  /** @default "m" */
  borderRadius?: Radius;
  borderStartStartRadius?: Radius;
  borderStartEndRadius?: Radius;
  borderEndStartRadius?: Radius;
  borderEndEndRadius?: Radius;
  /** Icon shown when there is no image or it fails to load. */
  fallbackIcon?: React.ReactNode;
}

const radius = { s: "rounded-sm", m: "rounded-md", l: "rounded-lg" } as const;
const ss = { s: "rounded-ss-sm", m: "rounded-ss-md", l: "rounded-ss-lg" } as const;
const se = { s: "rounded-se-sm", m: "rounded-se-md", l: "rounded-se-lg" } as const;
const es = { s: "rounded-es-sm", m: "rounded-es-md", l: "rounded-es-lg" } as const;
const ee = { s: "rounded-ee-sm", m: "rounded-ee-md", l: "rounded-ee-lg" } as const;

const ImageRoot = React.forwardRef<HTMLSpanElement, ImageProps>(function Image(
  {
    size = 48,
    borderRadius = "m",
    borderStartStartRadius,
    borderStartEndRadius,
    borderEndStartRadius,
    borderEndEndRadius,
    fallbackIcon,
    className,
    ...rest
  },
  ref,
) {
  return (
    <ImageBase
      ref={ref}
      size={size}
      fallback={
        <span aria-hidden className="inline-flex text-icon-secondary [&_svg]:size-icon-lg">
          {fallbackIcon ?? <ImageIcon />}
        </span>
      }
      className={cn(
        radius[borderRadius],
        borderStartStartRadius && ss[borderStartStartRadius],
        borderStartEndRadius && se[borderStartEndRadius],
        borderEndStartRadius && es[borderEndStartRadius],
        borderEndEndRadius && ee[borderEndEndRadius],
        className,
      )}
      {...rest}
    />
  );
});

export interface ImageBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `stroke` cuts the badge out with a background-colored ring; `shadow` lifts it. @default "stroke" */
  background?: "stroke" | "shadow";
}

/** Small round badge pinned to the bottom-end corner of an `Image` or `Avatar`. Content is decorative. */
export const ImageBadge = React.forwardRef<HTMLSpanElement, ImageBadgeProps>(function ImageBadge(
  { background = "stroke", className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        "absolute -end-0.5 -bottom-0.5 z-2 inline-flex items-center justify-center rounded-full bg-background [&_svg]:size-icon-sm",
        background === "stroke" ? "ring-2 ring-background" : "shadow-sm",
        className,
      )}
      {...rest}
    />
  );
});

export interface ImageOverlayProps extends React.HTMLAttributes<HTMLElement> {
  /** `on-hover` reveals the overlay on hover/focus; `always` keeps it visible. @default "on-hover" */
  visibility?: "on-hover" | "always";
  /** Overlay tint. @default "dark" */
  theme?: "light" | "dark";
  disabled?: boolean;
}

/**
 * Layer over an `Image`/`Avatar`, e.g. an edit or play icon. With `onClick` it renders a button —
 * give it an `aria-label`.
 */
export const ImageOverlay = React.forwardRef<HTMLElement, ImageOverlayProps>(function ImageOverlay(
  { visibility = "on-hover", theme = "dark", className, ...rest },
  ref,
) {
  return (
    <Clickable
      ref={ref}
      as={rest.onClick ? "button" : "span"}
      className={cn(
        "absolute inset-0 z-1 flex items-center justify-center rounded-[inherit] transition-opacity duration-fast outline-none focus-visible:focus-ring [&_svg]:size-icon-lg",
        theme === "dark" ? "bg-overlay text-white" : "bg-white/72 text-black",
        visibility === "on-hover" &&
          "opacity-0 group-hover/image:opacity-100 focus-visible:opacity-100 focus-within:opacity-100",
        rest.onClick && "cursor-pointer",
        className,
      )}
      {...rest}
    />
  );
});

export interface ImageFloatElementProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Corner to pin to. @default "top-end" */
  placement?: "top-start" | "top-end" | "bottom-start" | "bottom-end";
}

const placements = {
  "top-start": "top-0 start-0",
  "top-end": "top-0 end-0",
  "bottom-start": "bottom-0 start-0",
  "bottom-end": "bottom-0 end-0",
} as const;

/** Freely positioned element (e.g. a `ContentBadge` or `Counter`) pinned to a corner of an `Image`. */
export const ImageFloatElement = React.forwardRef<HTMLSpanElement, ImageFloatElementProps>(function ImageFloatElement(
  { placement = "top-end", className, ...rest },
  ref,
) {
  return <span ref={ref} className={cn("absolute z-2 inline-flex", placements[placement], className)} {...rest} />;
});

/**
 * Rounded-rectangle thumbnail with a fallback icon. Accepts `Image.Badge`, `Image.Overlay` and
 * `Image.FloatElement` children.
 */
export const Image = Object.assign(ImageRoot, {
  Badge: ImageBadge,
  Overlay: ImageOverlay,
  FloatElement: ImageFloatElement,
});

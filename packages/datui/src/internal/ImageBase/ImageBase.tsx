import { Avatar as AvatarPrimitive } from "radix-ui";
import * as React from "react";
import { cn } from "../../lib/utils";

export type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";

export interface ImageBaseProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onLoad" | "onError"> {
  src?: string;
  srcSet?: string;
  sizes?: string;
  /** Text alternative. Pass `""` for decorative images. */
  alt: string;
  crossOrigin?: React.ImgHTMLAttributes<HTMLImageElement>["crossOrigin"];
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  loading?: "eager" | "lazy";
  /** Square size in px. */
  size?: number;
  /** Width override (px number or CSS length). */
  widthSize?: number | string;
  /** Height override (px number or CSS length). */
  heightSize?: number | string;
  /** Let the image's own aspect ratio set the height. */
  keepAspectRatio?: boolean;
  /** Hide the thin inner border. */
  noBorder?: boolean;
  /** Shown while loading, without `src`, or when the image fails. */
  fallback?: React.ReactNode;
  /** Drop the placeholder background (for transparent images). */
  withTransparentBackground?: boolean;
  objectFit?: React.CSSProperties["objectFit"];
  objectPosition?: React.CSSProperties["objectPosition"];
  filter?: React.CSSProperties["filter"];
  onLoad?: () => void;
  onError?: () => void;
}

const len = (v: number | string | undefined) => (typeof v === "number" ? `${v}px` : v);

/**
 * Shared image container for `Image` and `Avatar`: sizing, border, loading status (via Radix Avatar)
 * and a fallback that carries the accessible name until the image loads.
 */
export const ImageBase = React.forwardRef<HTMLSpanElement, ImageBaseProps>(function ImageBase(
  {
    src,
    srcSet,
    sizes,
    alt,
    crossOrigin,
    referrerPolicy,
    loading,
    size,
    widthSize,
    heightSize,
    keepAspectRatio,
    noBorder,
    fallback,
    withTransparentBackground,
    objectFit = "cover",
    objectPosition,
    filter,
    onLoad,
    onError,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const [status, setStatus] = React.useState<ImageLoadingStatus>("idle");
  const loaded = status === "loaded";
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-status={status}
      className={cn(
        "group/image relative inline-flex shrink-0 items-center justify-center align-middle",
        !withTransparentBackground && "bg-muted",
        keepAspectRatio && !loaded && "aspect-square",
        className,
      )}
      style={{
        width: len(widthSize ?? size),
        height: keepAspectRatio ? undefined : len(heightSize ?? size),
        ...style,
      }}
      {...rest}
    >
      <AvatarPrimitive.Image
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        crossOrigin={crossOrigin}
        referrerPolicy={referrerPolicy}
        loading={loading}
        className={cn("rounded-[inherit]", keepAspectRatio ? "block h-auto w-full" : "absolute inset-0 size-full")}
        style={{ objectFit, objectPosition, filter }}
        onLoadingStatusChange={(next) => {
          setStatus(next);
          if (next === "loaded") onLoad?.();
          if (next === "error") onError?.();
        }}
      />
      <AvatarPrimitive.Fallback
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[inherit]"
      >
        {fallback}
      </AvatarPrimitive.Fallback>
      {!noBorder && (
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] border border-border" />
      )}
      {children}
    </AvatarPrimitive.Root>
  );
});

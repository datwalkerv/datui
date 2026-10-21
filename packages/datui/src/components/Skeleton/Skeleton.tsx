import * as React from "react";
import { cn } from "../../lib/utils";

type Length = number | string;

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  width?: Length;
  height?: Length;
  maxWidth?: Length;
  borderRadius?: Length;
  margin?: Length;
  /** Shimmer start/end colors (CSS colors). Default to the skeleton tokens. */
  colorFrom?: string;
  colorTo?: string;
  /** Static block without shimmer. Reduced-motion users always get this. */
  noAnimation?: boolean;
  /** Shimmer cycle in seconds. */
  duration?: number;
  /** Stay invisible for this many ms so fast loads don't flash. */
  visibilityDelay?: number;
}

/**
 * Loading placeholder. Without children it is a block sized by `width`/`height`; with children it
 * is an inline line of text height. Hidden from assistive tech — set `aria-busy` on the loading region.
 */
export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(function Skeleton(
  {
    width,
    height,
    maxWidth,
    borderRadius,
    margin,
    colorFrom,
    colorTo,
    noAnimation,
    duration,
    visibilityDelay,
    className,
    style,
    children,
    ...rest
  },
  ref,
) {
  const [visible, setVisible] = React.useState(!visibilityDelay);
  React.useEffect(() => {
    if (!visibilityDelay) return;
    const id = setTimeout(() => setVisible(true), visibilityDelay);
    return () => clearTimeout(id);
  }, [visibilityDelay]);
  const inline = children !== undefined && children !== null;
  const custom =
    colorFrom || colorTo
      ? `linear-gradient(90deg, ${colorFrom ?? "var(--dt-skeleton-from)"}, ${colorTo ?? "var(--dt-skeleton-to)"}, ${colorFrom ?? "var(--dt-skeleton-from)"})`
      : undefined;
  return (
    <span
      ref={ref}
      aria-hidden
      data-animated={!noAnimation || undefined}
      className={cn(
        "rounded-sm bg-linear-90 from-skeleton-from via-skeleton-to to-skeleton-from bg-size-[200%_100%] select-none",
        inline ? "inline-block align-middle text-transparent leading-none" : "block",
        !noAnimation && "animate-shimmer motion-reduce:animate-none",
        !visible && "invisible",
        className,
      )}
      style={{
        width,
        height: height ?? (inline ? undefined : "1em"),
        maxWidth,
        borderRadius,
        margin,
        backgroundImage: custom,
        animationDuration: duration ? `${duration}s` : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
});

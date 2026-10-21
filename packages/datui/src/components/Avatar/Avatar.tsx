import { User } from "lucide-react";
import * as React from "react";
import { ImageBase, type ImageBaseProps } from "../../internal/ImageBase/ImageBase";
import { cn } from "../../lib/utils";
import { ImageBadge, type ImageBadgeProps, ImageOverlay } from "../Image/Image";

export type AvatarGradient =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "light-blue"
  | "violet"
  | "custom";

export interface AvatarProps extends Omit<ImageBaseProps, "fallback" | "widthSize" | "heightSize" | "keepAspectRatio"> {
  /** Diameter in px (16–96 design sizes, or any number). @default 48 */
  size?: number;
  /** Shown when there is no image or it fails. Takes precedence over `fallbackIcon`. */
  initials?: string;
  /**
   * Background behind initials/icon. `1`–`6` map to the named gradients in order. `custom` reads
   * `--dt-avatar-custom-from` / `--dt-avatar-custom-to` from your styles.
   */
  gradientColor?: AvatarGradient;
  /** Icon shown when there is no image and no `initials`. */
  fallbackIcon?: React.ReactNode;
}

const gradientNames = ["red", "orange", "yellow", "green", "light-blue", "violet"] as const;
const gradients = {
  red: "from-avatar-red-from to-avatar-red-to",
  orange: "from-avatar-orange-from to-avatar-orange-to",
  yellow: "from-avatar-yellow-from to-avatar-yellow-to",
  green: "from-avatar-green-from to-avatar-green-to",
  "light-blue": "from-avatar-light-blue-from to-avatar-light-blue-to",
  violet: "from-avatar-violet-from to-avatar-violet-to",
  custom: "from-(--dt-avatar-custom-from) to-(--dt-avatar-custom-to)",
} as const;

function initialsSize(size: number): string {
  if (size <= 24) return "text-caption-3";
  if (size <= 32) return "text-caption-1";
  if (size <= 40) return "text-subhead";
  if (size <= 48) return "text-headline-1";
  if (size <= 64) return "text-title-2";
  if (size <= 80) return "text-title-1";
  return "text-display-3";
}

const AvatarRoot = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = 48, initials, gradientColor, fallbackIcon, className, ...rest },
  ref,
) {
  const gradient =
    gradientColor === undefined
      ? undefined
      : gradients[typeof gradientColor === "number" ? (gradientNames[gradientColor - 1] ?? "red") : gradientColor];
  return (
    <ImageBase
      ref={ref}
      size={size}
      className={cn("rounded-full", className)}
      fallback={
        <span
          aria-hidden
          data-gradient={gradientColor}
          className={cn(
            "flex size-full items-center justify-center rounded-[inherit] font-semibold",
            gradient ? cn("bg-linear-to-b text-white", gradient) : "text-icon-secondary",
          )}
        >
          {initials ? (
            <span className={initialsSize(size)}>{initials}</span>
          ) : (
            (fallbackIcon ?? <User className="size-1/2" />)
          )}
        </span>
      }
      {...rest}
    />
  );
});

export type AvatarBadgeProps = ImageBadgeProps;

/** Badge on the bottom-end edge of an `Avatar`. Without children it renders an "online" dot. Decorative — put status in `alt`. */
export const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(function AvatarBadge(
  { className, children, ...rest },
  ref,
) {
  return (
    <ImageBadge
      ref={ref}
      className={cn("end-0 bottom-0", children ? "min-w-4 min-h-4" : "size-3 bg-positive", className)}
      {...rest}
    >
      {children}
    </ImageBadge>
  );
});

/**
 * Round image for a person or entity. Falls back to `initials`, then `fallbackIcon`, while the image
 * is missing, loading or broken. Accepts `Avatar.Badge` and `Avatar.Overlay` children.
 */
export const Avatar = Object.assign(AvatarRoot, { Badge: AvatarBadge, Overlay: ImageOverlay });

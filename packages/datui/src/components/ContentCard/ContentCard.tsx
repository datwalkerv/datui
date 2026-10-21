import * as React from "react";
import { cn } from "../../lib/utils";
import { cardVariants } from "../Card/Card";
import { Tappable, type TappableProps } from "../Tappable/Tappable";

type ImgAttrs = React.ImgHTMLAttributes<HTMLImageElement>;

export interface ContentCardProps extends Omit<TappableProps, "title" | "feedback"> {
  src?: string;
  /** Image alt text. Empty by default: the card's text usually describes it. @default "" */
  alt?: string;
  srcSet?: string;
  sizes?: string;
  loading?: ImgAttrs["loading"];
  crossOrigin?: ImgAttrs["crossOrigin"];
  referrerPolicy?: ImgAttrs["referrerPolicy"];
  /** Image max height in px. */
  maxHeight?: number;
  /** @default "cover" */
  imageObjectFit?: React.CSSProperties["objectFit"];
  overTitle?: React.ReactNode;
  title?: React.ReactNode;
  /** @default "span" */
  titleAs?: React.ElementType;
  description?: React.ReactNode;
  caption?: React.ReactNode;
  /** Card surface. @default "shadow" */
  variant?: "tint" | "shadow" | "outline" | "outline-tint" | "plain";
}

const has = (n: React.ReactNode) => n !== undefined && n !== null && n !== false;

/** Card with an optional cover image and text. With `onClick`/`href` the whole card is a button/link. */
export const ContentCard = React.forwardRef<HTMLElement, ContentCardProps>(function ContentCard(
  {
    src,
    alt = "",
    srcSet,
    sizes,
    loading,
    crossOrigin,
    referrerPolicy,
    maxHeight,
    imageObjectFit = "cover",
    overTitle,
    title,
    titleAs: TitleTag = "span",
    description,
    caption,
    variant = "shadow",
    className,
    ...rest
  },
  ref,
) {
  return (
    <Tappable
      ref={ref}
      className={cn(cardVariants({ variant }), "overflow-hidden text-start no-underline", className)}
      {...rest}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          loading={loading}
          crossOrigin={crossOrigin}
          referrerPolicy={referrerPolicy}
          className="block w-full"
          style={{ maxHeight, objectFit: imageObjectFit }}
        />
      )}
      <span className="flex flex-col gap-1 p-3">
        {has(overTitle) && (
          <span className="text-caption-1 uppercase tracking-wide text-muted-foreground">{overTitle}</span>
        )}
        {has(title) && <TitleTag className="m-0 block text-headline-1 font-medium text-foreground">{title}</TitleTag>}
        {has(description) && <span className="text-paragraph text-foreground">{description}</span>}
        {has(caption) && <span className="text-caption-1 text-muted-foreground">{caption}</span>}
      </span>
    </Tappable>
  );
});

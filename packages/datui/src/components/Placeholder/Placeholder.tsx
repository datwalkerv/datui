import * as React from "react";
import { cn } from "../../lib/utils";

export interface PlaceholderContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fill the available height and center the content vertically. */
  stretched?: boolean;
  /** Remove the outer padding. */
  noPadding?: boolean;
}

/** Centered column that holds the placeholder parts. */
export const PlaceholderContainer = React.forwardRef<HTMLDivElement, PlaceholderContainerProps>(
  function PlaceholderContainer({ stretched, noPadding, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center text-center",
          !noPadding && "px-8 py-12",
          stretched && "h-full min-h-full flex-1 justify-center",
          className,
        )}
        {...rest}
      />
    );
  },
);

export type PlaceholderIconProps = React.HTMLAttributes<HTMLDivElement>;

/** Large decorative icon. */
export const PlaceholderIcon = React.forwardRef<HTMLDivElement, PlaceholderIconProps>(function PlaceholderIcon(
  { className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("mb-3 inline-flex text-icon-tertiary [&_svg]:size-14", className)}
      {...rest}
    />
  );
});

export interface PlaceholderTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** @default "h2" */
  as?: React.ElementType;
}

export const PlaceholderTitle = React.forwardRef<HTMLHeadingElement, PlaceholderTitleProps>(function PlaceholderTitle(
  { as: Component = "h2", className, ...rest },
  ref,
) {
  return <Component ref={ref} className={cn("m-0 text-title-2 font-semibold text-foreground", className)} {...rest} />;
});

export type PlaceholderDescriptionProps = React.HTMLAttributes<HTMLDivElement>;

export const PlaceholderDescription = React.forwardRef<HTMLDivElement, PlaceholderDescriptionProps>(
  function PlaceholderDescription({ className, ...rest }, ref) {
    return <div ref={ref} className={cn("mt-2 text-paragraph text-subtle-foreground", className)} {...rest} />;
  },
);

export type PlaceholderActionsProps = React.HTMLAttributes<HTMLDivElement>;

export const PlaceholderActions = React.forwardRef<HTMLDivElement, PlaceholderActionsProps>(function PlaceholderActions(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cn("mt-4 flex flex-wrap justify-center gap-2", className)} {...rest} />;
});

export interface PlaceholderProps extends Omit<PlaceholderContainerProps, "title"> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  /** Heading element for `title`. @default "h2" */
  titleAs?: React.ElementType;
  /** Usually a `Button`. */
  action?: React.ReactNode;
}

const has = (n: React.ReactNode) => n !== undefined && n !== null && n !== false;

const PlaceholderRoot = React.forwardRef<HTMLDivElement, PlaceholderProps>(function Placeholder(
  { icon, title, titleAs, action, children, ...rest },
  ref,
) {
  return (
    <PlaceholderContainer ref={ref} {...rest}>
      {has(icon) && <PlaceholderIcon>{icon}</PlaceholderIcon>}
      {has(title) && <PlaceholderTitle as={titleAs}>{title}</PlaceholderTitle>}
      {has(children) && <PlaceholderDescription>{children}</PlaceholderDescription>}
      {has(action) && <PlaceholderActions>{action}</PlaceholderActions>}
    </PlaceholderContainer>
  );
});

/** Empty state: icon, title, description and an action. */
export const Placeholder = Object.assign(PlaceholderRoot, {
  Container: PlaceholderContainer,
  Icon: PlaceholderIcon,
  Title: PlaceholderTitle,
  Description: PlaceholderDescription,
  Actions: PlaceholderActions,
});

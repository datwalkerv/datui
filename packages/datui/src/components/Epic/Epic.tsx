import * as React from "react";
import { NavStack } from "../../internal/NavStack/NavStack";
import { cn } from "../../lib/utils";

export interface EpicProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Id of the story (`View` or `Root`) to show. */
  activeStory: string;
  /** Bottom navigation, usually a `Tabbar`. Stays pinned to the bottom of the viewport or scroll container. */
  tabbar?: React.ReactNode;
  /** Element wrapping the active story. Use `div` when the page already has a `<main>`. @default "main" */
  contentAs?: React.ElementType;
}

const never = () => false;

/** Tabbed app shell: shows the active story inside `<main>` and the `tabbar` below. Switching is instant; scroll is kept per story. */
export const Epic = React.forwardRef<HTMLDivElement, EpicProps>(function Epic(
  { activeStory, tabbar, contentAs: Content = "main", className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn("flex min-h-full flex-col", className)} {...rest}>
      <Content className="flex-1">
        <NavStack active={activeStory} isBack={never} animate={false} restoreScroll="always">
          {children}
        </NavStack>
      </Content>
      {tabbar}
    </div>
  );
});

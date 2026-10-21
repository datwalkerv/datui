import * as React from "react";
import { useIsomorphicLayoutEffect } from "../../hooks/useIsomorphicLayoutEffect";
import { PortalContainerProvider } from "../../lib/portal";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { useColorScheme } from "../ColorSchemeProvider/ColorSchemeProvider";
import { useDirection } from "../DirectionProvider/DirectionProvider";
import { useLocale } from "../LocaleProvider/LocaleProvider";

export interface AppRootProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * `full` fills the viewport and owns page scroll; `embedded` lives inside an existing page
   * and contains its own scroll and overlays.
   * @default "full"
   */
  mode?: "full" | "embedded";
  /** Force a density instead of deriving it from the viewport and pointer. */
  density?: "compact" | "regular";
}

/**
 * Root container for datui apps. Applies theme, density, direction and locale to the DOM
 * and hosts the portal layer that overlays render into.
 */
export const AppRoot = React.forwardRef<HTMLDivElement, AppRootProps>(function AppRoot(
  { mode = "full", density, className, children, ...rest },
  ref,
) {
  const colorScheme = useColorScheme();
  const direction = useDirection();
  const locale = useLocale();
  const { sizeY } = useAdaptivity();
  const [portal, setPortal] = React.useState<HTMLDivElement | null>(null);
  const attrs = {
    "data-theme": colorScheme,
    "data-density": density ?? sizeY,
    dir: direction,
  } as const;

  // In full mode the whole page is the app: theme <html> too, so the page background, overscroll and
  // native scrollbars match. Restored on unmount.
  useIsomorphicLayoutEffect(() => {
    if (mode !== "full") return;
    const html = document.documentElement;
    const previous = html.getAttribute("data-theme");
    html.setAttribute("data-theme", colorScheme);
    return () => {
      if (previous === null) html.removeAttribute("data-theme");
      else html.setAttribute("data-theme", previous);
    };
  }, [mode, colorScheme]);

  return (
    <div
      ref={ref}
      lang={locale}
      {...attrs}
      className={cn(
        "datui-root bg-background-secondary text-foreground isolate",
        mode === "full" ? "min-h-dvh" : "relative overflow-auto",
        className,
      )}
      {...rest}
    >
      <PortalContainerProvider value={portal}>{children}</PortalContainerProvider>
      <div ref={setPortal} {...attrs} className="datui-root contents" data-datui-portal="" />
    </div>
  );
});

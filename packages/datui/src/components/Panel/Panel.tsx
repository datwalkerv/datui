import * as React from "react";
import { NavPanelIdContext } from "../../internal/NavContext/NavContext";
import { cn } from "../../lib/utils";
import { useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";

export type PanelMode = "plain" | "card";

export interface PanelContextValue {
  mode: PanelMode;
  /** Id the panel's `PanelHeader` title must use; the panel is labelled by it. */
  titleId: string;
  /** Called by `PanelHeader` while it is mounted so the panel only references an existing title. */
  registerTitle: () => () => void;
}

export const PanelContext = React.createContext<PanelContextValue | null>(null);

export function usePanel(): PanelContextValue | null {
  return React.useContext(PanelContext);
}

export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Id used by `View` (`activePanel`, `history`). */
  id: string;
  /** `card` on tablet width and up, `plain` below, unless set. */
  mode?: PanelMode;
  /** Center the content vertically and horizontally (empty states, splash screens). */
  centered?: boolean;
  /** Leave the background transparent. */
  disableBackground?: boolean;
}

/** One screen inside a `View`. Labelled by its `PanelHeader` title. */
export const Panel = React.forwardRef<HTMLElement, PanelProps>(function Panel(
  { id, mode, centered = false, disableBackground = false, className, children, ...rest },
  ref,
) {
  const { sizeX } = useAdaptivity();
  const resolved: PanelMode = mode ?? (sizeX === "regular" ? "card" : "plain");
  const titleId = `${React.useId()}-title`;
  const [titles, setTitles] = React.useState(0);
  const registerTitle = React.useCallback(() => {
    setTitles((n) => n + 1);
    return () => setTitles((n) => n - 1);
  }, []);
  const value = React.useMemo(() => ({ mode: resolved, titleId, registerTitle }), [resolved, titleId, registerTitle]);
  return (
    <NavPanelIdContext.Provider value={id}>
      <PanelContext.Provider value={value}>
        <section
          ref={ref}
          data-panel={id}
          data-mode={resolved}
          aria-labelledby={titles > 0 && !rest["aria-label"] ? titleId : undefined}
          className={cn(
            "relative flex min-h-full w-full flex-col",
            !disableBackground && (resolved === "card" ? "bg-card text-card-foreground" : "bg-background"),
            resolved === "card" && "rounded-xl",
            className,
          )}
          {...rest}
        >
          {centered ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">{children}</div>
          ) : (
            children
          )}
        </section>
      </PanelContext.Provider>
    </NavPanelIdContext.Provider>
  );
});

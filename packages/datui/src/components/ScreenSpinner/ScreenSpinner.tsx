import { Check, CircleX, X } from "lucide-react";
import * as React from "react";
import { Portal } from "../../lib/portal";
import { cn } from "../../lib/utils";
import { Spinner } from "../Spinner/Spinner";

export type ScreenSpinnerState = "loading" | "cancelable" | "done" | "error" | "custom";

export interface ScreenSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "loading" */
  state?: ScreenSpinnerState;
  /** Icon for the `custom` state. */
  customIcon?: React.ReactNode;
  /** `shadow` shows a floating card; `overlay` dims the whole screen. @default "shadow" */
  mode?: "shadow" | "overlay";
  /** Visible text under the icon, announced on change. */
  label?: React.ReactNode;
  /** Announced while loading when there is no `label`. @default "Loading…" */
  loadingLabel?: string;
  /** Accessible name of the cancel button in the `cancelable` state. @default "Cancel" */
  cancelLabel?: string;
  onCancel?: () => void;
  /** Wait this many ms before showing (input is blocked right away). Avoids flashes for quick loads. */
  visibilityDelay?: number;
  noAnimation?: boolean;
  /** Render into the portal layer. @default true */
  portal?: boolean;
}

/** The inventory's ScreenSpinnerLoader: the spinner graphic, shown while loading. */
function ScreenSpinnerLoader({ cancelable }: { cancelable: boolean }) {
  return <Spinner size="xl" label={null} className={cn(cancelable && "opacity-60")} />;
}

/** The inventory's ScreenSpinnerSwapIcon: the cancel button or the done/error/custom icon. */
function ScreenSpinnerSwapIcon({
  state,
  customIcon,
  cancelLabel,
  onCancel,
  animate,
}: {
  state: ScreenSpinnerState;
  customIcon?: React.ReactNode;
  cancelLabel: string;
  onCancel?: () => void;
  animate: boolean;
}) {
  const enter = animate && "animate-scale-in";
  if (state === "cancelable") {
    return (
      <button
        type="button"
        aria-label={cancelLabel}
        onClick={onCancel}
        className="absolute inset-0 m-auto inline-flex size-icon-xl items-center justify-center rounded-full focus-visible:focus-ring"
      >
        <X aria-hidden className="dt-icon-turn size-icon-md" />
      </button>
    );
  }
  const icon =
    state === "done" ? (
      <Check className="dt-icon-draw size-icon-xl text-positive" />
    ) : state === "error" ? (
      <CircleX className="dt-icon-draw size-icon-xl text-destructive [--dt-icon-draw-length:64]" />
    ) : (
      customIcon
    );
  return (
    <span aria-hidden data-icon={state} className={cn("inline-flex [&_svg]:size-icon-xl", enter)}>
      {icon}
    </span>
  );
}

/** Full-screen blocking loader that can turn into a done, error or custom icon, or offer cancel. */
export interface ScreenSpinnerContainerProps
  extends Pick<
      ScreenSpinnerProps,
      "state" | "customIcon" | "mode" | "label" | "loadingLabel" | "cancelLabel" | "onCancel" | "noAnimation"
    >,
    React.HTMLAttributes<HTMLDivElement> {}

/** The status card of `ScreenSpinner` without the fixed full-screen layer, for custom placement. */
export const ScreenSpinnerContainer = React.forwardRef<HTMLDivElement, ScreenSpinnerContainerProps>(
  function ScreenSpinnerContainer(
    {
      state = "loading",
      customIcon,
      mode = "shadow",
      label,
      loadingLabel = "Loading…",
      cancelLabel = "Cancel",
      onCancel,
      noAnimation = false,
      className,
      ...rest
    },
    ref,
  ) {
    const loading = state === "loading" || state === "cancelable";
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "flex flex-col items-center gap-3 rounded-2xl p-6",
          mode === "shadow" ? "bg-popover text-popover-foreground shadow-md" : "text-white",
          className,
        )}
        {...rest}
      >
        <div className="relative grid place-items-center">
          {loading ? (
            <>
              <ScreenSpinnerLoader cancelable={state === "cancelable"} />
              {state === "cancelable" && (
                <ScreenSpinnerSwapIcon
                  state={state}
                  cancelLabel={cancelLabel}
                  onCancel={onCancel}
                  animate={!noAnimation}
                />
              )}
            </>
          ) : (
            <ScreenSpinnerSwapIcon
              state={state}
              customIcon={customIcon}
              cancelLabel={cancelLabel}
              animate={!noAnimation}
            />
          )}
        </div>
        {label ? (
          <div className="max-w-40 text-center text-subhead">{label}</div>
        ) : (
          loading && <span className="sr-only">{loadingLabel}</span>
        )}
      </div>
    );
  },
);

export const ScreenSpinner = React.forwardRef<HTMLDivElement, ScreenSpinnerProps>(function ScreenSpinner(
  {
    state = "loading",
    customIcon,
    mode = "shadow",
    label,
    loadingLabel = "Loading…",
    cancelLabel = "Cancel",
    onCancel,
    visibilityDelay,
    noAnimation = false,
    portal = true,
    className,
    ...rest
  },
  ref,
) {
  const [visible, setVisible] = React.useState(!visibilityDelay);
  React.useEffect(() => {
    if (!visibilityDelay) return;
    const timer = setTimeout(() => setVisible(true), visibilityDelay);
    return () => clearTimeout(timer);
  }, [visibilityDelay]);

  return (
    <Portal disabled={!portal}>
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-modal grid place-items-center",
          mode === "overlay" && "bg-overlay",
          !noAnimation && visible && "animate-fade-in",
          className,
        )}
        {...rest}
      >
        <ScreenSpinnerContainer
          state={state}
          customIcon={customIcon}
          mode={mode}
          label={label}
          loadingLabel={loadingLabel}
          cancelLabel={cancelLabel}
          onCancel={onCancel}
          noAnimation={noAnimation}
          className={cn(!visible && "invisible")}
        />
      </div>
    </Portal>
  );
});

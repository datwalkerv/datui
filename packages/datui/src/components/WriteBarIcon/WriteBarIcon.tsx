import { Check, Paperclip, SendHorizontal } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Tappable } from "../Tappable/Tappable";

export type WriteBarIconMode = "attach" | "send" | "done";

export interface WriteBarIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Preset icon and default label. */
  mode?: WriteBarIconMode;
  /** Badge number, e.g. attached files. */
  count?: number;
  /** Accessible label. Defaults per mode: "Attach", "Send", "Done". Required with a custom icon. */
  label?: string;
}

const presets: Record<WriteBarIconMode, { icon: React.ReactNode; label: string }> = {
  attach: { icon: <Paperclip className="size-icon-lg" aria-hidden />, label: "Attach" },
  send: { icon: <SendHorizontal className="size-icon-lg" aria-hidden />, label: "Send" },
  done: { icon: <Check className="size-icon-lg" aria-hidden />, label: "Done" },
};

/** Icon button for WriteBar slots: attach, send (accent), done, or a custom icon via `children`. */
export const WriteBarIcon = React.forwardRef<HTMLButtonElement, WriteBarIconProps>(function WriteBarIcon(
  { mode, count, label, children, className, ...rest },
  ref,
) {
  const preset = mode ? presets[mode] : undefined;
  const name = label ?? rest["aria-label"] ?? preset?.label;
  const unlabelled = !name && !rest["aria-labelledby"];
  React.useEffect(() => {
    if (unlabelled) console.warn("WriteBarIcon: a custom icon needs `label` (or aria-label) for screen readers.");
  }, [unlabelled]);
  return (
    <Tappable
      ref={ref as React.Ref<HTMLElement>}
      as="button"
      aria-label={name && count !== undefined ? `${name} ${count}` : name}
      className={cn(
        "inline-flex size-control-l shrink-0 items-center justify-center rounded-full",
        mode === "send" || mode === "done" ? "text-primary" : "text-icon-secondary",
        className,
      )}
      {...rest}
    >
      {children ?? preset?.icon}
      {count !== undefined && (
        <span
          aria-hidden
          className="absolute end-0.5 top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-caption-2 font-medium text-primary-foreground"
        >
          {count}
        </span>
      )}
    </Tappable>
  );
});

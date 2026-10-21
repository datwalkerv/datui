import * as React from "react";
import { cn } from "../../lib/utils";

export interface FormStatusProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** `error` is announced immediately (`role="alert"`); `default` politely (`role="status"`). @default "default" */
  mode?: "default" | "error";
  title?: React.ReactNode;
}

/** Form-level message, e.g. a submit error, shown above or below the fields. */
export const FormStatus = React.forwardRef<HTMLDivElement, FormStatusProps>(function FormStatus(
  { mode = "default", title, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={mode === "error" ? "alert" : "status"}
      className={cn(
        "rounded-lg px-4 py-3 text-subhead",
        mode === "error" ? "bg-destructive/8 text-destructive" : "bg-secondary text-foreground",
        className,
      )}
      {...rest}
    >
      {title && <div className="pb-0.5 font-semibold">{title}</div>}
      {children && <div className={mode === "error" ? "text-foreground" : "text-subtle-foreground"}>{children}</div>}
    </div>
  );
});

import * as React from "react";
import { joinIds } from "../../internal/formUtils/formUtils";
import type { FormFieldStatus } from "../FormField/FormField";

export interface FormItemContextValue {
  controlId: string;
  describedById?: string | undefined;
  status: FormFieldStatus;
  required: boolean;
}

export const FormItemContext = React.createContext<FormItemContextValue | null>(null);

export interface FormItemControlProps {
  id?: string | undefined;
  status?: FormFieldStatus | undefined;
  required?: boolean | undefined;
  "aria-describedby"?: string | undefined;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
}

/**
 * Wires a control to its enclosing FormItem: id (for the label), `aria-describedby` (bottom text),
 * `aria-invalid` and `required`. Own props win over the item's values. Use it in every text-like control.
 */
export function useFormItemControl(props: FormItemControlProps) {
  const ctx = React.useContext(FormItemContext);
  const status = props.status ?? ctx?.status ?? "default";
  return {
    status,
    control: {
      id: props.id ?? ctx?.controlId,
      required: props.required ?? (ctx?.required || undefined),
      "aria-describedby": joinIds(props["aria-describedby"], ctx?.describedById),
      "aria-invalid": props["aria-invalid"] ?? (status === "error" || undefined),
    },
  };
}

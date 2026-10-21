import * as React from "react";
import {
  type ChipOption,
  ChipsInputBase,
  type ChipsInputBaseProps,
} from "../../internal/ChipsInputBase/ChipsInputBase";

export type { ChipOption };
export type ChipsInputProps = ChipsInputBaseProps;

/**
 * Free-form tag input. Enter or a delimiter (`,` by default; pasting splits too) turns the typed text into a chip,
 * Backspace in the empty input removes the last chip, each chip has a remove button. Duplicate values are ignored.
 * `ref` points at the text input.
 */
export const ChipsInput = React.forwardRef<HTMLInputElement, ChipsInputProps>(function ChipsInput(props, ref) {
  return <ChipsInputBase ref={ref} {...props} />;
});

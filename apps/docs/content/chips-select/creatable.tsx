"use client";

import { type ChipOption, ChipsSelect, FormItem } from "datui";
import * as React from "react";

const options = [
  { value: "bug", label: "bug" },
  { value: "feature", label: "feature" },
  { value: "docs", label: "docs" },
];

export default function Example() {
  const [labels, setLabels] = React.useState<ChipOption[]>([]);
  return (
    <div className="max-w-md">
      <FormItem top="Labels">
        <ChipsSelect
          options={options}
          value={labels}
          onChange={setLabels}
          creatable="Add label"
          selectedBehavior="hide"
          closeAfterSelect={false}
          placeholder="Type a label"
        />
      </FormItem>
    </div>
  );
}

"use client";

import { ChipsSelect, FormItem } from "datui";

const options = [
  { value: "ts", label: "TypeScript" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "py", label: "Python" },
  { value: "cobol", label: "COBOL", disabled: true },
];

export default function Example() {
  return (
    <div className="max-w-md">
      <FormItem top="Languages">
        <ChipsSelect
          options={options}
          defaultValue={[{ value: "ts", label: "TypeScript" }]}
          placeholder="Pick languages"
        />
      </FormItem>
    </div>
  );
}

"use client";

import { FormItem, Select } from "datui";

const options = [
  { value: "s", label: "Small" },
  { value: "m", label: "Medium" },
  { value: "l", label: "Large" },
  { value: "xl", label: "Extra large", disabled: true },
];

export default function Example() {
  return (
    <div className="max-w-sm">
      <FormItem top="Size">
        <Select options={options} placeholder="Pick a size" onChange={(_, v) => console.log(v)} />
      </FormItem>
    </div>
  );
}

"use client";

import { FormItem, Select } from "datui";

const options = [
  { value: "eu", label: "Europe" },
  { value: "us", label: "United States" },
  { value: "asia", label: "Asia" },
];

export default function Example() {
  return (
    <div className="flex max-w-sm flex-col gap-4">
      <FormItem top="Always native">
        <Select native options={options} defaultValue="eu" />
      </FormItem>
      <FormItem top="Always custom">
        <Select native={false} options={options} defaultValue="us" allowClearButton />
      </FormItem>
    </div>
  );
}

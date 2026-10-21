"use client";

import { CustomSelect, FormItem } from "datui";

const countries = [
  "Argentina",
  "Brazil",
  "Canada",
  "Denmark",
  "Egypt",
  "Finland",
  "Greece",
  "Hungary",
  "India",
  "Japan",
];

export default function Example() {
  return (
    <div className="max-w-sm">
      <FormItem top="Country">
        <CustomSelect
          searchable
          placeholder="Type to search"
          emptyText="No country found"
          options={countries.map((c) => ({ value: c.toLowerCase(), label: c }))}
        />
      </FormItem>
    </div>
  );
}

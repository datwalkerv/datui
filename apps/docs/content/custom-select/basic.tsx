"use client";

import { CustomSelect, FormItem } from "datui";

const options = [
  { value: "lis", label: "Lisbon", group: "Europe" },
  { value: "ber", label: "Berlin", group: "Europe" },
  { value: "mos", label: "Moscow", group: "Europe", disabled: true },
  { value: "tok", label: "Tokyo", group: "Asia" },
  { value: "sel", label: "Seoul", group: "Asia" },
];

export default function Example() {
  return (
    <div className="max-w-sm">
      <FormItem top="City" bottom="Moscow is unavailable">
        <CustomSelect options={options} placeholder="Choose a city" allowClearButton name="city" />
      </FormItem>
    </div>
  );
}

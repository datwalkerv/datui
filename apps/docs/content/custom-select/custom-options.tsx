"use client";

import { CustomSelect, CustomSelectOption, FormItem } from "datui";
import { Cloud, HardDrive, Server } from "lucide-react";

const options = [
  { value: "local", label: "Local disk", description: "Fast, not backed up", before: <HardDrive aria-hidden /> },
  { value: "nas", label: "Network storage", description: "Shared in the office", before: <Server aria-hidden /> },
  { value: "cloud", label: "Cloud", description: "Synced everywhere", before: <Cloud aria-hidden /> },
];

export default function Example() {
  return (
    <div className="max-w-sm">
      <FormItem top="Storage">
        <CustomSelect
          options={options}
          defaultValue="cloud"
          renderOption={(props) => <CustomSelectOption {...props} textNoWrap />}
        />
      </FormItem>
    </div>
  );
}

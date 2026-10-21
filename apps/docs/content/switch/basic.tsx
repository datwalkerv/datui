"use client";

import { Switch } from "datui";

const rows = [
  { id: "wifi", label: "Wi-Fi", defaultChecked: true },
  { id: "bluetooth", label: "Bluetooth" },
  { id: "airplane", label: "Airplane mode", disabled: true },
];

export default function Example() {
  return (
    <div className="flex flex-col gap-3">
      {rows.map(({ id, label, ...props }) => (
        <div key={id} className="flex items-center gap-3">
          <Switch id={id} {...props} />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
    </div>
  );
}

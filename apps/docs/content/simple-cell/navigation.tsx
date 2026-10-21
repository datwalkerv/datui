"use client";

import { SimpleCell } from "datui";
import { Bell, Lock, Wifi } from "lucide-react";

export default function Example() {
  return (
    <div className="max-w-md rounded-lg bg-card">
      <SimpleCell before={<Wifi className="size-icon-lg text-primary" />} indicator="Home" chevron onClick={() => {}}>
        Wi-Fi
      </SimpleCell>
      <SimpleCell before={<Bell className="size-icon-lg text-primary" />} chevron href="#notifications">
        Notifications
      </SimpleCell>
      <SimpleCell before={<Lock className="size-icon-lg text-primary" />} chevron disabled onClick={() => {}}>
        Privacy
      </SimpleCell>
    </div>
  );
}

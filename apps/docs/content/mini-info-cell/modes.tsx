"use client";

import { MiniInfoCell } from "datui";
import { Briefcase, Home, Info, Plus } from "lucide-react";

export default function Example() {
  return (
    <div className="max-w-md rounded-lg bg-card py-2">
      <MiniInfoCell before={<Home className="size-icon-md" />}>Lives in Lisbon</MiniInfoCell>
      <MiniInfoCell before={<Briefcase className="size-icon-md" />} mode="accent" onClick={() => {}}>
        Works at Studio North
      </MiniInfoCell>
      <MiniInfoCell before={<Plus className="size-icon-md" />} mode="add" onClick={() => {}}>
        Add education
      </MiniInfoCell>
      <MiniInfoCell before={<Info className="size-icon-md" />} mode="more" chevron onClick={() => {}}>
        Show more
      </MiniInfoCell>
    </div>
  );
}

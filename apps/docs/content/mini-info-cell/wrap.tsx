"use client";

import { MiniInfoCell } from "datui";
import { Info } from "lucide-react";

const text =
  "A long status line that does not fit on one line. It keeps going so you can see the difference between truncating, clamping to three lines and wrapping freely across as many lines as it needs.";

export default function Example() {
  return (
    <div className="grid max-w-sm gap-3 rounded-lg bg-card py-2">
      {(["nowrap", "short", "full"] as const).map((wrap) => (
        <MiniInfoCell key={wrap} before={<Info className="size-icon-md" />} textWrap={wrap}>
          {text}
        </MiniInfoCell>
      ))}
    </div>
  );
}

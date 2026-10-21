"use client";

import { HorizontalCell } from "datui";
import { Image } from "lucide-react";

function Media({ wide }: { wide?: boolean }) {
  return (
    <span
      className={`flex items-center justify-center rounded-lg bg-secondary text-primary ${wide ? "h-24 w-full" : "size-14 rounded-full"}`}
    >
      <Image aria-hidden className="size-icon-lg" />
    </span>
  );
}

export default function Example() {
  return (
    <ul className="m-0 flex list-none gap-1 overflow-x-auto p-0">
      {(["s", "m", "l", "xl"] as const).map((size) => (
        <li key={size}>
          <HorizontalCell size={size} title={`Size ${size}`} subtitle="Subtitle" onClick={() => {}}>
            <Media wide={size !== "s"} />
          </HorizontalCell>
        </li>
      ))}
      <li>
        <HorizontalCell size={160} title="160px" onClick={() => {}}>
          <Media wide />
        </HorizontalCell>
      </li>
    </ul>
  );
}

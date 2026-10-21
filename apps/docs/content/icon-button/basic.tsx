"use client";

import { IconButton } from "datui";
import { House, Search, Settings } from "lucide-react";

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <IconButton label="Settings" onClick={() => {}}>
        <Settings />
      </IconButton>
      <IconButton label="Search" size="s" onClick={() => {}}>
        <Search />
      </IconButton>
      <IconButton label="Home" href="#home">
        <House />
      </IconButton>
      <IconButton label="Disabled" disabled onClick={() => {}}>
        <Settings />
      </IconButton>
    </div>
  );
}

"use client";

import { SimpleCell } from "datui";
import { Music } from "lucide-react";

export default function Example() {
  return (
    <div className="max-w-md rounded-lg bg-card">
      <SimpleCell
        before={<Music className="size-icon-xl text-primary" />}
        overTitle="Now playing"
        subtitle="Album · 2024"
        extraSubtitle="12 tracks, 48 minutes"
        after={<span className="text-footnote text-muted-foreground">3:45</span>}
        onClick={() => {}}
      >
        A very long track title that is truncated when it does not fit
      </SimpleCell>
      <SimpleCell multiline subtitle="This subtitle wraps onto several lines instead of being cut with an ellipsis.">
        Multiline row with a long title that wraps instead of truncating
      </SimpleCell>
    </div>
  );
}

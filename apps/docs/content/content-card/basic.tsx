"use client";

import { ContentCard } from "datui";

export default function Example() {
  return (
    <div className="grid max-w-xl grid-cols-2 gap-3">
      <ContentCard
        src="/images/photo-5.svg"
        maxHeight={140}
        overTitle="Travel"
        title="Lisbon in three days"
        description="Trams, tiles and pastel de nata."
        caption="5 min read"
        href="#lisbon"
      />
      <ContentCard variant="outline" title="No image" description="A static card with text only." caption="Today" />
    </div>
  );
}

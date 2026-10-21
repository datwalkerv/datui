"use client";

import { DropZone, DropZoneGrid } from "datui";
import { ImageUp } from "lucide-react";
import { useState } from "react";

export default function Example() {
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div className="grid gap-3">
      <DropZoneGrid>
        <DropZone accept="image/*" multiple onFiles={(f) => setFiles(f.map((x) => x.name))}>
          {({ active }) => (
            <>
              <ImageUp className="size-icon-xl" aria-hidden />
              {active ? "Release to upload" : "Drop images or press to browse"}
            </>
          )}
        </DropZone>
        <DropZone onDrop={(e) => setFiles(Array.from(e.dataTransfer.files).map((x) => x.name))}>
          Drop target only
        </DropZone>
      </DropZoneGrid>
      <p aria-live="polite" className="text-footnote text-muted-foreground">
        {files.length ? `Added: ${files.join(", ")}` : "No files yet"}
      </p>
    </div>
  );
}

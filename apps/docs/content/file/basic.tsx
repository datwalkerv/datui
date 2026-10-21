"use client";

import { File } from "datui";
import { Upload } from "lucide-react";
import { useState } from "react";

export default function Example() {
  const [names, setNames] = useState<string[]>([]);
  return (
    <div className="flex flex-col items-start gap-3">
      <File
        multiple
        before={<Upload className="size-icon-md" />}
        onChange={(e) => setNames(Array.from(e.target.files ?? []).map((f) => f.name))}
      >
        Upload files
      </File>
      <File variant="secondary" accept="image/*">
        Choose photo
      </File>
      <p aria-live="polite" className="text-footnote text-muted-foreground">
        {names.length ? names.join(", ") : "No files selected"}
      </p>
    </div>
  );
}

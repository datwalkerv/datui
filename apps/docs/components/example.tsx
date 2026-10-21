"use client";

import { cn } from "datui";
import * as React from "react";
import { CodeBlock } from "./code-block";

export function Example({
  id,
  title,
  description,
  code,
  clientOnly,
  children,
}: {
  clientOnly?: boolean | undefined;
  id: string;
  title: string;
  description?: React.ReactNode;
  code: string;
  children: React.ReactNode;
}) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const tabClass = (active: boolean) =>
    cn(
      "border-0 border-b-2 border-transparent bg-transparent px-1 pb-2 text-subhead font-medium text-subtle-foreground cursor-pointer focus-visible:focus-ring",
      active && "border-primary text-foreground",
    );
  return (
    <div className="mb-10">
      <h3 id={`${id}-title`} className="m-0 mb-1 text-title-3 font-semibold">
        {title}
      </h3>
      {description && <p className="m-0 mb-3 text-subhead text-subtle-foreground">{description}</p>}
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div role="tablist" aria-label={`${title} view`} className="flex gap-4 border-b border-border px-4 pt-3">
          <button
            type="button"
            role="tab"
            id={`${id}-tab-preview`}
            aria-selected={tab === "preview"}
            aria-controls={`${id}-panel`}
            className={tabClass(tab === "preview")}
            onClick={() => setTab("preview")}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            id={`${id}-tab-code`}
            aria-selected={tab === "code"}
            aria-controls={`${id}-panel`}
            className={tabClass(tab === "code")}
            onClick={() => setTab("code")}
          >
            Code
          </button>
        </div>
        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${tab}`}>
          {tab === "preview" ? (
            <div className="p-6" data-example-preview="">
              {clientOnly && !mounted ? null : children}
            </div>
          ) : (
            <CodeBlock code={code} label={`${title} source`} />
          )}
        </div>
      </div>
    </div>
  );
}

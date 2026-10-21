"use client";

import { Check, Copy } from "lucide-react";
import * as React from "react";

export function CodeBlock({ code }: { code: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="relative">
      <pre
        // biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable code must be keyboard-scrollable
        tabIndex={0}
        className="m-0 max-h-[480px] overflow-auto bg-background-tertiary p-4 font-mono text-footnote text-foreground"
      >
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2 right-2 inline-flex size-control-s items-center justify-center rounded-sm border-0 bg-card text-subtle-foreground shadow-sm hover:text-foreground focus-visible:focus-ring"
      >
        {copied ? <Check className="size-icon-sm" aria-hidden /> : <Copy className="size-icon-sm" aria-hidden />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Code copied to clipboard" : ""}
      </span>
    </div>
  );
}

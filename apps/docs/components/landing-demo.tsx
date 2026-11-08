"use client";

import * as React from "react";

/** Live example preview on the landing page; `clientOnly` examples (dates, times) wait for hydration. */
export function LandingDemo({ clientOnly, children }: { clientOnly?: boolean | undefined; children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <div className="relative isolate max-h-[480px] min-w-0 overflow-auto p-5" data-example-preview="">
      {clientOnly && !mounted ? null : children}
    </div>
  );
}

import type * as React from "react";

export interface AdaptiveIconRendererProps {
  /** Icon shown at regular density. */
  iconRegular: React.ReactNode;
  /** Icon shown under `[data-density="compact"]`. Falls back to `iconRegular`. */
  iconCompact?: React.ReactNode;
}

/**
 * Renders the density-appropriate icon. Both are rendered and switched with CSS, so the choice
 * follows `AppRoot`'s `data-density` without a re-render and is correct on the server.
 */
export function AdaptiveIconRenderer({ iconRegular, iconCompact }: AdaptiveIconRendererProps) {
  if (!iconCompact) {
    return (
      <span className="inline-flex shrink-0" aria-hidden>
        {iconRegular}
      </span>
    );
  }
  return (
    <>
      <span className="inline-flex shrink-0 in-data-[density=compact]:hidden" aria-hidden data-density-icon="regular">
        {iconRegular}
      </span>
      <span className="hidden shrink-0 in-data-[density=compact]:inline-flex" aria-hidden data-density-icon="compact">
        {iconCompact}
      </span>
    </>
  );
}

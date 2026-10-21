"use client";

import { ContentBadge } from "datui";
import { Star } from "lucide-react";
import type * as React from "react";

export default function Example() {
  return (
    <div className="grid gap-3">
      {(["primary", "secondary", "outline"] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-2">
          {(["accent", "neutral", "positive", "negative"] as const).map((appearance) => (
            <ContentBadge key={appearance} variant={variant} appearance={appearance}>
              {appearance}
            </ContentBadge>
          ))}
          {/* A theme-aware custom color: the variables switch with the color scheme (see globals.css). */}
          <ContentBadge
            variant={variant}
            appearance="var(--docs-brand)"
            style={{ "--dt-content-badge-foreground": "var(--docs-brand-foreground)" } as React.CSSProperties}
          >
            custom
          </ContentBadge>
        </div>
      ))}
      <div className="flex items-center gap-2">
        <ContentBadge size="s">S</ContentBadge>
        <ContentBadge size="m" capsule>
          <ContentBadge.IconSlot>
            <Star />
          </ContentBadge.IconSlot>
          Top
        </ContentBadge>
        <ContentBadge size="l" weight="1">
          Large
        </ContentBadge>
        <ContentBadge size="l" aria-label="Favorite">
          <ContentBadge.IconSlot>
            <Star />
          </ContentBadge.IconSlot>
        </ContentBadge>
      </div>
    </div>
  );
}

"use client";

import { EllipsisText } from "datui";

const text =
  "datui components share one token set, so spacing, radii and type stay consistent no matter how many you combine on a page.";

export default function Example() {
  return (
    <div className="grid max-w-xs gap-3 text-body">
      <EllipsisText>{text}</EllipsisText>
      <EllipsisText maxLines={2}>{text}</EllipsisText>
    </div>
  );
}

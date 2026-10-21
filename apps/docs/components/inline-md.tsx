import * as React from "react";

/** Renders `code` spans in short doc strings. */
export function InlineMd({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/).map((part, i) =>
        part.startsWith("`") ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: static split of an immutable string
          <code key={i} className="rounded-xs bg-secondary px-1 font-mono text-[0.9em]">
            {part.slice(1, -1)}
          </code>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: static split of an immutable string
          <React.Fragment key={i}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

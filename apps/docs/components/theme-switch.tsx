"use client";

import { cn } from "datui";
import { useDocsTheme } from "./providers";

const options = ["light", "dark", "system"] as const;

export function ThemeSwitch() {
  const { scheme, setScheme } = useDocsTheme();
  return (
    <fieldset className="m-0 flex gap-0.5 rounded-md border-0 bg-secondary p-0.5">
      <legend className="sr-only">Color scheme</legend>
      {options.map((o) => (
        <label
          key={o}
          className={cn(
            "cursor-pointer rounded-sm px-2.5 py-1 text-caption-1 font-medium capitalize text-subtle-foreground has-focus-visible:focus-ring",
            scheme === o && "bg-card text-foreground shadow-sm",
          )}
        >
          <input
            type="radio"
            name="theme"
            value={o}
            checked={scheme === o}
            onChange={() => setScheme(o)}
            className="sr-only"
          />
          {o}
        </label>
      ))}
    </fieldset>
  );
}

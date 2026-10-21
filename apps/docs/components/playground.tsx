"use client";

import * as datui from "datui";
import * as React from "react";
import type { PlaygroundControl } from "@/lib/types";
import { CodeBlock } from "./code-block";

function initial(controls: Record<string, PlaygroundControl>) {
  return Object.fromEntries(
    Object.entries(controls).map(([k, c]) => [k, c.default ?? (c.type === "boolean" ? false : undefined)]),
  );
}

function toJsx(name: string, values: Record<string, unknown>) {
  const { children, ...rest } = values;
  const attrs = Object.entries(rest)
    .filter(([, v]) => v !== undefined && v !== false && v !== "")
    .map(([k, v]) => (v === true ? k : typeof v === "number" ? `${k}={${v}}` : `${k}="${v}"`));
  const open = `<${name}${attrs.length ? ` ${attrs.join(" ")}` : ""}`;
  return children ? `${open}>${children}</${name}>` : `${open} />`;
}

export function Playground({
  component,
  controls,
  baseProps,
}: {
  component: string;
  controls: Record<string, PlaygroundControl>;
  baseProps?: Record<string, unknown> | undefined;
}) {
  const Component = (datui as unknown as Record<string, React.ElementType>)[component];
  const [values, setValues] = React.useState<Record<string, unknown>>(() => initial(controls));
  if (!Component) return null;
  const set = (k: string, v: unknown) => setValues((prev) => ({ ...prev, [k]: v }));
  const { children, ...props } = values;
  const field =
    "h-control-s w-full rounded-sm border border-input-border bg-input px-2 text-footnote text-foreground focus-visible:focus-ring";

  return (
    <section aria-labelledby="playground" className="mb-10">
      <h2 id="playground" className="m-0 mb-3 text-title-2 font-semibold">
        Playground
      </h2>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="grid tablet:grid-cols-[1fr_240px]">
          <div className="flex min-h-48 items-center justify-center p-8" data-playground-preview="">
            <Component {...baseProps} {...props}>
              {children as React.ReactNode}
            </Component>
          </div>
          <form
            aria-label="Playground controls"
            className="grid content-start gap-3 border-t border-border p-4 tablet:border-t-0 tablet:border-l"
            onSubmit={(e) => e.preventDefault()}
          >
            {Object.entries(controls).map(([name, c]) => {
              const id = `pg-${name}`;
              if (c.type === "boolean")
                return (
                  <label key={name} htmlFor={id} className="flex items-center justify-between gap-2 text-footnote">
                    <span className="font-mono">{name}</span>
                    <input
                      id={id}
                      type="checkbox"
                      checked={Boolean(values[name])}
                      onChange={(e) => set(name, e.target.checked)}
                    />
                  </label>
                );
              return (
                <label key={name} htmlFor={id} className="grid gap-1 text-footnote">
                  <span className="font-mono">{name}</span>
                  {c.type === "select" ? (
                    <select
                      id={id}
                      className={field}
                      value={String(values[name] ?? "")}
                      onChange={(e) => set(name, e.target.value || undefined)}
                    >
                      {c.default === undefined && <option value="">—</option>}
                      {c.options.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={id}
                      className={field}
                      type={c.type === "number" ? "number" : "text"}
                      min={c.type === "number" ? c.min : undefined}
                      max={c.type === "number" ? c.max : undefined}
                      step={c.type === "number" ? c.step : undefined}
                      value={String(values[name] ?? "")}
                      onChange={(e) =>
                        set(
                          name,
                          c.type === "number"
                            ? e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                            : e.target.value,
                        )
                      }
                    />
                  )}
                </label>
              );
            })}
          </form>
        </div>
        <div className="border-t border-border">
          <CodeBlock code={toJsx(component, values)} label="Playground code" />
        </div>
      </div>
    </section>
  );
}

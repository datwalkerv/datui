import props from "@/generated/props.json";

type PropDoc = { name: string; type: string; required: boolean; default?: string | null; description: string };
const table = props as Record<string, { description: string; props: PropDoc[] }>;

const cleanType = (t: string) => t.replace(/ \| null$/, "").replace(/^null \| /, "");

export function PropsTable({ component }: { component: string }) {
  const doc = table[component];
  if (!doc) return null;
  return (
    <div className="mb-10">
      <h3 id={`props-${component}`} className="m-0 mb-1 font-mono text-title-3">
        {component}
      </h3>
      {doc.description && <p className="m-0 mb-3 text-subhead text-subtle-foreground">{doc.description}</p>}
      {doc.props.length === 0 ? (
        <p className="text-subhead text-muted-foreground">Accepts the standard attributes of its root element.</p>
      ) : (
        <div
          // biome-ignore lint/a11y/noNoninteractiveTabindex: horizontally scrollable table must be keyboard-scrollable
          tabIndex={0}
          className="overflow-x-auto rounded-lg border border-border bg-card focus-visible:focus-ring"
        >
          <table className="w-full border-collapse text-left text-footnote">
            <thead className="bg-background-tertiary text-subtle-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Prop</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">Default</th>
                <th className="px-3 py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {doc.props.map((p) => (
                <tr key={p.name} className="border-t border-border align-top">
                  <td className="px-3 py-2 font-mono whitespace-nowrap">
                    {p.name}
                    {p.required && (
                      <>
                        <span className="text-destructive" aria-hidden>
                          *
                        </span>
                        <span className="sr-only"> (required)</span>
                      </>
                    )}
                  </td>
                  <td className="max-w-[320px] px-3 py-2 font-mono text-accent-foreground break-words">
                    {cleanType(p.type)}
                  </td>
                  <td className="px-3 py-2 font-mono whitespace-nowrap">{p.default ?? "—"}</td>
                  <td className="px-3 py-2 text-subtle-foreground">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

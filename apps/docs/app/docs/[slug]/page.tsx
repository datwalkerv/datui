import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Example } from "@/components/example";
import { InlineMd } from "@/components/inline-md";
import { Playground } from "@/components/playground";
import { PropsTable } from "@/components/props-table";
import { registry } from "@/generated/registry";
import sources from "@/generated/sources.json";

const code = sources as Record<string, string>;

export function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const entry = registry[(await params).slug];
  return entry ? { title: entry.meta.title, description: entry.meta.description } : {};
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = registry[slug];
  if (!entry) notFound();
  const { meta, examples } = entry;
  const primary = meta.components[0];

  return (
    <article className="max-w-[960px]">
      <p className="m-0 mb-1 text-subhead text-muted-foreground">{meta.category}</p>
      <h1 className="m-0 mb-2 text-display-4 font-bold">{meta.title}</h1>
      <p className="m-0 mb-6 text-body text-subtle-foreground">
        <InlineMd text={meta.description} />
      </p>
      <pre
        // biome-ignore lint/a11y/noNoninteractiveTabindex: may scroll horizontally on narrow screens
        tabIndex={0}
        className="m-0 mb-8 overflow-x-auto rounded-md bg-card p-3 font-mono text-footnote focus-visible:focus-ring"
      >
        <code>{`import { ${meta.components.join(", ")} } from "datui";`}</code>
      </pre>

      {meta.playground && primary && (
        <Playground component={primary} controls={meta.playground} baseProps={meta.playgroundProps} />
      )}

      <h2 className="m-0 mb-4 text-title-2 font-semibold">Examples</h2>
      {meta.examples.map((ex) => {
        const Comp = examples[ex.file];
        if (!Comp) throw new Error(`Missing example ${slug}/${ex.file}`);
        return (
          <Example
            key={ex.file}
            id={`${slug}-${ex.file}`}
            title={ex.title}
            description={ex.description && <InlineMd text={ex.description} />}
            code={code[`${slug}/${ex.file}`] ?? ""}
            clientOnly={ex.clientOnly}
          >
            <Comp />
          </Example>
        );
      })}

      <h2 className="m-0 mb-4 text-title-2 font-semibold">Accessibility</h2>
      <ul className="mb-10 grid gap-2 pl-5 text-subhead">
        {meta.a11y.map((note) => (
          <li key={note}>
            <InlineMd text={note} />
          </li>
        ))}
      </ul>

      <h2 className="m-0 mb-4 text-title-2 font-semibold">API</h2>
      {meta.components.map((c) => (
        <PropsTable key={c} component={c} />
      ))}
    </article>
  );
}

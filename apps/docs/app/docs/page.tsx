import Link from "next/link";
import { InlineMd } from "@/components/inline-md";
import { grouped } from "@/lib/nav";

export const metadata = { title: "Components" };

export default function DocsIndex() {
  return (
    <div className="max-w-[1100px]">
      <h1 className="m-0 mb-2 text-display-4 font-bold">Components</h1>
      <p className="m-0 mb-8 text-body text-subtle-foreground">
        Every datui component, grouped by purpose. Use the sidebar search to filter.
      </p>
      {grouped.map((g) => (
        <section key={g.category} className="mb-10" aria-labelledby={`cat-${g.category}`}>
          <h2 id={`cat-${g.category}`} className="m-0 mb-3 text-title-2 font-semibold">
            {g.category}
          </h2>
          <ul className="m-0 grid list-none gap-3 p-0 tablet:grid-cols-2 desktop:grid-cols-3">
            {g.items.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/docs/${i.slug}`}
                  className="block h-full rounded-lg border border-border bg-card p-4 text-foreground no-underline hover:shadow-md focus-visible:focus-ring"
                >
                  <span className="block text-headline-1 font-medium">{i.title}</span>
                  <span className="mt-1 block text-footnote text-subtle-foreground">
                    <InlineMd text={i.description} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

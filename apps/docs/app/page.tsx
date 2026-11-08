import { cn } from "datui";
import Link from "next/link";
import { InlineMd } from "@/components/inline-md";
import { LandingDemo } from "@/components/landing-demo";
import { SiteHeader } from "@/components/site-header";
import { registry } from "@/generated/registry";
import { componentPages, grouped, guides } from "@/lib/nav";

// Demos that need room: they span two grid columns.
const wide = new Set([
  "calendar",
  "calendar-range",
  "panel",
  "panel-header",
  "view",
  "split-layout",
  "gallery",
  "tabbar",
  "epic",
  "card-scroll",
  "horizontal-scroll",
  "subnavigation-bar",
  "typography",
]);

const anchor = (category: string) => category.toLowerCase().replace(/[^a-z]+/g, "-");

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1400px] px-4 pb-16">
        <section className="py-16 text-center">
          <h1 className="m-0 mb-4 text-display-1 font-bold">datui</h1>
          <p className="mx-auto mb-8 max-w-[640px] text-title-3 font-normal text-subtle-foreground">
            {componentPages.length} accessible React components with design tokens, light and dark themes and keyboard
            support. Every one of them is live below.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/docs/installation"
              className="inline-flex h-control-l items-center rounded-md bg-primary px-5 text-body font-medium text-primary-foreground no-underline focus-visible:focus-ring"
            >
              Get started
            </Link>
            <Link
              href="/docs"
              className="inline-flex h-control-l items-center rounded-md bg-secondary px-5 text-body font-medium text-secondary-foreground no-underline focus-visible:focus-ring"
            >
              Browse docs
            </Link>
          </div>
          <pre className="mx-auto mt-8 inline-block rounded-md bg-card px-4 py-2 font-mono text-footnote">
            <code>pnpm add datui</code>
          </pre>
        </section>

        <nav
          aria-label="Categories"
          className="sticky top-14 z-sticky -mx-4 mb-8 flex gap-2 overflow-x-auto border-b border-border bg-background-secondary/90 px-4 py-3 backdrop-blur"
        >
          {grouped.map(({ category, items }) => (
            <a
              key={category}
              href={`#${anchor(category)}`}
              className="shrink-0 rounded-full bg-secondary px-3 py-1 text-subhead text-secondary-foreground no-underline hover:bg-secondary-hover focus-visible:focus-ring"
            >
              {category} <span className="text-subtle-foreground">{items.length}</span>
            </a>
          ))}
        </nav>

        {grouped.map(({ category, items }) => (
          <section
            key={category}
            id={anchor(category)}
            aria-labelledby={`${anchor(category)}-title`}
            className="mb-16 scroll-mt-32"
          >
            <h2 id={`${anchor(category)}-title`} className="m-0 mb-4 text-title-1 font-bold">
              {category}
            </h2>
            <div className="grid gap-4 tablet:grid-cols-2 desktop:grid-cols-3">
              {items.map(({ slug, title, description }) => {
                const { meta, examples } = registry[slug]!;
                const ex = meta.examples[0];
                const Demo = ex && examples[ex.file];
                return (
                  <article
                    key={slug}
                    className={cn(
                      "flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card",
                      wide.has(slug) && "tablet:col-span-2",
                    )}
                  >
                    <header className="border-b border-border px-5 py-4">
                      <h3 className="m-0 text-headline-1 font-semibold">
                        <Link
                          href={`/docs/${slug}`}
                          className="text-foreground no-underline hover:underline focus-visible:focus-ring"
                        >
                          {title}
                        </Link>
                      </h3>
                      <p className="m-0 mt-1 line-clamp-2 text-footnote text-subtle-foreground">
                        <InlineMd text={description} />
                      </p>
                    </header>
                    {Demo && (
                      <LandingDemo clientOnly={ex.clientOnly}>
                        <Demo />
                      </LandingDemo>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-6 px-4 py-8 text-subhead">
          <span className="font-bold">datui</span>
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/docs/${g.slug}`}
              className="text-subtle-foreground no-underline hover:text-foreground"
            >
              {g.title}
            </Link>
          ))}
          <span className="ml-auto text-subtle-foreground">{componentPages.length} components</span>
        </div>
      </footer>
    </>
  );
}

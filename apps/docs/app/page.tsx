import Link from "next/link";
import { LandingShowcase } from "@/components/landing-showcase";
import { SiteHeader } from "@/components/site-header";
import { componentPages } from "@/lib/nav";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1100px] px-4 py-16">
        <section className="mb-16 text-center">
          <h1 className="m-0 mb-4 text-display-1 font-bold">datui</h1>
          <p className="mx-auto mb-8 max-w-[640px] text-title-3 font-normal text-subtle-foreground">
            A complete React component library: {componentPages.length} documented components with design tokens, light
            and dark themes, keyboard support and accessible defaults — built on Tailwind CSS and Radix primitives.
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
              Browse components
            </Link>
          </div>
          <pre className="mx-auto mt-8 inline-block rounded-md bg-card px-4 py-2 font-mono text-footnote">
            <code>pnpm add datui</code>
          </pre>
        </section>
        <LandingShowcase />
      </main>
    </>
  );
}

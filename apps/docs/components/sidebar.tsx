"use client";

import { cn } from "datui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { grouped, guides } from "@/lib/nav";

export function Sidebar() {
  const pathname = usePathname();
  const [query, setQuery] = React.useState("");
  const q = query.trim().toLowerCase();
  const groups = grouped
    .map((g) => ({ ...g, items: g.items.filter((i) => !q || i.title.toLowerCase().includes(q)) }))
    .filter((g) => g.items.length > 0);

  const link = (href: string, title: string) => (
    <li key={href}>
      <Link
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        className={cn(
          "block rounded-md px-3 py-1.5 text-subhead text-subtle-foreground no-underline hover:bg-secondary hover:text-foreground focus-visible:focus-ring",
          pathname === href && "bg-accent font-medium text-accent-foreground",
        )}
      >
        {title}
      </Link>
    </li>
  );

  return (
    <nav aria-label="Documentation" className="flex flex-col gap-4">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search components"
        aria-label="Search components"
        className="h-control-m w-full rounded-md border border-input-border bg-input px-3 text-subhead text-foreground outline-none placeholder:text-muted-foreground focus-visible:focus-ring"
      />
      {!q && (
        <section>
          <h2 className="mb-1 px-3 text-caption-1 font-semibold uppercase tracking-wide text-muted-foreground">
            Guides
          </h2>
          <ul className="m-0 list-none p-0">
            {link("/docs", "Overview")}
            {guides.map((g) => link(`/docs/${g.slug}`, g.title))}
          </ul>
        </section>
      )}
      {groups.map((g) => (
        <section key={g.category}>
          <h2 className="mb-1 px-3 text-caption-1 font-semibold uppercase tracking-wide text-muted-foreground">
            {g.category}
          </h2>
          <ul className="m-0 list-none p-0">{g.items.map((i) => link(`/docs/${i.slug}`, i.title))}</ul>
        </section>
      ))}
      {groups.length === 0 && <p className="px-3 text-subhead text-muted-foreground">No components match “{query}”.</p>}
    </nav>
  );
}

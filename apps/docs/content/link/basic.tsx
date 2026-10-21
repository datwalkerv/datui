"use client";

import { Link } from "datui";
import { ExternalLink } from "lucide-react";

export default function Example() {
  return (
    <p className="text-body">
      Read the <Link href="#guide">guide</Link>, open the{" "}
      <Link href="https://example.com" target="_blank" rel="noreferrer" after={<ExternalLink />}>
        website
      </Link>{" "}
      or <Link onClick={() => alert("Clicked")}>run an action</Link>.{" "}
      <Link href="#visited" hasVisited>
        Visited style
      </Link>
      ,{" "}
      <Link href="#plain" noUnderline>
        no underline
      </Link>{" "}
      and{" "}
      <Link href="#off" disabled>
        disabled
      </Link>
      .
    </p>
  );
}

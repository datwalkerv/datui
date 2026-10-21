"use client";

import { Button, Search } from "datui";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export default function Example() {
  const [query, setQuery] = useState("");
  return (
    <div className="max-w-md">
      <Search
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        icon={<SlidersHorizontal className="size-icon-md" aria-hidden />}
        onIconClick={() => alert("Filters")}
        iconLabel="Filters"
        onFindButtonClick={() => alert(`Find ${query}`)}
        after={
          query && (
            <Button variant="tertiary" onClick={() => setQuery("")}>
              Cancel
            </Button>
          )
        }
      />
    </div>
  );
}

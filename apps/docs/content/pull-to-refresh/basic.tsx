"use client";

import { PullToRefresh } from "datui";
import { useState } from "react";

export default function Example() {
  const [fetching, setFetching] = useState(false);
  const [items, setItems] = useState(["First post", "Second post", "Third post"]);
  return (
    <div className="h-72 overflow-auto rounded-lg border">
      <PullToRefresh
        isFetching={fetching}
        onRefresh={() => {
          setFetching(true);
          setTimeout(() => {
            setItems((prev) => [`New post ${prev.length + 1}`, ...prev]);
            setFetching(false);
          }, 1500);
        }}
      >
        <ul className="m-0 list-none p-0">
          {items.map((item) => (
            <li key={item} className="border-b px-4 py-3 text-body">
              {item}
            </li>
          ))}
        </ul>
      </PullToRefresh>
    </div>
  );
}

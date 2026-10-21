"use client";

import { Pagination } from "datui";
import { useState } from "react";

export default function Example() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      navigationLabel="Article pages"
      currentPage={page}
      totalPages={8}
      navigationButtonsStyle="both"
      onChange={(p, event) => {
        event.preventDefault();
        setPage(p);
      }}
      renderPageButton={({ page: p, isCurrent: _current, disabled: _disabled, ...props }) => (
        <a href={`#page-${p}`} {...props} />
      )}
    />
  );
}

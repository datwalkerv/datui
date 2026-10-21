"use client";

import { Pagination } from "datui";
import { useState } from "react";

export default function Example() {
  const [page, setPage] = useState(7);
  return (
    <div className="grid gap-3">
      <Pagination navigationLabel="Pages (default)" currentPage={page} totalPages={20} onChange={setPage} />
      <Pagination
        navigationLabel="Pages (wider)"
        currentPage={page}
        totalPages={20}
        siblingCount={2}
        boundaryCount={2}
        onChange={setPage}
      />
    </div>
  );
}

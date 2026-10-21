"use client";

import { ActionSheet, ActionSheetItem, Button } from "datui";
import { useRef, useState } from "react";

const options = ["Newest", "Oldest", "Most popular"];

export default function Example() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("Newest");
  const anchorRef = useRef<HTMLElement>(null);
  return (
    <>
      <Button ref={anchorRef} variant="secondary" onClick={() => setOpen(true)}>
        Sort: {sort}
      </Button>
      <ActionSheet
        open={open}
        onOpenChange={setOpen}
        anchorRef={anchorRef}
        mode="sheet"
        title="Sort by"
        description="Applies to this list only."
      >
        {options.map((option) => (
          <ActionSheetItem key={option} selectable checked={sort === option} onClick={() => setSort(option)}>
            {option}
          </ActionSheetItem>
        ))}
      </ActionSheet>
    </>
  );
}

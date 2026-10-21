"use client";

import { ActionSheet, ActionSheetItem, Button } from "datui";
import { Pencil, Share2, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLElement>(null);
  return (
    <>
      <Button ref={anchorRef} variant="secondary" onClick={() => setOpen(true)}>
        More
      </Button>
      <ActionSheet open={open} onOpenChange={setOpen} anchorRef={anchorRef} title="Photo">
        <ActionSheetItem before={<Pencil />}>Edit</ActionSheetItem>
        <ActionSheetItem before={<Share2 />}>Share</ActionSheetItem>
        <ActionSheetItem before={<Trash2 />} mode="destructive">
          Delete
        </ActionSheetItem>
      </ActionSheet>
    </>
  );
}

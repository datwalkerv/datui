"use client";

import { CellButton, CellButtonGroup } from "datui";
import { Copy, Link, Pencil } from "lucide-react";

export default function Example() {
  return (
    <CellButtonGroup role="group" aria-label="Document actions" className="max-w-md">
      <CellButton before={<Pencil className="size-icon-lg" />}>Rename</CellButton>
      <CellButtonGroup.Separator />
      <CellButton before={<Copy className="size-icon-lg" />}>Duplicate</CellButton>
      <CellButtonGroup.Separator />
      <CellButton before={<Link className="size-icon-lg" />}>Copy link</CellButton>
    </CellButtonGroup>
  );
}

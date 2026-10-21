"use client";

import { CellButton } from "datui";
import { Share2, Trash2, UserPlus } from "lucide-react";

export default function Example() {
  return (
    <div className="max-w-md rounded-lg bg-card">
      <CellButton before={<UserPlus className="size-icon-lg" />} subtitle="Up to 10 people" onClick={() => {}}>
        Add member
      </CellButton>
      <CellButton appearance="neutral" before={<Share2 className="size-icon-lg" />} chevron onClick={() => {}}>
        Share
      </CellButton>
      <CellButton appearance="negative" before={<Trash2 className="size-icon-lg" />} onClick={() => {}}>
        Delete project
      </CellButton>
      <CellButton appearance="negative" centered onClick={() => {}}>
        Log out
      </CellButton>
    </div>
  );
}

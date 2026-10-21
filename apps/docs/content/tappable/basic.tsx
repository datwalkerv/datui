"use client";

import { Tappable } from "datui";

export default function Example() {
  const tile = "rounded-lg bg-card px-6 py-4 shadow-sm text-body";
  return (
    <div className="flex flex-wrap gap-3">
      <Tappable onClick={() => {}} className={tile}>
        background
      </Tappable>
      <Tappable onClick={() => {}} feedback="opacity" className={tile}>
        opacity
      </Tappable>
      <Tappable onClick={() => {}} activated className={tile}>
        activated
      </Tappable>
      <Tappable onClick={() => {}} disabled className={tile}>
        disabled
      </Tappable>
    </div>
  );
}

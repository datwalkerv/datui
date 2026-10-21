"use client";

import { Gallery } from "datui";

const colors = [
  "bg-primary text-primary-foreground",
  "bg-positive text-positive-foreground",
  "bg-warning text-warning-foreground",
  "bg-destructive text-destructive-foreground",
];

export default function Example() {
  return (
    <Gallery aria-label="Highlights" bullets="light" showArrows className="rounded-xl">
      {colors.map((color, i) => (
        <div key={color} className={`flex h-48 items-center justify-center ${color} text-title-2`}>
          Slide {i + 1}
        </div>
      ))}
    </Gallery>
  );
}

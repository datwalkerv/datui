"use client";

import { GridAvatar } from "datui";

export default function Example() {
  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3, 4].map((n) => (
        <GridAvatar
          key={n}
          alt={`Group of ${n}`}
          src={Array.from({ length: n }, (_, i) => `/images/person-${(i % 8) + 1}.svg`)}
        />
      ))}
      <GridAvatar alt="Team, active" size={64} src={["/images/person-3.svg", "/images/person-4.svg"]}>
        <GridAvatar.Badge />
      </GridAvatar>
    </div>
  );
}

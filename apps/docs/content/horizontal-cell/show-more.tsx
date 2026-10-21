"use client";

import { Avatar, HorizontalCell, HorizontalCellShowMore } from "datui";

const people = ["Ann", "Ben", "Cleo", "Dan"];

export default function Example() {
  return (
    <ul className="m-0 flex list-none gap-1 overflow-x-auto p-0">
      {people.map((name, i) => (
        <li key={name}>
          <HorizontalCell title={name} onClick={() => {}}>
            <Avatar size={56} initials={name.slice(0, 1)} gradientColor={(i + 1) as 1 | 2 | 3 | 4} alt="" />
          </HorizontalCell>
        </li>
      ))}
      <li>
        <HorizontalCellShowMore height={56} onClick={() => {}} />
      </li>
    </ul>
  );
}

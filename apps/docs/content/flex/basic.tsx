"use client";

import { Flex } from "datui";

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md bg-accent px-4 py-3 text-subhead text-accent-foreground">{children}</div>
);

export default function Example() {
  return (
    <Flex gap={["s", "l"]} align="center" justify="space-between">
      {["One", "Two", "Three", "Four", "Five"].map((t) => (
        <Box key={t}>{t}</Box>
      ))}
    </Flex>
  );
}

"use client";

import { Flex, FlexItem } from "datui";

export default function Example() {
  return (
    <Flex gap="m" noWrap>
      <FlexItem flex="content" className="rounded-md bg-secondary px-3 py-2">
        content
      </FlexItem>
      <FlexItem flex="grow" className="rounded-md bg-accent px-3 py-2 text-accent-foreground">
        grow
      </FlexItem>
      <FlexItem flex="content" className="rounded-md bg-secondary px-3 py-2">
        content
      </FlexItem>
    </Flex>
  );
}

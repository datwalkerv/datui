"use client";

import { Caption, Headline, Title } from "datui";

export default function Example() {
  return (
    <div className="grid gap-2">
      <Title level={2} weight="regular">
        Regular title
      </Title>
      <Title level={2} weight="bold">
        Bold title
      </Title>
      <Headline as="p" weight="semibold">
        Headline rendered as a paragraph
      </Headline>
      <Caption caps weight="medium" className="text-muted-foreground">
        Section label
      </Caption>
    </div>
  );
}

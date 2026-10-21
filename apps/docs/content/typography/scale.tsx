"use client";

import { Caption, DisplayTitle, Footnote, Headline, Paragraph, Subhead, Text, Title } from "datui";

export default function Example() {
  return (
    <div className="grid gap-3">
      <DisplayTitle level={2}>Display title</DisplayTitle>
      <Title level={1}>Title 1</Title>
      <Title level={2}>Title 2</Title>
      <Title level={3}>Title 3</Title>
      <Headline level={1}>Headline 1</Headline>
      <Headline level={2}>Headline 2</Headline>
      <Text>Text — default body copy</Text>
      <Paragraph>Paragraph — multi-line copy for longer descriptions and articles.</Paragraph>
      <Subhead>Subhead</Subhead>
      <Footnote>Footnote</Footnote>
      <Caption level={1}>Caption 1</Caption>
      <Caption level={2}>Caption 2</Caption>
      <Caption level={3}>Caption 3</Caption>
    </div>
  );
}

"use client";

import { Radio, RadioGroup } from "datui";

export default function Example() {
  return (
    <RadioGroup aria-label="Size" mode="horizontal" defaultValue="m">
      <Radio value="s">S</Radio>
      <Radio value="m">M</Radio>
      <Radio value="l">L</Radio>
    </RadioGroup>
  );
}

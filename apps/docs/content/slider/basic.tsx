"use client";

import { Slider } from "datui";
import { useState } from "react";

export default function Example() {
  const [price, setPrice] = useState<number | [number, number]>([20, 80]);
  return (
    <div className="grid max-w-sm gap-6">
      <Slider defaultValue={40} withTooltip getAriaLabel={() => "Volume"} />
      <Slider
        multiple
        value={price}
        onChange={setPrice}
        step={5}
        withTooltip
        getAriaLabel={(i) => (i === 0 ? "Minimum price" : "Maximum price")}
        getAriaValueText={(v) => `${v} €`}
      />
      <Slider size="s" defaultValue={60} disabled getAriaLabel={() => "Disabled"} />
    </div>
  );
}

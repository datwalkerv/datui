"use client";

import { Radio, RadioGroup } from "datui";
import { useState } from "react";

export default function Example() {
  const [plan, setPlan] = useState("free");
  return (
    <RadioGroup aria-label="Plan" value={plan} onValueChange={setPlan} className="max-w-sm">
      <Radio value="free" description="Up to 3 projects">
        Free
      </Radio>
      <Radio value="pro" description="Unlimited projects">
        Pro
      </Radio>
      <Radio value="team" disabled>
        Team (soon)
      </Radio>
    </RadioGroup>
  );
}

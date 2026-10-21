"use client";

import { DateInput, FormItem } from "datui";
import * as React from "react";

export default function Example() {
  const [value, setValue] = React.useState<Date | null>(null);
  return (
    <div className="max-w-xs">
      <FormItem top="Birthday" topId="birthday-label" bottom={value ? value.toDateString() : "DD.MM.YYYY"}>
        <DateInput aria-labelledby="birthday-label" value={value} onChange={setValue} disableFuture />
      </FormItem>
    </div>
  );
}

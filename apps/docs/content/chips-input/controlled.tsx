"use client";

import { type ChipOption, ChipsInput, FormItem } from "datui";
import * as React from "react";

export default function Example() {
  const [emails, setEmails] = React.useState<ChipOption[]>([]);
  return (
    <div className="max-w-md">
      <FormItem top="Recipients" bottom={`${emails.length} recipient(s)`}>
        <ChipsInput
          value={emails}
          onChange={setEmails}
          delimiter={[",", ";", " "]}
          addOnBlur
          placeholder="name@example.com"
          getNewOptionData={(label) => ({ value: label.toLowerCase(), label: label.toLowerCase() })}
        />
      </FormItem>
    </div>
  );
}

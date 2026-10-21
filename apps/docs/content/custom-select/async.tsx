"use client";

import { CustomSelect, type CustomSelectOptionData, FormItem } from "datui";
import * as React from "react";

const all = ["Ada", "Alan", "Barbara", "Claude", "Donald", "Edsger", "Grace", "Ken", "Linus", "Margaret"];

export default function Example() {
  const [options, setOptions] = React.useState<CustomSelectOptionData[]>([]);
  const [fetching, setFetching] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const search = (query: string) => {
    clearTimeout(timer.current);
    setFetching(true);
    // Simulated server request.
    timer.current = setTimeout(() => {
      const q = query.toLowerCase();
      setOptions(all.filter((n) => n.toLowerCase().includes(q)).map((n) => ({ value: n, label: n })));
      setFetching(false);
    }, 600);
  };

  return (
    <div className="max-w-sm">
      <FormItem top="Engineer">
        <CustomSelect
          searchable
          filterFn={false}
          fetching={fetching}
          options={options}
          onOpen={() => search("")}
          onInputChange={(_, q) => search(q)}
          placeholder="Search people"
        />
      </FormItem>
    </div>
  );
}

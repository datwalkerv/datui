"use client";

import { ChipsInput, FormItem } from "datui";

export default function Example() {
  return (
    <div className="max-w-md">
      <FormItem top="Tags" bottom="Press Enter or type a comma to add">
        <ChipsInput
          placeholder="Add a tag"
          allowClearButton
          defaultValue={[
            { value: "react", label: "react" },
            { value: "tailwind", label: "tailwind" },
          ]}
        />
      </FormItem>
    </div>
  );
}

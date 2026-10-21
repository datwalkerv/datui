"use client";

import { FormItem, FormItemTop, FormItemTopAside, FormItemTopLabel, Textarea } from "datui";
import { useState } from "react";

export default function Example() {
  const [text, setText] = useState("");
  return (
    <div className="max-w-sm">
      <FormItem
        top={
          <FormItemTop>
            <FormItemTopLabel>About you</FormItemTopLabel>
            <FormItemTopAside aria-live="polite">{text.length}/140</FormItemTopAside>
          </FormItemTop>
        }
        removable
        onRemove={() => setText("")}
        removeLabel="Clear about"
      >
        <Textarea maxLength={140} value={text} onChange={(e) => setText(e.target.value)} />
      </FormItem>
    </div>
  );
}

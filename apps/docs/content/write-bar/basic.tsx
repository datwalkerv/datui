"use client";

import { WriteBar, WriteBarIcon } from "datui";
import { useState } from "react";

export default function Example() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const send = () => {
    if (!text.trim()) return;
    setSent([...sent, text]);
    setText("");
  };
  return (
    <div className="max-w-md rounded-lg border border-border">
      <ul className="grid gap-1 p-3 text-subhead">
        {sent.map((m, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: demo list
          <li key={i}>{m}</li>
        ))}
      </ul>
      <WriteBar
        aria-label="Message"
        placeholder="Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }}
        before={<WriteBarIcon mode="attach" count={2} />}
        after={<WriteBarIcon mode="send" disabled={!text.trim()} onClick={send} />}
      />
    </div>
  );
}

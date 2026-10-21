"use client";

import { FormItem, Input } from "datui";
import { useState } from "react";

export default function Example() {
  const [email, setEmail] = useState("");
  const invalid = email !== "" && !email.includes("@");
  return (
    <div className="max-w-sm">
      <FormItem
        top="Email"
        required
        status={invalid ? "error" : "default"}
        bottom={invalid ? "Enter a valid email" : "We never share it"}
      >
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormItem>
    </div>
  );
}

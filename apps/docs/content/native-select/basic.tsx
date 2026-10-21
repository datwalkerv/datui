"use client";

import { FormItem, NativeSelect } from "datui";
import { useState } from "react";

export default function Example() {
  const [country, setCountry] = useState<string | null>(null);
  return (
    <div className="max-w-sm">
      <FormItem top="Country">
        <NativeSelect placeholder="Choose a country" value={country} onChange={(_, v) => setCountry(v)}>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="it">Italy</option>
        </NativeSelect>
      </FormItem>
      <FormItem top="Accent">
        <NativeSelect selectType="accent" defaultValue="asc">
          <option value="asc">Newest first</option>
          <option value="desc">Oldest first</option>
        </NativeSelect>
      </FormItem>
    </div>
  );
}

"use client";

import { FormItem, SelectMimicry } from "datui";
import { useState } from "react";

const cities = ["Berlin", "Paris", "Rome"];

export default function Example() {
  const [city, setCity] = useState("");
  return (
    <div className="max-w-sm">
      <FormItem top="City">
        <SelectMimicry
          placeholder="Choose a city"
          onClick={() => setCity(cities[(cities.indexOf(city) + 1) % cities.length] ?? "")}
        >
          {city}
        </SelectMimicry>
      </FormItem>
    </div>
  );
}

"use client";

import { Calendar } from "datui";

const inTwoMonths = new Date();
inTwoMonths.setMonth(inTwoMonths.getMonth() + 2);

export default function Example() {
  return (
    <Calendar
      disablePast
      maxDateTime={inTwoMonths}
      shouldDisableDate={(d) => d.getDay() === 0 || d.getDay() === 6}
      showNeighboringMonth
    />
  );
}

"use client";

import { ScreenSpinnerContainer } from "datui";

export default function Example() {
  return (
    <div className="flex flex-wrap gap-4">
      <ScreenSpinnerContainer state="loading" label="Uploading" />
      <ScreenSpinnerContainer state="done" label="Uploaded" />
      <ScreenSpinnerContainer state="error" label="Failed" />
    </div>
  );
}

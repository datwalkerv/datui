"use client";

import { FormStatus } from "datui";

export default function Example() {
  return (
    <div className="grid max-w-md gap-3">
      <FormStatus title="Draft saved">Changes are kept on this device.</FormStatus>
      <FormStatus mode="error" title="Couldn't sign in">
        Check your password and try again.
      </FormStatus>
    </div>
  );
}

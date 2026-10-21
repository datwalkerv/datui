"use client";

import { Button, ScreenSpinner, type ScreenSpinnerState } from "datui";
import { useState } from "react";

export default function Example() {
  const [state, setState] = useState<ScreenSpinnerState | null>(null);
  const run = () => {
    setState("loading");
    setTimeout(() => setState((s) => (s === "loading" ? "cancelable" : s)), 1000);
    setTimeout(() => setState((s) => (s === "cancelable" ? "done" : s)), 3000);
    setTimeout(() => setState(null), 4000);
  };
  return (
    <>
      <Button onClick={run}>Save</Button>
      {state && (
        <ScreenSpinner state={state} label={state === "done" ? "Saved" : undefined} onCancel={() => setState(null)} />
      )}
    </>
  );
}

"use client";

import { Alert, Button } from "datui";
import { useState } from "react";

export default function Example() {
  const [shown, setShown] = useState(false);
  return (
    <>
      <Button appearance="negative" onClick={() => setShown(true)}>
        Delete photo
      </Button>
      {shown && (
        <Alert
          title="Delete photo?"
          description="This cannot be undone."
          actions={[
            { title: "Cancel", mode: "cancel" },
            { title: "Delete", mode: "destructive" },
          ]}
          onClosed={() => setShown(false)}
        />
      )}
    </>
  );
}

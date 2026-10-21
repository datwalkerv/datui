"use client";

import { AdaptivityProvider, Button, ModalPage, ModalPageContent, ModalPageHeader } from "datui";
import { useState } from "react";

const comments = Array.from({ length: 30 }, (_, i) => `Comment ${i + 1}`);

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <AdaptivityProvider sizeX="compact">
      <Button onClick={() => setOpen(true)}>Open sheet</Button>
      <ModalPage
        open={open}
        onClose={() => setOpen(false)}
        settlingHeight={50}
        header={<ModalPageHeader>Comments</ModalPageHeader>}
      >
        <ModalPageContent>
          {comments.map((comment) => (
            <p key={comment}>{comment}</p>
          ))}
        </ModalPageContent>
      </ModalPage>
    </AdaptivityProvider>
  );
}

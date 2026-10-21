"use client";

import { AdaptivityProvider, Button, ModalCard, ModalOutsideButton } from "datui";
import { Share2 } from "lucide-react";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <AdaptivityProvider sizeX="compact">
      <Button onClick={() => setOpen(true)}>Open card</Button>
      <ModalCard
        open={open}
        onClose={() => setOpen(false)}
        title="Invite friends"
        description="Share this link with people you want to invite."
        outsideButtons={
          <ModalOutsideButton aria-label="Share">
            <Share2 />
          </ModalOutsideButton>
        }
      />
    </AdaptivityProvider>
  );
}

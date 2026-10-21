"use client";

import { Button, ModalPage, ModalPageContent, ModalPageHeader } from "datui";
import { useState } from "react";

export default function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open settings</Button>
      <ModalPage
        open={open}
        onClose={() => setOpen(false)}
        header={<ModalPageHeader>Settings</ModalPageHeader>}
        footer={
          <Button stretched onClick={() => setOpen(false)}>
            Save
          </Button>
        }
      >
        <ModalPageContent>
          <p>Notification, privacy and language settings go here.</p>
        </ModalPageContent>
      </ModalPage>
    </>
  );
}

"use client";

import { Button, ModalCard, ModalPage, ModalPageContent, ModalPageHeader, ModalRoot } from "datui";
import { useState } from "react";

export default function Example() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <>
      <Button onClick={() => setActive("filters")}>Filters</Button>
      <ModalRoot activeModal={active} onClose={() => setActive(null)}>
        <ModalPage id="filters" header={<ModalPageHeader>Filters</ModalPageHeader>}>
          <ModalPageContent>
            <Button onClick={() => setActive("applied")}>Apply</Button>
          </ModalPageContent>
        </ModalPage>
        <ModalCard
          id="applied"
          title="Filters applied"
          actions={
            <Button stretched onClick={() => setActive(null)}>
              OK
            </Button>
          }
        />
      </ModalRoot>
    </>
  );
}

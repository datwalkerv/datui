"use client";

import { PanelHeader, PanelHeaderBack, PanelHeaderButton, PanelHeaderClose, PanelHeaderSubmit } from "datui";
import { Plus } from "lucide-react";

export default function Example() {
  return (
    <div className="grid gap-4">
      <PanelHeader
        before={<PanelHeaderBack />}
        after={
          <PanelHeaderButton aria-label="Add">
            <Plus aria-hidden />
          </PanelHeaderButton>
        }
      >
        Contacts
      </PanelHeader>
      <PanelHeader before={<PanelHeaderClose />} after={<PanelHeaderSubmit />}>
        New contact
      </PanelHeader>
      <PanelHeader before={<PanelHeaderBack showLabel />} after={<PanelHeaderButton label="Save" primary />}>
        Profile
      </PanelHeader>
    </div>
  );
}

"use client";

import { PanelHeader, PanelHeaderEdit } from "datui";
import { useState } from "react";

export default function Example() {
  const [editing, setEditing] = useState(false);
  return (
    <PanelHeader after={<PanelHeaderEdit isActive={editing} onClick={() => setEditing((v) => !v)} />}>
      {editing ? "Editing list" : "List"}
    </PanelHeader>
  );
}

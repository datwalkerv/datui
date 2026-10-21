"use client";

import { Button, Panel, PanelHeader, PanelHeaderContent, PanelHeaderContext } from "datui";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const modes = ["All news", "Friends", "Groups"];

export default function Example() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(modes[0]);
  return (
    <div className="h-[320px] overflow-y-auto rounded-lg border border-border">
      <Panel id="news" mode="plain">
        <PanelHeader fixed>
          <PanelHeaderContent
            aside={<ChevronDown aria-hidden />}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="news-modes"
          >
            {mode}
          </PanelHeaderContent>
        </PanelHeader>
        <PanelHeaderContext id="news-modes" label="Feed mode" opened={open} onClose={() => setOpen(false)}>
          <div className="grid gap-1 p-2">
            {modes.map((m) => (
              <Button
                key={m}
                variant={m === mode ? "secondary" : "tertiary"}
                align="left"
                onClick={() => {
                  setMode(m);
                  setOpen(false);
                }}
              >
                {m}
              </Button>
            ))}
          </div>
        </PanelHeaderContext>
        <p className="p-4 text-body">Showing: {mode}</p>
      </Panel>
    </div>
  );
}

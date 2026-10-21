"use client";

import { Button, Panel, PanelHeader, PanelHeaderBack, View } from "datui";
import { useState } from "react";

export default function Example() {
  const [history, setHistory] = useState(["list"]);
  const active = history[history.length - 1] ?? "list";
  const go = (id: string) => setHistory((h) => [...h, id]);
  const back = () => setHistory((h) => h.slice(0, -1));
  return (
    <div className="h-[360px] overflow-y-auto rounded-lg border border-border">
      <View activePanel={active} history={history} onSwipeBack={back}>
        <Panel id="list" mode="plain">
          <PanelHeader>Settings</PanelHeader>
          <div className="grid gap-2 p-4">
            {Array.from({ length: 12 }, (_, i) => `Option ${i + 1}`).map((text) => (
              <Button key={text} variant="secondary" align="left" onClick={() => go("detail")}>
                {text}
              </Button>
            ))}
          </div>
        </Panel>
        <Panel id="detail" mode="plain">
          <PanelHeader before={<PanelHeaderBack onClick={back} />}>Option</PanelHeader>
          <div className="p-4">
            <Button onClick={() => go("more")}>Go deeper</Button>
          </div>
        </Panel>
        <Panel id="more" mode="plain">
          <PanelHeader before={<PanelHeaderBack onClick={back} />}>Details</PanelHeader>
          <p className="p-4 text-body">Scroll position of the list is restored when you go back.</p>
        </Panel>
      </View>
    </div>
  );
}

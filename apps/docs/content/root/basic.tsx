"use client";

import { Button, Panel, PanelHeader, PanelHeaderBack, Root, View } from "datui";
import { useState } from "react";

export default function Example() {
  const [view, setView] = useState("app");
  return (
    <div className="h-[280px] overflow-y-auto rounded-lg border border-border">
      <Root activeView={view}>
        <View id="app" activePanel="home">
          <Panel id="home" mode="plain">
            <PanelHeader>App</PanelHeader>
            <div className="p-4">
              <Button onClick={() => setView("onboarding")}>Open onboarding</Button>
            </div>
          </Panel>
        </View>
        <View id="onboarding" activePanel="welcome">
          <Panel id="welcome" mode="plain">
            <PanelHeader before={<PanelHeaderBack onClick={() => setView("app")} />}>Welcome</PanelHeader>
            <p className="p-4 text-body">A separate flow with its own panels.</p>
          </Panel>
        </View>
      </Root>
    </div>
  );
}

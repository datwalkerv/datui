"use client";

import { Epic, Panel, PanelHeader, Tabbar, TabbarItem, View } from "datui";
import { MessageCircle, Newspaper, User } from "lucide-react";
import { useState } from "react";

const stories = [
  { id: "feed", label: "Feed", Icon: Newspaper },
  { id: "messages", label: "Messages", Icon: MessageCircle },
  { id: "profile", label: "Profile", Icon: User },
];

export default function Example() {
  const [story, setStory] = useState("feed");
  return (
    <div className="h-[360px] overflow-y-auto rounded-lg border border-border">
      <Epic
        contentAs="div"
        activeStory={story}
        tabbar={
          <Tabbar>
            {stories.map(({ id, label, Icon }) => (
              <TabbarItem key={id} label={label} selected={story === id} onClick={() => setStory(id)}>
                <Icon aria-hidden />
              </TabbarItem>
            ))}
          </Tabbar>
        }
      >
        {stories.map(({ id, label }) => (
          <View key={id} id={id} activePanel={id}>
            <Panel id={id} mode="plain">
              <PanelHeader>{label}</PanelHeader>
              <ul className="grid gap-3 p-4 text-body">
                {Array.from({ length: 15 }, (_, i) => `${label} item ${i + 1}`).map((text) => (
                  <li key={text}></li>
                ))}
              </ul>
            </Panel>
          </View>
        ))}
      </Epic>
    </div>
  );
}

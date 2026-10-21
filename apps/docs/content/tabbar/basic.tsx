"use client";

import { Tabbar, TabbarItem } from "datui";
import { Bell, MessageCircle, Newspaper, User } from "lucide-react";
import { type ReactNode, useState } from "react";

export default function Example() {
  const [tab, setTab] = useState("feed");
  const item = (id: string, label: string, icon: ReactNode, indicator?: ReactNode) => (
    <TabbarItem label={label} selected={tab === id} onClick={() => setTab(id)} indicator={indicator}>
      {icon}
    </TabbarItem>
  );
  return (
    <Tabbar>
      {item("feed", "Feed", <Newspaper aria-hidden />)}
      {item(
        "messages",
        "Messages",
        <MessageCircle aria-hidden />,
        <span className="rounded-full bg-destructive px-1.5 text-caption-2 text-destructive-foreground">3</span>,
      )}
      {item("alerts", "Alerts", <Bell aria-hidden />)}
      {item("profile", "Profile", <User aria-hidden />)}
    </Tabbar>
  );
}

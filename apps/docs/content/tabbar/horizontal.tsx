"use client";

import { Tabbar, TabbarItem } from "datui";
import { Home, Settings } from "lucide-react";

export default function Example() {
  return (
    <Tabbar plain aria-label="Sections">
      <TabbarItem label="Home" href="#home" selected>
        <Home aria-hidden />
      </TabbarItem>
      <TabbarItem label="Settings" href="#settings">
        <Settings aria-hidden />
      </TabbarItem>
    </Tabbar>
  );
}

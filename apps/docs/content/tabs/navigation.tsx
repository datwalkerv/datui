"use client";

import { Tabs, TabsItem } from "datui";
import { useState } from "react";

export default function Example() {
  const [section, setSection] = useState("profile");
  return (
    <Tabs role="navigation" aria-label="Account" value={section} onChange={setSection} layoutFillMode="shrinked">
      <TabsItem value="profile" href="#profile">
        Profile
      </TabsItem>
      <TabsItem value="security" href="#security">
        Security
      </TabsItem>
      <TabsItem value="billing" href="#billing">
        Billing
      </TabsItem>
    </Tabs>
  );
}

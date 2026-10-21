"use client";

import { Separator, Text } from "datui";

export default function Example() {
  return (
    <div className="flex h-6 items-center gap-3">
      <Text>Profile</Text>
      <Separator direction="vertical" />
      <Text>Settings</Text>
      <Separator direction="vertical" decorative={false} />
      <Text>Sign out</Text>
    </div>
  );
}

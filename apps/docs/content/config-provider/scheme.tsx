"use client";

import { AppRoot, Button, ConfigProvider, Headline, Subhead, useColorScheme } from "datui";

function SchemeLabel() {
  return <Subhead className="text-subtle-foreground">useColorScheme(): {useColorScheme()}</Subhead>;
}

export default function Example() {
  return (
    <div className="grid gap-3 tablet:grid-cols-2">
      {(["light", "dark"] as const).map((scheme) => (
        <ConfigProvider key={scheme} colorScheme={scheme}>
          <AppRoot mode="embedded" className="rounded-lg p-4">
            <div className="grid gap-2 rounded-md bg-card p-4">
              <Headline>{scheme} scheme</Headline>
              <SchemeLabel />
              <div>
                <Button size="s">Action</Button>
              </div>
            </div>
          </AppRoot>
        </ConfigProvider>
      ))}
    </div>
  );
}

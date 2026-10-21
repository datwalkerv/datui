"use client";

import { PanelHeader, PanelHeaderBack, PanelHeaderContent } from "datui";

export default function Example() {
  return (
    <PanelHeader before={<PanelHeaderBack />}>
      <PanelHeaderContent
        before={
          <span className="inline-flex size-control-m items-center justify-center rounded-full bg-secondary text-subhead">
            AK
          </span>
        }
        subtitle="online"
      >
        Anna Kovács
      </PanelHeaderContent>
    </PanelHeader>
  );
}

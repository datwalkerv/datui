"use client";

import { RichCell } from "datui";
import { CalendarDays, FileText } from "lucide-react";

export default function Example() {
  return (
    <div className="max-w-md rounded-lg bg-card">
      <RichCell
        before={
          <RichCell.Icon className="size-12 rounded-full bg-secondary text-primary">
            <CalendarDays className="size-icon-lg" />
          </RichCell.Icon>
        }
        overTitle="Team calendar"
        meta="9:41"
        subtitle="Quarterly planning"
        submeta="3 new"
        extraSubtitle="Room 4 · 2 hours"
        bottom={<span className="text-footnote text-muted-foreground">Anna, Ben and 5 others</span>}
        onClick={() => {}}
      >
        Planning session
      </RichCell>
      <RichCell
        before={
          <RichCell.Icon>
            <FileText className="size-icon-lg" />
          </RichCell.Icon>
        }
        beforeAlign="center"
        multiline
        subtitle="Long subtitles wrap onto more lines when multiline is set, instead of being truncated."
      >
        Report.pdf
      </RichCell>
    </div>
  );
}

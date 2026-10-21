"use client";

import { Gallery } from "datui";

export default function Example() {
  return (
    <Gallery aria-label="Announcements" autoplay={3000} looped bullets="light" showArrows className="rounded-xl">
      {["New release", "Webinar on Friday", "Join the beta"].map((text) => (
        <div key={text} className="flex h-40 items-center justify-center bg-foreground text-title-3 text-background">
          {text}
        </div>
      ))}
    </Gallery>
  );
}

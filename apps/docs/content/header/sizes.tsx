"use client";

import { Header, Link } from "datui";
import { Star } from "lucide-react";

export default function Example() {
  return (
    <div className="rounded-xl bg-background">
      <Header size="xl" subtitle="Your profile at a glance">
        Overview
      </Header>
      <Header size="l" indicator="24" after={<Link href="#all">Show all</Link>}>
        Friends
      </Header>
      <Header beforeTitle={<Star />} subtitle="Pinned by you">
        Favorites
      </Header>
      <Header size="s">Settings</Header>
    </div>
  );
}

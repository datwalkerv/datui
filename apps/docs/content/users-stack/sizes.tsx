"use client";

import { UsersStack } from "datui";

const photos = Array.from({ length: 6 }, (_, i) => `/images/person-${(i % 8) + 1}.svg`);

export default function Example() {
  return (
    <div className="grid gap-4">
      <UsersStack photos={photos}>Mia, Leo and 4 others</UsersStack>
      <UsersStack photos={photos} size="m" visibleCount={3}>
        6 people going
      </UsersStack>
      <UsersStack photos={photos} size="l" avatarsPosition="block-start">
        Liked by Ava and 5 others
      </UsersStack>
    </div>
  );
}

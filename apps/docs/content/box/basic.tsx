"use client";

import { Box, Text } from "datui";

export default function Example() {
  return (
    <Box as="section" padding="l" maxWidth={360} className="rounded-lg bg-accent">
      <Text className="text-accent-foreground">padding="l", maxWidth={"{360}"}, rendered as a section</Text>
    </Box>
  );
}

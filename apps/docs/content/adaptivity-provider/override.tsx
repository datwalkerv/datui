"use client";

import { AdaptivityProvider, Text, useAdaptivity } from "datui";

function Readout() {
  const { sizeX, sizeY } = useAdaptivity();
  return (
    <Text>
      sizeX: {sizeX}, sizeY: {sizeY}
    </Text>
  );
}

export default function Example() {
  return (
    <AdaptivityProvider sizeX="compact" sizeY="regular">
      <Readout />
    </AdaptivityProvider>
  );
}

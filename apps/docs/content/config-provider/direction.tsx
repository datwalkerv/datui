"use client";

import { AppRoot, Button, ConfigProvider, Flex, Text } from "datui";
import { ArrowRight } from "lucide-react";

export default function Example() {
  return (
    <ConfigProvider direction="rtl" locale="ar">
      <AppRoot mode="embedded" className="rounded-lg p-4">
        <Flex gap="m" align="center">
          <Text>مرحبا بالعالم</Text>
          <Button after={<ArrowRight className="size-icon-sm rtl:rotate-180" />}>متابعة</Button>
        </Flex>
      </AppRoot>
    </ConfigProvider>
  );
}

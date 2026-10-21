"use client";

import { Button, ModalPage, ModalPageContent, ModalPageHeader } from "datui";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Sidebar } from "./sidebar";

/** Sidebar in a sheet for narrow screens, where the docs sidebar column is hidden. */
export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  // Close after navigating.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on route change only
  React.useEffect(() => setOpen(false), [pathname]);
  return (
    <div className="tablet:hidden">
      <Button
        variant="tertiary"
        appearance="neutral"
        before={<Menu className="size-icon-md" />}
        aria-label="Open navigation"
        onClick={() => setOpen(true)}
      />
      <ModalPage open={open} onOpenChange={setOpen} header={<ModalPageHeader>Documentation</ModalPageHeader>} size="m">
        <ModalPageContent>
          <Sidebar />
        </ModalPageContent>
      </ModalPage>
    </div>
  );
}

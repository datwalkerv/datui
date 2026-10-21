import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { ThemeSwitch } from "./theme-switch";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-fixed border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-6 px-4">
        <MobileNav />
        <Link href="/" className="text-title-3 font-bold text-foreground no-underline">
          datui
        </Link>
        <nav aria-label="Main" className="hidden gap-4 text-subhead tablet:flex">
          <Link href="/docs" className="text-subtle-foreground no-underline hover:text-foreground">
            Docs
          </Link>
          <Link href="/docs/installation" className="text-subtle-foreground no-underline hover:text-foreground">
            Install
          </Link>
          <Link href="/docs/theming" className="text-subtle-foreground no-underline hover:text-foreground">
            Theming
          </Link>
        </nav>
        <div className="ml-auto">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}

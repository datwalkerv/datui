import { Sidebar } from "@/components/sidebar";
import { SiteHeader } from "@/components/site-header";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-[1400px] gap-8 px-4">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-60 shrink-0 overflow-y-auto py-6 tablet:block">
          <Sidebar />
        </aside>
        <main id="main" className="min-w-0 flex-1 py-8">
          {children}
        </main>
      </div>
    </>
  );
}

import { CodeBlock } from "./code-block";

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <article className="max-w-[760px] text-body [&_h1]:m-0 [&_h1]:mb-4 [&_h1]:text-display-4 [&_h1]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-title-2 [&_h2]:font-semibold [&_li]:mb-1 [&_p]:my-3 [&_p]:text-subtle-foreground [&_ul]:pl-5 [&_:not(pre)>code]:rounded-xs [&_:not(pre)>code]:bg-secondary [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.9em]">
      {children}
    </article>
  );
}

export function Code({ children, label }: { children: string; label?: string }) {
  return (
    <div className="my-4 overflow-hidden rounded-lg border border-border">
      <CodeBlock code={children.trim()} label={label} />
    </div>
  );
}

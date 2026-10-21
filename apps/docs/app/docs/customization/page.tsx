import { Code, Prose } from "@/components/prose";

export const metadata = { title: "Customization" };

export default function Customization() {
  return (
    <Prose>
      <h1>Customization</h1>
      <h2>className</h2>
      <p>
        Every component accepts <code>className</code>. Classes are merged with <code>tailwind-merge</code>, so your
        utilities override conflicting defaults instead of fighting them.
      </p>
      <Code>{`<Button className="rounded-full px-8">Pill</Button>`}</Code>
      <h2>cn()</h2>
      <p>The same merge helper is exported for your own components. It understands datui's type scale.</p>
      <Code>{`import { cn } from "datui";

cn("text-title-1 px-2", isActive && "text-primary px-4"); // "text-title-1 text-primary px-4"`}</Code>
      <h2>Variant functions</h2>
      <p>
        Components with visual variants export their <code>class-variance-authority</code> function (for example{" "}
        <code>buttonVariants</code>) so you can style other elements to match.
      </p>
      <Code>{`import { buttonVariants } from "datui";
import Link from "next/link";

<Link href="/pricing" className={buttonVariants({ variant: "outline" })}>Pricing</Link>`}</Code>
      <h2>Composition</h2>
      <p>
        Slots such as <code>before</code>, <code>after</code> and <code>subtitle</code> accept any node, and interactive
        components accept <code>as</code> to render a different element or a router link component.
      </p>
    </Prose>
  );
}

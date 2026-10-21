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
      <h2>Icon motion</h2>
      <p>
        datui uses <code>lucide-react</code> icons and adds small CSS animations to them: check marks draw in, close
        icons turn and arrows nudge on hover. The same classes work on any icon you pass into datui slots. Motion turns
        off automatically when the user prefers reduced motion.
      </p>
      <ul>
        <li>
          <code>dt-icon-draw</code> — strokes draw in when the icon mounts (set <code>--dt-icon-draw-length</code> for
          long paths)
        </li>
        <li>
          <code>dt-icon-pop</code> — scales in when the icon mounts, for icon swaps
        </li>
        <li>
          <code>dt-icon-turn</code>, <code>dt-icon-nudge</code>, <code>dt-icon-nudge-back</code>,{" "}
          <code>dt-icon-tilt</code> — react when the surrounding button or link is hovered or keyboard-focused
        </li>
      </ul>
      <Code>{`import { Button } from "datui";
import { ArrowRight } from "lucide-react";

<Button after={<ArrowRight className="dt-icon-nudge size-icon-sm" />}>Next</Button>`}</Code>
      <h2>Composition</h2>
      <p>
        Slots such as <code>before</code>, <code>after</code> and <code>subtitle</code> accept any node, and interactive
        components accept <code>as</code> to render a different element or a router link component.
      </p>
    </Prose>
  );
}

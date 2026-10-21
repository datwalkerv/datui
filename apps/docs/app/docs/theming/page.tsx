import { Code, Prose } from "@/components/prose";

export const metadata = { title: "Theming" };

export default function Theming() {
  return (
    <Prose>
      <h1>Theming</h1>
      <p>
        All visual values are CSS custom properties prefixed with <code>--dt-</code>. Tailwind utilities such as{" "}
        <code>bg-primary</code>, <code>rounded-lg</code>, <code>h-control-m</code> and <code>text-title-2</code> read
        them, so changing a variable restyles every component.
      </p>
      <h2>Color scheme</h2>
      <p>
        Pass <code>colorScheme</code> to <code>ConfigProvider</code>: <code>"light"</code>, <code>"dark"</code> or{" "}
        <code>"system"</code>. <code>AppRoot</code> writes the resolved value to <code>data-theme</code>. Use{" "}
        <code>useColorScheme()</code> to read it.
      </p>
      <h2>Custom themes</h2>
      <p>Override variables under any selector. Scoping to an attribute lets several themes coexist:</p>
      <Code label="theme.css">{`[data-theme="dark"] .brand,
.brand {
  --dt-primary: #7c3aed;
  --dt-primary-hover: #6d28d9;
  --dt-accent: rgb(124 58 237 / 0.12);
  --dt-accent-foreground: #7c3aed;
  --dt-ring: rgb(124 58 237 / 0.5);
  --dt-radius-md: 10px;
}`}</Code>
      <h2>Density</h2>
      <p>
        <code>AppRoot</code> sets <code>data-density</code> to <code>compact</code> on wide screens with a fine pointer
        and <code>regular</code> elsewhere. Compact density shrinks control, cell and header heights. Force one with{" "}
        <code>{`<AppRoot density="regular">`}</code>.
      </p>
      <h2>Token reference</h2>
      <ul>
        <li>
          Surfaces: <code>background</code>, <code>background-secondary</code>, <code>background-tertiary</code>,{" "}
          <code>card</code>, <code>popover</code>, <code>overlay</code> (each with <code>-foreground</code> where text
          sits on it)
        </li>
        <li>
          Intent: <code>primary</code>, <code>secondary</code>, <code>accent</code>, <code>muted</code>,{" "}
          <code>destructive</code>, <code>positive</code>, <code>warning</code>, <code>link</code>
        </li>
        <li>
          Lines: <code>border</code>, <code>separator</code>, <code>input</code>, <code>input-border</code>,{" "}
          <code>ring</code>
        </li>
        <li>
          Shape: <code>--dt-radius-xs…2xl</code>; heights: <code>--dt-height-s|m|l</code>, <code>-cell</code>,{" "}
          <code>-panel-header</code>, <code>-tabbar</code>; icons: <code>--dt-icon-xs…xl</code>
        </li>
        <li>
          Motion: <code>--dt-duration-fast|normal|slow</code> (zero under reduced motion), <code>--dt-ease-*</code>.
          Layers: <code>--dt-z-*</code>
        </li>
      </ul>
    </Prose>
  );
}

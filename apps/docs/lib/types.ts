export type Category =
  | "Getting started"
  | "Providers & app"
  | "Primitives"
  | "Layout"
  | "Typography"
  | "Buttons"
  | "Navigation"
  | "Forms"
  | "Data display"
  | "Overlays"
  | "Feedback";

export type PlaygroundControl =
  | { type: "select"; options: readonly string[]; default?: string }
  | { type: "boolean"; default?: boolean }
  | { type: "text"; default?: string }
  | { type: "number"; default?: number; min?: number; max?: number; step?: number };

export interface ExampleMeta {
  /** File name in this content folder, without extension. */
  file: string;
  title: string;
  description?: string;
  /** Render only in the browser, for examples that show the current date or time. */
  clientOnly?: boolean;
}

export interface DocMeta {
  title: string;
  category: Category;
  description: string;
  /** Exported datui component names whose props tables appear on the page. */
  components: string[];
  examples: ExampleMeta[];
  /** Accessibility and keyboard notes that hold for the actual implementation. */
  a11y: string[];
  /**
   * Interactive controls for the first `components` entry. Only list props that work.
   * `children` is passed as the element's children.
   */
  playground?: Record<string, PlaygroundControl>;
  /** Fixed props the playground always passes (required data such as `options`). Must be serializable. */
  playgroundProps?: Record<string, unknown>;
}

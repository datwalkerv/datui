import { readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { expect, type Page } from "@playwright/test";

const require = createRequire(import.meta.url);
const axePath = require.resolve("axe-core/axe.min.js");

export const slugs = readdirSync(join(import.meta.dirname, "../../apps/docs/content"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

/** Image URLs that examples break on purpose to demonstrate fallbacks. */
const INTENTIONALLY_MISSING = ["/missing.png", "/broken.png"];

/** Collect uncaught errors, console errors and failed HTTP responses for the lifetime of the page. */
export function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    // HTTP failures are reported (with their URL) by the response listener below.
    if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) errors.push(`console: ${m.text()}`);
  });
  page.on("response", (r) => {
    const path = new URL(r.url()).pathname;
    if (r.status() >= 400 && !INTENTIONALLY_MISSING.includes(path)) errors.push(`http ${r.status()}: ${r.url()}`);
  });
  return errors;
}

export async function expectNoAxeViolations(page: Page, selector = "main") {
  await page.addScriptTag({ path: axePath });
  const violations = await page.evaluate(async (sel) => {
    // biome-ignore lint/suspicious/noExplicitAny: axe is injected at runtime
    const axe = (window as any).axe;
    const result = await axe.run(sel, { resultTypes: ["violations"] });
    return result.violations.map(
      (v: { id: string; help: string; nodes: { target: string[] }[] }) =>
        `${v.id}: ${v.help} → ${v.nodes
          .map((n) => n.target.join(" "))
          .slice(0, 5)
          .join(", ")}`,
    );
  }, selector);
  expect(violations).toEqual([]);
}

export async function setScheme(page: Page, scheme: "light" | "dark") {
  await page.emulateMedia({ colorScheme: scheme });
}

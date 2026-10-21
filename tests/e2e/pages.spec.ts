import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";
import { expectNoAxeViolations, setScheme, slugs, trackErrors } from "./helpers";

for (const slug of slugs) {
  test.describe(`docs/${slug}`, () => {
    for (const scheme of ["light", "dark"] as const) {
      test(`renders without errors or a11y violations (${scheme})`, async ({ page }) => {
        const errors = trackErrors(page);
        await setScheme(page, scheme);
        await page.goto(`/docs/${slug}`);
        await expect(page.locator("main h1").first()).toBeVisible();
        await expect(page.locator("[data-datui-portal]").first()).toBeAttached();
        await expect(page.locator(".datui-root").first()).toHaveAttribute("data-theme", scheme);
        await expectNoAxeViolations(page);
        expect(errors).toEqual([]);
      });
    }

    test("has no horizontal page overflow", async ({ page }) => {
      await page.goto(`/docs/${slug}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  });
}

test("guides and index render", async ({ page }) => {
  const errors = trackErrors(page);
  for (const path of [
    "/",
    "/docs",
    "/docs/installation",
    "/docs/theming",
    "/docs/customization",
    "/docs/contributing",
  ]) {
    await page.goto(path);
    await expect(page.locator("main h1").first()).toBeVisible();
    await expectNoAxeViolations(page);
  }
  expect(errors).toEqual([]);
});

test("sidebar search filters components", async ({ page, isMobile }) => {
  test.skip(isMobile, "sidebar is behind the mobile menu");
  await page.goto("/docs");
  await page.getByRole("searchbox", { name: "Search components" }).fill("butt");
  const nav = page.getByRole("navigation", { name: "Documentation" });
  await expect(nav.getByRole("link", { name: "Button", exact: true })).toBeVisible();
  await expect(nav.getByRole("link", { name: "Typography" })).toHaveCount(0);
});

test("playground controls change the preview", async ({ page }) => {
  await page.goto("/docs/button");
  const playground = page.getByRole("region", { name: "Playground" });
  await playground.getByLabel("children").fill("Hello");
  await expect(playground.getByRole("button", { name: "Hello" })).toBeVisible();
  await playground.getByLabel("disabled").check();
  await expect(playground.getByRole("button", { name: "Hello" })).toBeDisabled();
  await expect(
    playground.getByText('<Button variant="primary" appearance="accent" size="m" disabled>Hello</Button>'),
  ).toBeVisible();
});

// Playground "disabled" controls must really disable the previewed component.
const withDisabledControl = slugs.filter((slug) =>
  /playground:[\s\S]*\bdisabled:\s*\{\s*type:\s*"boolean"/.test(
    readFileSync(join(import.meta.dirname, "../../apps/docs/content", slug, "meta.ts"), "utf8"),
  ),
);
for (const slug of withDisabledControl) {
  test(`playground disabled control works: ${slug}`, async ({ page }) => {
    await page.goto(`/docs/${slug}`);
    const playground = page.getByRole("region", { name: "Playground" });
    const preview = playground.locator("[data-playground-preview]");
    const disabledCount = () => preview.locator(":disabled, [aria-disabled='true'], [data-disabled]").count();
    const before = await disabledCount();
    await playground.getByLabel("disabled", { exact: true }).check();
    await expect.poll(disabledCount).toBeGreaterThan(before);
  });
}

import axe from "axe-core";

/** Run axe on a rendered container and fail with readable violation details. */
export async function expectNoA11yViolations(container: Element): Promise<void> {
  const result = await axe.run(container, {
    // Color contrast needs real layout/CSS, which jsdom lacks; Playwright covers it.
    rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
  });
  const details = result.violations.map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.html).join("\n  ")}`);
  expect(details).toEqual([]);
}

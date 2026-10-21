import { expect, type Page, test } from "@playwright/test";

/** The live preview of one docs example. */
const example = (page: Page, slug: string, file: string) => page.locator(`#${slug}-${file}-panel`);

test.describe("overlays", () => {
  test("Alert traps focus, closes on Escape and returns focus", async ({ page }) => {
    await page.goto("/docs/alert");
    const trigger = example(page, "alert", "basic").getByRole("button", { name: "Delete photo" });
    await trigger.click();
    const dialog = page.getByRole("alertdialog", { name: "Delete photo?" });
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(dialog.locator(":focus")).toHaveCount(1);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("ModalPage opens as a dialog and restores focus", async ({ page }) => {
    await page.goto("/docs/modal-page");
    const trigger = page.getByRole("button", { name: "Open settings" });
    await trigger.click();
    const dialog = page.getByRole("dialog", { name: "Settings" });
    await expect(dialog).toBeVisible();
    await expect(page.locator("[data-datui-portal]").getByRole("dialog")).toHaveCount(1);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("ActionSheet is a keyboard-navigable menu", async ({ page, isMobile }) => {
    await page.goto("/docs/action-sheet");
    const trigger = example(page, "action-sheet", "basic").getByRole("button", { name: "More" });
    await trigger.click();
    if (isMobile) {
      await expect(page.getByRole("dialog")).toBeVisible();
    } else {
      const menu = page.getByRole("menu");
      await expect(menu).toBeVisible();
      await page.keyboard.press("ArrowDown");
      await expect(
        menu
          .getByRole("menuitem")
          .filter({ has: page.locator(":focus") })
          .or(menu.locator(":focus")),
      ).toHaveCount(1);
    }
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
  });

  test("Popover opens on click and closes on Escape", async ({ page }) => {
    await page.goto("/docs/popover");
    const trigger = example(page, "popover", "basic").getByRole("button", { name: "Rename" });
    await trigger.click();
    await expect(page.getByRole("textbox", { name: "Name" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("textbox", { name: "Name" })).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

test.describe("composite widgets", () => {
  test("Tabs move selection with arrow keys", async ({ page }) => {
    await page.goto("/docs/tabs");
    const tablist = page.getByRole("tablist", { name: "Project" });
    await tablist.getByRole("tab", { name: "Overview" }).click();
    await page.keyboard.press("ArrowRight");
    await expect(tablist.getByRole("tab", { name: "Activity" })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(tablist.getByRole("tab", { name: "Activity" })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("Activity content")).toBeVisible();
    await page.keyboard.press("End");
    await expect(tablist.getByRole("tab", { name: "Members" })).toBeFocused();
  });

  test("RadioGroup roves with arrow keys", async ({ page }) => {
    await page.goto("/docs/radio-group");
    const group = page.getByRole("radiogroup", { name: "Plan" });
    const radios = group.getByRole("radio");
    await radios.first().focus();
    // Radix selects on arrow-key focus while the key is down; press() releases before its deferred focus move.
    await page.keyboard.down("ArrowDown");
    await expect(radios.nth(1)).toBeFocused();
    await expect(radios.nth(1)).toBeChecked();
    await page.keyboard.up("ArrowDown");
  });

  test("Accordion toggles with the keyboard", async ({ page }) => {
    await page.goto("/docs/accordion");
    const summary = example(page, "accordion", "basic").getByRole("button").first();
    const expanded = await summary.getAttribute("aria-expanded");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(summary).toHaveAttribute("aria-expanded", expanded === "true" ? "false" : "true");
  });

  test("draggable List reorders with the keyboard", async ({ page }) => {
    await page.goto("/docs/cell");
    const list = example(page, "cell", "draggable");
    const handle = list.getByRole("button", { name: "Reorder Inbox" });
    await handle.focus();
    await page.keyboard.press("Space");
    await expect(handle).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("ArrowDown");
    // The sortable measures the new position on the next frames before it accepts the drop.
    await page.waitForTimeout(250);
    await page.keyboard.press("Space");
    await expect(list.getByRole("listitem").first()).toContainText("Starred");
    await expect(list.getByRole("listitem").nth(1)).toContainText("Inbox");
    await expect(handle).toBeFocused();
  });

  test("Gallery moves slides with arrow keys", async ({ page }) => {
    await page.goto("/docs/gallery");
    const gallery = page.getByRole("region", { name: "Highlights" });
    const slide = (n: number) => gallery.locator(`[aria-roledescription="slide"][aria-label="${n} of 4"]`);
    await gallery.focus();
    await expect(slide(1)).toBeInViewport({ ratio: 0.9 });
    await page.keyboard.press("ArrowRight");
    await expect(slide(2)).toBeInViewport({ ratio: 0.9 });
    await expect(slide(1)).not.toBeInViewport({ ratio: 0.5 });
  });
});

test.describe("docs shell", () => {
  test("mobile navigation opens the sidebar in a sheet", async ({ page, isMobile }) => {
    test.skip(!isMobile, "desktop shows the sidebar column");
    await page.goto("/docs/button");
    await page.getByRole("button", { name: "Open navigation" }).click();
    const dialog = page.getByRole("dialog", { name: "Documentation" });
    await dialog.getByRole("link", { name: "Tabs", exact: true }).click();
    await expect(page).toHaveURL(/\/docs\/tabs$/);
    await expect(dialog).toBeHidden();
  });

  test("theme switch applies data-theme", async ({ page }) => {
    await page.goto("/docs/button");
    await page.getByText("dark", { exact: true }).click();
    await expect(page.locator(".datui-root").first()).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator(".datui-root").first()).toHaveAttribute("data-theme", "dark");
  });
});

test.describe("icon motion", () => {
  test("check marks draw in and close icons turn on hover", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover feedback is pointer-only");
    await page.goto("/docs/checkbox");
    const box = page.locator("[data-example-preview]").getByRole("checkbox").first();
    if ((await box.getAttribute("aria-checked")) === "true") await box.click();
    await box.click();
    const check = box.locator("svg path").first();
    await expect.poll(() => check.evaluate((el) => getComputedStyle(el).animationName)).toBe("dt-icon-draw");

    await page.goto("/docs/chip");
    const remove = page
      .locator("[data-example-preview]")
      .getByRole("button", { name: /remove/i })
      .first();
    const icon = remove.locator("svg");
    await remove.hover();
    await expect.poll(() => icon.evaluate((el) => getComputedStyle(el).rotate)).toBe("90deg");
  });

  test("icon motion is off under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/docs/checkbox");
    const box = page.locator("[data-example-preview]").getByRole("checkbox").first();
    if ((await box.getAttribute("aria-checked")) !== "true") await box.click();
    const check = box.locator("svg path").first();
    expect(await check.evaluate((el) => getComputedStyle(el).animationName)).toBe("none");
  });
});

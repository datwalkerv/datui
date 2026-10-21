import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { ActionSheet } from "../ActionSheet/ActionSheet";
import { ActionSheetItem } from "./ActionSheetItem";

function Menu({ children }: { children: React.ReactNode }) {
  return (
    <ActionSheet mode="menu" title="Sort">
      {children}
    </ActionSheet>
  );
}

describe("ActionSheetItem", () => {
  it("is a menuitemradio with aria-checked when selectable", () => {
    render(
      <Menu>
        <ActionSheetItem selectable checked>
          Newest
        </ActionSheetItem>
        <ActionSheetItem selectable>Oldest</ActionSheetItem>
      </Menu>,
    );
    expect(screen.getByRole("menuitemradio", { name: "Newest" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("menuitemradio", { name: "Oldest" })).toHaveAttribute("aria-checked", "false");
  });

  it("renders slots, destructive style and links", () => {
    render(
      <Menu>
        <ActionSheetItem mode="destructive" before={<svg data-testid="icon" />} subtitle="Forever" meta="⌘D">
          Delete
        </ActionSheetItem>
        <ActionSheetItem href="/help">Help</ActionSheetItem>
      </Menu>,
    );
    const item = screen.getByRole("menuitem", { name: /Delete/ });
    expect(item).toHaveClass("text-destructive");
    expect(item).toHaveTextContent("Forever");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Help" })).toHaveAttribute("href", "/help");
  });

  it("keeps the sheet open with autoCloseDisabled and ignores disabled items", async () => {
    const onClick = vi.fn();
    const onDisabled = vi.fn();
    render(
      <Menu>
        <ActionSheetItem autoCloseDisabled onClick={onClick}>
          Toggle
        </ActionSheetItem>
        <ActionSheetItem disabled onClick={onDisabled}>
          Off
        </ActionSheetItem>
      </Menu>,
    );
    await userEvent.click(screen.getByRole("menuitem", { name: "Toggle" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("menuitem", { name: "Off" }));
    expect(onDisabled).not.toHaveBeenCalled();
  });

  it("is a plain button outside menu mode", () => {
    render(
      <ActionSheet mode="sheet" title="Share">
        <ActionSheetItem>Copy link</ActionSheetItem>
      </ActionSheet>,
    );
    expect(screen.getByRole("button", { name: "Copy link" })).not.toHaveAttribute("role");
  });

  it("is accessible", async () => {
    render(
      <Menu>
        <ActionSheetItem selectable checked>
          Newest
        </ActionSheetItem>
      </Menu>,
    );
    await expectNoA11yViolations(screen.getByRole("menu"));
  });
});

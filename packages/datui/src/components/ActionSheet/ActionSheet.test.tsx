import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { clickOutside } from "../../internal/ModalShell/testUtils";
import { ActionSheetItem } from "../ActionSheetItem/ActionSheetItem";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { ActionSheet, type ActionSheetCloseReason } from "./ActionSheet";

function Harness({
  sizeX = "regular",
  onClose,
  onEdit,
  onEditImmediate,
}: {
  sizeX?: "compact" | "regular";
  onClose?: (reason: ActionSheetCloseReason) => void;
  onEdit?: () => void;
  onEditImmediate?: () => void;
}) {
  const [shown, setShown] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  return (
    <AdaptivityProvider sizeX={sizeX}>
      <button ref={anchorRef} type="button" onClick={() => setShown(true)}>
        More
      </button>
      <button type="button">Elsewhere</button>
      {shown && (
        <ActionSheet anchorRef={anchorRef} title="Photo" onClose={onClose} onClosed={() => setShown(false)}>
          <ActionSheetItem onClick={onEdit} onImmediateClick={onEditImmediate}>
            Edit
          </ActionSheetItem>
          <ActionSheetItem>Share</ActionSheetItem>
          <ActionSheetItem disabled>Archive</ActionSheetItem>
          <ActionSheetItem mode="destructive">Delete</ActionSheetItem>
        </ActionSheet>
      )}
    </AdaptivityProvider>
  );
}

describe("ActionSheet", () => {
  it("is a menu anchored to the toggle on regular width", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "More" }));
    expect(screen.getByRole("menu", { name: "Photo" })).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(4);
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus());
  });

  it("moves focus with arrows, Home/End and typeahead, skipping disabled items", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "More" }));
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus());
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Share" })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    await userEvent.keyboard("{End}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
    await userEvent.keyboard("s");
    expect(screen.getByRole("menuitem", { name: "Share" })).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
  });

  it("closes on Escape and returns focus to the anchor", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const anchor = screen.getByRole("button", { name: "More" });
    await userEvent.click(anchor);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledWith("escape-key");
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    await waitFor(() => expect(anchor).toHaveFocus());
  });

  it("closes on outside click", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "More" }));
    await clickOutside(document.body);
    expect(onClose).toHaveBeenCalledWith("click-overlay");
  });

  it("runs onImmediateClick at once and onClick after closing", async () => {
    const onClose = vi.fn();
    const order: string[] = [];
    render(
      <Harness
        onClose={(r) => {
          onClose(r);
          order.push("close");
        }}
        onEdit={() => order.push("click")}
        onEditImmediate={() => order.push("immediate")}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "More" }));
    await userEvent.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onClose).toHaveBeenCalledWith("click-action-item");
    await waitFor(() => expect(order).toEqual(["immediate", "close", "click"]));
  });

  it("reports keydown-item when activated with Enter", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "More" }));
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus());
    await userEvent.keyboard("{Enter}");
    expect(onClose).toHaveBeenCalledWith("keydown-item");
  });

  it("is a bottom sheet with a cancel item on compact width", async () => {
    const onClose = vi.fn();
    render(<Harness sizeX="compact" onClose={onClose} />);
    const anchor = screen.getByRole("button", { name: "More" });
    await userEvent.click(anchor);
    const dialog = screen.getByRole("dialog", { name: "Photo" });
    expect(dialog).toHaveAttribute("data-vaul-drawer");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toHaveClass("justify-center");
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledWith("click-cancel-item");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(anchor).toHaveFocus());
  });

  it("closes the sheet on Escape", async () => {
    const onClose = vi.fn();
    render(<Harness sizeX="compact" onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "More" }));
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledWith("escape-key");
  });

  it("supports controlled open and a forced mode", () => {
    const { rerender } = render(
      <ActionSheet open={false} mode="sheet" title="Hidden">
        <ActionSheetItem>One</ActionSheetItem>
      </ActionSheet>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    rerender(
      <ActionSheet open mode="sheet" title="Shown">
        <ActionSheetItem>One</ActionSheetItem>
      </ActionSheet>,
    );
    expect(screen.getByRole("dialog", { name: "Shown" })).toBeInTheDocument();
  });

  it("is accessible in both layouts", async () => {
    const { unmount } = render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "More" }));
    await expectNoA11yViolations(screen.getByRole("menu"));
    unmount();
    render(<Harness sizeX="compact" />);
    await userEvent.click(screen.getByRole("button", { name: "More" }));
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});

import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { PanelHeaderContent } from "../PanelHeaderContent/PanelHeaderContent";
import { PanelHeaderContext } from "./PanelHeaderContext";

function Demo({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <PanelHeaderContent onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="modes">
        Modes
      </PanelHeaderContent>
      <button type="button">outside</button>
      <PanelHeaderContext
        id="modes"
        opened={open}
        onClose={() => {
          onClose?.();
          setOpen(false);
        }}
      >
        <button type="button">Friends</button>
      </PanelHeaderContext>
    </>
  );
}

describe("PanelHeaderContext", () => {
  afterEach(() => vi.useRealTimers());

  it("opens as a labelled dialog, takes focus and returns it on Escape", async () => {
    const onClose = vi.fn();
    render(<Demo onClose={onClose} />);
    const trigger = screen.getByRole("button", { name: "Modes" });
    await userEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Options" });
    expect(dialog).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(trigger).toHaveFocus();
  });

  it("closes on outside press but lets the trigger toggle", async () => {
    const onClose = vi.fn();
    render(<Demo onClose={onClose} />);
    const trigger = screen.getByRole("button", { name: "Modes" });
    await userEvent.click(trigger);
    await userEvent.click(screen.getByRole("button", { name: "Friends" }));
    expect(onClose).not.toHaveBeenCalled();
    await userEvent.click(trigger);
    expect(onClose).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    fireEvent.pointerDown(screen.getByRole("button", { name: "outside" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("unmounts after the exit animation", () => {
    vi.useFakeTimers();
    const { rerender } = render(<PanelHeaderContext opened onClose={() => {}} />);
    rerender(<PanelHeaderContext opened={false} onClose={() => {}} />);
    expect(screen.getByRole("dialog", { hidden: true })).toHaveAttribute("data-state", "closing");
    act(() => vi.advanceTimersByTime(300));
    expect(screen.queryByRole("dialog", { hidden: true })).toBeNull();
  });

  it("locks body scroll on compact widths while open", () => {
    const ui = (opened: boolean) => (
      <AdaptivityProvider sizeX="compact">
        <PanelHeaderContext opened={opened} onClose={() => {}} />
      </AdaptivityProvider>
    );
    const { rerender } = render(ui(true));
    expect(document.body.style.overflow).toBe("hidden");
    rerender(ui(false));
    expect(document.body.style.overflow).toBe("");
  });

  it("is accessible", async () => {
    const { container } = render(
      <PanelHeaderContext opened onClose={() => {}} label="Filters">
        <button type="button">All</button>
      </PanelHeaderContext>,
    );
    await expectNoA11yViolations(container);
  });
});

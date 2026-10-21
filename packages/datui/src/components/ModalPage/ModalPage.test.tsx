import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { clickOutside } from "../../internal/ModalShell/testUtils";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { ModalPageContent } from "../ModalPageContent/ModalPageContent";
import { ModalPageHeader } from "../ModalPageHeader/ModalPageHeader";
import { type ModalCloseReason, ModalPage, type ModalPageProps } from "./ModalPage";

function Harness({
  sizeX = "regular",
  onClose,
  ...props
}: Partial<ModalPageProps> & { sizeX?: "compact" | "regular" }) {
  const [open, setOpen] = React.useState(false);
  return (
    <AdaptivityProvider sizeX={sizeX}>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <ModalPage
        open={open}
        onClose={(reason: ModalCloseReason) => {
          onClose?.(reason);
          setOpen(false);
        }}
        header={<ModalPageHeader>Settings</ModalPageHeader>}
        {...props}
      >
        <ModalPageContent>
          <button type="button">Inside</button>
        </ModalPageContent>
      </ModalPage>
    </AdaptivityProvider>
  );
}

describe("ModalPage", () => {
  it("renders nothing while closed", () => {
    render(<ModalPage header={<ModalPageHeader>Hidden</ModalPageHeader>} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens a dialog labelled by the ModalPageHeader title", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog", { name: "Settings" });
    const title = screen.getByRole("heading", { level: 2, name: "Settings" });
    expect(dialog).toHaveAttribute("aria-labelledby", title.id);
    expect(dialog).toHaveClass("max-w-modal-s");
  });

  it("closes on Escape with the reason and returns focus to the trigger", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const trigger = screen.getByRole("button", { name: "Open" });
    await userEvent.click(trigger);
    await waitFor(() => expect(screen.getByRole("dialog")).toContainElement(document.activeElement as HTMLElement));
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledWith("escape-key");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("traps focus inside the dialog", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    for (let i = 0; i < 5; i++) {
      await userEvent.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it("closes with the close button and reports its reason", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} closeLabel="Dismiss" />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalledWith("click-close-button");
  });

  it("closes on an overlay click", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const overlay = screen.getByRole("dialog").parentElement as HTMLElement;
    await clickOutside(overlay);
    expect(onClose).toHaveBeenCalledWith("click-overlay");
  });

  it("preventClose blocks Escape and hides the close button", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} preventClose />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("supports controlled open via onOpenChange and lifecycle callbacks", async () => {
    const onOpenChange = vi.fn();
    const onOpened = vi.fn();
    const onClosed = vi.fn();
    const { rerender } = render(
      <AdaptivityProvider sizeX="regular">
        <ModalPage open onOpenChange={onOpenChange} onOpened={onOpened} onClosed={onClosed} aria-label="Plain" />
      </AdaptivityProvider>,
    );
    expect(onOpened).toHaveBeenCalledTimes(1);
    await userEvent.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    rerender(
      <AdaptivityProvider sizeX="regular">
        <ModalPage
          open={false}
          onOpenChange={onOpenChange}
          onOpened={onOpened}
          onClosed={onClosed}
          aria-label="Plain"
        />
      </AdaptivityProvider>,
    );
    expect(onClosed).toHaveBeenCalledTimes(1);
  });

  it("applies size presets and custom widths", () => {
    const { rerender } = render(
      <AdaptivityProvider sizeX="regular">
        <ModalPage open size="l" aria-label="Wide" />
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("dialog")).toHaveClass("max-w-modal-l");
    rerender(
      <AdaptivityProvider sizeX="regular">
        <ModalPage open size={600} height="400px" aria-label="Wide" />
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("dialog")).toHaveStyle({ maxWidth: "600px", height: "400px" });
  });

  it("renders a bottom sheet on compact width with outside buttons inside the dialog", async () => {
    const onClose = vi.fn();
    render(<Harness sizeX="compact" onClose={onClose} />);
    const trigger = screen.getByRole("button", { name: "Open" });
    await userEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Settings" });
    expect(dialog).toHaveAttribute("data-vaul-drawer");
    expect(dialog).toContainElement(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(dialog).toContainElement(document.activeElement as HTMLElement));
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledWith("escape-key");
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("uses snap points on compact width when settlingHeight is below 100", async () => {
    render(<Harness sizeX="compact" settlingHeight={50} />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toHaveAttribute("data-vaul-snap-points", "true");
  });

  it("is accessible", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await act(async () => {});
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});

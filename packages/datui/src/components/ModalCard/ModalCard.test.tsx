import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { clickOutside } from "../../internal/ModalShell/testUtils";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { Button } from "../Button/Button";
import { ModalOutsideButton } from "../ModalOutsideButton/ModalOutsideButton";
import { ModalCard, type ModalCardProps } from "./ModalCard";

function Harness({
  sizeX = "regular",
  onClose,
  ...props
}: Partial<ModalCardProps> & { sizeX?: "compact" | "regular" }) {
  const [open, setOpen] = React.useState(false);
  return (
    <AdaptivityProvider sizeX={sizeX}>
      <button type="button" onClick={() => setOpen(true)}>
        Open
      </button>
      <ModalCard
        open={open}
        onClose={(reason) => {
          onClose?.(reason);
          setOpen(false);
        }}
        title="Enable notifications?"
        description="We will only notify you about replies."
        actions={<Button stretched>Enable</Button>}
        {...props}
      />
    </AdaptivityProvider>
  );
}

describe("ModalCard", () => {
  it("wires title and description to the dialog", async () => {
    render(<Harness icon={<svg data-testid="icon" />} />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog", { name: "Enable notifications?" });
    expect(dialog).toHaveAccessibleDescription("We will only notify you about replies.");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enable" })).toBeInTheDocument();
  });

  it("closes on Escape, returns focus, and reports the reason", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const trigger = screen.getByRole("button", { name: "Open" });
    await userEvent.click(trigger);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledWith("escape-key");
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("closes on overlay click and the dismiss button", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await clickOutside(screen.getByRole("dialog").parentElement as HTMLElement);
    expect(onClose).toHaveBeenLastCalledWith("click-overlay");
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenLastCalledWith("click-close-button");
  });

  it("forces the dismiss button inside on regular width and hides it with mode none", async () => {
    const { unmount } = render(<Harness dismissButtonMode="outside" />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("button", { name: "Close" })).toHaveClass("absolute");
    unmount();
    render(<Harness dismissButtonMode="none" />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("docks to the bottom on compact width with outside buttons inside the dialog", async () => {
    render(
      <Harness
        sizeX="compact"
        outsideButtons={<ModalOutsideButton aria-label="Share">{<svg />}</ModalOutsideButton>}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("data-vaul-drawer");
    expect(dialog).toContainElement(screen.getByRole("button", { name: "Share" }));
    expect(screen.getByRole("button", { name: "Close" })).not.toHaveClass("absolute");
  });

  it("preventClose ignores Escape and overlay clicks", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} preventClose />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.keyboard("{Escape}");
    await clickOutside(screen.getByRole("dialog").parentElement as HTMLElement);
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("is accessible", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { clickOutside } from "../../internal/ModalShell/testUtils";
import { Popover, type PopoverProps } from "./Popover";

function Basic(props: Partial<PopoverProps>) {
  return (
    <>
      <Popover aria-label="Filters" content={<button type="button">Apply</button>} {...props}>
        <button type="button">Filters</button>
      </Popover>
      <button type="button">Elsewhere</button>
    </>
  );
}

describe("Popover", () => {
  it("toggles on click with aria-expanded and moves focus in", async () => {
    render(<Basic />);
    const trigger = screen.getByRole("button", { name: "Filters" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    await userEvent.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Filters" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
    await waitFor(() => expect(screen.getByRole("button", { name: "Apply" })).toHaveFocus());
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    render(<Basic />);
    const trigger = screen.getByRole("button", { name: "Filters" });
    await userEvent.click(trigger);
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("closes on outside click unless disabled", async () => {
    const { unmount } = render(<Basic />);
    await userEvent.click(screen.getByRole("button", { name: "Filters" }));
    await clickOutside(screen.getByRole("button", { name: "Elsewhere" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    unmount();
    render(<Basic disableCloseOnClickOutside disableCloseOnEscape />);
    await userEvent.click(screen.getByRole("button", { name: "Filters" }));
    await clickOutside(screen.getByRole("button", { name: "Elsewhere" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("passes onClose to render-prop content", async () => {
    const onOpenChange = vi.fn();
    render(
      <Popover
        aria-label="Menu"
        onOpenChange={onOpenChange}
        content={({ onClose }) => (
          <button type="button" onClick={onClose}>
            Done
          </button>
        )}
      >
        <button type="button">Open</button>
      </Popover>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await userEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("is controllable", async () => {
    function Controlled() {
      const [open, setOpen] = React.useState(true);
      return (
        <>
          <span data-testid="state">{String(open)}</span>
          <Basic open={open} onOpenChange={setOpen} />
        </>
      );
    }
    render(<Controlled />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.getByTestId("state")).toHaveTextContent("false");
  });

  it("opens on hover without stealing focus", async () => {
    render(<Basic trigger="hover" hoverDelay={0} />);
    const trigger = screen.getByRole("button", { name: "Filters" });
    fireEvent.click(trigger);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    trigger.focus();
    await userEvent.hover(trigger);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(trigger).toHaveFocus();
    await userEvent.unhover(trigger);
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("opens on focus", async () => {
    render(<Basic trigger="focus" />);
    await userEvent.tab();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filters" })).toHaveFocus();
  });

  it("stays closed when disabled", async () => {
    render(<Basic disabled />);
    await userEvent.click(screen.getByRole("button", { name: "Filters" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders an arrow, keeps mounted content hidden, and supports unstyled and closeOnContentClick", async () => {
    render(<Basic arrow keepMounted unstyled closeOnContentClick />);
    const panel = screen.getByRole("dialog", { hidden: true });
    expect(panel).toHaveAttribute("data-state", "closed");
    expect(panel).not.toHaveClass("bg-popover");
    await userEvent.click(screen.getByRole("button", { name: "Filters" }));
    expect(panel).toHaveAttribute("data-state", "open");
    expect(panel.querySelector("svg")).not.toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(panel).toHaveAttribute("data-state", "closed");
  });

  it("is accessible", async () => {
    const { container } = render(<Basic />);
    await userEvent.click(screen.getByRole("button", { name: "Filters" }));
    await expectNoA11yViolations(container);
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});

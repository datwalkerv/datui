import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { OnboardingTooltip, type OnboardingTooltipProps } from "./OnboardingTooltip";

function Harness({ onClose, ...props }: Partial<OnboardingTooltipProps>) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Start tour
      </button>
      <OnboardingTooltip
        open={open}
        onClose={() => {
          onClose?.();
          setOpen(false);
        }}
        title="New filters"
        description="Narrow results here."
        {...props}
      >
        <button type="button">Filters</button>
      </OnboardingTooltip>
    </>
  );
}

describe("OnboardingTooltip", () => {
  it("shows a labelled modal dialog and describes the anchor", async () => {
    render(<Harness />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Start tour" }));
    const dialog = await screen.findByRole("dialog", { name: "New filters" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("Narrow results here.");
    expect(dialog).toHaveClass("bg-primary");
    expect(screen.getByRole("button", { name: "Filters", hidden: true })).toHaveAttribute(
      "aria-describedby",
      dialog.getAttribute("aria-describedby"),
    );
    await waitFor(() => expect(dialog).toHaveFocus());
  });

  it("closes on Escape and restores focus", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const trigger = screen.getByRole("button", { name: "Start tour" });
    await userEvent.click(trigger);
    await waitFor(() => expect(screen.getByRole("dialog")).toHaveFocus());
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("closes when the overlay is clicked", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} overlayLabel="Dismiss hint" />);
    await userEvent.click(screen.getByRole("button", { name: "Start tour" }));
    await userEvent.click(await screen.findByLabelText("Dismiss hint"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("keeps focus inside while open", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Start tour" }));
    const dialog = await screen.findByRole("dialog");
    await waitFor(() => expect(dialog).toHaveFocus());
    await userEvent.tab();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  it("warns when it has no accessible name and supports appearances and hiding the arrow", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <OnboardingTooltip open title={undefined} description="Hint" appearance="white" hideArrow>
        <button type="button">Anchor</button>
      </OnboardingTooltip>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("OnboardingTooltip needs"));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveClass("bg-white");
    expect(dialog.querySelector("svg")).toBeNull();
    warn.mockRestore();
  });

  it("is accessible", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Start tour" }));
    await expectNoA11yViolations(await screen.findByRole("dialog"));
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { Alert, type AlertActionItem, type AlertProps } from "./Alert";

const actions: AlertActionItem[] = [
  { title: "Cancel", mode: "cancel" },
  { title: "Delete", mode: "destructive" },
];

function Harness(props: Partial<AlertProps>) {
  const [shown, setShown] = React.useState(false);
  return (
    <AdaptivityProvider sizeX="regular">
      <button type="button" onClick={() => setShown(true)}>
        Remove
      </button>
      {shown && (
        <Alert
          title="Delete photo?"
          description="This cannot be undone."
          actions={actions}
          onClosed={() => setShown(false)}
          {...props}
        />
      )}
    </AdaptivityProvider>
  );
}

describe("Alert", () => {
  it("renders an alertdialog with wired title and description", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    const dialog = screen.getByRole("alertdialog", { name: "Delete photo?" });
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
    expect(screen.getByRole("button", { name: "Delete" })).toHaveClass("bg-destructive");
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveClass("bg-secondary");
  });

  it("focuses the cancel action, closes on Escape and restores focus", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const trigger = screen.getByRole("button", { name: "Remove" });
    await userEvent.click(trigger);
    await waitFor(() => expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus());
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledWith("escape-key");
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("traps focus", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    const dialog = screen.getByRole("alertdialog");
    for (let i = 0; i < 4; i++) {
      await userEvent.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it("runs the action and closes with click-item", async () => {
    const onClose = vi.fn();
    const action = vi.fn();
    render(<Harness onClose={onClose} actions={[{ title: "OK", action }]} />);
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    await userEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(action).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith("click-item");
  });

  it("passes close() to actions with autoCloseDisabled", async () => {
    let close: (() => void) | undefined;
    render(
      <Harness
        actions={[
          {
            title: "Later",
            autoCloseDisabled: true,
            action: (ctx) => {
              close = ctx.close;
            },
          },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    await userEvent.click(screen.getByRole("button", { name: "Later" }));
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
    React.act(() => close?.());
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  });

  it("closes from the overlay and the X button", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} closeLabel="Dismiss" />);
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    await userEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenLastCalledWith("click-close-button");
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    const overlay = screen.getByRole("alertdialog").parentElement as HTMLElement;
    await userEvent.click(overlay, { pointerEventsCheck: 0 });
    expect(onClose).toHaveBeenLastCalledWith("click-overlay");
  });

  it("supports controlled open, vertical layout and renderAction", async () => {
    const onOpenChange = vi.fn();
    render(
      <Alert
        open
        onOpenChange={onOpenChange}
        title="Sign out?"
        actionsLayout="vertical"
        actions={[{ title: "Sign out" }]}
        renderAction={({ children, onClick }) => (
          <button type="button" data-custom="" onClick={onClick}>
            {children}
          </button>
        )}
      />,
    );
    const button = screen.getByRole("button", { name: "Sign out" });
    expect(button).toHaveAttribute("data-custom");
    expect(button.parentElement).toHaveClass("flex-col");
    await userEvent.click(button);
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  it("hides the X on compact width", () => {
    render(
      <AdaptivityProvider sizeX="compact">
        <Alert title="Hi" actions={actions} />
      </AdaptivityProvider>,
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("is accessible", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    await expectNoA11yViolations(screen.getByRole("alertdialog"));
  });
});

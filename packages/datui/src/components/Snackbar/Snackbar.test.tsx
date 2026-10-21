import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { Snackbar, SnackbarBasic, type SnackbarProps } from "./Snackbar";

function Harness(props: Partial<SnackbarProps>) {
  const [shown, setShown] = React.useState(true);
  return shown ? (
    <Snackbar onClosed={() => setShown(false)} {...props}>
      Message sent
    </Snackbar>
  ) : (
    <span>gone</span>
  );
}

/** jsdom runs no CSS animations, so end the exit animation by hand (React listens to the webkit name in jsdom). */
function endExit() {
  const status = screen.queryByRole("status");
  if (status) fireEvent(status, new Event("webkitAnimationEnd", { bubbles: true }));
}

describe("Snackbar", () => {
  afterEach(() => vi.useRealTimers());

  it("renders a status message with before/after slots", async () => {
    render(
      <Snackbar before={<svg data-testid="icon" />} after={<span>x</span>} subtitle="Just now">
        Saved
      </Snackbar>,
    );
    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("SavedJust nowx");
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(status).toHaveClass("bg-popover");
  });

  it("closes after the duration with reason timeout", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Harness duration={1000} onClose={onClose} />);
    await act(async () => {});
    act(() => vi.advanceTimersByTime(999));
    expect(onClose).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(onClose).toHaveBeenCalledWith("timeout");
    act(endExit);
    expect(screen.getByText("gone")).toBeInTheDocument();
  });

  it("pauses the timer while hovered or focused", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Harness duration={1000} onClose={onClose} action="Undo" />);
    await act(async () => {});
    const status = screen.getByRole("status");
    fireEvent.pointerEnter(status);
    act(() => vi.advanceTimersByTime(5000));
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.pointerLeave(status);
    act(() => screen.getByRole("button", { name: "Undo" }).focus());
    act(() => vi.advanceTimersByTime(5000));
    expect(onClose).not.toHaveBeenCalled();
    act(() => screen.getByRole("button", { name: "Undo" }).blur());
    act(() => vi.advanceTimersByTime(1000));
    expect(onClose).toHaveBeenCalledWith("timeout");
  });

  it("stays with duration null", async () => {
    vi.useFakeTimers();
    const onClose = vi.fn();
    render(<Harness duration={null} onClose={onClose} />);
    await act(async () => {});
    act(() => vi.advanceTimersByTime(60000));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes from the action and Escape", async () => {
    const onClose = vi.fn();
    const onActionClick = vi.fn();
    const { unmount } = render(<Harness action="Undo" onActionClick={onActionClick} onClose={onClose} />);
    await userEvent.click(await screen.findByRole("button", { name: "Undo" }));
    expect(onActionClick).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledWith("click-action");
    unmount();
    render(<Harness onClose={onClose} />);
    await screen.findByRole("status");
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenLastCalledWith("escape-key");
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "closed");
  });

  it("dismisses on a swipe past the threshold only", async () => {
    const onClose = vi.fn();
    render(<Harness onClose={onClose} />);
    const status = await screen.findByRole("status");
    fireEvent.pointerDown(status, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(status, { clientX: 20, clientY: 0, pointerId: 1 });
    fireEvent.pointerUp(status, { pointerId: 1 });
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.pointerDown(status, { clientX: 0, clientY: 0, pointerId: 1 });
    fireEvent.pointerMove(status, { clientX: 0, clientY: 80, pointerId: 1 });
    fireEvent.pointerUp(status, { pointerId: 1 });
    expect(onClose).toHaveBeenCalledWith("swipe");
  });

  it("is controllable", async () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(<Snackbar open={false}>Hidden</Snackbar>);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    rerender(
      <Snackbar open onOpenChange={onOpenChange}>
        Shown
      </Snackbar>,
    );
    await screen.findByRole("status");
    await userEvent.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.getByRole("status")).toHaveAttribute("data-state", "open");
  });

  it("maps placements on compact width and supports dark mode and vertical layout", async () => {
    render(
      <AdaptivityProvider sizeX="compact">
        <Snackbar placement="top-end" mode="dark" layout="vertical">
          Hi
        </Snackbar>
      </AdaptivityProvider>,
    );
    const status = await screen.findByRole("status");
    expect(status).toHaveClass("bg-snackbar-dark", "flex-col");
    expect(status.parentElement).toHaveClass("top-0", "inset-x-0");
    expect(status.parentElement).not.toHaveClass("end-0");
  });

  it("is accessible", async () => {
    render(<Snackbar action="Undo">Message sent</Snackbar>);
    await expectNoA11yViolations((await screen.findByRole("status")).parentElement as HTMLElement);
  });
});

describe("SnackbarBasic", () => {
  it("renders the surface inline with a working action and no timers", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const onActionClick = vi.fn();
    render(
      <SnackbarBasic subtitle="Moved to archive" action="Undo" onActionClick={onActionClick} data-testid="sb">
        Message archived
      </SnackbarBasic>,
    );
    expect(screen.getByTestId("sb")).toHaveTextContent("Message archived");
    expect(screen.getByText("Moved to archive")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Undo" }));
    expect(onActionClick).toHaveBeenCalledOnce();
    vi.advanceTimersByTime(10_000);
    expect(screen.getByTestId("sb")).toBeInTheDocument();
    vi.useRealTimers();
  });
});

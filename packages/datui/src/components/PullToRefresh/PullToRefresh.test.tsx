import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { PullToRefresh } from "./PullToRefresh";

const at = (y: number) => [{ clientX: 0, clientY: y }];

function pull(el: HTMLElement, distance: number) {
  fireEvent.touchStart(el, { touches: at(0) });
  const notPrevented = fireEvent.touchMove(el, { touches: at(distance) });
  fireEvent.touchEnd(el, { touches: [], changedTouches: at(distance) });
  return { prevented: !notPrevented };
}

describe("PullToRefresh", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a labelled region with content", () => {
    render(<PullToRefresh onRefresh={() => {}}>Feed</PullToRefresh>);
    const region = screen.getByRole("region", { name: "Refreshable content" });
    expect(region).toHaveAttribute("aria-busy", "false");
    expect(region).toHaveTextContent("Feed");
  });

  it("triggers onRefresh once when pulled past the threshold and blocks native scroll", () => {
    const onRefresh = vi.fn();
    render(<PullToRefresh onRefresh={onRefresh}>Feed</PullToRefresh>);
    const region = screen.getByRole("region");
    const { prevented } = pull(region, 200);
    expect(prevented).toBe(true);
    expect(onRefresh).toHaveBeenCalledTimes(1);
    expect(region).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Refreshing…");
    // A second pull while refreshing is ignored.
    pull(region, 200);
    expect(onRefresh).toHaveBeenCalledTimes(1);
  });

  it("shows pull progress while dragging", () => {
    const { container } = render(<PullToRefresh onRefresh={() => {}}>Feed</PullToRefresh>);
    const region = screen.getByRole("region");
    fireEvent.touchStart(region, { touches: at(0) });
    fireEvent.touchMove(region, { touches: at(60) });
    expect(container.querySelector('[data-state="pulling"]')).toBeInTheDocument();
    fireEvent.touchEnd(region, { touches: [], changedTouches: at(60) });
    expect(container.querySelector('[data-state="idle"]')).toBeInTheDocument();
  });

  it("ignores short pulls, upward and sideways swipes", () => {
    const onRefresh = vi.fn();
    render(<PullToRefresh onRefresh={onRefresh}>Feed</PullToRefresh>);
    const region = screen.getByRole("region");
    pull(region, 60);
    pull(region, -200);
    fireEvent.touchStart(region, { touches: [{ clientX: 0, clientY: 0 }] });
    fireEvent.touchMove(region, { touches: [{ clientX: 50, clientY: 10 }] });
    fireEvent.touchMove(region, { touches: [{ clientX: 50, clientY: 200 }] });
    fireEvent.touchEnd(region, { touches: [], changedTouches: [{ clientX: 50, clientY: 200 }] });
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it("ignores the gesture when the content is not scrolled to the top", () => {
    const onRefresh = vi.fn();
    render(
      <div data-testid="scroller">
        <PullToRefresh onRefresh={onRefresh}>Feed</PullToRefresh>
      </div>,
    );
    Object.defineProperty(screen.getByTestId("scroller"), "scrollTop", { configurable: true, value: 40 });
    pull(screen.getByRole("region"), 200);
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it("does nothing for mouse drags", () => {
    const onRefresh = vi.fn();
    render(<PullToRefresh onRefresh={onRefresh}>Feed</PullToRefresh>);
    const region = screen.getByRole("region");
    fireEvent.mouseDown(region, { clientY: 0 });
    fireEvent.mouseMove(window, { clientY: 300 });
    fireEvent.mouseUp(window, { clientY: 300 });
    expect(onRefresh).not.toHaveBeenCalled();
  });

  it("keeps the spinner until isFetching turns false and at least one second passed", () => {
    vi.useFakeTimers();
    const onRefresh = vi.fn();
    const { rerender } = render(<PullToRefresh onRefresh={onRefresh}>Feed</PullToRefresh>);
    const region = screen.getByRole("region");
    pull(region, 200);
    rerender(
      <PullToRefresh onRefresh={onRefresh} isFetching>
        Feed
      </PullToRefresh>,
    );
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(region).toHaveAttribute("aria-busy", "true");
    rerender(<PullToRefresh onRefresh={onRefresh}>Feed</PullToRefresh>);
    act(() => {
      vi.advanceTimersByTime(0);
    });
    expect(region).toHaveAttribute("aria-busy", "false");
  });

  it("holds the spinner for the minimum time after a fast refresh", () => {
    vi.useFakeTimers();
    render(<PullToRefresh onRefresh={() => {}}>Feed</PullToRefresh>);
    const region = screen.getByRole("region");
    pull(region, 200);
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(region).toHaveAttribute("aria-busy", "true");
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(region).toHaveAttribute("aria-busy", "false");
  });

  it("clears its timer and touch listeners on unmount", () => {
    vi.useFakeTimers();
    const onRefresh = vi.fn();
    const { unmount } = render(<PullToRefresh onRefresh={onRefresh}>Feed</PullToRefresh>);
    const region = screen.getByRole("region");
    pull(region, 200);
    expect(vi.getTimerCount()).toBe(1);
    const remove = vi.spyOn(region, "removeEventListener");
    unmount();
    expect(vi.getTimerCount()).toBe(0);
    expect(remove.mock.calls.map((c) => c[0])).toEqual(
      expect.arrayContaining(["touchstart", "touchmove", "touchend", "touchcancel"]),
    );
  });

  it("offers a refresh button for keyboard and assistive tech, disabled while fetching", async () => {
    const onRefresh = vi.fn();
    const { rerender } = render(
      <PullToRefresh onRefresh={onRefresh} refreshLabel="Reload feed">
        Feed
      </PullToRefresh>,
    );
    await userEvent.tab();
    const button = screen.getByRole("button", { name: "Reload feed" });
    expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(onRefresh).toHaveBeenCalledTimes(1);
    rerender(
      <PullToRefresh onRefresh={onRefresh} isFetching refreshLabel="Reload feed">
        Feed
      </PullToRefresh>,
    );
    expect(button).toBeDisabled();
  });

  it("is accessible", async () => {
    const { container } = render(
      <PullToRefresh onRefresh={() => {}} isFetching aria-label="News">
        <p>Feed</p>
      </PullToRefresh>,
    );
    await expectNoA11yViolations(container);
  });
});

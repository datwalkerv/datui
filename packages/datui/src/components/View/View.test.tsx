import { act, fireEvent, render, screen } from "@testing-library/react";
import type * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { ConfigProvider } from "../ConfigProvider/ConfigProvider";
import { Panel } from "../Panel/Panel";
import { PanelHeader } from "../PanelHeader/PanelHeader";
import { useNavDirection, useNavId, useNavTransition, View, type ViewProps } from "./View";

function Probe() {
  const { view, panel } = useNavId();
  const { entering, animating } = useNavTransition();
  const direction = useNavDirection();
  return <output data-testid={`probe-${panel}`}>{`${view}/${panel}/${entering}/${animating}/${direction}`}</output>;
}

function Stack(props: Omit<ViewProps, "children">) {
  return (
    <View id="main" {...props}>
      <Panel id="a">
        <PanelHeader>Alpha</PanelHeader>
        <Probe />
        <button type="button">in a</button>
      </Panel>
      <Panel id="b">
        <PanelHeader>Beta</PanelHeader>
        <Probe />
      </Panel>
      <Panel id="c">
        <PanelHeader>Gamma</PanelHeader>
      </Panel>
    </View>
  );
}

const noMotion = ({ children }: { children?: React.ReactNode }) => (
  <ConfigProvider transitionMotionEnabled={false}>{children}</ConfigProvider>
);

describe("View", () => {
  afterEach(() => vi.useRealTimers());

  it("renders only the active panel and exposes nav ids", () => {
    render(<Stack activePanel="a" />);
    expect(screen.getByRole("region", { name: "Alpha" })).toBeInTheDocument();
    expect(screen.queryByText("Beta")).not.toBeInTheDocument();
    expect(screen.getByTestId("probe-a")).toHaveTextContent("main/a/false/false/undefined");
  });

  it("switches instantly without motion, fires onTransition once and focuses the new title", () => {
    const onTransition = vi.fn();
    const { rerender } = render(<Stack activePanel="a" onTransition={onTransition} />, { wrapper: noMotion });
    screen.getByRole("button", { name: "in a" }).focus();
    rerender(<Stack activePanel="b" onTransition={onTransition} />);
    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
    expect(onTransition).toHaveBeenCalledTimes(1);
    expect(onTransition).toHaveBeenCalledWith({ isBack: false, from: "a", to: "b" });
    expect(screen.getByRole("heading", { name: "Beta" })).toHaveFocus();
    expect(screen.getByTestId("probe-b")).toHaveTextContent("main/b/false/false/forwards");
  });

  it("animates forward: keeps the outgoing panel inert until the animation ends", () => {
    vi.useFakeTimers();
    const onTransition = vi.fn();
    const { rerender, container } = render(<Stack activePanel="a" onTransition={onTransition} />);
    rerender(<Stack activePanel="b" onTransition={onTransition} />);
    const leaving = container.querySelector('[data-nav-layer="leaving"]');
    const active = container.querySelector('[data-nav-layer="active"]');
    expect(leaving).toHaveAttribute("inert");
    expect(leaving).toHaveAttribute("aria-hidden", "true");
    expect(leaving).toHaveClass("animate-nav-push-out");
    expect(active).toHaveClass("animate-nav-push-in");
    expect(screen.getByTestId("probe-a")).toHaveTextContent("main/a/false/true/undefined");
    expect(screen.getByTestId("probe-b")).toHaveTextContent("main/b/true/true/forwards");
    expect(onTransition).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(600));
    expect(container.querySelector('[data-nav-layer="leaving"]')).toBeNull();
    expect(onTransition).toHaveBeenCalledTimes(1);
  });

  it("finishes on animationend of the incoming layer", () => {
    const onTransition = vi.fn();
    const { rerender, container } = render(<Stack activePanel="a" onTransition={onTransition} />);
    rerender(<Stack activePanel="b" onTransition={onTransition} />);
    const active = container.querySelector('[data-nav-layer="active"]') as HTMLElement;
    // jsdom has no AnimationEvent, so React listens for the prefixed name there.
    fireEvent(active, new Event("webkitAnimationEnd", { bubbles: true }));
    expect(container.querySelector('[data-nav-layer="leaving"]')).toBeNull();
    expect(onTransition).toHaveBeenCalledTimes(1);
  });

  it("detects back navigation from a shrinking history", () => {
    vi.useFakeTimers();
    const onTransition = vi.fn();
    const { rerender, container } = render(<Stack activePanel="b" history={["a", "b"]} onTransition={onTransition} />);
    rerender(<Stack activePanel="a" history={["a"]} onTransition={onTransition} />);
    expect(container.querySelector('[data-nav-layer="active"]')).toHaveClass("animate-nav-pop-in");
    expect(container.querySelector('[data-nav-layer="leaving"]')).toHaveClass("animate-nav-pop-out");
    act(() => vi.advanceTimersByTime(600));
    expect(onTransition).toHaveBeenCalledWith({ isBack: true, from: "b", to: "a" });
  });

  it("falls back to child order without history and honours isBackCheck", () => {
    const onTransition = vi.fn();
    const { rerender } = render(<Stack activePanel="c" onTransition={onTransition} />, { wrapper: noMotion });
    rerender(<Stack activePanel="a" onTransition={onTransition} />);
    expect(onTransition).toHaveBeenLastCalledWith({ isBack: true, from: "c", to: "a" });
    const check = () => false;
    rerender(<Stack activePanel="b" onTransition={onTransition} isBackCheck={check} />);
    rerender(<Stack activePanel="a" onTransition={onTransition} isBackCheck={check} />);
    expect(onTransition).toHaveBeenLastCalledWith({ isBack: false, from: "b", to: "a" });
  });

  it("restores the scroll position when going back and resets it going forward", () => {
    const ui = (active: string, history: string[]) => (
      <div data-testid="scroller" style={{ overflowY: "auto" }}>
        <Stack activePanel={active} history={history} />
      </div>
    );
    const { rerender } = render(ui("a", ["a"]), { wrapper: noMotion });
    const scroller = screen.getByTestId("scroller");
    scroller.scrollTop = 120;
    fireEvent.scroll(scroller);
    rerender(ui("b", ["a", "b"]));
    expect(scroller.scrollTop).toBe(0);
    rerender(ui("a", ["a"]));
    expect(scroller.scrollTop).toBe(120);
  });

  describe("swipe back", () => {
    function setup(extra: Partial<ViewProps> = {}) {
      vi.useFakeTimers();
      const onSwipeBack = vi.fn();
      const utils = render(<Stack activePanel="b" history={["a", "b"]} onSwipeBack={onSwipeBack} {...extra} />);
      const view = utils.container.firstElementChild as HTMLElement;
      view.getBoundingClientRect = () =>
        ({ left: 0, right: 300, width: 300, top: 0, bottom: 600, height: 600 }) as DOMRect;
      return { ...utils, view, onSwipeBack };
    }
    const touch = (x: number, y = 100) => ({ touches: [{ clientX: x, clientY: y }] });

    it("commits past half the width and calls onSwipeBack", () => {
      const onSwipeBackStart = vi.fn();
      const { view, container, onSwipeBack } = setup({ onSwipeBackStart });
      fireEvent.touchStart(view, touch(5));
      fireEvent.touchMove(view, touch(40));
      act(() => vi.advanceTimersByTime(100));
      fireEvent.touchMove(view, touch(200));
      expect(onSwipeBackStart).toHaveBeenCalledWith("b");
      expect(container.querySelector('[data-nav-layer="underlay"]')).toHaveTextContent("Alpha");
      fireEvent.touchEnd(view, { touches: [] });
      act(() => vi.advanceTimersByTime(600));
      expect(onSwipeBack).toHaveBeenCalledTimes(1);
    });

    it("springs back on a short, slow swipe", () => {
      const onSwipeBackCancel = vi.fn();
      const { view, container, onSwipeBack } = setup({ onSwipeBackCancel });
      fireEvent.touchStart(view, touch(5));
      fireEvent.touchMove(view, touch(30));
      act(() => vi.advanceTimersByTime(500));
      fireEvent.touchMove(view, touch(40));
      fireEvent.touchEnd(view, { touches: [] });
      act(() => vi.advanceTimersByTime(600));
      expect(onSwipeBack).not.toHaveBeenCalled();
      expect(onSwipeBackCancel).toHaveBeenCalledTimes(1);
      expect(container.querySelector('[data-nav-layer="underlay"]')).toBeNull();
    });

    it("can be prevented, ignores touches away from the edge and opted-out targets", () => {
      const { view, container, onSwipeBack } = setup({ onSwipeBackStart: () => "prevent" });
      fireEvent.touchStart(view, touch(5));
      fireEvent.touchMove(view, touch(250));
      fireEvent.touchEnd(view, { touches: [] });
      fireEvent.touchStart(view, touch(100));
      fireEvent.touchMove(view, touch(290));
      expect(container.querySelector('[data-nav-layer="underlay"]')).toBeNull();
      act(() => vi.advanceTimersByTime(600));
      expect(onSwipeBack).not.toHaveBeenCalled();
    });

    it("removes its touch listeners on unmount", () => {
      const { view, unmount } = setup();
      const remove = vi.spyOn(view, "removeEventListener");
      unmount();
      const types = remove.mock.calls.map(([type]) => type);
      expect(types).toEqual(expect.arrayContaining(["touchstart", "touchmove", "touchend", "touchcancel"]));
    });
  });

  it("is accessible", async () => {
    const { container } = render(<Stack activePanel="a" />);
    await expectNoA11yViolations(container);
  });
});

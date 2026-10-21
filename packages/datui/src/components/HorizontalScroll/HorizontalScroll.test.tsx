import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { DirectionProvider } from "../DirectionProvider/DirectionProvider";
import { HorizontalScroll } from "./HorizontalScroll";

/** jsdom has no layout: give the viewport a size and a writable scroll position. */
function mockLayout(viewport: HTMLElement, { scrollWidth = 1000, clientWidth = 300, scrollLeft = 0 } = {}) {
  let left = scrollLeft;
  Object.defineProperty(viewport, "scrollWidth", { configurable: true, value: scrollWidth });
  Object.defineProperty(viewport, "clientWidth", { configurable: true, value: clientWidth });
  Object.defineProperty(viewport, "scrollLeft", {
    configurable: true,
    get: () => left,
    set: (v: number) => {
      left = v;
    },
  });
  const scrollTo = vi.fn((opts: ScrollToOptions) => {
    left = opts.left ?? left;
  });
  viewport.scrollTo = scrollTo as unknown as typeof viewport.scrollTo;
  const setScroll = (v: number) => {
    left = v;
    act(() => {
      fireEvent.scroll(viewport);
    });
  };
  setScroll(scrollLeft);
  return { scrollTo, setScroll };
}

function setup(props: React.ComponentProps<typeof HorizontalScroll> = {}, pointer = true) {
  let viewport: HTMLDivElement | null = null;
  const utils = render(
    <AdaptivityProvider hasPointer={pointer}>
      <HorizontalScroll
        viewportRef={(node) => {
          viewport = node;
        }}
        {...props}
      >
        <a href="#a">One</a>
        <a href="#b">Two</a>
      </HorizontalScroll>
    </AdaptivityProvider>,
  );
  if (!viewport) throw new Error("viewport not attached");
  return { ...utils, viewport: viewport as HTMLDivElement };
}

const prevArrow = (c: HTMLElement) => c.querySelector('[data-arrow="prev"]');
const nextArrow = (c: HTMLElement) => c.querySelector('[data-arrow="next"]');

describe("HorizontalScroll", () => {
  it("renders children in a flex content wrapper with a custom element", () => {
    const { container, viewport } = setup({ contentAs: "ul", contentClassName: "gap-2" });
    expect(viewport.firstElementChild?.tagName).toBe("UL");
    expect(viewport.firstElementChild).toHaveClass("flex", "gap-2");
    expect(viewport).toHaveClass("overflow-x-auto", "scrollbar-none");
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(prevArrow(container)).toBeNull();
  });

  it("shows arrows per scroll position and hides them at the edges", () => {
    const { container, viewport } = setup();
    const { setScroll } = mockLayout(viewport);
    expect(prevArrow(container)).toBeNull();
    expect(nextArrow(container)).toBeInTheDocument();
    setScroll(300);
    expect(prevArrow(container)).toBeInTheDocument();
    expect(nextArrow(container)).toBeInTheDocument();
    setScroll(700);
    expect(nextArrow(container)).toBeNull();
  });

  it("hides arrows without a fine pointer unless showArrows='always', and when showArrows=false", () => {
    const touch = setup({}, false);
    mockLayout(touch.viewport);
    expect(nextArrow(touch.container)).toBeNull();
    touch.unmount();

    const always = setup({ showArrows: "always" }, false);
    mockLayout(always.viewport);
    expect(nextArrow(always.container)).toBeInTheDocument();
    always.unmount();

    const off = setup({ showArrows: false });
    mockLayout(off.viewport);
    expect(nextArrow(off.container)).toBeNull();
  });

  it("arrows are hidden from assistive tech and the tab order", () => {
    const { container, viewport } = setup();
    mockLayout(viewport, { scrollLeft: 300 });
    for (const arrow of [prevArrow(container), nextArrow(container)]) {
      expect(arrow).toHaveAttribute("aria-hidden", "true");
      expect(arrow).toHaveAttribute("tabindex", "-1");
    }
  });

  it("scrolls by one page per arrow click, clamped to the bounds", async () => {
    const { container, viewport } = setup({ arrowSize: "s" });
    const { scrollTo } = mockLayout(viewport, { scrollLeft: 100 });
    await userEvent.click(nextArrow(container) as HTMLElement);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 400, behavior: "smooth" });
    await userEvent.click(prevArrow(container) as HTMLElement);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 100, behavior: "smooth" });
    const second = mockLayout(viewport, { scrollLeft: 600 });
    await userEvent.click(nextArrow(container) as HTMLElement);
    expect(second.scrollTo).toHaveBeenLastCalledWith({ left: 700, behavior: "smooth" });
  });

  it("uses custom scroll functions", async () => {
    const getScrollToNext = vi.fn((pos: number) => pos + 50);
    const { container, viewport } = setup({ getScrollToNext });
    const { scrollTo } = mockLayout(viewport);
    await userEvent.click(nextArrow(container) as HTMLElement);
    expect(getScrollToNext).toHaveBeenCalledWith(0, viewport);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 50, behavior: "smooth" });
  });

  it("scrolls instantly under reduced motion", async () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      ...original(query),
      matches: query.includes("reduce"),
    })) as typeof window.matchMedia;
    try {
      const { container, viewport } = setup();
      const { scrollTo } = mockLayout(viewport);
      await userEvent.click(nextArrow(container) as HTMLElement);
      expect(scrollTo).toHaveBeenLastCalledWith({ left: 300, behavior: "auto" });
    } finally {
      window.matchMedia = original;
    }
  });

  it("flips arrow direction and scroll sign in RTL", async () => {
    let viewport: HTMLDivElement | null = null;
    const { container } = render(
      <DirectionProvider value="rtl">
        <AdaptivityProvider hasPointer>
          <HorizontalScroll
            viewportRef={(n) => {
              viewport = n;
            }}
          >
            x
          </HorizontalScroll>
        </AdaptivityProvider>
      </DirectionProvider>,
    );
    const vp = viewport as unknown as HTMLDivElement;
    const { scrollTo } = mockLayout(vp, { scrollLeft: -300 });
    expect(prevArrow(container)).toHaveAttribute("data-direction", "right");
    expect(nextArrow(container)).toHaveAttribute("data-direction", "left");
    await userEvent.click(nextArrow(container) as HTMLElement);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: -600, behavior: "smooth" });
  });

  it("maps vertical wheel to horizontal scroll only when scrollOnAnyWheel", () => {
    const off = setup();
    mockLayout(off.viewport);
    fireEvent.wheel(off.viewport, { deltaY: 40 });
    expect(off.viewport.scrollLeft).toBe(0);
    off.unmount();

    const on = setup({ scrollOnAnyWheel: true });
    mockLayout(on.viewport);
    const event = new WheelEvent("wheel", { deltaY: 40, cancelable: true });
    on.viewport.dispatchEvent(event);
    expect(on.viewport.scrollLeft).toBe(40);
    expect(event.defaultPrevented).toBe(true);
    // At the start edge an upward wheel goes to the page.
    on.viewport.scrollLeft = 0;
    const up = new WheelEvent("wheel", { deltaY: -40, cancelable: true });
    on.viewport.dispatchEvent(up);
    expect(up.defaultPrevented).toBe(false);
  });

  it("makes the viewport keyboard-focusable only when it overflows", () => {
    const { viewport } = setup();
    expect(viewport).not.toHaveAttribute("tabindex");
    mockLayout(viewport);
    expect(viewport).toHaveAttribute("tabindex", "0");
  });

  it("removes scroll, wheel and resize listeners on unmount", () => {
    const disconnect = vi.fn();
    const OriginalRO = globalThis.ResizeObserver;
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect = disconnect;
    } as unknown as typeof ResizeObserver;
    try {
      const { viewport, unmount } = setup({ scrollOnAnyWheel: true });
      const remove = vi.spyOn(viewport, "removeEventListener");
      unmount();
      expect(remove.mock.calls.map((c) => c[0]).sort()).toEqual(["scroll", "wheel"]);
      expect(disconnect).toHaveBeenCalled();
    } finally {
      globalThis.ResizeObserver = OriginalRO;
    }
  });

  it("is accessible", async () => {
    const { container, viewport } = setup();
    mockLayout(viewport, { scrollLeft: 300 });
    await expectNoA11yViolations(container);
  });
});

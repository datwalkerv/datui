import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { DirectionProvider } from "../DirectionProvider/DirectionProvider";
import { Gallery, type GalleryProps } from "./Gallery";

// jsdom has no layout. Give every element a 300px box and lay slides out side by side so embla can compute snaps.
const WIDTH = 300;
const descriptors = ["offsetWidth", "offsetHeight", "offsetLeft", "offsetTop"] as const;
const saved = new Map<string, PropertyDescriptor | undefined>();
beforeAll(() => {
  for (const key of descriptors) saved.set(key, Object.getOwnPropertyDescriptor(HTMLElement.prototype, key));
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", { configurable: true, get: () => WIDTH });
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", { configurable: true, get: () => WIDTH });
  Object.defineProperty(HTMLElement.prototype, "offsetTop", { configurable: true, get: () => 0 });
  Object.defineProperty(HTMLElement.prototype, "offsetLeft", {
    configurable: true,
    get(this: HTMLElement) {
      if (this.getAttribute("role") !== "group" || !this.parentElement) return 0;
      return Array.prototype.indexOf.call(this.parentElement.children, this) * WIDTH;
    },
  });
});
afterAll(() => {
  for (const [key, d] of saved) if (d) Object.defineProperty(HTMLElement.prototype, key, d);
});

function renderGallery(props: Partial<GalleryProps> = {}, { pointer = true } = {}) {
  return render(
    <AdaptivityProvider hasPointer={pointer}>
      <Gallery showArrows bullets="dark" {...props}>
        <div>Slide A</div>
        <div>Slide B</div>
        <div>Slide C</div>
      </Gallery>
    </AdaptivityProvider>,
  );
}

const activeBullet = (c: HTMLElement) =>
  Array.from(c.querySelectorAll("[aria-hidden] > span")).findIndex((n) => n.hasAttribute("data-active"));

function mockReducedMotion() {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({
    ...original(query),
    matches: query.includes("reduce"),
  })) as typeof window.matchMedia;
  return () => {
    window.matchMedia = original;
  };
}

describe("Gallery", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the carousel pattern with labelled slides", () => {
    renderGallery({ "aria-label": "Photos" });
    const region = screen.getByRole("region", { name: "Photos" });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    expect(region).toHaveAttribute("tabindex", "0");
    const slides = screen.getAllByRole("group");
    expect(slides).toHaveLength(3);
    expect(slides[1]).toHaveAttribute("aria-label", "2 of 3");
    expect(slides[1]).toHaveAttribute("aria-roledescription", "slide");
  });

  it("supports custom slide labels and role descriptions", () => {
    renderGallery({ slideLabel: (i, n) => `Photo ${i + 1}/${n}`, slideRoleDescription: "photo" });
    expect(screen.getByRole("group", { name: "Photo 1/3" })).toHaveAttribute("aria-roledescription", "photo");
  });

  it("applies slide width", () => {
    const { unmount } = renderGallery({ slideWidth: 120 });
    expect(screen.getAllByRole("group")[0]).toHaveStyle({ flex: "0 0 120px" });
    unmount();
    renderGallery({ slideWidth: "custom" });
    expect(screen.getAllByRole("group")[0]?.getAttribute("style")).toBeNull();
  });

  it("is uncontrolled by default and moves with the arrows", async () => {
    const onChange = vi.fn();
    const { container } = renderGallery({ onChange });
    expect(screen.queryByRole("button", { name: "Previous slide" })).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onChange).toHaveBeenLastCalledWith(1);
    expect(activeBullet(container)).toBe(1);
    await userEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it("hides the next arrow on the last slide and arrows point at the viewport", () => {
    renderGallery({ defaultSlideIndex: 2 });
    expect(screen.queryByRole("button", { name: "Next slide" })).toBeNull();
    const prev = screen.getByRole("button", { name: "Previous slide" });
    expect(document.getElementById(prev.getAttribute("aria-controls") ?? "")).toHaveAttribute("aria-live");
  });

  it("follows a controlled slideIndex and clamps out-of-range values", () => {
    const { container, rerender } = renderGallery({ slideIndex: 1, onChange: () => {} });
    expect(activeBullet(container)).toBe(1);
    rerender(
      <AdaptivityProvider hasPointer>
        <Gallery showArrows bullets="dark" slideIndex={10} onChange={() => {}}>
          <div>Slide A</div>
          <div>Slide B</div>
          <div>Slide C</div>
        </Gallery>
      </AdaptivityProvider>,
    );
    expect(activeBullet(container)).toBe(2);
  });

  it("keeps a controlled index unless the parent updates it", async () => {
    const onChange = vi.fn();
    const { container } = renderGallery({ slideIndex: 0, onChange });
    await userEvent.click(screen.getByRole("button", { name: "Next slide" }));
    expect(onChange).toHaveBeenCalledWith(1);
    expect(activeBullet(container)).toBe(0);
  });

  it("wraps around when looped", async () => {
    const onChange = vi.fn();
    renderGallery({ looped: true, onChange });
    await userEvent.click(screen.getByRole("button", { name: "Previous slide" }));
    expect(onChange).toHaveBeenLastCalledWith(2);
  });

  it("navigates with arrow keys, Home and End while focused", async () => {
    const onChange = vi.fn();
    renderGallery({ onChange });
    screen.getByRole("region").focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith(1);
    await userEvent.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith(2);
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledTimes(2);
    await userEvent.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it("flips arrow keys in RTL", async () => {
    const onChange = vi.fn();
    render(
      <DirectionProvider value="rtl">
        <Gallery onChange={onChange}>
          <div>A</div>
          <div>B</div>
        </Gallery>
      </DirectionProvider>,
    );
    screen.getByRole("region").focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith(1);
  });

  it("shows arrows only with a fine pointer unless showArrows='always'", () => {
    const { unmount } = renderGallery({}, { pointer: false });
    expect(screen.queryByRole("button", { name: "Next slide" })).toBeNull();
    unmount();
    renderGallery({ showArrows: "always" }, { pointer: false });
    expect(screen.getByRole("button", { name: "Next slide" })).toBeInTheDocument();
  });

  it("renders light bullets and hides them from assistive tech", () => {
    const { container } = renderGallery({ bullets: "light" });
    const dots = container.querySelectorAll("[aria-hidden] > span.bg-bullet-light");
    expect(dots).toHaveLength(3);
  });

  it("autoplays, wrapping at the end", () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    renderGallery({ autoplay: 1000, onChange, defaultSlideIndex: 2 });
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onChange).toHaveBeenLastCalledWith(0);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onChange).toHaveBeenLastCalledWith(1);
  });

  it("pauses autoplay on hover, focus and with the pause button", () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    renderGallery({ autoplay: 1000, onChange });
    const region = screen.getByRole("region");

    fireEvent.pointerEnter(region, { pointerType: "mouse" });
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.pointerLeave(region, { pointerType: "mouse" });

    act(() => {
      region.focus();
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onChange).not.toHaveBeenCalled();
    act(() => {
      region.blur();
    });

    fireEvent.click(screen.getByRole("button", { name: "Pause slideshow" }));
    act(() => {
      // Clicking moved focus nowhere in jsdom; make sure the focus pause isn't what holds it.
      region.blur();
      vi.advanceTimersByTime(3000);
    });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Play slideshow" }));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onChange).toHaveBeenLastCalledWith(1);
  });

  it("does not autoplay under reduced motion", () => {
    const restore = mockReducedMotion();
    vi.useFakeTimers();
    try {
      const onChange = vi.fn();
      renderGallery({ autoplay: 1000, onChange });
      act(() => {
        vi.advanceTimersByTime(5000);
      });
      expect(onChange).not.toHaveBeenCalled();
      expect(screen.queryByRole("button", { name: "Pause slideshow" })).toBeNull();
    } finally {
      restore();
    }
  });

  it("clears the autoplay timer on unmount", () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    const clear = vi.spyOn(globalThis, "clearTimeout");
    const { unmount } = renderGallery({ autoplay: 1000, onChange });
    unmount();
    expect(clear).toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onChange).not.toHaveBeenCalled();
    clear.mockRestore();
  });

  it("is accessible", async () => {
    const { container } = renderGallery({ autoplay: 3000, defaultSlideIndex: 1 });
    await expectNoA11yViolations(container);
  });
});

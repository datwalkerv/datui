import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { CardScroll, type CardScrollProps } from "./CardScroll";

function setup(props: Partial<CardScrollProps> = {}) {
  let viewport: HTMLDivElement | null = null;
  const utils = render(
    <AdaptivityProvider hasPointer>
      <CardScroll
        viewportRef={(n) => {
          viewport = n;
        }}
        {...props}
      >
        <div>Card 1</div>
        <div>Card 2</div>
        {null}
        <div>Card 3</div>
      </CardScroll>
    </AdaptivityProvider>,
  );
  return { ...utils, viewport: viewport as unknown as HTMLDivElement };
}

describe("CardScroll", () => {
  it("renders a list with one item per card and skips empty children", () => {
    setup();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("maps size to card width classes and padding to gutters", () => {
    const { unmount } = setup({ size: "m", padding: true });
    const list = screen.getByRole("list");
    expect(list).toHaveClass("*:w-card-scroll-m", "px-3", "*:snap-start");
    unmount();
    setup({ size: false });
    expect(screen.getByRole("list").className).not.toMatch(/w-card-scroll/);
  });

  it("defaults to small cards with snapping", () => {
    const { viewport } = setup();
    expect(screen.getByRole("list")).toHaveClass("*:w-card-scroll-s");
    expect(viewport).toHaveClass("snap-x", "snap-mandatory");
  });

  it("scrolls by one card width plus gap per arrow click", async () => {
    const { container, viewport } = setup();
    let left = 0;
    Object.defineProperty(viewport, "scrollWidth", { configurable: true, value: 1000 });
    Object.defineProperty(viewport, "clientWidth", { configurable: true, value: 300 });
    Object.defineProperty(viewport, "scrollLeft", { configurable: true, get: () => left });
    const scrollTo = vi.fn();
    viewport.scrollTo = scrollTo;
    const firstItem = screen.getAllByRole("listitem")[0] as HTMLElement;
    Object.defineProperty(firstItem, "offsetWidth", { configurable: true, value: 136 });
    screen.getByRole("list").style.columnGap = "8px";
    act(() => {
      fireEvent.scroll(viewport);
    });
    await userEvent.click(container.querySelector('[data-arrow="next"]') as HTMLElement);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 144, behavior: "smooth" });
    left = 288;
    act(() => {
      fireEvent.scroll(viewport);
    });
    await userEvent.click(container.querySelector('[data-arrow="prev"]') as HTMLElement);
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 144, behavior: "smooth" });
  });

  it("is accessible", async () => {
    const { container } = setup({ padding: true });
    await expectNoA11yViolations(container);
  });
});

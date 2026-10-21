import { act, fireEvent, render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { SubnavigationButton } from "../SubnavigationButton/SubnavigationButton";
import { SubnavigationBar, type SubnavigationBarProps } from "./SubnavigationBar";

function Bar(props: SubnavigationBarProps) {
  return (
    <AdaptivityProvider hasHover>
      <SubnavigationBar aria-label="Filters" {...props}>
        <SubnavigationButton>One</SubnavigationButton>
        <SubnavigationButton>Two</SubnavigationButton>
      </SubnavigationBar>
    </AdaptivityProvider>
  );
}

function mockOverflow(el: HTMLElement, scrollWidth: number, clientWidth: number) {
  Object.defineProperty(el, "scrollWidth", { configurable: true, value: scrollWidth });
  Object.defineProperty(el, "clientWidth", { configurable: true, value: clientWidth });
}

describe("SubnavigationBar", () => {
  it("is a labelled navigation with its buttons", () => {
    render(<Bar />);
    expect(screen.getByRole("navigation", { name: "Filters" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("shows arrows only when content overflows and scrolls by a page", () => {
    const { container, rerender } = render(<Bar />);
    expect(container.querySelector("[data-arrow]")).toBeNull();
    const scroller = screen.getByRole("navigation").firstElementChild as HTMLElement;
    mockOverflow(scroller, 1000, 300);
    const scrollBy = vi.fn();
    scroller.scrollBy = scrollBy;
    act(() => {
      fireEvent.scroll(scroller);
    });
    expect(container.querySelector('[data-arrow="start"]')).toBeNull();
    const end = container.querySelector('[data-arrow="end"]') as HTMLElement;
    expect(end).toHaveAttribute("aria-hidden", "true");
    fireEvent.click(end);
    expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ left: 240 }));
    scroller.scrollLeft = 700;
    act(() => {
      fireEvent.scroll(scroller);
    });
    expect(container.querySelector('[data-arrow="start"]')).toBeInTheDocument();
    expect(container.querySelector('[data-arrow="end"]')).toBeNull();
    rerender(<Bar showArrows={false} />);
    expect(container.querySelector("[data-arrow]")).toBeNull();
  });

  it("fixed mode lays items out equally without scrolling; noPadding drops gutters", () => {
    render(<Bar fixed noPadding />);
    const row = screen.getByRole("navigation").firstElementChild;
    expect(row).toHaveClass("[&>*]:flex-1");
    expect(row).not.toHaveClass("overflow-x-auto", "px-4");
  });

  it("is accessible", async () => {
    const { container } = render(<Bar />);
    await expectNoA11yViolations(container);
  });
});

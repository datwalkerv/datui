import { act, render } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("is hidden from assistive tech and animated with a reduced-motion opt-out", () => {
    const { container } = render(<Skeleton width={120} height={16} />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el).toHaveClass("animate-shimmer", "motion-reduce:animate-none", "from-skeleton-from");
    expect(el.style.width).toBe("120px");
    expect(el.style.height).toBe("16px");
  });

  it("applies size, radius, margin, colors and duration", () => {
    const { container } = render(
      <Skeleton
        width="50%"
        maxWidth={200}
        borderRadius={8}
        margin="4px 0"
        colorFrom="red"
        colorTo="blue"
        duration={3}
      />,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.style.maxWidth).toBe("200px");
    expect(el.style.borderRadius).toBe("8px");
    expect(el.style.margin).toBe("4px 0px");
    expect(el.style.backgroundImage).toContain("red");
    expect(el.style.animationDuration).toBe("3s");
  });

  it("supports noAnimation and inline text skeletons", () => {
    const { container } = render(<Skeleton noAnimation>Loading title</Skeleton>);
    const el = container.firstChild as HTMLElement;
    expect(el).not.toHaveClass("animate-shimmer");
    expect(el).toHaveClass("inline-block", "text-transparent");
  });

  it("waits for visibilityDelay", () => {
    vi.useFakeTimers();
    const { container } = render(<Skeleton visibilityDelay={300} />);
    expect(container.firstChild).toHaveClass("invisible");
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(container.firstChild).not.toHaveClass("invisible");
    vi.useRealTimers();
  });

  it("is accessible", async () => {
    const { container } = render(
      <div aria-busy="true">
        <Skeleton width={100} />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});

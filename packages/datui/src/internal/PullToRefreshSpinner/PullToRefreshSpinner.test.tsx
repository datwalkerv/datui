import { render } from "@testing-library/react";
import { PullToRefreshSpinner } from "./PullToRefreshSpinner";

const arcLength = (c: HTMLElement) =>
  Number.parseFloat(c.querySelector("circle")?.getAttribute("stroke-dasharray") ?? "");

describe("PullToRefreshSpinner", () => {
  it("grows the arc with progress and spins when on", () => {
    const quarter = render(<PullToRefreshSpinner progress={0.25} />);
    const full = render(<PullToRefreshSpinner progress={1} />);
    const over = render(<PullToRefreshSpinner progress={3} />);
    expect(arcLength(quarter.container)).toBeCloseTo(arcLength(full.container) / 4);
    expect(arcLength(over.container)).toBe(arcLength(full.container));
    const on = render(<PullToRefreshSpinner on />);
    expect(on.container.querySelector("svg")).toHaveClass("animate-spin");
    expect(on.container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});

import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Progress } from "./Progress";

describe("Progress", () => {
  it("exposes progressbar semantics", () => {
    render(<Progress value={40} aria-label="Upload" />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveClass("bg-control-track");
    expect((bar.firstChild as HTMLElement).style.transform).toBe("translateX(-60%)");
  });

  it("clamps values", () => {
    const { rerender } = render(<Progress value={150} aria-label="p" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    rerender(<Progress value={-5} aria-label="p" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("supports appearances, custom colors, height and noTrack", () => {
    const { rerender } = render(<Progress value={10} appearance="negative" height={8} noTrack aria-label="p" />);
    const bar = screen.getByRole("progressbar");
    expect(bar.firstChild).toHaveClass("bg-destructive");
    expect(bar).toHaveClass("bg-transparent");
    expect(bar.style.height).toBe("8px");
    rerender(<Progress value={10} appearance="#ff0000" aria-label="p" />);
    expect((screen.getByRole("progressbar").firstChild as HTMLElement).style.backgroundColor).toBe("rgb(255, 0, 0)");
  });

  it("is accessible", async () => {
    const { container } = render(<Progress value={70} aria-label="Storage used" />);
    await expectNoA11yViolations(container);
  });
});

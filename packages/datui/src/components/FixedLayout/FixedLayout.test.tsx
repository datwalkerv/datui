import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { FixedLayout } from "./FixedLayout";

describe("FixedLayout", () => {
  it("pins to the top by default", () => {
    render(<FixedLayout>Bar</FixedLayout>);
    expect(screen.getByText("Bar")).toHaveClass("sticky", "top-0", "z-fixed");
    expect(screen.getByText("Bar")).not.toHaveClass("bg-background");
  });

  it("pins to the bottom with safe-area padding and can be filled", () => {
    render(
      <FixedLayout vertical="bottom" filled as="footer">
        Bar
      </FixedLayout>,
    );
    const bar = screen.getByRole("contentinfo");
    expect(bar).toHaveClass("bottom-0", "pb-[env(safe-area-inset-bottom)]", "bg-background");
  });

  it("is accessible", async () => {
    const { container } = render(<FixedLayout vertical="bottom">Bar</FixedLayout>);
    await expectNoA11yViolations(container);
  });
});

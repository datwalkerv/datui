import { render } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Gradient } from "./Gradient";

describe("Gradient", () => {
  it("defaults to the background fading toward the top", () => {
    const { container } = render(<Gradient />);
    expect(container.firstChild).toHaveClass("bg-linear-to-t", "from-background", "to-transparent");
  });

  it.each([
    ["tint", "bottom", "from-background-secondary", "bg-linear-to-b"],
    ["overlay", "top", "from-overlay", "bg-linear-to-t"],
  ] as const)("maps %s / %s", (variant, to, color, dir) => {
    const { container } = render(<Gradient variant={variant} to={to} />);
    expect(container.firstChild).toHaveClass(color, dir);
  });

  it("is accessible", async () => {
    const { container } = render(
      <Gradient>
        <p>Content</p>
      </Gradient>,
    );
    await expectNoA11yViolations(container);
  });
});

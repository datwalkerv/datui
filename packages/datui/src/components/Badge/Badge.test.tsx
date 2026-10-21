import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders an accent dot by default", () => {
    const { container } = render(<Badge />);
    expect(container.firstChild).toHaveClass("bg-primary", "rounded-full");
  });

  it("supports the negative appearance", () => {
    const { container } = render(<Badge appearance="negative" />);
    expect(container.firstChild).toHaveClass("bg-destructive");
  });

  it("keeps children as visually hidden text", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toHaveClass("sr-only");
  });

  it("is accessible", async () => {
    const { container } = render(
      <span>
        Messages <Badge>New</Badge>
      </span>,
    );
    await expectNoA11yViolations(container);
  });
});

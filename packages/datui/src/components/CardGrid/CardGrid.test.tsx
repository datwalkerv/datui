import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Card } from "../Card/Card";
import { CardGrid } from "./CardGrid";

describe("CardGrid", () => {
  it("renders a list with size s columns", () => {
    render(
      <CardGrid>
        <Card asChild>
          <li>One</li>
        </Card>
      </CardGrid>,
    );
    expect(screen.getByRole("list")).toHaveClass("grid-cols-2", "tablet:grid-cols-3");
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
  });

  it("maps size, padding and as", () => {
    const { rerender } = render(<CardGrid size="l" padding aria-label="g" />);
    expect(screen.getByRole("list")).toHaveClass("grid-cols-1", "px-4");
    rerender(<CardGrid size="m" as="div" data-testid="grid" />);
    expect(screen.getByTestId("grid").tagName).toBe("DIV");
    expect(screen.getByTestId("grid")).toHaveClass("mobile:grid-cols-2");
  });

  it("is accessible", async () => {
    const { container } = render(
      <CardGrid size="m">
        <Card asChild>
          <li>A</li>
        </Card>
        <Card asChild>
          <li>B</li>
        </Card>
      </CardGrid>,
    );
    await expectNoA11yViolations(container);
  });
});

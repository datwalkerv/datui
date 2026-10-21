import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Card } from "./Card";

describe("Card", () => {
  it("renders a tint div by default", () => {
    render(<Card>Body</Card>);
    const card = screen.getByText("Body");
    expect(card.tagName).toBe("DIV");
    expect(card).toHaveClass("bg-secondary", "rounded-lg");
  });

  it.each([
    ["shadow", "shadow-md"],
    ["outline", "border"],
    ["outline-tint", "bg-secondary"],
    ["plain", "bg-card"],
  ] as const)("maps variant %s", (variant, cls) => {
    render(<Card variant={variant}>c</Card>);
    expect(screen.getByText("c")).toHaveClass(cls);
  });

  it("renders its child with asChild", () => {
    render(
      <ul>
        <Card asChild variant="outline">
          <li>Item</li>
        </Card>
      </ul>,
    );
    const item = screen.getByRole("listitem");
    expect(item).toHaveClass("border", "rounded-lg");
  });

  it("is accessible", async () => {
    const { container } = render(<Card>Content</Card>);
    await expectNoA11yViolations(container);
  });
});

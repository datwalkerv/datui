import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("renders the number with default classes", () => {
    render(<Counter>5</Counter>);
    expect(screen.getByText("5")).toHaveClass("bg-primary", "text-primary-foreground", "h-5");
  });

  it("maps variant × appearance and size", () => {
    render(
      <>
        <Counter variant="tertiary" appearance="negative" size="s">
          1
        </Counter>
        <Counter variant="contrast" appearance="positive">
          2
        </Counter>
        <Counter variant="inherit">3</Counter>
      </>,
    );
    expect(screen.getByText("1")).toHaveClass("bg-transparent", "text-destructive", "h-4");
    expect(screen.getByText("2")).toHaveClass("bg-positive-foreground", "text-positive");
    expect(screen.getByText("3")).toHaveClass("bg-current/16");
  });

  it("applies a custom color as background or text per variant", () => {
    render(
      <>
        <Counter appearance="custom" color="#ff00aa">
          7
        </Counter>
        <Counter appearance="custom" variant="tertiary" color="#ff00aa">
          8
        </Counter>
      </>,
    );
    expect(screen.getByText("7")).toHaveClass("bg-(--dt-counter-color)");
    expect(screen.getByText("7").style.getPropertyValue("--dt-counter-color")).toBe("#ff00aa");
    expect(screen.getByText("8")).toHaveClass("text-(--dt-counter-color)");
  });

  it("renders nothing without children", () => {
    const { container } = render(<Counter />);
    expect(container).toBeEmptyDOMElement();
  });

  it("is accessible", async () => {
    const { container } = render(
      <span>
        Inbox <Counter>3</Counter>
        <span className="sr-only">unread</span>
      </span>,
    );
    await expectNoA11yViolations(container);
  });
});

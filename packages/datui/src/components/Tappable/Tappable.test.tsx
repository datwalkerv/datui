import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Tappable } from "./Tappable";

describe("Tappable", () => {
  it("adds feedback classes only when interactive", () => {
    render(
      <>
        <Tappable onClick={() => {}}>Press</Tappable>
        <Tappable>Plain</Tappable>
      </>,
    );
    expect(screen.getByRole("button")).toHaveClass(
      "hover:after:opacity-(--dt-opacity-hover)",
      "focus-visible:focus-ring",
    );
    expect(screen.getByText("Plain")).not.toHaveClass("hover:after:opacity-(--dt-opacity-hover)");
  });

  it("is accessible", async () => {
    const { container } = render(<Tappable onClick={() => {}}>Press</Tappable>);
    await expectNoA11yViolations(container);
  });
});

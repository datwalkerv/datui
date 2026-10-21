import { render, screen } from "@testing-library/react";
import { Separator } from "./Separator";

describe("Separator", () => {
  it("is decorative by default", () => {
    render(<Separator data-testid="s" />);
    expect(screen.getByTestId("s")).toHaveAttribute("role", "none");
  });
  it("exposes orientation when semantic", () => {
    render(<Separator decorative={false} direction="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });
});

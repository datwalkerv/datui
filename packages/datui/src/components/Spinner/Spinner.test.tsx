import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("announces a status with a default label", () => {
    render(<Spinner size="l" />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Loading…");
    expect(status).toHaveClass("size-icon-lg", "animate-spin");
  });
  it("can be silenced when a parent announces", () => {
    render(<Spinner label={null} data-testid="s" />);
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByTestId("s")).toHaveAttribute("aria-hidden", "true");
  });
});

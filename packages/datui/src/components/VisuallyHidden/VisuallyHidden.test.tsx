import { render, screen } from "@testing-library/react";
import { VisuallyHidden } from "./VisuallyHidden";

it("VisuallyHidden keeps text accessible", () => {
  render(
    <button type="button">
      <svg aria-hidden />
      <VisuallyHidden>Close</VisuallyHidden>
    </button>,
  );
  expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  expect(screen.getByText("Close")).toHaveClass("sr-only");
});

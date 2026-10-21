import { render, screen } from "@testing-library/react";
import { Mark } from "./Mark";

it("Mark renders a highlighted <mark>", () => {
  render(
    <p>
      find <Mark>this</Mark>
    </p>,
  );
  expect(screen.getByText("this").tagName).toBe("MARK");
  expect(screen.getByText("this")).toHaveClass("bg-mark");
});

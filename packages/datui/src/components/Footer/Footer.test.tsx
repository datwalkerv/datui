import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders a footer without an explicit role", () => {
    render(<Footer>12 items</Footer>);
    const el = screen.getByText("12 items");
    expect(el.tagName).toBe("FOOTER");
    expect(el).not.toHaveAttribute("role");
    expect(el).toHaveClass("text-center", "text-footnote");
  });

  it("supports custom elements and roles", () => {
    render(
      <Footer as="div" role="note">
        Note
      </Footer>,
    );
    expect(screen.getByRole("note")).toHaveTextContent("Note");
  });

  it("is accessible", async () => {
    const { container } = render(
      <section aria-label="List">
        <Footer>3 friends</Footer>
      </section>,
    );
    await expectNoA11yViolations(container);
  });
});

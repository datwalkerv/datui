import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { InfoRow } from "./InfoRow";

describe("InfoRow", () => {
  it("renders the header above the value with a hidden separator", () => {
    const { container } = render(<InfoRow header="Birthday">May 1</InfoRow>);
    expect(container.firstChild?.firstChild).toHaveTextContent("Birthday");
    expect(screen.getByText(":")).toHaveClass("sr-only");
    expect(container.textContent).toBe("Birthday: May 1");
  });

  it("is accessible", async () => {
    const { container } = render(<InfoRow header="City">Lisbon</InfoRow>);
    await expectNoA11yViolations(container);
  });
});

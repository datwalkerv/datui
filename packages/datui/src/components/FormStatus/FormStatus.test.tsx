import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { FormStatus } from "./FormStatus";

describe("FormStatus", () => {
  it("uses role=status by default and renders the title", () => {
    render(<FormStatus title="Saved">All good</FormStatus>);
    expect(screen.getByRole("status")).toHaveTextContent("SavedAll good");
  });

  it("uses role=alert for errors", () => {
    render(<FormStatus mode="error" title="Failed" />);
    expect(screen.getByRole("alert")).toHaveClass("text-destructive");
  });

  it("is accessible", async () => {
    const { container } = render(<FormStatus mode="error">Try again</FormStatus>);
    await expectNoA11yViolations(container);
  });
});

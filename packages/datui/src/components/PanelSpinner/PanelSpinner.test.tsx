import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { PanelSpinner } from "./PanelSpinner";

describe("PanelSpinner", () => {
  it("centers a status spinner in a 96px block", () => {
    const { container } = render(<PanelSpinner />);
    const block = container.firstChild as HTMLElement;
    expect(block.style.height).toBe("96px");
    expect(block).toHaveClass("items-center", "justify-center");
    expect(screen.getByRole("status")).toHaveTextContent("Loading…");
  });

  it("forwards height, size and label", () => {
    const { container } = render(<PanelSpinner height={200} size="s" label="Fetching" />);
    expect((container.firstChild as HTMLElement).style.height).toBe("200px");
    expect(screen.getByRole("status")).toHaveClass("size-icon-sm");
    expect(screen.getByRole("status")).toHaveTextContent("Fetching");
  });

  it("is accessible", async () => {
    const { container } = render(<PanelSpinner />);
    await expectNoA11yViolations(container);
  });
});

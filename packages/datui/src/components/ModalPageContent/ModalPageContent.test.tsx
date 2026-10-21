import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { ModalPageContent } from "./ModalPageContent";

describe("ModalPageContent", () => {
  it("is a focusable scroll region", async () => {
    render(
      <ModalPageContent data-testid="content" aria-label="Body">
        Long text
      </ModalPageContent>,
    );
    const content = screen.getByTestId("content");
    expect(content).toHaveClass("overflow-y-auto");
    await userEvent.tab();
    expect(content).toHaveFocus();
  });

  it("allows opting out of the tab stop", () => {
    render(<ModalPageContent data-testid="content" tabIndex={-1} />);
    expect(screen.getByTestId("content")).toHaveAttribute("tabindex", "-1");
  });

  it("is accessible", async () => {
    const { container } = render(<ModalPageContent>Text</ModalPageContent>);
    await expectNoA11yViolations(container);
  });
});

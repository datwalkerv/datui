import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Button } from "../Button/Button";
import { ButtonGroup } from "./ButtonGroup";

describe("ButtonGroup", () => {
  it("renders a labelled group with default classes", () => {
    render(
      <ButtonGroup aria-label="Actions">
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group", { name: "Actions" })).toHaveClass("flex-row", "gap-2", "justify-start");
  });

  it("maps mode, gap, align and stretched", () => {
    render(
      <ButtonGroup aria-label="g" mode="vertical" gap="s" align="right" stretched>
        <Button>One</Button>
      </ButtonGroup>,
    );
    expect(screen.getByRole("group")).toHaveClass("flex-col", "gap-1", "items-end", "w-full", "[&>*]:w-full");
  });

  it("keeps each button in the tab order", async () => {
    render(
      <ButtonGroup aria-label="g" gap="none">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>,
    );
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "One" })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Two" })).toHaveFocus();
  });

  it("is accessible", async () => {
    const { container } = render(
      <ButtonGroup aria-label="Actions">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </ButtonGroup>,
    );
    await expectNoA11yViolations(container);
  });
});

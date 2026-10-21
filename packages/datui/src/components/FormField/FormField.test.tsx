import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("renders slots with alignment and status classes", () => {
    const { container } = render(
      <FormField status="error" before={<span>B</span>} beforeAlign="start" after={<span>A</span>} afterAlign="end">
        <input aria-label="x" />
      </FormField>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("border-destructive", "rounded-md");
    expect(root).toHaveAttribute("data-status", "error");
    expect(screen.getByText("B").parentElement).toHaveClass("self-start");
    expect(screen.getByText("A").parentElement).toHaveClass("self-end");
  });

  it("plain mode drops border and background; default has focus-within styling", () => {
    const { container, rerender } = render(<FormField mode="plain" />);
    expect(container.firstElementChild).toHaveClass("border-transparent", "bg-transparent");
    rerender(<FormField />);
    expect(container.firstElementChild).toHaveClass("focus-within:border-primary", "bg-input");
  });

  it("focuses the control when empty shell space is pressed", async () => {
    render(
      <FormField before={<span>icon</span>}>
        <input aria-label="name" />
      </FormField>,
    );
    await userEvent.click(screen.getByText("icon"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("caps height with maxHeight and scrolls", () => {
    const { container } = render(<FormField maxHeight={80} />);
    expect(container.firstElementChild).toHaveStyle({ maxHeight: "80px" });
    expect(container.firstElementChild).toHaveClass("overflow-y-auto");
  });

  it("marks disabled shells", () => {
    const { container } = render(<FormField disabled />);
    expect(container.firstElementChild).toHaveAttribute("aria-disabled", "true");
  });

  it("is accessible", async () => {
    const { container } = render(
      <FormField>
        <input aria-label="name" />
      </FormField>,
    );
    await expectNoA11yViolations(container);
  });
});

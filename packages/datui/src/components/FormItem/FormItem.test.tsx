import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Input } from "../Input/Input";
import { FormItem } from "./FormItem";
import { FormItemTop, FormItemTopAside, FormItemTopLabel } from "./FormItemTop";

describe("FormItem", () => {
  it("labels the control and links the bottom text", async () => {
    render(
      <FormItem top="Email" bottom="We never share it">
        <Input />
      </FormItem>,
    );
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAccessibleDescription("We never share it");
    expect(input).not.toHaveAttribute("aria-invalid");
    await userEvent.click(screen.getByText("Email"));
    expect(input).toHaveFocus();
  });

  it("uses htmlFor / ids when given", () => {
    render(
      <FormItem top="Name" htmlFor="name" topId="name-label" bottom="Hint" bottomId="name-hint">
        <Input />
      </FormItem>,
    );
    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input).toHaveAttribute("id", "name");
    expect(input).toHaveAttribute("aria-describedby", "name-hint");
    expect(screen.getByText("Name")).toHaveAttribute("id", "name-label");
  });

  it("announces errors and marks the control invalid", () => {
    render(
      <FormItem top="Email" status="error" bottom="Invalid email">
        <Input />
      </FormItem>,
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("required shows a marker and sets required on the control", () => {
    render(
      <FormItem top="Email" required>
        <Input />
      </FormItem>,
    );
    expect(screen.getByRole("textbox")).toBeRequired();
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  it("removable renders a remove button", async () => {
    const onRemove = vi.fn();
    render(
      <FormItem top="Phone" removable onRemove={onRemove} removeLabel="Delete phone">
        <Input />
      </FormItem>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Delete phone" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("composes FormItemTop with label and aside", () => {
    render(
      <FormItem
        top={
          <FormItemTop>
            <FormItemTopLabel multiline>About</FormItemTopLabel>
            <FormItemTopAside aria-live="polite">0/100</FormItemTopAside>
          </FormItemTop>
        }
      >
        <Input />
      </FormItem>,
    );
    expect(screen.getByRole("textbox", { name: "About" })).toBeInTheDocument();
    expect(screen.getByText("0/100")).toHaveClass("ms-auto");
    expect(screen.getByText("About").tagName).toBe("LABEL");
  });

  it("FormItemTopLabel renders a span outside a FormItem", () => {
    render(<FormItemTopLabel required>Plain</FormItemTopLabel>);
    expect(screen.getByText("Plain").tagName).toBe("SPAN");
  });

  it("is accessible", async () => {
    const { container } = render(
      <FormItem top="Email" bottom="Hint" status="error" required>
        <Input />
      </FormItem>,
    );
    await expectNoA11yViolations(container);
  });
});

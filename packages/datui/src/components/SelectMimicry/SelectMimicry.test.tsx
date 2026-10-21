import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { FormItem } from "../FormItem/FormItem";
import { SelectMimicry } from "./SelectMimicry";

describe("SelectMimicry", () => {
  it("shows the placeholder when empty and the value otherwise", () => {
    const { rerender } = render(<SelectMimicry aria-label="City" placeholder="Choose city" />);
    expect(screen.getByRole("button")).toHaveTextContent("Choose city");
    expect(screen.getByRole("button")).toHaveClass("text-muted-foreground");
    rerender(<SelectMimicry aria-label="City">Paris</SelectMimicry>);
    expect(screen.getByRole("button")).toHaveTextContent("Paris");
  });

  it("activates with Enter and Space and announces its popup", async () => {
    const onClick = vi.fn();
    render(
      <FormItem top="City">
        <SelectMimicry onClick={onClick} placeholder="Choose" />
      </FormItem>,
    );
    const button = screen.getByRole("button", { name: "City" });
    expect(button).toHaveAttribute("aria-haspopup", "dialog");
    button.focus();
    await userEvent.keyboard("{Enter} ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(<SelectMimicry aria-label="City" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is accessible", async () => {
    const { container } = render(<SelectMimicry aria-label="City" status="error" multiline />);
    await expectNoA11yViolations(container);
  });
});

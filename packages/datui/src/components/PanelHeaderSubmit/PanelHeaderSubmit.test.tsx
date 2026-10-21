import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { PanelHeaderSubmit } from "./PanelHeaderSubmit";

describe("PanelHeaderSubmit", () => {
  it("is a primary button named Done", async () => {
    const onClick = vi.fn();
    render(<PanelHeaderSubmit onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Done" });
    expect(button).toHaveClass("text-primary");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("blocks clicks when disabled", async () => {
    const onClick = vi.fn();
    render(<PanelHeaderSubmit label="Save" disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is accessible", async () => {
    const { container } = render(<PanelHeaderSubmit />);
    await expectNoA11yViolations(container);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { PanelHeaderClose } from "./PanelHeaderClose";

describe("PanelHeaderClose", () => {
  it("is named Close by default and fires onClick", async () => {
    const onClick = vi.fn();
    render(<PanelHeaderClose onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("takes a custom label", () => {
    render(<PanelHeaderClose label="Dismiss" />);
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("is accessible", async () => {
    const { container } = render(<PanelHeaderClose />);
    await expectNoA11yViolations(container);
  });
});

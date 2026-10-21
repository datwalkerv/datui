import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { PanelHeaderBack } from "./PanelHeaderBack";

describe("PanelHeaderBack", () => {
  it("has an accessible name, a mirrored chevron and fires onClick", async () => {
    const onClick = vi.fn();
    const { container } = render(<PanelHeaderBack onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(onClick).toHaveBeenCalled();
    expect(container.querySelector("svg")).toHaveClass("rtl:-scale-x-100");
  });

  it("shows the label on request and localizes it", () => {
    render(<PanelHeaderBack label="Zurück" showLabel />);
    expect(screen.getByRole("button", { name: "Zurück" })).toHaveTextContent("Zurück");
  });

  it("can hide on desktop", () => {
    render(
      <AdaptivityProvider sizeX="regular" hasPointer>
        <PanelHeaderBack hideOnDesktop />
      </AdaptivityProvider>,
    );
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("is accessible", async () => {
    const { container } = render(<PanelHeaderBack />);
    await expectNoA11yViolations(container);
  });
});

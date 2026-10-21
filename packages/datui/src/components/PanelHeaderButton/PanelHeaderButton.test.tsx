import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Plus } from "lucide-react";
import { expectNoA11yViolations } from "../../../test/axe";
import { PanelHeaderButton } from "./PanelHeaderButton";

describe("PanelHeaderButton", () => {
  it("renders a button with icon and label, or a link with href", () => {
    const { rerender } = render(
      <PanelHeaderButton label="Add">
        <Plus aria-hidden />
      </PanelHeaderButton>,
    );
    expect(screen.getByRole("button", { name: "Add" })).toHaveClass("text-foreground", "min-h-control-l");
    rerender(
      <PanelHeaderButton href="/new" aria-label="New">
        <Plus aria-hidden />
      </PanelHeaderButton>,
    );
    expect(screen.getByRole("link", { name: "New" })).toHaveAttribute("href", "/new");
  });

  it("styles primary and supports asChild", () => {
    const { rerender } = render(<PanelHeaderButton primary label="Save" />);
    expect(screen.getByRole("button")).toHaveClass("text-primary", "font-semibold");
    rerender(
      <PanelHeaderButton asChild>
        <a href="/x">Custom</a>
      </PanelHeaderButton>,
    );
    expect(screen.getByRole("link", { name: "Custom" })).toHaveClass("min-h-control-l");
  });

  it("activates with keyboard and blocks when disabled", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<PanelHeaderButton aria-label="Go" onClick={onClick} />);
    screen.getByRole("button").focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<PanelHeaderButton aria-label="Go" onClick={onClick} disabled />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is accessible", async () => {
    const { container } = render(
      <PanelHeaderButton aria-label="Add">
        <Plus aria-hidden />
      </PanelHeaderButton>,
    );
    await expectNoA11yViolations(container);
  });
});

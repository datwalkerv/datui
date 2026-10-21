import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { SubnavigationButton } from "./SubnavigationButton";

describe("SubnavigationButton", () => {
  it("maps variant, appearance and size", () => {
    const { rerender } = render(<SubnavigationButton>All</SubnavigationButton>);
    expect(screen.getByRole("button")).toHaveClass("bg-secondary", "min-h-control-m");
    rerender(
      <SubnavigationButton variant="outline" size="l" selected>
        All
      </SubnavigationButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("border-primary", "text-primary", "min-h-control-l");
    rerender(
      <SubnavigationButton appearance="neutral" size="s" selected>
        All
      </SubnavigationButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("bg-foreground", "min-h-control-s");
  });

  it("toggles with aria-pressed", async () => {
    function Toggle() {
      const [on, setOn] = React.useState(false);
      return (
        <SubnavigationButton selected={on} onClick={() => setOn((v) => !v)}>
          Online
        </SubnavigationButton>
      );
    }
    render(<Toggle />);
    const button = screen.getByRole("button", { name: "Online" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("omits aria-pressed for plain actions, uses aria-current for selected links, shows a chevron", () => {
    const { rerender, container } = render(
      <SubnavigationButton chevron aria-haspopup="menu">
        Sort
      </SubnavigationButton>,
    );
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-pressed");
    expect(container.querySelector("[data-chevron]")).toBeInTheDocument();
    rerender(
      <SubnavigationButton href="/a" selected>
        A
      </SubnavigationButton>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page");
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(
      <SubnavigationButton disabled onClick={onClick}>
        Off
      </SubnavigationButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is accessible", async () => {
    const { container } = render(
      <SubnavigationButton selected before={<svg />} chevron>
        Filters
      </SubnavigationButton>,
    );
    await expectNoA11yViolations(container);
  });
});

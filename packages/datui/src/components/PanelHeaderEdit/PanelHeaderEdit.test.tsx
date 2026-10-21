import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { PanelHeaderEdit } from "./PanelHeaderEdit";

function Toggle() {
  const [editing, setEditing] = React.useState(false);
  return <PanelHeaderEdit isActive={editing} onClick={() => setEditing((v) => !v)} />;
}

describe("PanelHeaderEdit", () => {
  it("switches label, icon and aria-pressed with isActive", async () => {
    const { container } = render(<Toggle />);
    const button = screen.getByRole("button", { name: "Edit" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    const before = container.querySelector("svg")?.getAttribute("class");
    await userEvent.click(button);
    expect(screen.getByRole("button", { name: "Done" })).toHaveAttribute("aria-pressed", "true");
    expect(container.querySelector("svg")?.getAttribute("class")).not.toBe(before);
  });

  it("takes custom labels", () => {
    render(<PanelHeaderEdit isActive doneLabel="Fertig" />);
    expect(screen.getByRole("button", { name: "Fertig" })).toBeInTheDocument();
  });

  it("is accessible", async () => {
    const { container } = render(<PanelHeaderEdit />);
    await expectNoA11yViolations(container);
  });
});

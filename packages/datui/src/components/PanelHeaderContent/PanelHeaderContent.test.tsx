import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { PanelHeaderContent } from "./PanelHeaderContent";

describe("PanelHeaderContent", () => {
  it("renders plain text with before, subtitle and aside slots", () => {
    render(
      <PanelHeaderContent before={<span>AV</span>} subtitle="online" aside={<span>v</span>}>
        Anna
      </PanelHeaderContent>,
    );
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByText("Anna")).toBeInTheDocument();
    expect(screen.getByText("online")).toBeInTheDocument();
    expect(screen.getByText("AV")).toBeInTheDocument();
    expect(screen.getByText("v")).toBeInTheDocument();
  });

  it("becomes a button with onClick and passes disclosure attributes", async () => {
    const onClick = vi.fn();
    render(
      <PanelHeaderContent onClick={onClick} aria-expanded={false} aria-controls="ctx">
        Mode
      </PanelHeaderContent>,
    );
    const button = screen.getByRole("button", { name: "Mode" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    button.focus();
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is accessible", async () => {
    const { container } = render(<PanelHeaderContent onClick={() => {}}>Title</PanelHeaderContent>);
    await expectNoA11yViolations(container);
  });
});

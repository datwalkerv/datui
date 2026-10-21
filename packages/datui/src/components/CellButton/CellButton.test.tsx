import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { CellButtonGroup, CellButtonGroupSeparator } from "../CellButtonGroup/CellButtonGroup";
import { CellButton } from "./CellButton";

describe("CellButton", () => {
  it("is a button with accent color and joined accessible name", async () => {
    const onClick = vi.fn();
    render(
      <CellButton onClick={onClick} subtitle="Up to 10 people">
        Add member
      </CellButton>,
    );
    const button = screen.getByRole("button", { name: "Add member Up to 10 people" });
    expect(button).toHaveClass("text-primary");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders a button even without onClick, and a link with href", () => {
    render(
      <>
        <CellButton>Plain</CellButton>
        <CellButton href="/x">Go</CellButton>
      </>,
    );
    expect(screen.getByRole("button", { name: "Plain" })).toHaveAttribute("type", "button");
    expect(screen.getByRole("link", { name: "Go" })).toHaveAttribute("href", "/x");
  });

  it("maps appearance and centered", () => {
    render(
      <CellButton appearance="negative" centered>
        Log out
      </CellButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("text-destructive", "justify-center");
  });

  it("shows a chevron only when asked and respects disabled", async () => {
    const onClick = vi.fn();
    const { container } = render(
      <CellButton chevron disabled onClick={onClick}>
        Next
      </CellButton>,
    );
    expect(container.querySelector("[data-chevron]")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("CellButtonGroup stacks buttons with an inset separator", () => {
    const { container } = render(
      <CellButtonGroup role="group" aria-label="Actions">
        <CellButton>One</CellButton>
        <CellButtonGroup.Separator />
        <CellButton>Two</CellButton>
        <CellButtonGroupSeparator appearance="secondary" />
      </CellButtonGroup>,
    );
    expect(screen.getByRole("group", { name: "Actions" })).toHaveClass("rounded-lg", "overflow-hidden");
    const separators = container.querySelectorAll('[data-orientation="horizontal"]');
    expect(separators).toHaveLength(2);
    expect(separators[0]).toHaveClass("px-4");
  });

  it("is accessible", async () => {
    const { container } = render(
      <CellButtonGroup>
        <CellButton before={<svg aria-hidden />}>One</CellButton>
        <CellButtonGroup.Separator />
        <CellButton appearance="neutral">Two</CellButton>
      </CellButtonGroup>,
    );
    await expectNoA11yViolations(container);
  });
});

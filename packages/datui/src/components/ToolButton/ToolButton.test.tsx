import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { ToolButton } from "./ToolButton";

describe("ToolButton", () => {
  it("renders icon and text with the default class matrix", () => {
    render(<ToolButton icon={<svg data-testid="icon" />}>Bold</ToolButton>);
    const button = screen.getByRole("button", { name: "Bold" });
    expect(button).toHaveClass("bg-primary", "text-primary-foreground");
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("maps variant and appearance", () => {
    render(
      <ToolButton icon={<svg />} variant="outline" appearance="neutral">
        Italic
      </ToolButton>,
    );
    expect(screen.getByRole("button")).toHaveClass("border", "text-foreground");
  });

  it("renders both density icons switched by CSS", () => {
    render(
      <ToolButton aria-label="Undo" iconRegular={<svg data-testid="r" />} iconCompact={<svg data-testid="c" />} />,
    );
    expect(screen.getByTestId("r").parentElement).toHaveClass("in-data-[density=compact]:hidden");
    expect(screen.getByTestId("c").parentElement).toHaveClass("hidden", "in-data-[density=compact]:inline-flex");
    expect(screen.getByRole("button", { name: "Undo" })).toHaveClass("aspect-square");
  });

  it("ignores rounded for column buttons with text", () => {
    const { rerender } = render(
      <ToolButton icon={<svg />} rounded direction="column">
        Text
      </ToolButton>,
    );
    expect(screen.getByRole("button")).not.toHaveClass("rounded-full");
    expect(screen.getByRole("button")).toHaveClass("flex-col");
    rerender(<ToolButton icon={<svg />} rounded aria-label="Round" />);
    expect(screen.getByRole("button")).toHaveClass("rounded-full");
  });

  it("fires onClick and not when disabled", async () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <ToolButton icon={<svg />} onClick={onClick}>
        Go
      </ToolButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(
      <ToolButton icon={<svg />} onClick={onClick} disabled>
        Go
      </ToolButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <ToolButton icon={<svg />}>Bold</ToolButton>
        <ToolButton icon={<svg />} aria-label="Italic" />
      </>,
    );
    await expectNoA11yViolations(container);
  });
});

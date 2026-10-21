import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { IconButton } from "./IconButton";

describe("IconButton", () => {
  it("uses label as a visually hidden name and hides the icon", () => {
    render(
      <IconButton label="Settings">
        <svg data-testid="icon" />
      </IconButton>,
    );
    const button = screen.getByRole("button", { name: "Settings" });
    expect(screen.getByText("Settings")).toHaveClass("sr-only");
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(button).toHaveClass("size-control-l");
  });

  it("supports size s and links", () => {
    render(
      <IconButton aria-label="Home" href="/" size="s">
        <svg />
      </IconButton>,
    );
    expect(screen.getByRole("link", { name: "Home" })).toHaveClass("size-control-m");
  });

  it("warns without an accessible name", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <IconButton>
        <svg />
      </IconButton>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("IconButton needs an accessible name"));
    warn.mockRestore();
  });

  it("clicks, activates by keyboard and respects disabled", async () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <IconButton label="Go" onClick={onClick}>
        <svg />
      </IconButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    screen.getByRole("button").focus();
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
    rerender(
      <IconButton label="Go" onClick={onClick} disabled>
        <svg />
      </IconButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("is accessible", async () => {
    const { container } = render(
      <IconButton label="Close" onClick={() => {}}>
        <svg />
      </IconButton>,
    );
    await expectNoA11yViolations(container);
  });
});

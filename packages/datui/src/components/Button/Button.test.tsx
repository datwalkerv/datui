import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a native button with default variant classes", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("bg-primary", "text-primary-foreground", "min-h-control-m");
  });

  it("maps variant × appearance and size", () => {
    render(
      <Button variant="secondary" appearance="negative" size="l">
        Delete
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("bg-destructive/8", "text-destructive", "min-h-control-l");
  });

  it("renders a link when given href", () => {
    render(<Button href="/docs">Docs</Button>);
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/docs");
  });

  it("detects icon-only buttons", () => {
    render(<Button before={<svg />} aria-label="Add" />);
    expect(screen.getByRole("button", { name: "Add" })).toHaveClass("aspect-square");
  });

  it("blocks activation and announces while loading", async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Pay
      </Button>,
    );
    const button = screen.getByRole("button", { name: /Pay/ });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).toHaveTextContent("Loading…");
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Off
      </Button>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <Button>One</Button>
        <Button variant="outline" stretched>
          Two
        </Button>
      </>,
    );
    await expectNoA11yViolations(container);
  });
});

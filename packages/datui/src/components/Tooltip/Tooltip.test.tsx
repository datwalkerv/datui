import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("shows on focus and wires aria-describedby only while shown", async () => {
    render(
      <Tooltip description="Copy link">
        <button type="button">Share</button>
      </Tooltip>,
    );
    const anchor = screen.getByRole("button", { name: "Share" });
    expect(anchor).not.toHaveAttribute("aria-describedby");
    await userEvent.tab();
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Copy link");
    expect(anchor).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("hides on Escape", async () => {
    render(
      <Tooltip description="Copy link">
        <button type="button">Share</button>
      </Tooltip>,
    );
    await userEvent.tab();
    await screen.findByRole("tooltip");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  });

  it("shows on hover after the delay", async () => {
    render(
      <Tooltip description="Later" hoverDelay={300}>
        <button type="button">Hover me</button>
      </Tooltip>,
    );
    await userEvent.hover(screen.getByRole("button"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(await screen.findByRole("tooltip", {}, { timeout: 1000 })).toHaveTextContent("Later");
  });

  it("can ignore keyboard focus", async () => {
    render(
      <Tooltip description="Hint" disableFocusTrigger>
        <button type="button">Share</button>
      </Tooltip>,
    );
    await userEvent.tab();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("supports controlled open, title and appearances", () => {
    render(
      <Tooltip open title="New" description="Try it" appearance="accent" data-testid="bubble">
        <button type="button">Feature</button>
      </Tooltip>,
    );
    expect(screen.getByTestId("bubble")).toHaveClass("bg-primary", "text-primary-foreground");
    expect(screen.getByRole("tooltip")).toHaveTextContent("NewTry it");
  });

  it("closes from the close button when closable", async () => {
    const onOpenChange = vi.fn();
    render(
      <Tooltip defaultOpen closable closeLabel="Hide hint" description="Hint" onOpenChange={onOpenChange}>
        <button type="button">Share</button>
      </Tooltip>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Hide hint" }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  });

  it("is accessible", async () => {
    const { container } = render(
      <Tooltip description="Copy link">
        <button type="button">Share</button>
      </Tooltip>,
    );
    await userEvent.tab();
    await screen.findByRole("tooltip");
    await expectNoA11yViolations(container);
    await expectNoA11yViolations(screen.getByRole("tooltip").parentElement as HTMLElement);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { ModalOutsideButton } from "./ModalOutsideButton";

describe("ModalOutsideButton", () => {
  it("renders a labelled button with a hidden icon", async () => {
    const onClick = vi.fn();
    render(
      <ModalOutsideButton aria-label="Share" onClick={onClick}>
        <svg data-testid="icon" />
      </ModalOutsideButton>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Share" }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a link with href", () => {
    render(
      <ModalOutsideButton aria-label="Open in new tab" href="/page">
        <svg />
      </ModalOutsideButton>,
    );
    expect(screen.getByRole("link", { name: "Open in new tab" })).toHaveAttribute("href", "/page");
  });

  it("supports disabled", async () => {
    const onClick = vi.fn();
    render(
      <ModalOutsideButton aria-label="Share" disabled onClick={onClick}>
        <svg />
      </ModalOutsideButton>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is accessible", async () => {
    const { container } = render(
      <ModalOutsideButton aria-label="Share">
        <svg />
      </ModalOutsideButton>,
    );
    await expectNoA11yViolations(container);
  });
});

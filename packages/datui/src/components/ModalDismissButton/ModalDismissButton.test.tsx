import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { ModalDismissButton } from "./ModalDismissButton";

describe("ModalDismissButton", () => {
  it("has a default label and calls onClick from mouse and keyboard", async () => {
    const onClick = vi.fn();
    render(<ModalDismissButton onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Close" });
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("takes a localized label", () => {
    render(<ModalDismissButton onClick={() => {}}>Schließen</ModalDismissButton>);
    expect(screen.getByRole("button", { name: "Schließen" })).toHaveClass("rounded-full");
  });

  it("is accessible", async () => {
    const { container } = render(<ModalDismissButton onClick={() => {}} />);
    await expectNoA11yViolations(container);
  });
});

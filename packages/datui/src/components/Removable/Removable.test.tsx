import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Removable } from "./Removable";

describe("Removable", () => {
  it("button variant: fires onRemove once with the root element", async () => {
    const onRemove = vi.fn();
    const { container } = render(<Removable onRemove={onRemove}>Phone</Removable>);
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove.mock.calls[0]?.[1]).toBe(container.firstElementChild);
  });

  it("does not let the click reach a parent handler", async () => {
    const onParent = vi.fn();
    render(
      // biome-ignore lint/a11y/useKeyWithClickEvents: test-only listener for bubbling
      // biome-ignore lint/a11y/noStaticElementInteractions: test-only listener for bubbling
      <div onClick={onParent}>
        <Removable onRemove={() => {}}>Row</Removable>
      </div>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(onParent).not.toHaveBeenCalled();
  });

  it("align and indent", () => {
    const { container } = render(
      <Removable align="start" indent>
        Row
      </Removable>,
    );
    expect(container.firstElementChild).toHaveClass("items-start");
    expect(screen.getByRole("button", { hidden: true })).toHaveClass("invisible");
  });

  it("disabled blocks removal", async () => {
    const onRemove = vi.fn();
    render(
      <Removable disabled onRemove={onRemove}>
        Row
      </Removable>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(onRemove).not.toHaveBeenCalled();
  });

  it("reveal variant: minus reveals a focused Remove button that confirms", async () => {
    const onRemove = vi.fn();
    render(
      <Removable variant="reveal" removeLabel="Delete" onRemove={onRemove}>
        {({ isRemoving }) => <span>{isRemoving ? "removing" : "idle"}</span>}
      </Removable>,
    );
    const toggle = screen.getByRole("button", { name: "Delete", expanded: false });
    const confirm = screen.getByText("Delete", { selector: "button" });
    expect(confirm.parentElement).toHaveAttribute("inert");
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("removing")).toBeInTheDocument();
    expect(confirm).toHaveFocus();
    expect(confirm.parentElement).not.toHaveAttribute("inert");
    await userEvent.click(confirm);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("reveal variant: Escape collapses and returns focus to the minus button", async () => {
    render(<Removable variant="reveal">Row</Removable>);
    const toggle = screen.getByRole("button", { name: "Remove", expanded: false });
    await userEvent.click(toggle);
    await userEvent.keyboard("{Escape}");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("reveal variant: moving focus away collapses", async () => {
    render(
      <>
        <Removable variant="reveal">Row</Removable>
        <button type="button">Elsewhere</button>
      </>,
    );
    const toggle = screen.getByRole("button", { name: "Remove", expanded: false });
    await userEvent.click(toggle);
    await userEvent.click(screen.getByRole("button", { name: "Elsewhere" }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <Removable onRemove={() => {}}>One</Removable>
        <Removable variant="reveal" onRemove={() => {}}>
          Two
        </Removable>
      </>,
    );
    await expectNoA11yViolations(container);
  });
});

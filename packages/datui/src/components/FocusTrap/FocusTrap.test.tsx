import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FocusTrap } from "./FocusTrap";

describe("FocusTrap", () => {
  it("auto-focuses, loops Tab and handles Escape", async () => {
    const onEscape = vi.fn();
    render(
      <FocusTrap onEscape={onEscape}>
        <button type="button">first</button>
        <button type="button">last</button>
      </FocusTrap>,
    );
    expect(screen.getByText("first")).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByText("last")).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByText("first")).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    expect(onEscape).toHaveBeenCalledOnce();
  });
});

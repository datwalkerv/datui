import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Clickable } from "./Clickable";

describe("Clickable", () => {
  it("picks the element from props", () => {
    render(
      <>
        <Clickable href="/x">Link</Clickable>
        <Clickable onClick={() => {}}>Btn</Clickable>
        <Clickable>Static</Clickable>
      </>,
    );
    expect(screen.getByRole("link", { name: "Link" })).toHaveAttribute("href", "/x");
    expect(screen.getByRole("button", { name: "Btn" })).toHaveAttribute("type", "button");
    expect(screen.getByText("Static").tagName).toBe("DIV");
  });

  it("gives non-native elements keyboard activation", async () => {
    const onClick = vi.fn();
    render(
      <Clickable as="div" onClick={onClick}>
        Row
      </Clickable>,
    );
    const row = screen.getByRole("button", { name: "Row" });
    expect(row).toHaveAttribute("tabindex", "0");
    row.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("blocks clicks and drops href when disabled", async () => {
    const onClick = vi.fn();
    render(
      <>
        <Clickable as="div" onClick={onClick} disabled>
          Off
        </Clickable>
        <Clickable href="/y" disabled>
          Gone
        </Clickable>
      </>,
    );
    const off = screen.getByRole("button", { name: "Off" });
    expect(off).toHaveAttribute("aria-disabled", "true");
    expect(off).not.toHaveAttribute("tabindex");
    await userEvent.click(off);
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByText("Gone")).not.toHaveAttribute("href");
  });
});

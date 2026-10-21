import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { DirectionProvider } from "../DirectionProvider/DirectionProvider";
import { SimpleCell } from "./SimpleCell";

describe("SimpleCell", () => {
  it("renders all slots in order and a static div by default", () => {
    const { container } = render(
      <SimpleCell
        before={<i>B</i>}
        overTitle="Over"
        badgeBeforeTitle={<i>BT</i>}
        badgeAfterTitle={<i>AT</i>}
        subtitle="Sub"
        extraSubtitle="Extra"
        indicator="Ind"
        after={<i>A</i>}
        chevron
      >
        Title
      </SimpleCell>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("min-h-cell");
    expect(root.textContent?.replace(/\s+/g, " ")).toBe("BOver BTTitleAT Sub Extra IndA");
    expect(root.querySelector("[data-chevron]")).toBeInTheDocument();
  });

  it("renders a button with onClick and joins lines in the accessible name", async () => {
    const onClick = vi.fn();
    render(
      <SimpleCell onClick={onClick} subtitle="On">
        Wi-Fi
      </SimpleCell>,
    );
    const button = screen.getByRole("button", { name: "Wi-Fi On" });
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("renders a link with href", () => {
    render(<SimpleCell href="/settings">Settings</SimpleCell>);
    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute("href", "/settings");
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(
      <SimpleCell disabled onClick={onClick}>
        Off
      </SimpleCell>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("truncates by default and wraps when multiline", () => {
    const { rerender } = render(<SimpleCell>Long</SimpleCell>);
    expect(screen.getByText("Long")).toHaveClass("truncate");
    rerender(<SimpleCell multiline>Long</SimpleCell>);
    expect(screen.getByText("Long")).not.toHaveClass("truncate");
    expect(screen.getByText("Long")).toHaveClass("break-words");
  });

  it("can turn off hover and active feedback", () => {
    render(
      <SimpleCell onClick={() => {}} hasHover={false} hasActive={false}>
        Row
      </SimpleCell>,
    );
    expect(screen.getByRole("button")).toHaveClass("hover:after:opacity-0", "active:after:opacity-0");
  });

  it("uses a small chevron and mirrors it in RTL", () => {
    const { container } = render(
      <DirectionProvider value="rtl">
        <SimpleCell chevron chevronSize="s">
          Next
        </SimpleCell>
      </DirectionProvider>,
    );
    expect(container.querySelector("[data-chevron]")).toHaveClass("size-icon-sm", "rtl:-scale-x-100");
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <SimpleCell onClick={() => {}} subtitle="Sub" chevron>
          One
        </SimpleCell>
        <SimpleCell href="#">Two</SimpleCell>
        <SimpleCell>Three</SimpleCell>
      </>,
    );
    await expectNoA11yViolations(container);
  });
});

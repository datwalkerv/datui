import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { RichCell, RichCellIcon } from "./RichCell";

describe("RichCell", () => {
  it("renders slots in order", () => {
    const { container } = render(
      <RichCell
        before={<i>B</i>}
        overTitle="Over"
        meta="12:30"
        subtitle="Sub"
        submeta="2 new"
        extraSubtitle="Extra"
        bottom={<i>Bottom</i>}
        after={<i>A</i>}
      >
        Title
      </RichCell>,
    );
    expect(container.textContent?.replace(/\s+/g, " ")).toBe("BOver Title 12:30 Sub 2 new ExtraBottomA");
  });

  it("applies alignment classes", () => {
    render(
      <RichCell before={<i>B</i>} after={<i>A</i>} beforeAlign="center" afterAlign="end" contentAlign="center">
        Title
      </RichCell>,
    );
    expect(screen.getByText("B").parentElement).toHaveClass("self-center");
    expect(screen.getByText("A").parentElement).toHaveClass("self-end");
  });

  it("is a button with the title as name; actions do not trigger the row", async () => {
    const onClick = vi.fn();
    const onAction = vi.fn();
    render(
      <RichCell
        onClick={onClick}
        actions={
          <button type="button" onClick={onAction}>
            Accept
          </button>
        }
      >
        Invite
      </RichCell>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Accept" }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "Invite" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Invite" })).not.toContainElement(
      screen.getByRole("button", { name: "Accept" }),
    );
  });

  it("supports multiline and disabled", async () => {
    const onClick = vi.fn();
    render(
      <RichCell multiline disabled onClick={onClick}>
        Long title
      </RichCell>,
    );
    expect(screen.getByText("Long title")).toHaveClass("break-words");
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("RichCellIcon renders children as a decorative box, also as RichCell.Icon", () => {
    render(
      <>
        <RichCellIcon>i1</RichCellIcon>
        <RichCell.Icon>i2</RichCell.Icon>
      </>,
    );
    expect(screen.getByText("i1")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("i2")).toHaveClass("size-icon-xl");
  });

  it("is accessible", async () => {
    const { container } = render(
      <RichCell href="#" subtitle="Sub" actions={<button type="button">Go</button>}>
        Title
      </RichCell>,
    );
    await expectNoA11yViolations(container);
  });
});

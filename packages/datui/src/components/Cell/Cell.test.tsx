import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { List } from "../List/List";
import { Cell } from "./Cell";

describe("Cell", () => {
  it("renders a plain row like SimpleCell", async () => {
    const onClick = vi.fn();
    render(
      <Cell onClick={onClick} subtitle="Sub">
        Plain
      </Cell>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Plain Sub" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("selectable: uncontrolled checkbox toggles from row click and Space", async () => {
    const onCheckedChange = vi.fn();
    render(
      <Cell mode="selectable" name="topics" value="news" onCheckedChange={onCheckedChange}>
        News
      </Cell>,
    );
    const box = screen.getByRole("checkbox", { name: "News" });
    expect(box).toHaveAttribute("name", "topics");
    await userEvent.click(screen.getByText("News"));
    expect(box).toBeChecked();
    box.focus();
    await userEvent.keyboard(" ");
    expect(box).not.toBeChecked();
    expect(onCheckedChange.mock.calls).toEqual([[true], [false]]);
  });

  it("selectable: controlled checked follows the prop", async () => {
    function Controlled() {
      const [checked, setChecked] = React.useState(true);
      return (
        <>
          <Cell mode="selectable" checked={checked} onCheckedChange={setChecked}>
            Music
          </Cell>
          <span>{checked ? "on" : "off"}</span>
        </>
      );
    }
    render(<Controlled />);
    const box = screen.getByRole("checkbox", { name: "Music" });
    expect(box).toBeChecked();
    await userEvent.click(screen.getByText("Music"));
    expect(box).not.toBeChecked();
    expect(screen.getByText("off")).toBeInTheDocument();
  });

  it("selectable: radio rows form a single-choice group", async () => {
    render(
      <>
        <Cell mode="selectable" selectionType="radio" name="size" value="s" defaultChecked>
          Small
        </Cell>
        <Cell mode="selectable" selectionType="radio" name="size" value="l">
          Large
        </Cell>
      </>,
    );
    await userEvent.click(screen.getByText("Large"));
    expect(screen.getByRole("radio", { name: "Large" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Small" })).not.toBeChecked();
  });

  it("removable: remove button gets the root element and does not trigger the row", async () => {
    const onRemove = vi.fn();
    const onClick = vi.fn();
    render(
      <Cell mode="removable" onRemove={onRemove} onClick={onClick} removeLabel="Delete">
        Item
      </Cell>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    const root = onRemove.mock.calls[0]?.[1] as HTMLElement;
    expect(root).toContainElement(screen.getByRole("button", { name: "Item" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("disabled blocks selection and removal", async () => {
    const onRemove = vi.fn();
    render(
      <>
        <Cell mode="selectable" disabled>
          Locked
        </Cell>
        <Cell mode="removable" disabled onRemove={onRemove}>
          Fixed
        </Cell>
      </>,
    );
    await userEvent.click(screen.getByText("Locked"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Remove" })).toBeDisabled();
  });
});

describe("Cell draggable in List", () => {
  const ROW = 48;
  let restore: () => void;
  beforeEach(() => {
    // jsdom has no layout: stack list items 48px apart so dnd-kit's keyboard coordinates can find neighbours.
    const original = Element.prototype.getBoundingClientRect;
    Element.prototype.getBoundingClientRect = function (this: Element) {
      const item = this.closest('[role="listitem"]');
      const index = item?.parentElement ? Array.from(item.parentElement.children).indexOf(item) : 0;
      const top = index * ROW;
      return { x: 0, y: top, top, left: 0, right: 320, bottom: top + ROW, width: 320, height: ROW, toJSON: () => ({}) };
    };
    const scroll = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = () => {};
    restore = () => {
      Element.prototype.getBoundingClientRect = original;
      Element.prototype.scrollIntoView = scroll;
    };
  });
  afterEach(() => restore());

  function Sortable({ onClick }: { onClick?: () => void }) {
    const [items, setItems] = React.useState(["Alpha", "Beta", "Gamma"]);
    return (
      <List>
        {items.map((item) => (
          <Cell
            key={item}
            draggable
            onClick={onClick}
            onDragFinish={({ from, to }) =>
              setItems((prev) => {
                const next = [...prev];
                const [moved] = next.splice(from, 1);
                next.splice(to, 0, moved as string);
                return next;
              })
            }
          >
            {item}
          </Cell>
        ))}
      </List>
    );
  }

  // dnd-kit's keyboard sensor attaches its key listeners on the next macrotask after lifting.
  const tick = () => act(() => new Promise<void>((resolve) => setTimeout(resolve, 0)));
  const order = () => screen.getAllByRole("listitem").map((li) => li.textContent);

  it("renders list items with labelled sortable handles", () => {
    render(<Sortable />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    const handles = screen.getAllByRole("button", { name: /^Reorder/ });
    expect(handles[0]).toHaveAttribute("aria-roledescription", "sortable");
  });

  it("reorders with the keyboard: Space lifts, arrow moves, Space drops", async () => {
    render(<Sortable />);
    const [first] = screen.getAllByRole("button", { name: /^Reorder/ });
    act(() => first?.focus());
    fireEvent.keyDown(first as HTMLElement, { code: "Space", key: " " });
    await tick();
    fireEvent.keyDown(document.activeElement as HTMLElement, { code: "ArrowDown", key: "ArrowDown" });
    await tick();
    fireEvent.keyDown(document.activeElement as HTMLElement, { code: "Space", key: " " });
    await tick();
    expect(order()).toEqual(["Beta", "Alpha", "Gamma"]);
  });

  it("Escape cancels a keyboard drag", async () => {
    render(<Sortable />);
    const [first] = screen.getAllByRole("button", { name: /^Reorder/ });
    act(() => first?.focus());
    fireEvent.keyDown(first as HTMLElement, { code: "Space", key: " " });
    await tick();
    fireEvent.keyDown(document.activeElement as HTMLElement, { code: "ArrowDown", key: "ArrowDown" });
    await tick();
    fireEvent.keyDown(document.activeElement as HTMLElement, { code: "Escape", key: "Escape" });
    await tick();
    expect(order()).toEqual(["Alpha", "Beta", "Gamma"]);
  });

  it("suppresses row clicks while dragging", async () => {
    const onClick = vi.fn();
    render(<Sortable onClick={onClick} />);
    const [first] = screen.getAllByRole("button", { name: /^Reorder/ });
    act(() => first?.focus());
    fireEvent.keyDown(first as HTMLElement, { code: "Space", key: " " });
    await tick();
    fireEvent.click(screen.getByRole("button", { name: "Alpha" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("disabled cells cannot be dragged", () => {
    render(
      <List>
        <Cell draggable disabled>
          One
        </Cell>
      </List>,
    );
    expect(screen.getByRole("button", { name: /^Reorder/ })).toBeDisabled();
  });

  it("is accessible in every mode", async () => {
    const { container } = render(
      <List>
        <Cell onClick={() => {}}>Plain</Cell>
        <Cell mode="selectable">Pick</Cell>
        <Cell mode="removable" onRemove={() => {}}>
          Drop
        </Cell>
        <Cell draggable>Move</Cell>
      </List>,
    );
    await expectNoA11yViolations(container);
  });
});

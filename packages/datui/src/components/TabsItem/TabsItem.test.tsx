import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Tabs } from "../Tabs/Tabs";
import { TabsItem } from "./TabsItem";

describe("TabsItem", () => {
  it("renders before, status (announced after a space) and after", () => {
    render(
      <Tabs defaultValue="inbox" aria-label="Mail">
        <TabsItem value="inbox" before={<svg />} status={3} after={<span>!</span>}>
          Inbox
        </TabsItem>
      </Tabs>,
    );
    expect(screen.getByRole("tab", { name: "Inbox 3!" })).toBeInTheDocument();
  });

  it("underlines only in default mode", () => {
    const { rerender } = render(
      <Tabs defaultValue="a" aria-label="T">
        <TabsItem value="a">A</TabsItem>
      </Tabs>,
    );
    expect(screen.getByRole("tab")).toHaveClass("data-selected:before:bg-primary");
    rerender(
      <Tabs defaultValue="a" mode="secondary" aria-label="T">
        <TabsItem value="a">A</TabsItem>
      </Tabs>,
    );
    expect(screen.getByRole("tab")).not.toHaveClass("data-selected:before:bg-primary");
    expect(screen.getByRole("tab")).toHaveClass("data-selected:bg-secondary");
  });

  it("cannot be selected when disabled", async () => {
    const onChange = vi.fn();
    render(
      <Tabs defaultValue="a" onChange={onChange} aria-label="T">
        <TabsItem value="a">A</TabsItem>
        <TabsItem value="b" disabled>
          B
        </TabsItem>
      </Tabs>,
    );
    await userEvent.click(screen.getByRole("tab", { name: "B" }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("tab", { name: "B" })).toBeDisabled();
  });

  it("works standalone as a selectable button", () => {
    render(
      <TabsItem value="x" selected>
        X
      </TabsItem>,
    );
    expect(screen.getByRole("button", { name: "X" })).toHaveAttribute("aria-current", "page");
  });

  it("is accessible", async () => {
    const { container } = render(
      <Tabs defaultValue="a" aria-label="T">
        <TabsItem value="a" status={2}>
          A
        </TabsItem>
      </Tabs>,
    );
    await expectNoA11yViolations(container);
  });
});

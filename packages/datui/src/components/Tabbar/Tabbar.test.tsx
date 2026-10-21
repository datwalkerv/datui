import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { TabbarItem } from "../TabbarItem/TabbarItem";
import { Tabbar } from "./Tabbar";

const items = (n: number) =>
  Array.from({ length: n }, (_, i) => `Tab ${i}`).map((label) => (
    <TabbarItem key={label} label={label} onClick={() => {}} />
  ));

describe("Tabbar", () => {
  it("is a labelled navigation landmark with a list of items", () => {
    render(<Tabbar aria-label="Sections">{items(2)}</Tabbar>);
    expect(screen.getByRole("navigation", { name: "Sections" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("switches to vertical layout at three items in auto mode", () => {
    const { rerender } = render(<Tabbar>{items(2)}</Tabbar>);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-layout", "horizontal");
    rerender(<Tabbar>{items(3)}</Tabbar>);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-layout", "vertical");
    expect(screen.getAllByRole("button")[0]).toHaveClass("flex-col");
    rerender(<Tabbar mode="horizontal">{items(3)}</Tabbar>);
    expect(screen.getAllByRole("button")[0]).toHaveClass("flex-row");
  });

  it("plain removes border and shadow", () => {
    const { rerender } = render(<Tabbar>{items(2)}</Tabbar>);
    expect(screen.getByRole("navigation")).toHaveClass("shadow-sm", "border-t");
    rerender(<Tabbar plain>{items(2)}</Tabbar>);
    expect(screen.getByRole("navigation")).not.toHaveClass("shadow-sm");
  });

  it("is accessible", async () => {
    const { container } = render(<Tabbar>{items(3)}</Tabbar>);
    await expectNoA11yViolations(container);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "lucide-react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Tabbar } from "../Tabbar/Tabbar";
import { TabbarItem } from "./TabbarItem";

describe("TabbarItem", () => {
  it("renders a button, or a link with href", async () => {
    const onClick = vi.fn();
    const { rerender } = render(
      <TabbarItem label="Home" onClick={onClick}>
        <Home aria-hidden />
      </TabbarItem>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Home" }));
    expect(onClick).toHaveBeenCalled();
    rerender(<TabbarItem label="Home" href="/" />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("marks the selected item with aria-current and accent color", () => {
    render(
      <Tabbar>
        <TabbarItem label="A" selected onClick={() => {}} />
        <TabbarItem label="B" onClick={() => {}} />
      </Tabbar>,
    );
    expect(screen.getByRole("button", { name: "A" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "A" })).toHaveClass("text-primary");
    expect(screen.getByRole("button", { name: "B" })).not.toHaveAttribute("aria-current");
  });

  it("renders an indicator and respects disabled", async () => {
    const onClick = vi.fn();
    render(<TabbarItem aria-label="Chats" indicator={<span>3</span>} disabled onClick={onClick} />);
    expect(screen.getByText("3")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Chats" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is accessible", async () => {
    const { container } = render(
      <Tabbar>
        <TabbarItem label="Home" selected onClick={() => {}}>
          <Home aria-hidden />
        </TabbarItem>
      </Tabbar>,
    );
    await expectNoA11yViolations(container);
  });
});

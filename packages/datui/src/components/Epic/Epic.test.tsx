import { fireEvent, render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Panel } from "../Panel/Panel";
import { PanelHeader } from "../PanelHeader/PanelHeader";
import { Tabbar } from "../Tabbar/Tabbar";
import { TabbarItem } from "../TabbarItem/TabbarItem";
import { View } from "../View/View";
import { Epic } from "./Epic";

function App({ story }: { story: string }) {
  return (
    <div data-testid="scroller" style={{ overflowY: "auto" }}>
      <Epic
        activeStory={story}
        tabbar={
          <Tabbar>
            <TabbarItem label="News" selected={story === "news"} onClick={() => {}} />
            <TabbarItem label="Chats" selected={story === "chats"} onClick={() => {}} />
          </Tabbar>
        }
      >
        <View id="news" activePanel="n">
          <Panel id="n">
            <PanelHeader>News</PanelHeader>
          </Panel>
        </View>
        <View id="chats" activePanel="c">
          <Panel id="c">
            <PanelHeader>Chats</PanelHeader>
          </Panel>
        </View>
      </Epic>
    </div>
  );
}

describe("Epic", () => {
  it("renders the active story in main and the tabbar in a nav", () => {
    const { container } = render(<App story="news" />);
    expect(screen.getByRole("main")).toContainElement(screen.getByRole("heading", { name: "News" }));
    expect(screen.queryByRole("heading", { name: "Chats" })).not.toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(container.querySelector('[data-nav-layer="leaving"]')).toBeNull();
  });

  it("switches instantly and keeps scroll per story", () => {
    const { rerender, container } = render(<App story="news" />);
    const scroller = screen.getByTestId("scroller");
    scroller.scrollTop = 300;
    fireEvent.scroll(scroller);
    rerender(<App story="chats" />);
    expect(container.querySelector('[data-nav-layer="leaving"]')).toBeNull();
    expect(scroller.scrollTop).toBe(0);
    scroller.scrollTop = 50;
    fireEvent.scroll(scroller);
    rerender(<App story="news" />);
    expect(scroller.scrollTop).toBe(300);
    rerender(<App story="chats" />);
    expect(scroller.scrollTop).toBe(50);
  });

  it("is accessible", async () => {
    const { container } = render(<App story="news" />);
    await expectNoA11yViolations(container);
  });
});

it("Epic wraps stories in <main> by default and accepts contentAs", () => {
  const { rerender } = render(
    <Epic activeStory="a">
      <div id="a">A</div>
    </Epic>,
  );
  expect(screen.getByRole("main")).toHaveTextContent("A");
  rerender(
    <Epic activeStory="a" contentAs="div">
      <div id="a">A</div>
    </Epic>,
  );
  expect(screen.queryByRole("main")).toBeNull();
});

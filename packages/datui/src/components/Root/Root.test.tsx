import { act, fireEvent, render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { ConfigProvider } from "../ConfigProvider/ConfigProvider";
import { Panel } from "../Panel/Panel";
import { PanelHeader } from "../PanelHeader/PanelHeader";
import { View } from "../View/View";
import { Root, type RootProps } from "./Root";

function App(props: Omit<RootProps, "children">) {
  return (
    <Root {...props}>
      <View id="feed" activePanel="feed-main">
        <Panel id="feed-main">
          <PanelHeader>Feed</PanelHeader>
          <button type="button">open</button>
        </Panel>
      </View>
      <View id="profile" activePanel="profile-main">
        <Panel id="profile-main">
          <PanelHeader>Profile</PanelHeader>
        </Panel>
      </View>
    </Root>
  );
}

describe("Root", () => {
  afterEach(() => vi.useRealTimers());

  it("renders only the active view", () => {
    render(<App activeView="feed" />);
    expect(screen.getByRole("heading", { name: "Feed" })).toBeInTheDocument();
    expect(screen.queryByText("Profile")).not.toBeInTheDocument();
  });

  it("derives direction from child order and fires onTransition once after the animation", () => {
    vi.useFakeTimers();
    const onTransition = vi.fn();
    const { rerender, container } = render(<App activeView="feed" onTransition={onTransition} />);
    screen.getByRole("button", { name: "open" }).focus();
    rerender(<App activeView="profile" onTransition={onTransition} />);
    expect(container.querySelector(':scope > div > [data-nav-layer="active"]')).toHaveClass("animate-nav-push-in");
    // Focus leaves the outgoing, inert view right away.
    expect(screen.getByRole("button", { name: "open", hidden: true })).not.toHaveFocus();
    act(() => vi.advanceTimersByTime(600));
    expect(onTransition).toHaveBeenCalledTimes(1);
    expect(onTransition).toHaveBeenCalledWith({ isBack: false, from: "feed", to: "profile" });
    expect(screen.getByRole("heading", { name: "Profile" })).toHaveFocus();
    rerender(<App activeView="feed" onTransition={onTransition} />);
    expect(container.querySelector(':scope > div > [data-nav-layer="active"]')).toHaveClass("animate-nav-pop-in");
    act(() => vi.advanceTimersByTime(600));
    expect(onTransition).toHaveBeenLastCalledWith({ isBack: true, from: "profile", to: "feed" });
  });

  it("does not animate with motion disabled and restores scroll on back", () => {
    const ui = (active: string) => (
      <ConfigProvider transitionMotionEnabled={false}>
        <div data-testid="scroller" style={{ overflowY: "auto" }}>
          <App activeView={active} />
        </div>
      </ConfigProvider>
    );
    const { rerender, container } = render(ui("feed"));
    const scroller = screen.getByTestId("scroller");
    scroller.scrollTop = 80;
    fireEvent.scroll(scroller);
    rerender(ui("profile"));
    expect(container.querySelector('[data-nav-layer="leaving"]')).toBeNull();
    expect(scroller.scrollTop).toBe(0);
    rerender(ui("feed"));
    expect(scroller.scrollTop).toBe(80);
  });

  it("is accessible", async () => {
    const { container } = render(<App activeView="feed" />);
    await expectNoA11yViolations(container);
  });
});

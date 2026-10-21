import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { DirectionProvider } from "../DirectionProvider/DirectionProvider";
import { TabsItem } from "../TabsItem/TabsItem";
import { Tabs, type TabsProps } from "./Tabs";

function Demo(props: TabsProps) {
  return (
    <Tabs aria-label="Sections" {...props}>
      <TabsItem value="news" id="t-news" aria-controls="p-news">
        News
      </TabsItem>
      <TabsItem value="music" id="t-music" aria-controls="p-music">
        Music
      </TabsItem>
      <TabsItem value="video" id="t-video" aria-controls="p-video">
        Video
      </TabsItem>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("is uncontrolled with defaultValue and reports changes", async () => {
    const onChange = vi.fn();
    render(<Demo defaultValue="news" onChange={onChange} />);
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "News" })).toHaveAttribute("aria-selected", "true");
    await userEvent.click(screen.getByRole("tab", { name: "Music" }));
    expect(onChange).toHaveBeenCalledWith("music");
    expect(screen.getByRole("tab", { name: "Music" })).toHaveAttribute("aria-selected", "true");
  });

  it("follows the value prop when controlled", async () => {
    function Controlled() {
      const [value, setValue] = React.useState("video");
      return <Demo value={value} onChange={(v) => setValue(v === "music" ? "news" : v)} />;
    }
    render(<Controlled />);
    expect(screen.getByRole("tab", { name: "Video" })).toHaveAttribute("aria-selected", "true");
    await userEvent.click(screen.getByRole("tab", { name: "Music" }));
    expect(screen.getByRole("tab", { name: "News" })).toHaveAttribute("aria-selected", "true");
  });

  it("uses a roving tabindex with arrows, Home and End", async () => {
    render(<Demo defaultValue="news" />);
    const [news, music, video] = screen.getAllByRole("tab");
    await userEvent.tab();
    expect(news).toHaveFocus();
    expect(music).toHaveAttribute("tabindex", "-1");
    await userEvent.keyboard("{ArrowRight}");
    expect(music).toHaveFocus();
    expect(music).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{End}");
    expect(video).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(news).toHaveFocus();
  });

  it("reverses arrow keys in RTL", async () => {
    render(
      <DirectionProvider value="rtl">
        <Demo defaultValue="music" />
      </DirectionProvider>,
    );
    const [news, music] = screen.getAllByRole("tab");
    music?.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(news).toHaveFocus();
  });

  it("scrolls the selected tab into view on change", async () => {
    const spy = vi.spyOn(Element.prototype, "scrollIntoView");
    render(<Demo defaultValue="news" scrollToSelectedInline="center" />);
    expect(spy).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("tab", { name: "Video" }));
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ inline: "center" }));
    spy.mockRestore();
  });

  it("maps mode and fill mode", () => {
    const { rerender } = render(<Demo defaultValue="news" layoutFillMode="stretched" />);
    expect(screen.getByRole("tab", { name: "News" })).toHaveClass("flex-1");
    rerender(
      <AdaptivityProvider sizeX="regular">
        <Demo defaultValue="news" mode="accent" />
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("tab", { name: "News" })).toHaveClass("flex-none", "data-selected:bg-primary");
  });

  it("renders a navigation with aria-current in navigation role", async () => {
    const onChange = vi.fn();
    render(
      <Tabs role="navigation" aria-label="Site" value="a" onChange={onChange}>
        <TabsItem value="a" href="/a">
          A
        </TabsItem>
        <TabsItem value="b" href="/b">
          B
        </TabsItem>
      </Tabs>,
    );
    expect(screen.getByRole("navigation", { name: "Site" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "A" })).toHaveAttribute("aria-current", "page");
    await userEvent.click(screen.getByRole("link", { name: "B" }));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <Demo defaultValue="news" />
        <div role="tabpanel" id="p-news" aria-labelledby="t-news" />
        <div role="tabpanel" id="p-music" aria-labelledby="t-music" hidden />
        <div role="tabpanel" id="p-video" aria-labelledby="t-video" hidden />
      </>,
    );
    await expectNoA11yViolations(container);
  });
});

it("Tabs names the tablist (or nav) from aria-label", () => {
  render(
    <>
      <Tabs aria-label="Project" defaultValue="a">
        <TabsItem value="a">A</TabsItem>
      </Tabs>
      <Tabs role="navigation" aria-label="Sections">
        <TabsItem value="b" href="#b">
          B
        </TabsItem>
      </Tabs>
    </>,
  );
  expect(screen.getByRole("tablist", { name: "Project" })).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: "Sections" })).toBeInTheDocument();
});

import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { useNavId } from "../../internal/NavContext/NavContext";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { PanelHeader } from "../PanelHeader/PanelHeader";
import { Panel } from "./Panel";

function PanelId() {
  return <span>{useNavId().panel}</span>;
}

describe("Panel", () => {
  it("is a region labelled by its header title and provides its id", () => {
    render(
      <Panel id="settings">
        <PanelHeader>Settings</PanelHeader>
        <PanelId />
      </Panel>,
    );
    expect(screen.getByRole("region", { name: "Settings" })).toHaveAttribute("data-panel", "settings");
    expect(screen.getByText("settings", { selector: "span" })).toBeInTheDocument();
  });

  it("picks card mode from tablet width and lets an explicit mode win", () => {
    const { rerender, container } = render(
      <AdaptivityProvider sizeX="regular">
        <Panel id="p" />
      </AdaptivityProvider>,
    );
    expect(container.querySelector("section")).toHaveAttribute("data-mode", "card");
    expect(container.querySelector("section")).toHaveClass("bg-card", "rounded-xl");
    rerender(
      <AdaptivityProvider sizeX="compact">
        <Panel id="p" />
      </AdaptivityProvider>,
    );
    expect(container.querySelector("section")).toHaveClass("bg-background");
    rerender(
      <AdaptivityProvider sizeX="compact">
        <Panel id="p" mode="card" />
      </AdaptivityProvider>,
    );
    expect(container.querySelector("section")).toHaveAttribute("data-mode", "card");
  });

  it("centers content and can drop the background", () => {
    const { container } = render(
      <Panel id="p" centered disableBackground mode="plain">
        Empty
      </Panel>,
    );
    expect(container.querySelector("section")).not.toHaveClass("bg-background");
    expect(screen.getByText("Empty")).toHaveClass("items-center", "justify-center");
  });

  it("has no dangling aria-labelledby without a header", () => {
    const { container } = render(<Panel id="p" />);
    expect(container.querySelector("section")).not.toHaveAttribute("aria-labelledby");
  });

  it("is accessible", async () => {
    const { container } = render(
      <Panel id="p">
        <PanelHeader>Title</PanelHeader>
      </Panel>,
    );
    await expectNoA11yViolations(container);
  });
});

import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { Panel } from "../Panel/Panel";
import { PanelHeaderBack } from "../PanelHeaderBack/PanelHeaderBack";
import { PanelHeaderClose } from "../PanelHeaderClose/PanelHeaderClose";
import { PanelHeader } from "./PanelHeader";

describe("PanelHeader", () => {
  it("renders before/after slots and a focusable-on-demand title heading", () => {
    render(
      <PanelHeader before={<PanelHeaderBack />} after={<PanelHeaderClose />}>
        Inbox
      </PanelHeader>,
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
    const title = screen.getByRole("heading", { level: 2, name: "Inbox" });
    expect(title).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("supports titleAs and wires the title id to the panel", () => {
    render(
      <Panel id="p">
        <PanelHeader titleAs="h1">Home</PanelHeader>
      </Panel>,
    );
    const heading = screen.getByRole("heading", { level: 1 });
    expect(screen.getByRole("region")).toHaveAttribute("aria-labelledby", heading.id);
  });

  it("maps delimiter: auto follows the panel mode", () => {
    const { container, rerender } = render(
      <Panel id="p" mode="plain">
        <PanelHeader>T</PanelHeader>
      </Panel>,
    );
    expect(container.querySelector("[data-delimiter]")).toHaveAttribute("data-delimiter", "separator");
    rerender(
      <Panel id="p" mode="card">
        <PanelHeader>T</PanelHeader>
      </Panel>,
    );
    expect(container.querySelector("[data-delimiter]")).toHaveAttribute("data-delimiter", "spacing");
    rerender(<PanelHeader delimiter="none">T</PanelHeader>);
    expect(container.querySelector("[data-delimiter]")).toBeNull();
    rerender(<PanelHeader delimiter="spacing">T</PanelHeader>);
    expect(container.querySelector("[data-delimiter]")).toHaveAttribute("data-delimiter", "spacing");
  });

  it("applies fixed, float and transparent", () => {
    const { rerender } = render(<PanelHeader fixed>T</PanelHeader>);
    expect(screen.getByRole("banner")).toHaveClass("sticky", "top-0", "bg-background");
    rerender(
      <PanelHeader float transparent>
        T
      </PanelHeader>,
    );
    expect(screen.getByRole("banner")).toHaveClass("absolute");
    expect(screen.getByRole("banner")).not.toHaveClass("bg-background");
  });

  it("centers the title on compact widths only", () => {
    const { rerender } = render(
      <AdaptivityProvider sizeX="compact">
        <PanelHeader>T</PanelHeader>
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("heading")).toHaveClass("text-center");
    rerender(
      <AdaptivityProvider sizeX="regular">
        <PanelHeader>T</PanelHeader>
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("heading")).toHaveClass("text-start");
  });

  it("is accessible", async () => {
    const { container } = render(
      <Panel id="p">
        <PanelHeader before={<PanelHeaderBack />}>Title</PanelHeader>
      </Panel>,
    );
    await expectNoA11yViolations(container);
  });
});

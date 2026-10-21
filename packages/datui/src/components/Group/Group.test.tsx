import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { Header } from "../Header/Header";
import { ModalPage } from "../ModalPage/ModalPage";
import { Group, GroupContainer, GroupDescription, GroupExpandedContent, GroupHeader } from "./Group";

describe("Group", () => {
  it("renders a section labelled by its header with a description", () => {
    render(
      <Group header={<Header>Settings</Header>} description="Visible to friends">
        <p>Body</p>
      </Group>,
    );
    const section = screen.getByRole("region", { name: "Settings" });
    expect(section.tagName).toBe("SECTION");
    expect(screen.getByText("Visible to friends")).toHaveClass("text-footnote");
  });

  it("defaults to plain inside a modal even on regular widths", async () => {
    render(
      <AdaptivityProvider sizeX="regular">
        <ModalPage open header="Settings">
          <Group aria-label="inner">x</Group>
        </ModalPage>
      </AdaptivityProvider>,
    );
    expect(await screen.findByRole("region", { name: "inner" })).toHaveAttribute("data-mode", "plain");
  });

  it("picks the mode from adaptivity unless forced", () => {
    const { rerender } = render(
      <AdaptivityProvider sizeX="regular">
        <Group aria-label="g">x</Group>
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("region")).toHaveAttribute("data-mode", "card");
    rerender(
      <AdaptivityProvider sizeX="compact">
        <Group aria-label="g">x</Group>
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("region")).toHaveAttribute("data-mode", "plain");
    rerender(
      <AdaptivityProvider sizeX="compact">
        <Group aria-label="g" mode="card" padding="s">
          x
        </Group>
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("region")).toHaveClass("rounded-xl", "py-1");
  });

  it("renders separators between siblings per the separator prop", () => {
    const { container } = render(
      <div>
        <Group mode="plain">a</Group>
        <Group mode="plain" separator="show">
          b
        </Group>
        <Group mode="plain" separator="hide">
          c
        </Group>
      </div>,
    );
    const seps = container.querySelectorAll("[data-group-separator]");
    expect(seps).toHaveLength(2);
    expect(seps[0]).toHaveClass("last:hidden");
    expect(seps[1]).not.toHaveClass("last:hidden");
  });

  it("makes tabpanels focusable", () => {
    render(
      <Group role="tabpanel" aria-label="Tab">
        x
      </Group>,
    );
    expect(screen.getByRole("tabpanel")).toHaveAttribute("tabindex", "0");
  });

  it("exposes its parts", () => {
    render(
      <GroupContainer aria-label="c" mode="plain" as="div" role="region">
        <GroupHeader>H</GroupHeader>
        <GroupExpandedContent direction="block">E</GroupExpandedContent>
        <GroupDescription>D</GroupDescription>
      </GroupContainer>,
    );
    expect(screen.getByText("E")).toHaveClass("flex-col");
    expect(Group.Header).toBe(GroupHeader);
    expect(Group.ExpandedContent).toBe(GroupExpandedContent);
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <Group header={<Header>One</Header>}>a</Group>
        <Group header={<Header>Two</Header>} description="Hint">
          b
        </Group>
      </>,
    );
    await expectNoA11yViolations(container);
  });
});

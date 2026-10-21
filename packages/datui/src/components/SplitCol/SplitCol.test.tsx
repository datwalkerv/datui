import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { SplitCol, useSplitCol } from "./SplitCol";

function Probe() {
  const col = useSplitCol();
  return <span>{`${col?.animate}/${col?.colRef.current?.tagName}`}</span>;
}

describe("SplitCol", () => {
  it("sets width bounds through CSS variables", () => {
    render(
      <SplitCol width={280} minWidth="200px" maxWidth={320}>
        Col
      </SplitCol>,
    );
    const col = screen.getByText("Col");
    expect(col).toHaveClass("w-(--dt-split-w)", "min-w-(--dt-split-min)", "max-w-(--dt-split-max)", "shrink-0");
    expect(col.style.getPropertyValue("--dt-split-w")).toBe("280px");
    expect(col.style.getPropertyValue("--dt-split-min")).toBe("200px");
  });

  it("fills remaining space without width and applies responsive helpers", () => {
    render(
      <SplitCol autoSpaced stretchedOnMobile>
        Col
      </SplitCol>,
    );
    expect(screen.getByText("Col")).toHaveClass("flex-1", "tablet:px-4", "max-tablet:w-full");
  });

  it("wraps content in a sticky scroller when fixed", () => {
    const { container } = render(<SplitCol fixed>Col</SplitCol>);
    expect(container.querySelector("[data-split-fixed]")).toHaveClass("sticky", "top-0");
  });

  it("provides animate and its element to descendants", () => {
    const { rerender } = render(
      <SplitCol as="aside" animate={false}>
        <Probe />
      </SplitCol>,
    );
    rerender(
      <SplitCol as="aside" animate={false}>
        <Probe />
      </SplitCol>,
    );
    expect(screen.getByText("false/ASIDE")).toBeInTheDocument();
  });

  it("is accessible", async () => {
    const { container } = render(<SplitCol as="main">Content</SplitCol>);
    await expectNoA11yViolations(container);
  });
});

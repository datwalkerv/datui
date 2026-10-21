import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { SplitCol } from "../SplitCol/SplitCol";
import { SplitLayout } from "./SplitLayout";

describe("SplitLayout", () => {
  it("renders the header row and columns", () => {
    render(
      <SplitLayout header={<header>Top</header>}>
        <SplitCol as="nav" aria-label="Side">
          Side
        </SplitCol>
        <SplitCol as="main">Content</SplitCol>
      </SplitLayout>,
    );
    expect(screen.getByRole("banner")).toHaveTextContent("Top");
    expect(screen.getByRole("navigation", { name: "Side" })).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveTextContent("Content");
  });

  it("reverses visually while keeping DOM order, and centers", () => {
    render(
      <SplitLayout reverseColumns center>
        <SplitCol>First</SplitCol>
        <SplitCol>Second</SplitCol>
      </SplitLayout>,
    );
    const first = screen.getByText("First");
    const row = first.parentElement;
    expect(row).toHaveClass("flex-row-reverse", "justify-center");
    expect(row?.firstElementChild).toBe(first);
  });

  it("is accessible", async () => {
    const { container } = render(
      <SplitLayout>
        <SplitCol as="main">Content</SplitCol>
      </SplitLayout>,
    );
    await expectNoA11yViolations(container);
  });
});

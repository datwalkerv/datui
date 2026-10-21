import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { ContentBadge, ContentBadgeIconSlot } from "./ContentBadge";

describe("ContentBadge", () => {
  it("renders with default variant classes", () => {
    render(<ContentBadge>Beta</ContentBadge>);
    expect(screen.getByText("Beta")).toHaveClass("bg-primary", "h-5", "font-medium");
  });

  it("maps variant, appearance, size, capsule and weight", () => {
    render(
      <ContentBadge variant="outline" appearance="negative" size="l" capsule weight="1">
        Hot
      </ContentBadge>,
    );
    expect(screen.getByText("Hot")).toHaveClass("border-destructive", "h-6", "rounded-full", "font-semibold");
  });

  it("applies custom colors per variant", () => {
    render(
      <>
        <ContentBadge appearance="#00aa55">Fill</ContentBadge>
        <ContentBadge appearance="var(--brand)" variant="secondary">
          Tint
        </ContentBadge>
      </>,
    );
    expect(screen.getByText("Fill")).toHaveClass("bg-(--dt-content-badge-color)");
    expect(screen.getByText("Fill").style.getPropertyValue("--dt-content-badge-color")).toBe("#00aa55");
    expect(screen.getByText("Tint")).toHaveClass("bg-(--dt-content-badge-color)/16");
  });

  it("sizes icons, detects icon-only and drops icons at size s", () => {
    const { rerender } = render(
      <ContentBadge size="l" aria-label="Verified">
        <ContentBadge.IconSlot>
          <svg data-testid="icon" />
        </ContentBadge.IconSlot>
      </ContentBadge>,
    );
    expect(screen.getByTestId("icon").parentElement).toHaveClass("[&_svg]:size-icon-sm");
    expect(screen.getByLabelText("Verified")).toHaveClass("aspect-square");
    rerender(
      <ContentBadge size="s" capsule>
        <ContentBadgeIconSlot>
          <svg data-testid="icon" />
        </ContentBadgeIconSlot>
        Small
      </ContentBadge>,
    );
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    expect(screen.getByText("Small")).toHaveClass("rounded-xs");
    expect(screen.getByText("Small")).not.toHaveClass("rounded-full");
  });

  it("is accessible", async () => {
    const { container } = render(
      <ContentBadge variant="secondary">
        <ContentBadgeIconSlot>
          <svg />
        </ContentBadgeIconSlot>
        New
      </ContentBadge>,
    );
    await expectNoA11yViolations(container);
  });
});

it("ContentBadge: a labelled icon-only badge is exposed as an image", async () => {
  const { container } = render(
    <ContentBadge size="l" aria-label="Favorite">
      <ContentBadge.IconSlot>
        <svg aria-hidden />
      </ContentBadge.IconSlot>
    </ContentBadge>,
  );
  expect(screen.getByRole("img", { name: "Favorite" })).toBeInTheDocument();
  await expectNoA11yViolations(container);
});

import { render, screen } from "@testing-library/react";
import { Caption, DisplayTitle, EllipsisText, Footnote, Headline, Paragraph, Subhead, Text, Title } from "./Typography";

describe("Typography", () => {
  it("maps title levels to heading elements and sizes", () => {
    render(
      <>
        <Title level={2}>Section</Title>
        <DisplayTitle level={3}>Hero</DisplayTitle>
      </>,
    );
    const title = screen.getByRole("heading", { level: 2, name: "Section" });
    expect(title).toHaveClass("text-title-2", "font-semibold", "m-0");
    expect(screen.getByRole("heading", { level: 3, name: "Hero" })).toHaveClass("text-display-3");
  });

  it("lets as/weight/className override defaults", () => {
    render(
      <Headline as="div" weight="bold" className="text-primary" data-testid="h">
        Card
      </Headline>,
    );
    const el = screen.getByTestId("h");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("font-bold", "text-primary", "text-headline-1");
    expect(el).not.toHaveClass("font-medium");
  });

  it("renders body presets with semantic elements", () => {
    render(
      <>
        <Paragraph>Body</Paragraph>
        <Text>Inline</Text>
        <Subhead>Sub</Subhead>
        <Footnote>Note</Footnote>
        <Caption level={2} caps>
          Meta
        </Caption>
      </>,
    );
    expect(screen.getByText("Body").tagName).toBe("P");
    expect(screen.getByText("Inline").tagName).toBe("SPAN");
    expect(screen.getByText("Sub")).toHaveClass("text-subhead");
    expect(screen.getByText("Note")).toHaveClass("text-footnote");
    expect(screen.getByText("Meta")).toHaveClass("text-caption-2", "uppercase");
  });

  it("clamps EllipsisText and exposes the full string as title", () => {
    render(<EllipsisText maxLines={2}>A long sentence</EllipsisText>);
    const el = screen.getByText("A long sentence");
    expect(el).toHaveAttribute("title", "A long sentence");
    expect(el.style.webkitLineClamp).toBe("2");
  });
});

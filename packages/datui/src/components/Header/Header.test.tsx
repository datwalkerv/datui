import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Header } from "./Header";

describe("Header", () => {
  it("renders an h2 with medium typography by default", () => {
    render(<Header>Friends</Header>);
    const heading = screen.getByRole("heading", { level: 2, name: "Friends" });
    expect(heading).toHaveClass("text-headline-1", "truncate");
  });

  it.each([
    ["xl", "text-title-2"],
    ["l", "text-title-3"],
    ["s", "uppercase"],
  ] as const)("maps size %s", (size, cls) => {
    render(<Header size={size}>T</Header>);
    expect(screen.getByRole("heading")).toHaveClass(cls);
  });

  it("supports as, multiline and conditional slots", () => {
    const { rerender, container } = render(
      <Header as="h3" multiline>
        Title
      </Header>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveClass("break-words");
    expect(container.textContent).toBe("Title");
    rerender(
      <Header
        subtitle="Sub"
        subtitleAs="p"
        indicator="12"
        before={<span>B</span>}
        after={<a href="/all">Show all</a>}
        beforeTitle={<svg data-testid="bt" />}
        afterSubtitle={<svg data-testid="as" />}
      >
        Title
      </Header>,
    );
    expect(screen.getByText("Sub").tagName).toBe("P");
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Show all" })).toBeInTheDocument();
    expect(screen.getByTestId("bt").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("as").parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("is accessible", async () => {
    const { container } = render(
      <Header subtitle="Online now" indicator="3" after={<a href="/x">All</a>}>
        Friends
      </Header>,
    );
    await expectNoA11yViolations(container);
  });
});

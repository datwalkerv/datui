import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Link } from "./Link";

describe("Link", () => {
  it("renders an anchor with href and hover underline", () => {
    render(<Link href="/docs">Docs</Link>);
    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
    expect(link).toHaveClass("text-link", "hover:underline");
  });

  it("renders a button when only onClick is given and activates with keyboard", async () => {
    const onClick = vi.fn();
    render(<Link onClick={onClick}>More</Link>);
    const button = screen.getByRole("button", { name: "More" });
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports visited styling and noUnderline", () => {
    render(
      <Link href="/a" hasVisited noUnderline>
        A
      </Link>,
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("visited:text-link-visited");
    expect(link).not.toHaveClass("hover:underline");
  });

  it("disables the link and blocks clicks", async () => {
    const onClick = vi.fn();
    render(
      <Link href="/a" disabled onClick={onClick}>
        Off
      </Link>,
    );
    const el = screen.getByText("Off");
    expect(el).toHaveAttribute("aria-disabled", "true");
    expect(el).not.toHaveAttribute("href");
    await userEvent.click(el);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("hides icons and announces new tabs", () => {
    render(
      <Link href="https://example.com" target="_blank" before={<svg data-testid="icon" />}>
        Site
      </Link>,
    );
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("link")).toHaveAccessibleName("Site (opens in a new tab)");
  });

  it("merges onto a child element with asChild", () => {
    render(
      <Link asChild>
        <a href="/router">Router</a>
      </Link>,
    );
    expect(screen.getByRole("link", { name: "Router" })).toHaveClass("text-link");
  });

  it("is accessible", async () => {
    const { container } = render(
      <p>
        Read the <Link href="/docs">docs</Link> or <Link onClick={() => {}}>ask</Link>.
      </p>,
    );
    await expectNoA11yViolations(container);
  });
});

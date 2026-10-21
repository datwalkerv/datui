import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { ContentCard } from "./ContentCard";

describe("ContentCard", () => {
  it("renders a static div with text slots and shadow variant", () => {
    const { container } = render(
      <ContentCard overTitle="News" title="Headline" description="Body" caption="Today" titleAs="h3" />,
    );
    expect((container.firstChild as HTMLElement).tagName).toBe("DIV");
    expect(container.firstChild).toHaveClass("shadow-md");
    expect(screen.getByRole("heading", { level: 3, name: "Headline" })).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("renders a link with href and a button with onClick", async () => {
    const onClick = vi.fn();
    render(
      <>
        <ContentCard href="/a" title="Link card" />
        <ContentCard onClick={onClick} title="Button card" variant="outline" />
      </>,
    );
    expect(screen.getByRole("link", { name: "Link card" })).toHaveAttribute("href", "/a");
    const button = screen.getByRole("button", { name: "Button card" });
    await userEvent.click(button);
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("forwards image attributes and maxHeight", () => {
    const { container } = render(
      <ContentCard
        src="/c.png"
        srcSet="/c2.png 2x"
        loading="lazy"
        maxHeight={150}
        imageObjectFit="contain"
        title="t"
      />,
    );
    const img = container.querySelector("img") as HTMLImageElement;
    expect(img).toHaveAttribute("alt", "");
    expect(img).toHaveAttribute("srcset", "/c2.png 2x");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img.style.maxHeight).toBe("150px");
    expect(img.style.objectFit).toBe("contain");
  });

  it("blocks clicks when disabled", async () => {
    const onClick = vi.fn();
    render(<ContentCard onClick={onClick} disabled title="Off" />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <ContentCard src="/a.png" title="Static" />
        <ContentCard href="/x" title="Linked" description="More" />
      </>,
    );
    await expectNoA11yViolations(container);
  });
});

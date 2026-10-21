import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { HorizontalCell, HorizontalCellShowMore } from "./HorizontalCell";

describe("HorizontalCell", () => {
  it("uses the width token per size and centers text for size s", () => {
    const { rerender } = render(<HorizontalCell title="Anna">img</HorizontalCell>);
    const tile = () => screen.getByText("Anna").parentElement as HTMLElement;
    expect(tile()).toHaveClass("w-hcell-s", "text-center");
    rerender(
      <HorizontalCell title="Anna" size="l">
        img
      </HorizontalCell>,
    );
    expect(tile()).toHaveClass("w-hcell-l", "text-start");
  });

  it("supports numeric width, textAlign and noPadding", () => {
    render(
      <HorizontalCell title="Wide" size={200} textAlign="end" noPadding>
        img
      </HorizontalCell>,
    );
    const tile = screen.getByText("Wide").parentElement as HTMLElement;
    expect(tile).toHaveStyle({ width: "200px" });
    expect(tile).toHaveClass("text-end");
    expect(tile).not.toHaveClass("p-1.5");
  });

  it("is a button with title and subtitle as name and a custom title tag", async () => {
    const onClick = vi.fn();
    render(
      <HorizontalCell title="Album" subtitle="12 photos" titleAs="h3" onClick={onClick}>
        img
      </HorizontalCell>,
    );
    const button = screen.getByRole("button", { name: /Album 12 photos/ });
    expect(screen.getByText("Album").tagName).toBe("H3");
    button.focus();
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(
      <HorizontalCell title="Off" disabled onClick={onClick}>
        img
      </HorizontalCell>,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("is accessible", async () => {
    const { container } = render(
      <ul>
        <li>
          <HorizontalCell title="One" href="#">
            <span>img</span>
          </HorizontalCell>
        </li>
      </ul>,
    );
    await expectNoA11yViolations(container);
  });
});

describe("HorizontalCellShowMore", () => {
  it("is a labelled action with a default label and media-height icon area", async () => {
    const onClick = vi.fn();
    const { container } = render(<HorizontalCellShowMore onClick={onClick} height={96} />);
    const button = screen.getByRole("button", { name: "Show all" });
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect((button.firstChild as HTMLElement).style.height).toBe("96px");
    await expectNoA11yViolations(container);
  });

  it("renders a link with custom text", () => {
    render(<HorizontalCellShowMore href="/all">All albums</HorizontalCellShowMore>);
    expect(screen.getByRole("link", { name: "All albums" })).toHaveAttribute("href", "/all");
  });
});

import { render, screen } from "@testing-library/react";
import { ScrollArrow } from "./ScrollArrow";

describe("ScrollArrow", () => {
  it("rotates the chevron per direction and sizes", () => {
    const { container } = render(
      <>
        <ScrollArrow direction="left" />
        <ScrollArrow direction="up" size="s" />
        <ScrollArrow direction="right" />
        <ScrollArrow direction="down" />
      </>,
    );
    const icons = container.querySelectorAll("svg");
    expect(icons[0]?.getAttribute("class")).not.toMatch(/rotate/);
    expect(icons[1]).toHaveClass("rotate-90", "size-icon-sm");
    expect(icons[2]).toHaveClass("rotate-180");
    expect(icons[3]).toHaveClass("-rotate-90");
    expect(container.querySelectorAll("button")[1]).toHaveClass("size-control-s");
  });

  it("is hidden and untabbable without a label, a named button with one", () => {
    const { container } = render(
      <>
        <ScrollArrow direction="left" />
        <ScrollArrow direction="right" label="Next" />
      </>,
    );
    expect(container.querySelector("button")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("button")).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("button", { name: "Next" })).not.toHaveAttribute("tabindex");
  });
});

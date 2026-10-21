import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { GridAvatar } from "./GridAvatar";

describe("GridAvatar", () => {
  it("labels the root and hides tiles", () => {
    render(<GridAvatar src={["/a", "/b"]} alt="Team chat" />);
    const root = screen.getByRole("img", { name: "Team chat" });
    expect(root.style.width).toBe("48px");
    expect(root.querySelector("[data-count]")).toHaveAttribute("aria-hidden", "true");
  });

  it.each([
    [1, "col-span-2"],
    [2, "row-span-2"],
    [3, "row-span-2"],
  ])("lays out %i tiles", (n, cls) => {
    const { container } = render(<GridAvatar src={Array.from({ length: n }, (_, i) => `/${i}`)} alt="g" />);
    const imgs = container.querySelectorAll("img");
    expect(imgs).toHaveLength(n);
    expect(imgs[0]).toHaveClass(cls);
  });

  it("truncates beyond four with a warning", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { container } = render(<GridAvatar src={["/1", "/2", "/3", "/4", "/5"]} alt="g" size={64} />);
    expect(container.querySelectorAll("img")).toHaveLength(4);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("at most 4"));
    warn.mockRestore();
  });

  it("renders a badge", () => {
    render(
      <GridAvatar src={["/a"]} alt="g">
        <GridAvatar.Badge data-testid="badge" />
      </GridAvatar>,
    );
    expect(screen.getByTestId("badge")).toBeInTheDocument();
  });

  it("is accessible", async () => {
    const { container } = render(<GridAvatar src={["/a", "/b", "/c", "/d"]} alt="Family" />);
    await expectNoA11yViolations(container);
  });
});

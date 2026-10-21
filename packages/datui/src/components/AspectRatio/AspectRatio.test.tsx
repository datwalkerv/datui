import { render } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AspectRatio } from "./AspectRatio";

describe("AspectRatio", () => {
  it("sets the ratio and stretches children", () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <img src="/a.png" alt="A" />
      </AspectRatio>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box.style.aspectRatio).toContain(String(16 / 9));
    expect(box).toHaveClass("[&>*]:absolute", "[&>*]:size-full");
  });

  it("accepts CSS ratios, mode none and as", () => {
    const { container } = render(<AspectRatio ratio="4 / 3" mode="none" as="figure" />);
    const box = container.firstChild as HTMLElement;
    expect(box.tagName).toBe("FIGURE");
    expect(box.style.aspectRatio).toBe("4 / 3");
    expect(box).not.toHaveClass("[&>*]:absolute");
  });

  it("is accessible", async () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <img src="/a.png" alt="Square" />
      </AspectRatio>,
    );
    await expectNoA11yViolations(container);
  });
});

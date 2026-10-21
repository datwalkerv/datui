import { fireEvent, render, screen } from "@testing-library/react";
import { InputLike, InputLikeDivider } from "./InputLike";

describe("InputLike", () => {
  it("pads the value with a mask and selects on focus", () => {
    const onElementSelect = vi.fn();
    const { container } = render(
      <InputLike length={4} index={2} value="20" label="Year" onElementSelect={onElementSelect} />,
    );
    expect(container.querySelector("[data-mask]")?.textContent).toHaveLength(2);
    fireEvent.focus(screen.getByText("Year").parentElement as HTMLElement);
    expect(onElementSelect).toHaveBeenCalledWith(2);
  });

  it("read-only removes the tab stop and key handling", () => {
    const onKeyDown = vi.fn();
    const { container } = render(<InputLike length={2} index={0} value="01" readOnly onKeyDown={onKeyDown} />);
    const el = container.firstElementChild as HTMLElement;
    expect(el).toHaveAttribute("tabindex", "-1");
    expect(el).toHaveAttribute("data-filled");
    fireEvent.keyDown(el, { key: "1" });
    expect(onKeyDown).not.toHaveBeenCalled();
  });

  it("InputLikeDivider renders hidden children", () => {
    render(<InputLikeDivider>.</InputLikeDivider>);
    expect(screen.getByText(".")).toHaveAttribute("aria-hidden", "true");
  });
});

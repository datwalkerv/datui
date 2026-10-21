import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Textarea } from "./Textarea";

// jsdom has no layout: derive scrollHeight from the number of lines.
beforeAll(() => {
  Object.defineProperty(HTMLTextAreaElement.prototype, "scrollHeight", {
    configurable: true,
    get() {
      return 20 * Math.max(1, (this as HTMLTextAreaElement).value.split("\n").length);
    },
  });
});
afterAll(() => {
  Reflect.deleteProperty(HTMLTextAreaElement.prototype, "scrollHeight");
});

describe("Textarea", () => {
  it("renders a textarea with 2 rows by default and forwards ref", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="Bio" />);
    expect(ref.current).toBe(screen.getByRole("textbox"));
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "2");
  });

  it("grows on input and calls onResize only when the height changes", async () => {
    const onResize = vi.fn();
    render(<Textarea aria-label="Bio" onResize={onResize} />);
    const el = screen.getByRole("textbox");
    expect(el.style.height).toBe("20px");
    await userEvent.type(el, "a");
    expect(onResize).not.toHaveBeenCalled();
    await userEvent.type(el, "{Enter}b");
    expect(el.style.height).toBe("40px");
    expect(onResize).toHaveBeenCalledTimes(1);
  });

  it("resizes when a controlled value changes", () => {
    const { rerender } = render(<Textarea aria-label="Bio" value="a" onChange={() => {}} />);
    rerender(<Textarea aria-label="Bio" value={"a\nb\nc"} onChange={() => {}} />);
    expect(screen.getByRole("textbox").style.height).toBe("60px");
  });

  it("caps at maxHeight and scrolls", () => {
    render(<Textarea aria-label="Bio" maxHeight={40} />);
    expect(screen.getByRole("textbox")).toHaveStyle({ maxHeight: "40px" });
    expect(screen.getByRole("textbox")).toHaveClass("overflow-y-auto");
  });

  it("grow=false leaves height alone", () => {
    render(<Textarea aria-label="Bio" grow={false} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "a\nb" } });
    expect(screen.getByRole("textbox").style.height).toBe("");
  });

  it("marks errors and disabled", () => {
    render(<Textarea aria-label="Bio" status="error" disabled />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("is accessible", async () => {
    const { container } = render(<Textarea aria-label="Bio" />);
    await expectNoA11yViolations(container);
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import * as React from "react";
import { type Gesture, type UseTouchOptions, useTouch } from "./useTouch";

function Target(props: UseTouchOptions & { onClick?: () => void }) {
  const [el, setEl] = React.useState<HTMLButtonElement | null>(null);
  useTouch(el, props);
  return (
    <button ref={setEl} type="button" onClick={props.onClick}>
      target
    </button>
  );
}

const t = (x: number, y: number) => [{ clientX: x, clientY: y }];

describe("useTouch", () => {
  it("reports shift and locks the axis after the threshold (touch)", () => {
    const moves: Gesture[] = [];
    const onEnd = vi.fn();
    render(<Target onMove={(g) => moves.push(g)} onEnd={onEnd} slideThreshold={10} />);
    const el = screen.getByRole("button");
    fireEvent.touchStart(el, { touches: t(10, 10) });
    fireEvent.touchMove(el, { touches: t(14, 12) });
    expect(moves[0]).toMatchObject({ shiftX: 4, shiftY: 2, isSlideX: false, isSlideY: false });
    fireEvent.touchMove(el, { touches: t(30, 14) });
    expect(moves[1]).toMatchObject({ shiftX: 20, isSlideX: true, isSlideY: false });
    // Axis stays locked even if the finger later moves mostly vertically.
    fireEvent.touchMove(el, { touches: t(30, 100) });
    expect(moves[2]).toMatchObject({ isSlideX: true, isSlideY: false, shiftY: 90 });
    fireEvent.touchEnd(el, { touches: [], changedTouches: t(30, 100) });
    expect(onEnd).toHaveBeenCalledWith(expect.objectContaining({ shiftX: 20, shiftY: 90 }));
  });

  it("tracks mouse drags the same way and stops after mouseup", () => {
    const onMove = vi.fn();
    const onStart = vi.fn();
    render(<Target onStart={onStart} onMove={onMove} />);
    fireEvent.mouseDown(screen.getByRole("button"), { clientX: 0, clientY: 0 });
    expect(onStart).toHaveBeenCalledWith(expect.objectContaining({ startX: 0, startY: 0 }));
    fireEvent.mouseMove(window, { clientX: 0, clientY: 20 });
    expect(onMove).toHaveBeenLastCalledWith(expect.objectContaining({ shiftY: 20, isSlideY: true }));
    fireEvent.mouseUp(window, { clientX: 0, clientY: 20 });
    fireEvent.mouseMove(window, { clientX: 0, clientY: 50 });
    expect(onMove).toHaveBeenCalledTimes(1);
  });

  it("ignores mouse when mouse=false and non-primary buttons", () => {
    const onStart = vi.fn();
    const { unmount } = render(<Target onStart={onStart} mouse={false} />);
    fireEvent.mouseDown(screen.getByRole("button"));
    unmount();
    render(<Target onStart={onStart} />);
    fireEvent.mouseDown(screen.getByRole("button"), { button: 2 });
    expect(onStart).not.toHaveBeenCalled();
  });

  it("suppresses the click after a slide with noSlideClick", () => {
    const onClick = vi.fn();
    render(<Target noSlideClick onClick={onClick} />);
    const el = screen.getByRole("button");
    fireEvent.mouseDown(el, { clientX: 0 });
    fireEvent.mouseUp(window, { clientX: 40 });
    fireEvent.click(el);
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(el);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("removes element and window listeners on unmount", () => {
    const onMove = vi.fn();
    const { unmount } = render(<Target onMove={onMove} />);
    const el = screen.getByRole("button");
    const removeEl = vi.spyOn(el, "removeEventListener");
    const removeWin = vi.spyOn(window, "removeEventListener");
    fireEvent.mouseDown(el);
    unmount();
    expect(removeEl.mock.calls.map((c) => c[0]).sort()).toEqual(
      ["click", "mousedown", "touchcancel", "touchend", "touchmove", "touchstart"].sort(),
    );
    expect(removeWin.mock.calls.map((c) => c[0])).toEqual(expect.arrayContaining(["mousemove", "mouseup"]));
    fireEvent.mouseMove(window, { clientX: 10 });
    expect(onMove).not.toHaveBeenCalled();
  });
});

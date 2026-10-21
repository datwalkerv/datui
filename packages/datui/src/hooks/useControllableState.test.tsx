import { act, renderHook } from "@testing-library/react";
import { useControllableState } from "./useControllableState";

describe("useControllableState", () => {
  it("manages its own state when uncontrolled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: 1, onChange }));
    act(() => result.current[1]((v) => v + 1));
    expect(result.current[0]).toBe(2);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("defers to the value prop when controlled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ value: 5, defaultValue: 1, onChange }));
    act(() => result.current[1](7));
    expect(result.current[0]).toBe(5);
    expect(onChange).toHaveBeenCalledWith(7);
  });

  it("skips onChange when the value is unchanged", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useControllableState({ defaultValue: "a", onChange }));
    act(() => result.current[1]("a"));
    expect(onChange).not.toHaveBeenCalled();
  });
});

import { act, fireEvent } from "@testing-library/react";

/** Radix dismisses on the click that follows an outside pointerdown, after registering its listener on the next tick. */
export async function clickOutside(element: Element): Promise<void> {
  await act(() => new Promise((r) => setTimeout(r, 0)));
  fireEvent.pointerDown(element);
  fireEvent.pointerUp(element);
  fireEvent.click(element);
  await act(() => new Promise((r) => setTimeout(r, 0)));
}

import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { ScreenSpinner, ScreenSpinnerContainer } from "./ScreenSpinner";

describe("ScreenSpinner", () => {
  it("renders a status with a loading label in a portal", async () => {
    const { container } = render(<ScreenSpinner />);
    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("Loading…");
    expect(container).not.toContainElement(status);
    expect(status).toHaveClass("shadow-md");
  });

  it("renders in place with portal false and the overlay mode", () => {
    const { container } = render(<ScreenSpinner portal={false} mode="overlay" label="Uploading" />);
    expect(container.firstElementChild).toHaveClass("bg-overlay");
    expect(screen.getByRole("status")).toHaveTextContent("Uploading");
  });

  it("swaps the spinner for state icons", () => {
    const { rerender } = render(<ScreenSpinner portal={false} state="done" />);
    expect(document.querySelector('[data-icon="done"]')).not.toBeNull();
    expect(screen.getByRole("status")).not.toHaveTextContent("Loading…");
    rerender(<ScreenSpinner portal={false} state="error" />);
    expect(document.querySelector('[data-icon="error"]')).not.toBeNull();
    rerender(<ScreenSpinner portal={false} state="custom" customIcon={<svg data-testid="custom" />} />);
    expect(screen.getByTestId("custom")).toBeInTheDocument();
  });

  it("offers a cancel button in the cancelable state, by click and keyboard", async () => {
    const onCancel = vi.fn();
    render(<ScreenSpinner portal={false} state="cancelable" cancelLabel="Stop" onCancel={onCancel} />);
    const cancel = screen.getByRole("button", { name: "Stop" });
    await userEvent.click(cancel);
    cancel.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onCancel).toHaveBeenCalledTimes(3);
  });

  it("waits for visibilityDelay before showing", () => {
    vi.useFakeTimers();
    try {
      render(<ScreenSpinner portal={false} visibilityDelay={300} />);
      expect(screen.getByRole("status")).toHaveClass("invisible");
      act(() => vi.advanceTimersByTime(300));
      expect(screen.getByRole("status")).not.toHaveClass("invisible");
    } finally {
      vi.useRealTimers();
    }
  });

  it("is accessible", async () => {
    const { container } = render(<ScreenSpinner portal={false} state="cancelable" />);
    await expectNoA11yViolations(container);
  });
});

describe("ScreenSpinnerContainer", () => {
  it("renders the status card in place, without the full-screen layer", () => {
    const { container } = render(<ScreenSpinnerContainer state="done" label="Saved" />);
    const status = screen.getByRole("status");
    expect(status).toHaveTextContent("Saved");
    expect(container.firstChild).toBe(status);
    expect(container.querySelector(".fixed")).toBeNull();
  });
});

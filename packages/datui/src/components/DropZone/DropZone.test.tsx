import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { DropZone, DropZoneGrid } from "./DropZone";

describe("DropZone", () => {
  it("is active on dragover and cleared on leave and drop; render prop gets the state", () => {
    render(<DropZone data-testid="zone">{({ active }) => (active ? "Release" : "Drag here")}</DropZone>);
    const zone = screen.getByTestId("zone");
    fireEvent.dragOver(zone);
    expect(zone).toHaveTextContent("Release");
    expect(zone).toHaveAttribute("data-active");
    fireEvent.dragLeave(zone);
    expect(zone).toHaveTextContent("Drag here");
    fireEvent.dragEnter(zone);
    fireEvent.drop(zone);
    expect(zone).not.toHaveAttribute("data-active");
  });

  it("stays active while moving over children", () => {
    render(
      <DropZone data-testid="zone">
        <span>child</span>
      </DropZone>,
    );
    const zone = screen.getByTestId("zone");
    fireEvent.dragEnter(zone);
    fireEvent.dragEnter(screen.getByText("child"));
    fireEvent.dragLeave(zone);
    expect(zone).toHaveAttribute("data-active");
    fireEvent.dragLeave(screen.getByText("child"));
    expect(zone).not.toHaveAttribute("data-active");
  });

  it("respects stopPropagation from nested handlers", () => {
    render(<DropZone data-testid="zone" onDragOver={(e) => e.stopPropagation()} />);
    fireEvent.dragOver(screen.getByTestId("zone"));
    expect(screen.getByTestId("zone")).not.toHaveAttribute("data-active");
  });

  it("with onFiles: drop delivers files and Enter opens the dialog", async () => {
    const onFiles = vi.fn();
    const { container } = render(<DropZone onFiles={onFiles} aria-label="Upload photos" accept="image/*" />);
    const zone = screen.getByRole("button", { name: "Upload photos" });
    const file = new File(["x"], "a.png");
    fireEvent.drop(zone, { dataTransfer: { files: [file] } });
    expect(onFiles).toHaveBeenCalledWith([file]);
    const input = container.querySelector("input[type=file]") as HTMLInputElement;
    const click = vi.spyOn(input, "click");
    zone.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(click).toHaveBeenCalledTimes(2);
    fireEvent.change(input, { target: { files: [new File(["y"], "b.png")] } });
    expect(onFiles.mock.lastCall?.[0][0].name).toBe("b.png");
  });

  it("disabled zones ignore drags and keys", () => {
    render(<DropZone onFiles={() => {}} disabled aria-label="Upload" />);
    const zone = screen.getByRole("button");
    expect(zone).toHaveAttribute("aria-disabled", "true");
    expect(zone).not.toHaveAttribute("tabindex");
    fireEvent.dragOver(zone);
    expect(zone).not.toHaveAttribute("data-active");
  });

  it("DropZoneGrid sets direction classes", () => {
    const { container, rerender } = render(<DropZoneGrid />);
    expect(container.firstElementChild).toHaveClass("tablet:flex-row");
    rerender(<DropZoneGrid direction="column" />);
    expect(container.firstElementChild).not.toHaveClass("tablet:flex-row");
  });

  it("is accessible", async () => {
    const { container } = render(
      <DropZoneGrid>
        <DropZone>Drop files</DropZone>
        <DropZone onFiles={() => {}} aria-label="Upload" />
      </DropZoneGrid>,
    );
    await expectNoA11yViolations(container);
  });
});

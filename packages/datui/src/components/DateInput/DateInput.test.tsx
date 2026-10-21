import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { DateInput } from "./DateInput";

const seg = (name: string) => screen.getByRole("spinbutton", { name });

describe("DateInput", () => {
  it("renders segments for the value", () => {
    render(<DateInput aria-label="Birthday" defaultValue={new Date(2026, 4, 3)} />);
    expect(screen.getByRole("group", { name: "Birthday" })).toBeInTheDocument();
    expect(seg("Day")).toHaveAttribute("aria-valuetext", "03");
    expect(seg("Month")).toHaveAttribute("aria-valuenow", "5");
    expect(seg("Year")).toHaveAttribute("aria-valuetext", "2026");
    expect(screen.queryByRole("spinbutton", { name: "Hours" })).not.toBeInTheDocument();
  });

  it("types digits with auto-advance and emits a valid date", async () => {
    const onChange = vi.fn();
    render(<DateInput aria-label="Date" onChange={onChange} />);
    seg("Day").focus();
    await userEvent.keyboard("0");
    await userEvent.keyboard("9");
    expect(seg("Month")).toHaveFocus();
    await userEvent.keyboard("4");
    expect(seg("Year")).toHaveFocus();
    await userEvent.keyboard("2026");
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 3, 9));
  });

  it("rejects impossible dates and emits null when broken", async () => {
    const onChange = vi.fn();
    render(<DateInput aria-label="Date" onChange={onChange} defaultValue={new Date(2026, 1, 10)} />);
    seg("Day").focus();
    await userEvent.keyboard("31");
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(seg("Day")).toHaveAttribute("aria-valuetext", "31");
  });

  it("supports arrows and backspace across segments", async () => {
    render(<DateInput aria-label="Date" defaultValue={new Date(2026, 11, 31)} />);
    seg("Month").focus();
    await userEvent.keyboard("{ArrowUp}");
    expect(seg("Month")).toHaveAttribute("aria-valuetext", "01");
    await userEvent.keyboard("{ArrowDown}{ArrowDown}");
    expect(seg("Month")).toHaveAttribute("aria-valuetext", "11");
    await userEvent.keyboard("{ArrowLeft}");
    expect(seg("Day")).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}{Backspace}{Backspace}{Backspace}");
    expect(seg("Month")).not.toHaveAttribute("aria-valuetext");
    expect(seg("Day")).toHaveFocus();
  });

  it("clears with the clear button", async () => {
    const onChange = vi.fn();
    render(<DateInput aria-label="Date" defaultValue={new Date(2026, 4, 3)} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenLastCalledWith(null);
    expect(seg("Day")).toHaveFocus();
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  });

  it("picks a date in the calendar popover, closes and returns focus", async () => {
    const onChange = vi.fn();
    const onOpen = vi.fn();
    render(
      <DateInput
        aria-label="Date"
        defaultValue={new Date(2026, 4, 3)}
        onChange={onChange}
        onCalendarOpenChange={onOpen}
      />,
    );
    const trigger = screen.getByRole("button", { name: "Show calendar" });
    await userEvent.click(trigger);
    expect(screen.getByRole("dialog", { name: "Calendar" })).toBeInTheDocument();
    expect(onOpen).toHaveBeenLastCalledWith(true);
    await userEvent.click(screen.getByRole("button", { name: "Thursday, May 14, 2026" }));
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 4, 14));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(seg("Day")).toHaveAttribute("aria-valuetext", "14");
    expect(trigger).toHaveFocus();
  });

  it("closes the calendar on Escape", async () => {
    render(<DateInput aria-label="Date" />);
    const trigger = screen.getByRole("button", { name: "Show calendar" });
    await userEvent.click(trigger);
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("with time: keeps the popover open until Done", async () => {
    const onApply = vi.fn();
    render(<DateInput aria-label="When" enableTime defaultValue={new Date(2026, 4, 3, 9, 5)} onApply={onApply} />);
    expect(seg("Hours")).toHaveAttribute("aria-valuetext", "09");
    expect(seg("Minutes")).toHaveAttribute("aria-valuetext", "05");
    await userEvent.click(screen.getByRole("button", { name: "Show calendar" }));
    await userEvent.click(screen.getByRole("button", { name: "Friday, May 8, 2026" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(onApply).toHaveBeenCalledWith(new Date(2026, 4, 8, 9, 5));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("is controlled and submits through a hidden input", async () => {
    function Controlled() {
      const [value, setValue] = React.useState<Date | null>(new Date(2026, 0, 2));
      return (
        <form>
          <DateInput aria-label="Date" name="date" value={value} onChange={setValue} />
          <button type="button" onClick={() => setValue(new Date(2026, 6, 4))}>
            Set
          </button>
        </form>
      );
    }
    const { container } = render(<Controlled />);
    await userEvent.click(screen.getByRole("button", { name: "Set" }));
    expect(seg("Month")).toHaveAttribute("aria-valuetext", "07");
    const data = new FormData(container.querySelector("form") as HTMLFormElement);
    expect(data.get("date")).toBe(new Date(2026, 6, 4).toISOString());
  });

  it("blocks editing when disabled and shows error status", async () => {
    render(<DateInput aria-label="Date" disabled status="error" defaultValue={new Date(2026, 4, 3)} />);
    expect(screen.getByRole("group")).toHaveAttribute("aria-invalid", "true");
    expect(seg("Day")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "Show calendar" })).toBeDisabled();
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  });

  it("is accessible", async () => {
    const { container } = render(<DateInput aria-label="Date" enableTime defaultValue={new Date(2026, 4, 3)} />);
    await expectNoA11yViolations(container);
  });
});

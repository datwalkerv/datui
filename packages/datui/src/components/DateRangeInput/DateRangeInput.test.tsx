import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { DateRangeInput } from "./DateRangeInput";

const seg = (name: string) => screen.getByRole("spinbutton", { name });

describe("DateRangeInput", () => {
  it("types both ends, moving from start to end", async () => {
    const onChange = vi.fn();
    render(<DateRangeInput aria-label="Trip" onChange={onChange} />);
    seg("Start day").focus();
    await userEvent.keyboard("01052026");
    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 4, 1), null]);
    expect(seg("End day")).toHaveFocus();
    await userEvent.keyboard("10052026");
    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 4, 1), new Date(2026, 4, 10)]);
    seg("End day").focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(seg("Start year")).toHaveFocus();
  });

  it("orders a reversed range", async () => {
    const onChange = vi.fn();
    render(<DateRangeInput aria-label="Trip" onChange={onChange} defaultValue={[new Date(2026, 4, 10), null]} />);
    seg("End day").focus();
    await userEvent.keyboard("01052026");
    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 4, 1), new Date(2026, 4, 10)]);
    expect(seg("Start day")).toHaveAttribute("aria-valuetext", "01");
    expect(seg("End day")).toHaveAttribute("aria-valuetext", "10");
  });

  it("clears both ends", async () => {
    const onChange = vi.fn();
    render(
      <DateRangeInput
        aria-label="Trip"
        onChange={onChange}
        defaultValue={[new Date(2026, 4, 1), new Date(2026, 4, 3)]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenLastCalledWith([null, null]);
  });

  it("syncs with the range calendar and closes once complete", async () => {
    const onChange = vi.fn();
    render(<DateRangeInput aria-label="Trip" onChange={onChange} defaultValue={[new Date(2026, 4, 1), null]} />);
    await userEvent.click(screen.getByRole("button", { name: "Show calendar" }));
    await userEvent.click(screen.getAllByRole("button", { name: "Tuesday, May 5, 2026" })[0] as HTMLElement);
    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 4, 1), new Date(2026, 4, 5)]);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(seg("End day")).toHaveAttribute("aria-valuetext", "05");
  });

  it("is disabled", () => {
    render(<DateRangeInput aria-label="Trip" disabled />);
    expect(seg("Start day")).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "Show calendar" })).toBeDisabled();
  });

  it("is accessible", async () => {
    const { container } = render(
      <DateRangeInput aria-label="Trip" defaultValue={[new Date(2026, 4, 1), new Date(2026, 4, 3)]} />,
    );
    await expectNoA11yViolations(container);
  });
});

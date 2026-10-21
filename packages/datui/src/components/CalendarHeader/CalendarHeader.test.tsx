import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { LocaleProvider } from "../LocaleProvider/LocaleProvider";
import { CalendarHeader } from "./CalendarHeader";

const view = new Date(2026, 4, 15);

describe("CalendarHeader", () => {
  it("moves to the previous and next month", async () => {
    const onChange = vi.fn();
    render(<CalendarHeader viewDate={view} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 3, 1));
    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 5, 1));
  });

  it("changes month and year through the pickers and disables out-of-range months", async () => {
    const onChange = vi.fn();
    render(
      <CalendarHeader
        viewDate={view}
        onChange={onChange}
        startMonth={new Date(2026, 2, 1)}
        endMonth={new Date(2027, 11, 1)}
      />,
    );
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Month" }), "8");
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 8, 1));
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Year" }), "2027");
    expect(onChange).toHaveBeenLastCalledWith(new Date(2027, 4, 1));
    expect(screen.getByRole("option", { name: "January" })).toBeDisabled();
    expect(screen.getAllByRole("option", { name: /^20\d\d$/ })).toHaveLength(2);
  });

  it("hides or disables arrows, shows a plain localized title without pickers", () => {
    render(
      <LocaleProvider value="de">
        <CalendarHeader viewDate={view} onChange={() => {}} disablePickers prevMonthHidden nextMonthDisabled />
      </LocaleProvider>,
    );
    expect(screen.queryByRole("button", { name: "Previous month" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
    expect(screen.getByText("Mai 2026")).toBeInTheDocument();
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("uses custom handlers", async () => {
    const onPrevMonth = vi.fn();
    render(<CalendarHeader viewDate={view} onChange={() => {}} onPrevMonth={onPrevMonth} />);
    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    expect(onPrevMonth).toHaveBeenCalled();
  });

  it("is accessible", async () => {
    const { container } = render(<CalendarHeader viewDate={view} onChange={() => {}} />);
    await expectNoA11yViolations(container);
  });
});

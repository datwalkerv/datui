import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { LocaleProvider } from "../LocaleProvider/LocaleProvider";
import { Calendar } from "./Calendar";

const view = new Date(2026, 4, 1); // May 2026; May 1st is a Friday
const day = (name: string) => screen.getByRole("button", { name });

describe("Calendar", () => {
  it("renders the month grid with localized headers, starting on Monday by default", () => {
    render(<Calendar defaultViewDate={view} />);
    expect(screen.getByRole("grid", { name: "May 2026" })).toBeInTheDocument();
    // Weekday headers are aria-hidden (day buttons carry the full date); check their labels anyway.
    expect(document.querySelector("th")).toHaveAttribute("aria-label", "Monday");
    expect(day("Friday, May 1, 2026")).toBeInTheDocument();
  });

  it("respects weekStartsOn and the locale", () => {
    render(
      <LocaleProvider value="de">
        <Calendar defaultViewDate={view} weekStartsOn={0} />
      </LocaleProvider>,
    );
    expect(document.querySelector("th")).toHaveAttribute("aria-label", "Sonntag");
    expect(screen.getByRole("grid", { name: "Mai 2026" })).toBeInTheDocument();
  });

  it("selects a day (uncontrolled) and marks it selected", async () => {
    const onChange = vi.fn();
    render(<Calendar defaultViewDate={view} onChange={onChange} />);
    await userEvent.click(day("Wednesday, May 13, 2026"));
    expect(onChange).toHaveBeenCalledWith(new Date(2026, 4, 13));
    expect(day("Wednesday, May 13, 2026").closest("td")).toHaveAttribute("aria-selected", "true");
  });

  it("is controlled", async () => {
    function Controlled() {
      const [value, setValue] = React.useState<Date | null>(new Date(2026, 4, 2));
      return (
        <>
          <Calendar value={value} onChange={setValue} />
          <output>{value?.getDate()}</output>
        </>
      );
    }
    render(<Controlled />);
    await userEvent.click(day("Thursday, May 7, 2026"));
    expect(screen.getByRole("status")).toHaveTextContent("7");
  });

  it("navigates with the keyboard, crossing month boundaries", async () => {
    render(<Calendar defaultValue={new Date(2026, 4, 1)} />);
    day("Friday, May 1, 2026").focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(day("Thursday, April 30, 2026")).toHaveFocus();
    expect(screen.getByRole("grid", { name: "April 2026" })).toBeInTheDocument();
    await userEvent.keyboard("{PageDown}");
    expect(day("Saturday, May 30, 2026")).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(day("Saturday, May 30, 2026").closest("td")).toHaveAttribute("aria-selected", "true");
  });

  it("disables dates via min/max, shouldDisableDate and moves months with the header", async () => {
    const onChange = vi.fn();
    render(
      <Calendar
        defaultViewDate={view}
        onChange={onChange}
        minDateTime={new Date(2026, 4, 5)}
        maxDateTime={new Date(2026, 5, 20)}
        shouldDisableDate={(d) => d.getDate() === 13}
      />,
    );
    expect(day("Monday, May 4, 2026")).toBeDisabled();
    expect(day("Wednesday, May 13, 2026")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous month" })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("grid", { name: "June 2026" })).toBeInTheDocument();
    expect(day("Sunday, June 21, 2026")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
  });

  it("changes the time and keeps the date", async () => {
    const onChange = vi.fn();
    const onDone = vi.fn();
    render(
      <Calendar
        enableTime
        defaultValue={new Date(2026, 4, 3, 10, 30)}
        onChange={onChange}
        onDoneButtonClick={onDone}
        minDateTime={new Date(2026, 4, 3, 9, 15)}
      />,
    );
    await userEvent.selectOptions(screen.getByRole("combobox", { name: "Hours" }), "14");
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 4, 3, 14, 30));
    const hours = screen.getByRole("combobox", { name: "Hours" });
    expect(within(hours).getByRole("option", { name: "08" })).toBeDisabled();
    expect(within(hours).getByRole("option", { name: "09" })).toBeEnabled();
    await userEvent.click(day("Monday, May 4, 2026"));
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 4, 4, 14, 30));
    await userEvent.click(screen.getByRole("button", { name: "Done" }));
    expect(onDone).toHaveBeenCalled();
  });

  it("marks today, shows neighbouring days and renders custom content", () => {
    const today = new Date();
    render(<Calendar showNeighboringMonth renderDayContent={(d) => <span data-testid="c">{d.getDate()}</span>} />);
    expect(document.querySelector("[aria-current='date']")).toHaveTextContent(String(today.getDate()));
    expect(screen.getAllByTestId("c").length).toBeGreaterThanOrEqual(35);
  });

  it("is accessible", async () => {
    const { container } = render(<Calendar defaultValue={new Date(2026, 4, 3)} enableTime />);
    await expectNoA11yViolations(container);
  });
});

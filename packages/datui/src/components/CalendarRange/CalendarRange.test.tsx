import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { CalendarRange, type CalendarRangeValue } from "./CalendarRange";

const view = new Date(2026, 4, 1);
const day = (name: string) => screen.getByRole("button", { name });

describe("CalendarRange", () => {
  it("selects a range with two clicks", async () => {
    const onChange = vi.fn();
    render(<CalendarRange defaultViewDate={view} onChange={onChange} numberOfMonths={1} />);
    await userEvent.click(day("Monday, May 4, 2026"));
    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 4, 4), null]);
    await userEvent.click(day("Friday, May 8, 2026"));
    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 4, 4), new Date(2026, 4, 8)]);
    expect(day("Wednesday, May 6, 2026").closest("td")).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("status")).toHaveTextContent("May 4, 2026 – Friday, May 8, 2026");
    await userEvent.click(day("Monday, May 11, 2026"));
    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 4, 11), null]);
  });

  it("swaps when the second click is earlier", async () => {
    const onChange = vi.fn();
    render(<CalendarRange defaultViewDate={view} onChange={onChange} numberOfMonths={1} />);
    await userEvent.click(day("Friday, May 8, 2026"));
    await userEvent.click(day("Monday, May 4, 2026"));
    expect(onChange).toHaveBeenLastCalledWith([new Date(2026, 4, 4), new Date(2026, 4, 8)]);
  });

  it("previews the pending range on hover", async () => {
    render(<CalendarRange defaultViewDate={view} numberOfMonths={1} defaultValue={[new Date(2026, 4, 4), null]} />);
    await userEvent.hover(day("Thursday, May 7, 2026"));
    expect(day("Wednesday, May 6, 2026").closest("td")).toHaveClass("bg-accent");
    expect(day("Monday, May 4, 2026").closest("td")).toHaveClass("rounded-s-md");
    await userEvent.unhover(day("Thursday, May 7, 2026"));
    expect(day("Wednesday, May 6, 2026").closest("td")).not.toHaveClass("bg-accent");
  });

  it("keeps disabled dates unselectable", () => {
    render(<CalendarRange defaultViewDate={view} numberOfMonths={1} shouldDisableDate={(d) => d.getDay() === 0} />);
    expect(day("Sunday, May 10, 2026")).toBeDisabled();
  });

  it("shows two months on regular width and one on compact, sharing navigation", async () => {
    const { rerender } = render(
      <AdaptivityProvider sizeX="regular">
        <CalendarRange defaultViewDate={view} />
      </AdaptivityProvider>,
    );
    expect(screen.getAllByRole("grid")).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "Next month" })).toHaveLength(1);
    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("grid", { name: "June 2026" })).toBeInTheDocument();
    expect(screen.getByRole("grid", { name: "July 2026" })).toBeInTheDocument();
    rerender(
      <AdaptivityProvider sizeX="compact">
        <CalendarRange defaultViewDate={view} />
      </AdaptivityProvider>,
    );
    expect(screen.getAllByRole("grid")).toHaveLength(1);
  });

  it("is controlled", async () => {
    function Controlled() {
      const [value, setValue] = React.useState<CalendarRangeValue | null>(null);
      return (
        <>
          <CalendarRange defaultViewDate={view} numberOfMonths={1} value={value} onChange={setValue} />
          <output data-testid="out">{value?.map((d) => d?.getDate() ?? "-").join(",")}</output>
        </>
      );
    }
    render(<Controlled />);
    await userEvent.click(day("Monday, May 4, 2026"));
    expect(screen.getByTestId("out")).toHaveTextContent("4,-");
  });

  it("is accessible", async () => {
    const { container } = render(
      <CalendarRange defaultViewDate={view} defaultValue={[new Date(2026, 4, 4), new Date(2026, 4, 8)]} />,
    );
    await expectNoA11yViolations(container);
  });
});

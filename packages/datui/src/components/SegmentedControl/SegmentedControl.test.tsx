import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { DirectionProvider } from "../DirectionProvider/DirectionProvider";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: 30, label: "Month" },
];

describe("SegmentedControl", () => {
  it("defaults to the first option and positions the indicator", () => {
    const { container } = render(<SegmentedControl aria-label="Range" options={options} />);
    expect(screen.getByRole("radio", { name: "Day" })).toBeChecked();
    const indicator = container.querySelector("[aria-hidden]") as HTMLElement;
    expect(indicator.style.insetInlineStart).toContain("* 0 / 3");
  });

  it("arrow keys move the selection (uncontrolled) and keep original value types", async () => {
    const onChange = vi.fn();
    render(<SegmentedControl aria-label="Range" options={options} defaultValue="week" onChange={onChange} />);
    await userEvent.tab();
    expect(screen.getByRole("radio", { name: "Week" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight>}");
    expect(screen.getByRole("radio", { name: "Month" })).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(30);
  });

  it("works controlled and skips disabled options", async () => {
    function Controlled() {
      const [v, setV] = React.useState<string | number>("day");
      return (
        <SegmentedControl
          aria-label="Range"
          size="m"
          value={v}
          onChange={setV}
          options={[
            { value: "day", label: "Day" },
            { value: "week", label: "Week", disabled: true },
            { value: 30, label: "Month" },
          ]}
        />
      );
    }
    render(<Controlled />);
    await userEvent.click(screen.getByRole("radio", { name: "Month" }));
    expect(screen.getByRole("radio", { name: "Month" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Week" })).toBeDisabled();
    expect(screen.getByRole("radiogroup")).toHaveClass("h-control-m");
  });

  it("arrow keys follow RTL direction", async () => {
    render(
      <DirectionProvider value="rtl">
        <SegmentedControl aria-label="Range" options={options} />
      </DirectionProvider>,
    );
    await userEvent.tab();
    await userEvent.keyboard("{ArrowLeft>}");
    expect(screen.getByRole("radio", { name: "Week" })).toBeChecked();
  });

  it("is accessible", async () => {
    const { container } = render(<SegmentedControl aria-label="Range" options={options} />);
    await expectNoA11yViolations(container);
  });
});

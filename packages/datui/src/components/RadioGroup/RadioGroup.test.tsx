import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Radio } from "../Radio/Radio";
import { RadioGroup } from "./RadioGroup";

const options = (
  <>
    <Radio value="a">Alpha</Radio>
    <Radio value="b">Beta</Radio>
    <Radio value="c">Gamma</Radio>
  </>
);

describe("RadioGroup", () => {
  it("works uncontrolled and moves selection with arrow keys", async () => {
    render(
      <RadioGroup aria-label="Letters" defaultValue="a">
        {options}
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup", { name: "Letters" })).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.getByRole("radio", { name: "Alpha" })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown>}");
    expect(screen.getByRole("radio", { name: "Beta" })).toHaveFocus();
    expect(screen.getByRole("radio", { name: "Beta" })).toBeChecked();
  });

  it("works controlled", async () => {
    const onValueChange = vi.fn();
    function Controlled() {
      const [v, setV] = React.useState("b");
      return (
        <RadioGroup
          aria-label="Letters"
          value={v}
          onValueChange={(next) => {
            onValueChange(next);
            setV(next);
          }}
        >
          {options}
        </RadioGroup>
      );
    }
    render(<Controlled />);
    expect(screen.getByRole("radio", { name: "Beta" })).toBeChecked();
    await userEvent.click(screen.getByText("Gamma"));
    expect(onValueChange).toHaveBeenCalledWith("c");
    expect(screen.getByRole("radio", { name: "Gamma" })).toBeChecked();
  });

  it("applies the layout mode", () => {
    render(
      <RadioGroup aria-label="L" mode="horizontal">
        {options}
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toHaveClass("flex-row");
    expect(screen.getByRole("radiogroup")).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("is accessible", async () => {
    const { container } = render(
      <RadioGroup aria-label="Letters" defaultValue="a">
        {options}
      </RadioGroup>,
    );
    await expectNoA11yViolations(container);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { RadioGroup } from "../RadioGroup/RadioGroup";
import { Radio, RadioInput } from "./Radio";

describe("Radio", () => {
  it("selects on row click and links the description", async () => {
    render(
      <RadioGroup aria-label="Plan">
        <Radio value="free" description="Up to 3 projects">
          Free
        </Radio>
        <Radio value="pro">Pro</Radio>
      </RadioGroup>,
    );
    const free = screen.getByRole("radio", { name: "Free" });
    expect(free).toHaveAccessibleDescription("Up to 3 projects");
    await userEvent.click(screen.getByText("Up to 3 projects"));
    expect(free).toBeChecked();
  });

  it("skips disabled options with arrow keys", async () => {
    render(
      <RadioGroup aria-label="Plan" defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio value="b" disabled>
          B
        </Radio>
        <Radio value="c">C</Radio>
      </RadioGroup>,
    );
    await userEvent.tab();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "C" })).toHaveFocus();
    expect(screen.getByRole("radio", { name: "B" })).toBeDisabled();
  });

  it("RadioInput renders a bare circle with a checked indicator", async () => {
    render(
      <RadioGroup aria-label="Size">
        <RadioInput value="s" aria-label="Small" />
      </RadioGroup>,
    );
    const radio = screen.getByRole("radio", { name: "Small" });
    await userEvent.click(radio);
    expect(radio).toHaveAttribute("data-state", "checked");
    expect(radio.firstElementChild).toHaveClass("bg-primary");
  });

  it("is accessible", async () => {
    const { container } = render(
      <RadioGroup aria-label="Plan" defaultValue="a">
        <Radio value="a" description="d">
          A
        </Radio>
        <RadioInput value="b" aria-label="B" />
      </RadioGroup>,
    );
    await expectNoA11yViolations(container);
  });
});

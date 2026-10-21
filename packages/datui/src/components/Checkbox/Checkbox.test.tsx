import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Checkbox, CheckboxInput } from "./Checkbox";

describe("Checkbox", () => {
  it("toggles by clicking the row and with Space", async () => {
    const onCheckedChange = vi.fn();
    render(
      <Checkbox onCheckedChange={onCheckedChange} description="Weekly digest">
        Subscribe
      </Checkbox>,
    );
    const box = screen.getByRole("checkbox", { name: "Subscribe" });
    expect(box).toHaveAccessibleDescription("Weekly digest");
    await userEvent.click(screen.getByText("Subscribe"));
    expect(box).toBeChecked();
    box.focus();
    await userEvent.keyboard(" ");
    expect(box).not.toBeChecked();
    expect(onCheckedChange.mock.calls).toEqual([[true], [false]]);
  });

  it("supports indeterminate uncontrolled", async () => {
    render(<Checkbox defaultIndeterminate>All</Checkbox>);
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("aria-checked", "mixed");
    await userEvent.click(box);
    expect(box).toHaveAttribute("aria-checked", "true");
  });

  it("supports indeterminate controlled", async () => {
    function Controlled() {
      const [mixed, setMixed] = React.useState(true);
      const [checked, setChecked] = React.useState(false);
      return (
        <Checkbox
          indeterminate={mixed}
          checked={checked}
          onCheckedChange={(c) => {
            setMixed(false);
            setChecked(c === true);
          }}
        >
          All
        </Checkbox>
      );
    }
    render(<Controlled />);
    const box = screen.getByRole("checkbox");
    expect(box).toHaveAttribute("aria-checked", "mixed");
    await userEvent.click(box);
    expect(box).toHaveAttribute("aria-checked", "true");
  });

  it("readOnly blocks changes; disabled too", async () => {
    render(
      <>
        <Checkbox readOnly defaultChecked>
          Locked
        </Checkbox>
        <Checkbox disabled>Off</Checkbox>
      </>,
    );
    await userEvent.click(screen.getByRole("checkbox", { name: "Locked" }));
    expect(screen.getByRole("checkbox", { name: "Locked" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Off" })).toBeDisabled();
  });

  it("CheckboxInput renders a bare box with an accessible name", async () => {
    render(<CheckboxInput aria-label="Select row" />);
    const box = screen.getByRole("checkbox", { name: "Select row" });
    await userEvent.click(box);
    expect(box).toBeChecked();
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <Checkbox description="d" titleAfter={<span>new</span>}>
          A
        </Checkbox>
        <Checkbox defaultIndeterminate>B</Checkbox>
        <CheckboxInput aria-label="C" />
      </>,
    );
    await expectNoA11yViolations(container);
  });
});

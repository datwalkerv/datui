import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("toggles uncontrolled with click, Space and Enter", async () => {
    render(<Switch aria-label="Wi-Fi" />);
    const sw = screen.getByRole("switch", { name: "Wi-Fi" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
    await userEvent.keyboard(" ");
    expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.keyboard("{Enter}");
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("works controlled", async () => {
    const spy = vi.fn();
    function Controlled() {
      const [on, setOn] = React.useState(true);
      return (
        <Switch
          aria-label="Sync"
          checked={on}
          onCheckedChange={(v) => {
            spy(v);
            setOn(v);
          }}
        />
      );
    }
    render(<Controlled />);
    await userEvent.click(screen.getByRole("switch"));
    expect(spy).toHaveBeenCalledWith(false);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "false");
  });

  it("readOnly and disabled block toggling", async () => {
    const spy = vi.fn();
    render(
      <>
        <Switch aria-label="RO" readOnly defaultChecked onCheckedChange={spy} />
        <Switch aria-label="Off" disabled />
      </>,
    );
    await userEvent.click(screen.getByRole("switch", { name: "RO" }));
    expect(screen.getByRole("switch", { name: "RO" })).toHaveAttribute("aria-checked", "true");
    expect(spy).not.toHaveBeenCalled();
    expect(screen.getByRole("switch", { name: "Off" })).toBeDisabled();
  });

  it("is accessible", async () => {
    const { container } = render(<Switch aria-label="Wi-Fi" defaultChecked />);
    await expectNoA11yViolations(container);
  });
});

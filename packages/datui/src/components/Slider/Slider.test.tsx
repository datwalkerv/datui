import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("steps with the keyboard and snaps to step", async () => {
    const onChange = vi.fn();
    render(<Slider defaultValue={20} step={5} onChange={onChange} getAriaLabel={() => "Volume"} />);
    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(thumb).toHaveAttribute("aria-valuenow", "20");
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(thumb).toHaveAttribute("aria-valuenow", "25");
    await userEvent.keyboard("{End}");
    expect(thumb).toHaveAttribute("aria-valuenow", "100");
    await userEvent.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it("range mode has two labelled thumbs that cannot cross", async () => {
    const onChange = vi.fn();
    render(
      <Slider
        multiple
        defaultValue={[10, 11]}
        onChange={onChange}
        getAriaLabel={(i) => (i === 0 ? "From" : "To")}
        getAriaValueText={(v) => `${v} €`}
      />,
    );
    const from = screen.getByRole("slider", { name: "From" });
    const to = screen.getByRole("slider", { name: "To" });
    expect(to).toHaveAttribute("aria-valuetext", "11 €");
    from.focus();
    await userEvent.keyboard("{ArrowRight}{ArrowRight}");
    expect(Number(from.getAttribute("aria-valuenow"))).toBeLessThanOrEqual(Number(to.getAttribute("aria-valuenow")));
    expect(onChange.mock.lastCall?.[0]).toHaveLength(2);
  });

  it("works controlled", async () => {
    function Controlled() {
      const [v, setV] = React.useState<number | [number, number]>(50);
      return (
        <>
          <Slider value={v} onChange={setV} getAriaLabel={() => "Level"} />
          <output>{String(v)}</output>
        </>
      );
    }
    render(<Controlled />);
    screen.getByRole("slider").focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(screen.getByRole("status")).toHaveTextContent("49");
  });

  it("renders a tooltip and size classes; disabled blocks keys", async () => {
    render(<Slider defaultValue={5} withTooltip size="s" disabled getAriaLabel={() => "S"} />);
    const thumb = screen.getByRole("slider");
    expect(thumb).toHaveClass("size-3");
    expect(thumb).toHaveTextContent("5");
    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(thumb).toHaveAttribute("aria-valuenow", "5");
  });

  it("is accessible", async () => {
    const { container } = render(<Slider multiple getAriaLabel={(i) => `Thumb ${i + 1}`} />);
    await expectNoA11yViolations(container);
  });
});

it("Slider forwards aria-label and aria-labelledby to the thumb", () => {
  render(
    <>
      <Slider aria-label="Volume" defaultValue={10} />
      <span id="lbl">Brightness</span>
      <Slider aria-labelledby="lbl" defaultValue={10} />
    </>,
  );
  expect(screen.getByRole("slider", { name: "Volume" })).toBeInTheDocument();
  expect(screen.getByRole("slider", { name: "Brightness" })).toBeInTheDocument();
});

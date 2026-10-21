import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import type { ChipOption } from "../ChipsInput/ChipsInput";
import { ChipsSelect } from "./ChipsSelect";

const options: ChipOption[] = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue", disabled: true },
  { value: "black", label: "Black" },
];
const chips = () => screen.queryAllByRole("listitem").map((li) => li.textContent);
const combobox = () => screen.getByRole("combobox");

describe("ChipsSelect", () => {
  it("opens with the keyboard and adds the highlighted option", async () => {
    const onChange = vi.fn();
    render(<ChipsSelect aria-label="Colors" options={options} onChange={onChange} />);
    combobox().focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(combobox()).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onChange).toHaveBeenLastCalledWith([{ value: "green", label: "Green" }]);
    expect(chips()).toEqual(["Green"]);
    expect(combobox()).toHaveAttribute("aria-expanded", "false");
    await userEvent.keyboard("{ArrowDown}{Escape}");
    expect(combobox()).toHaveAttribute("aria-expanded", "false");
  });

  it("filters while typing and ignores free text without creatable", async () => {
    render(<ChipsSelect aria-label="Colors" options={options} />);
    await userEvent.type(combobox(), "bl");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Blue", "Black"]);
    await userEvent.type(combobox(), "xyz{Enter}");
    expect(chips()).toEqual([]);
    expect(screen.getByRole("status")).toHaveTextContent("Nothing found");
  });

  it("creates new chips when creatable", async () => {
    render(<ChipsSelect aria-label="Colors" options={options} creatable="Add" />);
    await userEvent.type(combobox(), "Purple");
    expect(screen.getByRole("option", { name: "Add “Purple”" })).toBeInTheDocument();
    await userEvent.keyboard("{Enter}");
    expect(chips()).toEqual(["Purple"]);
    expect(combobox()).toHaveValue("");
  });

  it("highlights selected options and toggles them off, or hides them", async () => {
    const { unmount } = render(
      <ChipsSelect aria-label="Colors" options={options} defaultValue={[options[0] as ChipOption]} />,
    );
    await userEvent.click(combobox());
    expect(screen.getByRole("option", { name: "Red" })).toHaveAttribute("aria-selected", "true");
    await userEvent.click(screen.getByRole("option", { name: "Red" }));
    expect(chips()).toEqual([]);
    unmount();
    render(
      <ChipsSelect
        aria-label="Colors"
        options={options}
        defaultValue={[options[0] as ChipOption]}
        selectedBehavior="hide"
      />,
    );
    await userEvent.click(combobox());
    expect(screen.queryByRole("option", { name: "Red" })).not.toBeInTheDocument();
  });

  it("stays open with closeAfterSelect=false and supports custom filter", async () => {
    render(
      <ChipsSelect
        aria-label="Colors"
        options={options}
        closeAfterSelect={false}
        filterFn={(q, o) => o.label.toLowerCase().startsWith(q.toLowerCase())}
      />,
    );
    await userEvent.type(combobox(), "r");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Red"]);
    await userEvent.keyboard("{Enter}");
    expect(chips()).toEqual(["Red"]);
    expect(combobox()).toHaveAttribute("aria-expanded", "true");
  });

  it("lets onChangeStart cancel a change", async () => {
    const onChange = vi.fn();
    render(
      <ChipsSelect
        aria-label="Colors"
        options={options}
        onChange={onChange}
        onChangeStart={(e, o) => {
          if (o.value === "red") e.preventDefault();
        }}
      />,
    );
    await userEvent.click(combobox());
    await userEvent.click(screen.getByRole("option", { name: "Red" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("works controlled and removes chips with Backspace", async () => {
    function Controlled() {
      const [value, setValue] = React.useState<ChipOption[]>([{ value: "red", label: "Red" }]);
      return <ChipsSelect aria-label="Colors" options={options} value={value} onChange={setValue} />;
    }
    render(<Controlled />);
    combobox().focus();
    await userEvent.keyboard("{Backspace}");
    expect(chips()).toEqual([]);
  });

  it("does not open when disabled and shows fetching", async () => {
    const { rerender } = render(<ChipsSelect aria-label="Colors" options={options} disabled />);
    await userEvent.click(combobox());
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    rerender(<ChipsSelect aria-label="Colors" options={[]} fetching fetchingLabel="Loading colors" />);
    await userEvent.click(combobox());
    expect(screen.getByText("Loading colors")).toBeInTheDocument();
  });

  it("is accessible when open", async () => {
    const { baseElement } = render(
      <ChipsSelect aria-label="Colors" options={options} defaultValue={[options[0] as ChipOption]} />,
    );
    await userEvent.click(combobox());
    await expectNoA11yViolations(baseElement);
  });
});

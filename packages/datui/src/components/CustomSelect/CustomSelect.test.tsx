import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { CustomSelectOption } from "../CustomSelectOption/CustomSelectOption";
import { FormItem } from "../FormItem/FormItem";
import { CustomSelect, type CustomSelectOptionData } from "./CustomSelect";

const options: CustomSelectOptionData[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana", disabled: true },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
];

const combobox = () => screen.getByRole("combobox");

describe("CustomSelect", () => {
  it("shows the placeholder and opens on click", async () => {
    render(<CustomSelect aria-label="Fruit" options={options} placeholder="Pick a fruit" />);
    expect(combobox()).toHaveAttribute("placeholder", "Pick a fruit");
    expect(combobox()).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(combobox());
    expect(combobox()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("option")).toHaveLength(4);
    expect(screen.getByRole("option", { name: "Banana" })).toHaveAttribute("aria-disabled", "true");
  });

  it("selects with the mouse (uncontrolled) and shows a check", async () => {
    const onChange = vi.fn();
    render(<CustomSelect aria-label="Fruit" options={options} onChange={onChange} />);
    await userEvent.click(combobox());
    await userEvent.click(screen.getByRole("option", { name: "Cherry" }));
    expect(onChange.mock.calls[0]?.[1]).toBe("cherry");
    expect(combobox()).toHaveValue("Cherry");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    await userEvent.click(combobox());
    expect(screen.getByRole("option", { name: "Cherry" })).toHaveAttribute("aria-selected", "true");
  });

  it("ignores clicks on disabled options", async () => {
    const onChange = vi.fn();
    render(<CustomSelect aria-label="Fruit" options={options} onChange={onChange} />);
    await userEvent.click(combobox());
    await userEvent.click(screen.getByRole("option", { name: "Banana" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("supports the full keyboard flow, skipping disabled options", async () => {
    const onChange = vi.fn();
    render(<CustomSelect aria-label="Fruit" options={options} onChange={onChange} />);
    combobox().focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(combobox()).toHaveAttribute("aria-expanded", "true");
    const active = () => document.getElementById(combobox().getAttribute("aria-activedescendant") ?? "");
    expect(active()).toHaveTextContent("Apple");
    await userEvent.keyboard("{ArrowDown}");
    expect(active()).toHaveTextContent("Cherry");
    await userEvent.keyboard("{End}");
    expect(active()).toHaveTextContent("Date");
    await userEvent.keyboard("{Home}");
    expect(active()).toHaveTextContent("Apple");
    await userEvent.keyboard("{ArrowUp}");
    expect(active()).toHaveTextContent("Apple");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    expect(onChange.mock.calls[0]?.[1]).toBe("cherry");
    expect(combobox()).toHaveAttribute("aria-expanded", "false");
    await userEvent.keyboard(" ");
    expect(combobox()).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{Escape}");
    expect(combobox()).toHaveAttribute("aria-expanded", "false");
    expect(combobox()).toHaveFocus();
  });

  it("type-ahead highlights a matching option", async () => {
    render(<CustomSelect aria-label="Fruit" options={options} />);
    combobox().focus();
    await userEvent.keyboard("d");
    expect(combobox()).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(combobox().getAttribute("aria-activedescendant") ?? "")).toHaveTextContent("Date");
  });

  it("closes on outside click", async () => {
    render(
      <>
        <CustomSelect aria-label="Fruit" options={options} />
        <button type="button">Elsewhere</button>
      </>,
    );
    await userEvent.click(combobox());
    await userEvent.click(screen.getByRole("button", { name: "Elsewhere" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("filters when searchable, with default, custom and disabled filtering", async () => {
    const onInputChange = vi.fn();
    const { rerender } = render(
      <CustomSelect aria-label="Fruit" options={options} searchable onInputChange={onInputChange} />,
    );
    await userEvent.type(combobox(), "err");
    expect(onInputChange).toHaveBeenLastCalledWith(expect.anything(), "err");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Cherry"]);
    await userEvent.keyboard("{Enter}");
    expect(combobox()).toHaveValue("Cherry");

    rerender(
      <CustomSelect aria-label="Fruit" options={options} searchable filterFn={(q, o) => o.label.startsWith(q)} />,
    );
    await userEvent.clear(combobox());
    await userEvent.type(combobox(), "D");
    expect(screen.getAllByRole("option").map((o) => o.textContent)).toEqual(["Date"]);

    rerender(<CustomSelect aria-label="Fruit" options={options} searchable filterFn={false} />);
    await userEvent.type(combobox(), "zzz");
    expect(screen.getAllByRole("option")).toHaveLength(4);
  });

  it("shows and announces the empty text", async () => {
    render(<CustomSelect aria-label="Fruit" options={options} searchable emptyText="No fruit" />);
    await userEvent.type(combobox(), "xyz");
    expect(screen.getByRole("status")).toHaveTextContent("No fruit");
    expect(screen.queryByRole("option")).not.toBeInTheDocument();
  });

  it("shows a spinner while fetching", async () => {
    render(<CustomSelect aria-label="Fruit" options={[]} fetching fetchingLabel="Loading fruit" />);
    expect(combobox()).toHaveAttribute("aria-busy", "true");
    await userEvent.click(combobox());
    expect(screen.getByText("Loading fruit")).toBeInTheDocument();
  });

  it("clears the value with the clear button and refocuses", async () => {
    const onChange = vi.fn();
    render(
      <CustomSelect aria-label="Fruit" options={options} defaultValue="apple" allowClearButton onChange={onChange} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), null);
    expect(combobox()).toHaveValue("");
    expect(combobox()).toHaveFocus();
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  });

  it("is controlled when value is set", async () => {
    function Controlled() {
      const [value, setValue] = React.useState<string | number | null>("apple");
      return <CustomSelect aria-label="Fruit" options={options} value={value} onChange={(_, v) => setValue(v)} />;
    }
    render(<Controlled />);
    expect(combobox()).toHaveValue("Apple");
    await userEvent.click(combobox());
    await userEvent.click(screen.getByRole("option", { name: "Date" }));
    expect(combobox()).toHaveValue("Date");

    const onChange = vi.fn();
    render(<CustomSelect aria-label="Locked" options={options} value="apple" onChange={onChange} />);
    const locked = screen.getByRole("combobox", { name: "Locked" });
    await userEvent.click(locked);
    await userEvent.click(screen.getByRole("option", { name: "Cherry" }));
    expect(onChange).toHaveBeenCalled();
    expect(locked).toHaveValue("Apple");
  });

  it("renders custom options and groups", async () => {
    render(
      <CustomSelect
        aria-label="Fruit"
        options={[
          { value: 1, label: "Red", group: "Warm" },
          { value: 2, label: "Blue", group: "Cold" },
        ]}
        renderOption={(props, option) => <CustomSelectOption {...props} description={`#${option.value}`} />}
      />,
    );
    await userEvent.click(combobox());
    expect(screen.getByRole("group", { name: "Warm" })).toContainElement(screen.getByRole("option", { name: /Red/ }));
    expect(screen.getByText("#2")).toBeInTheDocument();
  });

  it("submits its value through a hidden input", async () => {
    const { container } = render(
      <form>
        <CustomSelect aria-label="Fruit" name="fruit" options={options} defaultValue="date" />
      </form>,
    );
    const form = container.querySelector("form") as HTMLFormElement;
    expect(new FormData(form).get("fruit")).toBe("date");
  });

  it("does not open when disabled or read-only, and reflects error status", async () => {
    render(
      <>
        <CustomSelect aria-label="Disabled" options={options} disabled />
        <CustomSelect aria-label="Readonly" options={options} readOnly status="error" />
      </>,
    );
    await userEvent.click(screen.getByRole("combobox", { name: "Disabled" }));
    await userEvent.click(screen.getByRole("combobox", { name: "Readonly" }));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Readonly" })).toHaveAttribute("aria-invalid", "true");
  });

  it("is wired to FormItem", () => {
    render(
      <FormItem top="Fruit" bottom="Pick one">
        <CustomSelect options={options} />
      </FormItem>,
    );
    expect(screen.getByRole("combobox", { name: "Fruit" })).toHaveAccessibleDescription("Pick one");
  });

  it("is accessible when open", async () => {
    const { baseElement } = render(<CustomSelect aria-label="Fruit" options={options} defaultValue="apple" />);
    await expectNoA11yViolations(baseElement);
    await userEvent.click(combobox());
    await expectNoA11yViolations(baseElement);
  });
});

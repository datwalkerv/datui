import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { Select } from "./Select";

const options = [
  { value: 1, label: "One" },
  { value: 2, label: "Two", disabled: true },
  { value: 3, label: "Three" },
];

describe("Select", () => {
  it("maps options to native options", () => {
    render(<Select aria-label="Number" options={options} placeholder="Pick" />);
    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(screen.getByRole("combobox")).toHaveValue("");
    expect(screen.getByRole("option", { name: "Two" })).toBeDisabled();
  });

  it("keeps the value consistent and reports changes", async () => {
    const onChange = vi.fn();
    render(<Select aria-label="Number" options={options} defaultValue={1} onChange={onChange} />);
    expect(screen.getByRole("combobox")).toHaveValue("1");
    await userEvent.selectOptions(screen.getByRole("combobox"), "3");
    expect(onChange.mock.calls[0]?.[1]).toBe("3");
  });

  it("renders the native select on coarse pointers and CustomSelect with a fine pointer", () => {
    const { rerender } = render(
      <AdaptivityProvider hasPointer={false}>
        <Select aria-label="Number" options={options} defaultValue={3} />
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("combobox").tagName).toBe("SELECT");
    rerender(
      <AdaptivityProvider hasPointer>
        <Select aria-label="Number" options={options} defaultValue={3} />
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("combobox").tagName).toBe("INPUT");
    expect(screen.getByRole("combobox")).toHaveValue("Three");
  });

  it("lets `native` override the pointer detection", () => {
    const { rerender } = render(
      <AdaptivityProvider hasPointer>
        <Select aria-label="Number" options={options} native />
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("combobox").tagName).toBe("SELECT");
    rerender(
      <AdaptivityProvider hasPointer={false}>
        <Select aria-label="Number" options={options} native={false} />
      </AdaptivityProvider>,
    );
    expect(screen.getByRole("combobox").tagName).toBe("INPUT");
  });

  it("reports string values from the custom implementation too", async () => {
    const onChange = vi.fn();
    render(<Select aria-label="Number" options={options} native={false} onChange={onChange} allowClearButton />);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByRole("option", { name: "Three" }));
    expect(onChange.mock.calls[0]?.[1]).toBe("3");
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(onChange.mock.calls[1]?.[1]).toBe("");
  });

  it("is accessible", async () => {
    const { container } = render(<Select aria-label="Number" options={options} />);
    await expectNoA11yViolations(container);
  });
});

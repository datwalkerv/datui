import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { FormItem } from "../FormItem/FormItem";
import { type ChipOption, ChipsInput } from "./ChipsInput";

const chipLabels = () => screen.queryAllByRole("listitem").map((li) => li.textContent);

describe("ChipsInput", () => {
  it("adds chips with Enter and the delimiter, ignoring duplicates", async () => {
    const onChange = vi.fn();
    render(<ChipsInput aria-label="Tags" onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "red{Enter}green,blue");
    expect(chipLabels()).toEqual(["red", "green"]);
    expect(input).toHaveValue("blue");
    await userEvent.type(input, "{Enter}red{Enter}");
    expect(chipLabels()).toEqual(["red", "green", "blue"]);
    expect(onChange).toHaveBeenLastCalledWith([
      { value: "red", label: "red" },
      { value: "green", label: "green" },
      { value: "blue", label: "blue" },
    ]);
  });

  it("splits pasted text with regex and array delimiters", async () => {
    const { rerender } = render(<ChipsInput aria-label="Tags" delimiter={/[;\s]/} />);
    screen.getByRole("textbox").focus();
    await userEvent.paste("a;b c;");
    expect(chipLabels()).toEqual(["a", "b", "c"]);
    rerender(<ChipsInput aria-label="Tags" delimiter={["|", "/"]} />);
    await userEvent.paste("d|e/");
    expect(chipLabels()).toEqual(["a", "b", "c", "d", "e"]);
  });

  it("removes the last chip with Backspace and any chip with its button", async () => {
    render(
      <ChipsInput
        aria-label="Tags"
        defaultValue={[
          { value: 1, label: "one" },
          { value: 2, label: "two" },
          { value: 3, label: "three" },
        ]}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Remove one" }));
    expect(chipLabels()).toEqual(["two", "three"]);
    expect(screen.getByRole("textbox")).toHaveFocus();
    await userEvent.keyboard("{Backspace}");
    expect(chipLabels()).toEqual(["two"]);
  });

  it("adds on blur when asked and clears everything with the clear button", async () => {
    render(<ChipsInput aria-label="Tags" addOnBlur allowClearButton />);
    await userEvent.type(screen.getByRole("textbox"), "draft");
    await userEvent.tab();
    expect(chipLabels()).toEqual(["draft"]);
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(chipLabels()).toEqual([]);
  });

  it("works controlled, including inputValue", async () => {
    function Controlled() {
      const [value, setValue] = React.useState<ChipOption[]>([{ value: "x", label: "x" }]);
      const [text, setText] = React.useState("");
      return (
        <>
          <ChipsInput aria-label="Tags" value={value} onChange={setValue} inputValue={text} onInputChange={setText} />
          <output>{text}</output>
        </>
      );
    }
    render(<Controlled />);
    await userEvent.type(screen.getByRole("textbox"), "yz");
    expect(screen.getByRole("status")).toHaveTextContent("yz");
    await userEvent.keyboard("{Enter}");
    expect(chipLabels()).toEqual(["x", "yz"]);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("blocks edits while disabled or read-only", async () => {
    render(
      <>
        <ChipsInput aria-label="Disabled" disabled defaultValue={[{ value: "a", label: "a" }]} />
        <ChipsInput aria-label="Readonly" readOnly status="error" defaultValue={[{ value: "b", label: "b" }]} />
      </>,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    const ro = screen.getByRole("textbox", { name: "Readonly" });
    expect(ro).toHaveAttribute("aria-invalid", "true");
    ro.focus();
    await userEvent.keyboard("{Backspace}");
    expect(chipLabels()).toEqual(["a", "b"]);
  });

  it("is wired to FormItem and accessible", async () => {
    const { container } = render(
      <FormItem top="Tags">
        <ChipsInput defaultValue={[{ value: "a", label: "alpha" }]} placeholder="Add a tag" />
      </FormItem>,
    );
    expect(screen.getByRole("textbox", { name: "Tags" })).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Selected" })).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });
});

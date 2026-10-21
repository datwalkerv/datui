import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Input } from "./Input";

describe("Input", () => {
  it("forwards ref to the input", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Name" />);
    expect(ref.current).toBe(screen.getByRole("textbox"));
  });

  it("works uncontrolled with native onChange", async () => {
    const onChange = vi.fn();
    render(<Input aria-label="Name" defaultValue="a" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "b");
    expect(screen.getByRole("textbox")).toHaveValue("ab");
    expect(onChange.mock.calls[0]?.[0].target.value).toBe("ab");
  });

  it("works controlled", async () => {
    function Controlled() {
      const [v, setV] = React.useState("");
      return <Input aria-label="Name" value={v} onChange={(e) => setV(e.target.value.toUpperCase())} />;
    }
    render(<Controlled />);
    await userEvent.type(screen.getByRole("textbox"), "ab");
    expect(screen.getByRole("textbox")).toHaveValue("AB");
  });

  it("sets aria-invalid from status and passes status to the shell", () => {
    render(<Input aria-label="Name" status="error" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("textbox").parentElement).toHaveAttribute("data-status", "error");
  });

  it("merges className and slotProps.root onto the shell; align on the input", () => {
    render(
      <Input aria-label="Name" className="w-40" align="right" slotProps={{ root: { className: "mt-2", id: "r" } }} />,
    );
    const root = screen.getByRole("textbox").parentElement;
    expect(root).toHaveClass("w-40", "mt-2");
    expect(root).toHaveAttribute("id", "r");
    expect(screen.getByRole("textbox")).toHaveClass("text-end");
  });

  it("disabled and readOnly are native", async () => {
    render(
      <>
        <Input aria-label="A" disabled />
        <Input aria-label="B" readOnly defaultValue="x" />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "A" })).toBeDisabled();
    await userEvent.type(screen.getByRole("textbox", { name: "B" }), "y");
    expect(screen.getByRole("textbox", { name: "B" })).toHaveValue("x");
  });

  it("is accessible", async () => {
    const { container } = render(<Input aria-label="Name" before={<span>@</span>} />);
    await expectNoA11yViolations(container);
  });
});

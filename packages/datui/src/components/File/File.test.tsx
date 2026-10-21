import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { File } from "./File";

describe("File", () => {
  it("labels a visually hidden file input and forwards attrs", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<File ref={ref} accept="image/*" multiple variant="secondary" />);
    const input = screen.getByLabelText("Choose file");
    expect(input).toBe(ref.current);
    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveAttribute("accept", "image/*");
    expect(input).toHaveAttribute("multiple");
    expect(input).toHaveClass("sr-only");
    expect(input.parentElement).toHaveClass("bg-secondary");
  });

  it("calls onChange with uploaded files", async () => {
    const onChange = vi.fn();
    render(<File onChange={onChange}>Upload</File>);
    await userEvent.upload(screen.getByLabelText("Upload"), new globalThis.File(["x"], "a.txt"));
    expect(onChange.mock.calls[0]?.[0].target.files[0].name).toBe("a.txt");
  });

  it("is keyboard focusable and clicking the button opens the input", async () => {
    const onClick = vi.fn();
    render(<File onClick={onClick}>Upload</File>);
    await userEvent.tab();
    expect(screen.getByLabelText("Upload")).toHaveFocus();
    await userEvent.click(screen.getByText("Upload"));
    expect(onClick).toHaveBeenCalled();
  });

  it("disabled disables the input", () => {
    render(<File disabled />);
    expect(screen.getByLabelText("Choose file")).toBeDisabled();
  });

  it("is accessible", async () => {
    const { container } = render(<File />);
    await expectNoA11yViolations(container);
  });
});

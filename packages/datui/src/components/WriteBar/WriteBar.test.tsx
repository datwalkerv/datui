import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { WriteBarIcon } from "../WriteBarIcon/WriteBarIcon";
import { WriteBar } from "./WriteBar";

beforeAll(() => {
  Object.defineProperty(HTMLTextAreaElement.prototype, "scrollHeight", {
    configurable: true,
    get() {
      return 20 * (this as HTMLTextAreaElement).value.split("\n").length;
    },
  });
});
afterAll(() => {
  Reflect.deleteProperty(HTMLTextAreaElement.prototype, "scrollHeight");
});

describe("WriteBar", () => {
  it("renders slots and a one-row textarea", () => {
    render(
      <WriteBar
        aria-label="Message"
        before={<WriteBarIcon mode="attach" />}
        inlineAfter={<span>emoji</span>}
        after={<WriteBarIcon mode="send" />}
        shadow
      />,
    );
    expect(screen.getByRole("textbox", { name: "Message" })).toHaveAttribute("rows", "1");
    expect(screen.getByRole("button", { name: "Attach" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    expect(screen.getByText("emoji")).toBeInTheDocument();
  });

  it("grows and reports height changes", async () => {
    const onHeightChange = vi.fn();
    render(<WriteBar aria-label="Message" onHeightChange={onHeightChange} />);
    await userEvent.type(screen.getByRole("textbox"), "a{Shift>}{Enter}{/Shift}b");
    expect(screen.getByRole("textbox").style.height).toBe("40px");
    expect(onHeightChange).toHaveBeenCalled();
  });

  it("works controlled through native onChange", async () => {
    const values: string[] = [];
    render(<WriteBar aria-label="Message" value="" onChange={(e) => values.push(e.target.value)} />);
    await userEvent.type(screen.getByRole("textbox"), "x");
    expect(values).toEqual(["x"]);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("is accessible", async () => {
    const { container } = render(<WriteBar aria-label="Message" after={<WriteBarIcon mode="send" />} />);
    await expectNoA11yViolations(container);
  });
});

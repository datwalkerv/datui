import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { CustomSelectOption } from "./CustomSelectOption";

describe("CustomSelectOption", () => {
  it("exposes option semantics and states", () => {
    render(
      <div role="listbox" aria-label="List">
        <CustomSelectOption selected focused>
          One
        </CustomSelectOption>
        <CustomSelectOption disabled description="Not available">
          Two
        </CustomSelectOption>
      </div>,
    );
    const [one, two] = screen.getAllByRole("option");
    expect(one).toHaveAttribute("aria-selected", "true");
    expect(one).toHaveAttribute("data-focused");
    expect(one?.querySelector("svg")).toBeInTheDocument();
    expect(two).toHaveAttribute("aria-selected", "false");
    expect(two).toHaveAttribute("aria-disabled", "true");
    expect(two).toHaveTextContent("Not available");
  });

  it("indents by hierarchy and lets `after` replace the check", () => {
    render(
      <div role="listbox" aria-label="List">
        <CustomSelectOption hierarchy={2} selected after={<span>custom</span>}>
          Nested
        </CustomSelectOption>
      </div>,
    );
    const option = screen.getByRole("option");
    expect(option.style.paddingInlineStart).toContain("11");
    expect(option.querySelector("svg")).not.toBeInTheDocument();
    expect(screen.getByText("custom")).toBeInTheDocument();
  });

  it("keeps focus where it was on mouse down and reports clicks", async () => {
    const onClick = vi.fn();
    render(
      <>
        <input aria-label="Field" />
        <div role="listbox" aria-label="List">
          <CustomSelectOption onClick={onClick}>One</CustomSelectOption>
        </div>
      </>,
    );
    screen.getByRole("textbox").focus();
    await userEvent.click(screen.getByRole("option"));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("is accessible", async () => {
    const { container } = render(
      <div role="listbox" aria-label="List">
        <CustomSelectOption selected>One</CustomSelectOption>
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});

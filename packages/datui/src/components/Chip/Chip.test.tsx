import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders label, slots and mode classes", () => {
    render(
      <>
        <Chip before={<span>b</span>} after={<span>a</span>}>
          Primary
        </Chip>
        <Chip mode="secondary">Secondary</Chip>
      </>,
    );
    expect(screen.getByText("Primary").parentElement).toHaveClass("bg-secondary");
    expect(screen.getByText("Secondary").parentElement).toHaveClass("border");
    expect(screen.getByText("b")).toBeInTheDocument();
    expect(screen.getByText("a")).toBeInTheDocument();
  });

  it("calls onRemove with its value", async () => {
    const onRemove = vi.fn();
    render(
      <Chip value={7} onRemove={onRemove} removeLabel="Delete">
        Seven
      </Chip>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Delete Seven" }));
    expect(onRemove).toHaveBeenCalledWith(expect.anything(), 7);
  });

  it("hides the remove button when not removable, disabled or read-only", () => {
    render(
      <>
        <Chip removable={false}>A</Chip>
        <Chip disabled>B</Chip>
        <Chip readOnly>C</Chip>
      </>,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByText("B").parentElement).toHaveAttribute("aria-disabled", "true");
  });

  it("is accessible", async () => {
    const { container } = render(<Chip>Tag</Chip>);
    await expectNoA11yViolations(container);
  });
});

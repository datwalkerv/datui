import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { WriteBarIcon } from "./WriteBarIcon";

describe("WriteBarIcon", () => {
  it("has a default label per mode and the accent color for send", () => {
    render(
      <>
        <WriteBarIcon mode="attach" />
        <WriteBarIcon mode="send" />
        <WriteBarIcon mode="done" label="Save" />
      </>,
    );
    expect(screen.getByRole("button", { name: "Attach" })).toHaveClass("text-icon-secondary");
    expect(screen.getByRole("button", { name: "Send" })).toHaveClass("text-primary");
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("shows a count and includes it in the name", () => {
    render(<WriteBarIcon mode="attach" count={3} />);
    expect(screen.getByRole("button", { name: "Attach 3" })).toHaveTextContent("3");
  });

  it("clicks and respects disabled", async () => {
    const onClick = vi.fn();
    render(
      <>
        <WriteBarIcon mode="send" onClick={onClick} />
        <WriteBarIcon mode="attach" disabled onClick={onClick} />
      </>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    await userEvent.click(screen.getByRole("button", { name: "Attach" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("warns when a custom icon has no label", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <WriteBarIcon>
        <svg />
      </WriteBarIcon>,
    );
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("needs `label`"));
    warn.mockRestore();
  });

  it("is accessible", async () => {
    const { container } = render(<WriteBarIcon mode="send" count={2} />);
    await expectNoA11yViolations(container);
  });
});

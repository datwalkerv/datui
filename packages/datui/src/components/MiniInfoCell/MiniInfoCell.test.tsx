import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { MiniInfoCell } from "./MiniInfoCell";

describe("MiniInfoCell", () => {
  it("is static without onClick and a button with it", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<MiniInfoCell>Lives in Paris</MiniInfoCell>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    rerender(
      <MiniInfoCell onClick={onClick} chevron>
        More
      </MiniInfoCell>,
    );
    await userEvent.click(screen.getByRole("button", { name: "More" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("maps modes to colors", () => {
    render(
      <>
        <MiniInfoCell>base</MiniInfoCell>
        <MiniInfoCell mode="add">add</MiniInfoCell>
        <MiniInfoCell mode="more">more</MiniInfoCell>
      </>,
    );
    expect(screen.getByText("base").parentElement).toHaveClass("text-foreground");
    expect(screen.getByText("add").parentElement).toHaveClass("text-link");
    expect(screen.getByText("more").parentElement).toHaveClass("font-medium");
  });

  it("maps textWrap to truncation / line clamp", () => {
    render(
      <>
        <MiniInfoCell>one</MiniInfoCell>
        <MiniInfoCell textWrap="short">short</MiniInfoCell>
        <MiniInfoCell textWrap="full">full</MiniInfoCell>
      </>,
    );
    expect(screen.getByText("one")).toHaveClass("truncate");
    expect(screen.getByText("short")).toHaveClass("line-clamp-3");
    expect(screen.getByText("full")).not.toHaveClass("truncate", "line-clamp-3");
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <MiniInfoCell before={<svg aria-hidden />}>Info</MiniInfoCell>
        <MiniInfoCell onClick={() => {}} mode="more">
          Show more
        </MiniInfoCell>
      </>,
    );
    await expectNoA11yViolations(container);
  });
});

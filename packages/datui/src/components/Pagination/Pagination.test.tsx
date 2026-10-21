import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { getPaginationItems, Pagination } from "./Pagination";

describe("getPaginationItems", () => {
  it("covers small, start, middle and end cases", () => {
    expect(getPaginationItems(1, 1)).toEqual([1]);
    expect(getPaginationItems(2, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationItems(1, 10)).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 10]);
    expect(getPaginationItems(5, 10)).toEqual([1, "start-ellipsis", 4, 5, 6, "end-ellipsis", 10]);
    expect(getPaginationItems(10, 10)).toEqual([1, "start-ellipsis", 6, 7, 8, 9, 10]);
    expect(getPaginationItems(10, 20, 2, 2)).toEqual([
      1,
      2,
      "start-ellipsis",
      8,
      9,
      10,
      11,
      12,
      "end-ellipsis",
      19,
      20,
    ]);
    expect(getPaginationItems(1, 0)).toEqual([]);
  });
});

describe("Pagination", () => {
  it("is a labelled navigation marking the current page", () => {
    render(<Pagination currentPage={3} totalPages={10} />);
    expect(screen.getByRole("navigation", { name: "Pages" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Page 4" })).not.toHaveAttribute("aria-current");
  });

  it("disables prev on the first page and next on the last", () => {
    const { rerender } = render(<Pagination currentPage={1} totalPages={3} />);
    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeEnabled();
    rerender(<Pagination currentPage={3} totalPages={3} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("reports page changes and tracks the page when uncontrolled", async () => {
    const onChange = vi.fn();
    render(<Pagination totalPages={10} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).toHaveBeenLastCalledWith(2, expect.anything());
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
    await userEvent.click(screen.getByRole("button", { name: "Page 10" }));
    expect(onChange).toHaveBeenLastCalledWith(10, expect.anything());
    await userEvent.click(screen.getByRole("button", { name: "Page 10" }));
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("keeps a controlled page and blocks everything when disabled", async () => {
    const onChange = vi.fn();
    const { rerender } = render(<Pagination currentPage={2} totalPages={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onChange).toHaveBeenCalledWith(3, expect.anything());
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
    rerender(<Pagination currentPage={2} totalPages={5} onChange={onChange} disabled />);
    for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled();
  });

  it("shows captions and custom labels, hides ellipses from assistive tech", () => {
    const { container } = render(
      <Pagination
        currentPage={5}
        totalPages={10}
        navigationButtonsStyle="both"
        prevButtonCaption="Back"
        getPageLabel={(page, current) => (current ? `Current, page ${page}` : `Go to ${page}`)}
      />,
    );
    expect(screen.getByRole("button", { name: "Previous page" })).toHaveTextContent("Back");
    expect(screen.getByRole("button", { name: "Current, page 5" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go to 4" })).toBeInTheDocument();
    expect(container.querySelectorAll('li[aria-hidden="true"]')).toHaveLength(2);
  });

  it("supports render props for links", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        renderPageButton={({ page, isCurrent: _c, disabled: _d, ...props }) => <a href={`?page=${page}`} {...props} />}
      />,
    );
    expect(screen.getByRole("link", { name: "Page 2" })).toHaveAttribute("href", "?page=2");
    expect(screen.getByRole("link", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
  });

  it("is accessible", async () => {
    const { container } = render(<Pagination currentPage={4} totalPages={12} />);
    await expectNoA11yViolations(container);
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { CustomSelectOption } from "../CustomSelectOption/CustomSelectOption";
import { CustomSelectDropdown, type CustomSelectDropdownProps } from "./CustomSelectDropdown";

function Harness(props: Omit<CustomSelectDropdownProps, "targetRef">) {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={ref} data-testid="target" />
      <CustomSelectDropdown targetRef={ref} {...props}>
        <div role="listbox" aria-label="Items">
          <CustomSelectOption>Item</CustomSelectOption>
        </div>
      </CustomSelectDropdown>
    </>
  );
}

describe("CustomSelectDropdown", () => {
  it("portals its content and reports the placement", async () => {
    const onPlacementChange = vi.fn();
    const { container } = render(<Harness placement="top-start" onPlacementChange={onPlacementChange} />);
    const listbox = screen.getByRole("listbox");
    expect(container).not.toContainElement(listbox);
    await waitFor(() => expect(onPlacementChange).toHaveBeenCalledWith("top-start"));
    expect(listbox.closest("[data-placement]")).toHaveAttribute("data-placement", "top-start");
  });

  it("renders in place without forcePortal", () => {
    const { container } = render(<Harness forcePortal={false} />);
    expect(container).toContainElement(screen.getByRole("listbox"));
  });

  it("shows a spinner while fetching", () => {
    render(<Harness fetching fetchingLabel="Loading items" />);
    expect(screen.getByText("Loading items")).toBeInTheDocument();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("is accessible", async () => {
    const { baseElement } = render(<Harness />);
    await expectNoA11yViolations(baseElement);
  });
});

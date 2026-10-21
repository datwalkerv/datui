import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { FormItem } from "../FormItem/FormItem";
import { Input } from "../Input/Input";
import { FormLayoutGroup } from "./FormLayoutGroup";

describe("FormLayoutGroup", () => {
  it("lays out horizontally from tablet", () => {
    const { container } = render(
      <FormLayoutGroup mode="horizontal">
        <FormItem top="First">
          <Input />
        </FormItem>
      </FormLayoutGroup>,
    );
    expect(container.querySelector("[data-mode]")).toHaveClass("tablet:flex-row");
  });

  it("segmented joins borders", () => {
    const { container } = render(
      <FormLayoutGroup segmented>
        <FormItem top="A">
          <Input />
        </FormItem>
      </FormLayoutGroup>,
    );
    expect(container.querySelector("[data-mode]")?.className).toContain("rounded-t-none");
  });

  it("gets role=group when labelled and supports removal", async () => {
    const onRemove = vi.fn();
    render(
      <FormLayoutGroup aria-label="Full name" removable onRemove={onRemove}>
        <FormItem top="First">
          <Input />
        </FormItem>
      </FormLayoutGroup>,
    );
    expect(screen.getByRole("group", { name: "Full name" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remove" }));
    expect(onRemove).toHaveBeenCalled();
  });

  it("is accessible", async () => {
    const { container } = render(
      <FormLayoutGroup aria-label="Name" mode="horizontal" segmented>
        <FormItem top="First">
          <Input />
        </FormItem>
        <FormItem top="Last">
          <Input />
        </FormItem>
      </FormLayoutGroup>,
    );
    await expectNoA11yViolations(container);
  });
});

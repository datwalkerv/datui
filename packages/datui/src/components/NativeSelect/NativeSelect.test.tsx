import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { FormItem } from "../FormItem/FormItem";
import { NativeSelect } from "./NativeSelect";

const opts = (
  <>
    <option value="ru">Russia</option>
    <option value="fr">France</option>
  </>
);

describe("NativeSelect", () => {
  it("shows the placeholder when value is null", () => {
    render(
      <NativeSelect aria-label="Country" placeholder="Pick one" value={null} onChange={() => {}}>
        {opts}
      </NativeSelect>,
    );
    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("");
    expect(select).toHaveClass("text-muted-foreground");
  });

  it("calls onChange with the event and value (uncontrolled)", async () => {
    const onChange = vi.fn();
    render(
      <NativeSelect aria-label="Country" placeholder="Pick" onChange={onChange}>
        {opts}
      </NativeSelect>,
    );
    await userEvent.selectOptions(screen.getByRole("combobox"), "fr");
    expect(onChange.mock.calls[0]?.[1]).toBe("fr");
    expect(screen.getByRole("combobox")).not.toHaveClass("text-muted-foreground");
  });

  it("works controlled", async () => {
    function Controlled() {
      const [v, setV] = React.useState<string>("ru");
      return (
        <NativeSelect aria-label="Country" value={v} onChange={(_, next) => setV(next)}>
          {opts}
        </NativeSelect>
      );
    }
    render(<Controlled />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "fr");
    expect(screen.getByRole("combobox")).toHaveValue("fr");
  });

  it("maps selectType to field mode and typography", () => {
    render(
      <NativeSelect aria-label="Country" selectType="accent">
        {opts}
      </NativeSelect>,
    );
    expect(screen.getByRole("combobox")).toHaveClass("text-primary");
    expect(screen.getByRole("combobox").parentElement).toHaveClass("border-transparent");
  });

  it("wires FormItem, status and disabled", () => {
    render(
      <FormItem top="Country" status="error">
        <NativeSelect disabled>{opts}</NativeSelect>
      </FormItem>,
    );
    const select = screen.getByRole("combobox", { name: "Country" });
    expect(select).toHaveAttribute("aria-invalid", "true");
    expect(select).toBeDisabled();
  });

  it("is accessible", async () => {
    const { container } = render(
      <NativeSelect aria-label="Country" placeholder="Pick">
        {opts}
      </NativeSelect>,
    );
    await expectNoA11yViolations(container);
  });
});

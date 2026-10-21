import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { Search } from "./Search";

describe("Search", () => {
  it("renders a search landmark with a search input", () => {
    render(<Search />);
    expect(screen.queryByRole("search")).toBeNull();
    expect(screen.getByRole("searchbox", { name: "Search" })).toHaveAttribute("enterkeyhint", "search");
  });

  it("shows the clear button only with a value (uncontrolled) and clears + refocuses", async () => {
    const onChange = vi.fn();
    render(<Search onChange={onChange} />);
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
    await userEvent.type(screen.getByRole("searchbox"), "cats");
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("searchbox")).toHaveFocus();
    expect(onChange.mock.lastCall?.[0].target.value).toBe("");
  });

  it("clears a controlled value through onChange", async () => {
    function Controlled() {
      const [v, setV] = React.useState("dogs");
      return <Search value={v} onChange={(e) => setV(e.target.value)} clearLabel="Reset" />;
    }
    render(<Controlled />);
    await userEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.queryByRole("button", { name: "Reset" })).not.toBeInTheDocument();
  });

  it("Escape clears", async () => {
    render(<Search defaultValue="x" />);
    await userEvent.type(screen.getByRole("searchbox"), "{Escape}");
    expect(screen.getByRole("searchbox")).toHaveValue("");
  });

  it("hideClearButton hides it", () => {
    render(<Search defaultValue="x" hideClearButton />);
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  });

  it("icon becomes a button with onIconClick, and supports a render function", async () => {
    const onIconClick = vi.fn();
    const { rerender } = render(<Search icon={<span>mic</span>} onIconClick={onIconClick} iconLabel="Voice" />);
    await userEvent.click(screen.getByRole("button", { name: "Voice" }));
    expect(onIconClick).toHaveBeenCalled();
    rerender(<Search icon={(renderButton) => renderButton(<span>f</span>, { "aria-label": "Filters" })} />);
    expect(screen.getByRole("button", { name: "Filters" })).toBeInTheDocument();
  });

  it("find button appears on compact density and fires", async () => {
    const onFind = vi.fn();
    render(
      <AdaptivityProvider sizeY="compact">
        <Search onFindButtonClick={onFind} findButtonText="Go" />
      </AdaptivityProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(onFind).toHaveBeenCalled();
  });

  it("hides find button on regular density", () => {
    render(
      <AdaptivityProvider sizeY="regular">
        <Search onFindButtonClick={() => {}} />
      </AdaptivityProvider>,
    );
    expect(screen.queryByRole("button", { name: "Find" })).not.toBeInTheDocument();
  });

  it("disabled has no clear button", () => {
    render(<Search defaultValue="x" disabled />);
    expect(screen.getByRole("searchbox")).toBeDisabled();
    expect(screen.queryByRole("button", { name: "Clear" })).not.toBeInTheDocument();
  });

  it("is accessible", async () => {
    const { container } = render(<Search defaultValue="x" />);
    await expectNoA11yViolations(container);
  });
});

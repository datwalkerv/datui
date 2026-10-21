import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { ModalCard } from "../ModalCard/ModalCard";
import { ModalPage } from "../ModalPage/ModalPage";
import { ModalPageHeader } from "../ModalPageHeader/ModalPageHeader";
import { ModalRoot } from "./ModalRoot";

function App({ onClose }: { onClose?: (id: string) => void }) {
  const [active, setActive] = React.useState<string | null>(null);
  return (
    <AdaptivityProvider sizeX="regular">
      <button type="button" onClick={() => setActive("filters")}>
        Filters
      </button>
      <ModalRoot
        activeModal={active}
        onClose={(id) => {
          onClose?.(id);
          setActive(null);
        }}
      >
        <ModalPage id="filters" header={<ModalPageHeader>Filters</ModalPageHeader>}>
          <button type="button" onClick={() => setActive("confirm")}>
            Apply
          </button>
        </ModalPage>
        <ModalCard id="confirm" title="Filters applied" />
      </ModalRoot>
    </AdaptivityProvider>
  );
}

describe("ModalRoot", () => {
  it("shows only the active modal and switches by id", async () => {
    render(<App />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Filters" }));
    expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Apply" }));
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Filters" })).not.toBeInTheDocument());
    expect(screen.getByRole("dialog", { name: "Filters applied" })).toBeInTheDocument();
  });

  it("forwards close requests with the modal id", async () => {
    const onClose = vi.fn();
    render(<App onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Filters" }));
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledWith("filters");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("is accessible", async () => {
    render(<App />);
    await userEvent.click(screen.getByRole("button", { name: "Filters" }));
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});

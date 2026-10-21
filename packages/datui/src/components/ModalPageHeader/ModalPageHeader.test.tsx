import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { AdaptivityProvider } from "../AdaptivityProvider/AdaptivityProvider";
import { ModalPage } from "../ModalPage/ModalPage";
import { ModalPageHeader } from "./ModalPageHeader";

function renderHeader(header: React.ReactNode) {
  return render(
    <AdaptivityProvider sizeX="regular">
      <ModalPage open header={header} />
    </AdaptivityProvider>,
  );
}

describe("ModalPageHeader", () => {
  it("renders the title as h2 with before/after slots and a separator", () => {
    renderHeader(
      <ModalPageHeader before={<button type="button">Back</button>} after={<button type="button">Done</button>}>
        Profile
      </ModalPageHeader>,
    );
    const title = screen.getByRole("heading", { level: 2, name: "Profile" });
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby", title.id);
    expect(screen.getByRole("button", { name: "Back" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Done" })).toBeInTheDocument();
    expect(title.closest("div")?.nextElementSibling).not.toBeNull();
  });

  it("hides the separator and changes the title element", () => {
    renderHeader(
      <ModalPageHeader noSeparator titleAs="h3" data-testid="header">
        Profile
      </ModalPageHeader>,
    );
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
    expect(screen.getByTestId("header").children).toHaveLength(1);
  });

  it("is accessible", async () => {
    renderHeader(<ModalPageHeader>Profile</ModalPageHeader>);
    await expectNoA11yViolations(screen.getByRole("dialog"));
  });
});

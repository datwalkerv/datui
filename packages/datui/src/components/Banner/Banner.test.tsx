import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Banner } from "./Banner";

describe("Banner", () => {
  it("renders tint content", () => {
    const { container } = render(<Banner title="Update" subtitle="New version" extraSubtitle="Today" />);
    expect(container.firstChild).toHaveClass("bg-secondary", "p-4");
    expect(screen.getByText("New version")).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("fires onDismiss without triggering onClick", async () => {
    const onClick = vi.fn();
    const onDismiss = vi.fn();
    render(<Banner title="Promo" onClick={onClick} after="dismiss" onDismiss={onDismiss} dismissLabel="Close" />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "Promo" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("makes the title a link with href and activates by keyboard", async () => {
    const onClick = vi.fn();
    render(<Banner title="Read more" href="/news" after="chevron" />);
    expect(screen.getByRole("link", { name: "Read more" })).toHaveAttribute("href", "/news");
    render(<Banner title="Press" onClick={onClick} />);
    screen.getByRole("button", { name: "Press" }).focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalled();
  });

  it("colors text by image theme and hides the background", () => {
    const { container, rerender } = render(
      <Banner variant="image" title="Photo" background={<img src="/bg.png" alt="" />} size="m" />,
    );
    expect(container.firstChild).toHaveClass("text-white", "p-5");
    expect(container.querySelector("img")?.parentElement).toHaveAttribute("aria-hidden", "true");
    rerender(<Banner variant="image" imageTheme="light" title="Photo" />);
    expect(container.firstChild).toHaveClass("text-black");
  });

  it("renders custom after and actions", () => {
    render(<Banner title="T" after={<span>custom</span>} actions={<button type="button">Act</button>} />);
    expect(screen.getByText("custom")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Act" })).toBeInTheDocument();
  });

  it("is accessible", async () => {
    const { container } = render(
      <Banner title="Promo" subtitle="Save 20%" onClick={() => {}} after="dismiss" onDismiss={() => {}} />,
    );
    await expectNoA11yViolations(container);
  });
});

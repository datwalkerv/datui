import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { findLoadedImg, mockImageLoading } from "../../internal/ImageBase/mockImageLoading";
import { Avatar, AvatarBadge } from "./Avatar";

let restore: () => void;
beforeEach(() => {
  restore = mockImageLoading();
});
afterEach(() => restore());

describe("Avatar", () => {
  it("renders the image with alt, round, default 48px", async () => {
    const { container } = render(<Avatar src="/me.png" alt="Ann" />);
    const img = await findLoadedImg();
    expect(img).toHaveAccessibleName("Ann");
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass("rounded-full");
    expect(root.style.width).toBe("48px");
  });

  it("falls back to initials on error, exposing alt as the name", async () => {
    const onError = vi.fn();
    render(<Avatar src="/broken.png" alt="Ann Lee" initials="AL" onError={onError} />);
    await vi.waitFor(() => expect(onError).toHaveBeenCalled());
    const fallback = screen.getByRole("img", { name: "Ann Lee" });
    expect(fallback).toHaveTextContent("AL");
  });

  it("prefers initials over fallbackIcon, else shows the icon", () => {
    const { rerender } = render(<Avatar alt="x" initials="AB" fallbackIcon={<svg data-testid="icon" />} />);
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    rerender(<Avatar alt="x" fallbackIcon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("maps gradientColor numbers and names", () => {
    const { rerender } = render(<Avatar alt="x" initials="A" gradientColor={4} />);
    expect(screen.getByText("A").parentElement).toHaveClass("from-avatar-green-from", "text-white");
    rerender(<Avatar alt="x" initials="A" gradientColor="violet" />);
    expect(screen.getByText("A").parentElement).toHaveClass("to-avatar-violet-to");
  });

  it("scales size and initials font", () => {
    const { container } = render(<Avatar alt="x" size={96} initials="Z" />);
    expect((container.firstChild as HTMLElement).style.height).toBe("96px");
    expect(screen.getByText("Z")).toHaveClass("text-display-3");
  });

  it("renders badge and noBorder", () => {
    const { container } = render(
      <Avatar alt="x" noBorder>
        <Avatar.Badge data-testid="dot" />
        <AvatarBadge>
          <svg data-testid="icon" />
        </AvatarBadge>
      </Avatar>,
    );
    expect(screen.getByTestId("dot")).toHaveClass("bg-positive");
    expect(container.querySelector(".border-border")).toBeNull();
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <Avatar src="/a.png" alt="Loaded" />
        <Avatar alt="Initials" initials="IN" gradientColor="red" />
      </>,
    );
    await findLoadedImg();
    await expectNoA11yViolations(container);
  });
});

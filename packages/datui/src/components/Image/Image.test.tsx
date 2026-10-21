import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { findLoadedImg, mockImageLoading } from "../../internal/ImageBase/mockImageLoading";
import { Image, ImageBadge, ImageFloatElement, ImageOverlay } from "./Image";

let restore: () => void;
beforeEach(() => {
  restore = mockImageLoading();
});
afterEach(() => restore());

describe("Image", () => {
  it("renders the image with alt once loaded", async () => {
    const onLoad = vi.fn();
    render(<Image src="/cat.png" alt="Cat" onLoad={onLoad} />);
    const img = await findLoadedImg();
    expect(img).toHaveAccessibleName("Cat");
    expect(onLoad).toHaveBeenCalled();
    expect(img.parentElement).toHaveAttribute("data-status", "loaded");
  });

  it("shows a labelled fallback on error and without src", async () => {
    const onError = vi.fn();
    const { rerender } = render(<Image src="/broken.png" alt="Cover" onError={onError} />);
    await vi.waitFor(() => expect(onError).toHaveBeenCalled());
    expect(screen.getByRole("img", { name: "Cover" }).tagName).toBe("SPAN");
    rerender(<Image alt="Empty" fallbackIcon={<svg data-testid="fb" />} />);
    expect(screen.getByTestId("fb")).toBeInTheDocument();
  });

  it("applies size, radius and per-corner radius", () => {
    render(<Image alt="x" size={64} borderRadius="l" borderStartStartRadius="s" borderEndEndRadius="m" />);
    const root = screen.getByRole("img").parentElement as HTMLElement;
    expect(root).toHaveClass("rounded-lg", "rounded-ss-sm", "rounded-ee-md");
    expect(root.style.width).toBe("64px");
    expect(root.style.height).toBe("64px");
  });

  it("supports free width/height and keepAspectRatio", async () => {
    const { rerender, container } = render(<Image alt="x" widthSize="100%" heightSize={120} />);
    const root = container.firstChild as HTMLElement;
    expect(root.style.width).toBe("100%");
    expect(root.style.height).toBe("120px");
    rerender(<Image src="/a.png" alt="x" widthSize="100%" keepAspectRatio />);
    expect(root.style.height).toBe("");
    const img = await findLoadedImg();
    expect(img).toHaveClass("h-auto", "w-full");
  });

  it("forwards object fit, position and filter", async () => {
    render(<Image src="/a.png" alt="x" objectFit="contain" objectPosition="top" filter="grayscale(1)" />);
    const img = await findLoadedImg();
    expect(img.style.objectFit).toBe("contain");
    expect(img.style.objectPosition).toBe("top");
    expect(img.style.filter).toBe("grayscale(1)");
  });

  it("renders badge, float element and a clickable overlay", async () => {
    const onClick = vi.fn();
    render(
      <Image alt="Photo">
        <Image.Badge>
          <svg data-testid="badge" />
        </Image.Badge>
        <ImageFloatElement placement="bottom-start">tag</ImageFloatElement>
        <Image.Overlay aria-label="Edit photo" onClick={onClick}>
          <svg />
        </Image.Overlay>
      </Image>,
    );
    expect(screen.getByTestId("badge").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("tag")).toHaveClass("bottom-0", "start-0");
    const overlay = screen.getByRole("button", { name: "Edit photo" });
    expect(overlay).toHaveClass("opacity-0", "group-hover/image:opacity-100");
    await userEvent.click(overlay);
    overlay.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("overlay supports always-visible light theme and badge shadow", () => {
    render(
      <Image alt="x">
        <ImageOverlay visibility="always" theme="light">
          play
        </ImageOverlay>
        <ImageBadge background="shadow">b</ImageBadge>
      </Image>,
    );
    expect(screen.getByText("play")).not.toHaveClass("opacity-0");
    expect(screen.getByText("play")).toHaveClass("bg-white/72");
    expect(screen.getByText("b")).toHaveClass("shadow-sm");
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <Image src="/a.png" alt="Loaded" />
        <Image alt="Fallback" />
        <Image alt="" />
      </>,
    );
    await findLoadedImg();
    await expectNoA11yViolations(container);
  });
});

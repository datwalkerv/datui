import { render, screen } from "@testing-library/react";
import { expectNoA11yViolations } from "../../../test/axe";
import { UsersStack } from "./UsersStack";

const photos = ["/1", "/2", "/3", "/4", "/5"];

describe("UsersStack", () => {
  it("respects visibleCount and shows the caption", () => {
    const { container } = render(
      <UsersStack photos={photos} visibleCount={2} size="m">
        Ann and 4 others
      </UsersStack>,
    );
    expect(container.querySelectorAll("img")).toHaveLength(2);
    expect(screen.getByText("+3")).toBeInTheDocument();
    expect(screen.getByText("Ann and 4 others")).toBeInTheDocument();
  });

  it("hides the counter at size s, at 0 and above 99", () => {
    const { container, rerender } = render(<UsersStack photos={photos} />);
    expect(container.querySelector("[data-counter]")).toBeNull();
    rerender(<UsersStack photos={photos} size="l" count={100} />);
    expect(container.querySelector("[data-counter]")).toBeNull();
    rerender(<UsersStack photos={photos.slice(0, 2)} size="l" />);
    expect(container.querySelector("[data-counter]")).toBeNull();
    rerender(<UsersStack photos={photos} size="l" count={42} />);
    expect(screen.getByText("+42")).toBeInTheDocument();
  });

  it("maps avatarsPosition", () => {
    const { container, rerender } = render(<UsersStack photos={photos} avatarsPosition="block-start" />);
    expect(container.firstChild).toHaveClass("flex-col");
    rerender(<UsersStack photos={photos} avatarsPosition="inline-end" />);
    expect(container.firstChild).toHaveClass("flex-row-reverse");
  });

  it("calls renderWrapper per photo", () => {
    const wrap = vi.fn((avatar: React.ReactElement) => <span data-testid="wrapped">{avatar}</span>);
    render(<UsersStack photos={[{ src: "/a", renderWrapper: wrap }, { src: "/b", renderWrapper: wrap }, "/c"]} />);
    expect(wrap).toHaveBeenCalledTimes(2);
    expect(screen.getAllByTestId("wrapped")).toHaveLength(2);
  });

  it("is accessible", async () => {
    const { container } = render(
      <UsersStack photos={photos} size="m">
        5 people going
      </UsersStack>,
    );
    await expectNoA11yViolations(container);
  });
});

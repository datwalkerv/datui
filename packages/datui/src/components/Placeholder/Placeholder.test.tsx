import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Button } from "../Button/Button";
import {
  Placeholder,
  PlaceholderActions,
  PlaceholderContainer,
  PlaceholderDescription,
  PlaceholderIcon,
  PlaceholderTitle,
} from "./Placeholder";

describe("Placeholder", () => {
  it("renders all slots with an h2 title", async () => {
    const onClick = vi.fn();
    render(
      <Placeholder
        icon={<svg data-testid="icon" />}
        title="No messages"
        action={<Button onClick={onClick}>Write</Button>}
      >
        Start a conversation
      </Placeholder>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "No messages" })).toBeInTheDocument();
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Start a conversation")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Write" }));
    expect(onClick).toHaveBeenCalled();
  });

  it("renders only provided slots", () => {
    const { container } = render(<Placeholder>Only text</Placeholder>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(container.firstChild?.childNodes).toHaveLength(1);
  });

  it("supports stretched, noPadding and titleAs", () => {
    const { container } = render(<Placeholder stretched noPadding title="T" titleAs="h3" />);
    expect(container.firstChild).toHaveClass("flex-1", "justify-center");
    expect(container.firstChild).not.toHaveClass("px-8");
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("composes from parts", () => {
    render(
      <PlaceholderContainer>
        <PlaceholderIcon>i</PlaceholderIcon>
        <PlaceholderTitle>Title</PlaceholderTitle>
        <PlaceholderDescription>Desc</PlaceholderDescription>
        <PlaceholderActions>
          <Button>Go</Button>
        </PlaceholderActions>
      </PlaceholderContainer>,
    );
    expect(screen.getByRole("heading", { name: "Title" })).toBeInTheDocument();
    expect(Placeholder.Actions).toBe(PlaceholderActions);
  });

  it("is accessible", async () => {
    const { container } = render(
      <Placeholder icon={<svg />} title="Empty" action={<Button>Add</Button>}>
        Nothing here yet
      </Placeholder>,
    );
    await expectNoA11yViolations(container);
  });
});

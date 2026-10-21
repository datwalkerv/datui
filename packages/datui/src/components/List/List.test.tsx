import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/axe";
import { Cell } from "../Cell/Cell";
import { List } from "./List";

describe("List", () => {
  it("renders role=list and makes Cells list items", () => {
    render(
      <List>
        <Cell>One</Cell>
        <Cell>Two</Cell>
      </List>,
    );
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("applies the gap in px", () => {
    render(
      <List gap={8}>
        <Cell>One</Cell>
      </List>,
    );
    expect(screen.getByRole("list")).toHaveStyle({ gap: "8px" });
  });

  it("does not add listitem roles to Cells outside a List", () => {
    render(<Cell>Alone</Cell>);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("describes drag handles with the reorder instructions", () => {
    render(
      <List dragInstructions="Move it">
        <Cell draggable>One</Cell>
      </List>,
    );
    const handle = screen.getByRole("button", { name: "Reorder One" });
    expect(handle).toHaveAccessibleDescription("Move it");
  });

  it("is accessible", async () => {
    const { container } = render(
      <List>
        <Cell>One</Cell>
        <Cell draggable>Two</Cell>
      </List>,
    );
    await expectNoA11yViolations(container);
  });
});

it("List announces drag start with custom, 1-based messages", async () => {
  render(
    <List announcements={{ onDragStart: ({ from, total }) => `Lifted ${from}/${total}` }}>
      <Cell draggable>One</Cell>
      <Cell draggable>Two</Cell>
    </List>,
  );
  screen.getByRole("button", { name: "Reorder Two" }).focus();
  await userEvent.keyboard(" ");
  expect(await screen.findByText("Lifted 2/2")).toBeInTheDocument();
});

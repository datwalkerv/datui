import { render, screen } from "@testing-library/react";
import {
  NavPanelIdContext,
  NavTransitionDirectionProvider,
  NavTransitionProvider,
  NavViewIdContext,
  useNavDirection,
  useNavId,
  useNavTransition,
} from "./NavContext";

function Show() {
  const ids = useNavId();
  const t = useNavTransition();
  return <output>{`${ids.view}/${ids.panel}/${t.entering}/${t.animating}/${useNavDirection()}`}</output>;
}

describe("NavContext", () => {
  it("defaults outside providers", () => {
    render(<Show />);
    expect(screen.getByRole("status")).toHaveTextContent("undefined/undefined/false/false/undefined");
  });

  it("returns the nearest ids and OR-merges transition state", () => {
    render(
      <NavViewIdContext.Provider value="v">
        <NavPanelIdContext.Provider value="p">
          <NavTransitionProvider entering={false} animating>
            <NavTransitionProvider entering animating={false}>
              <Show />
            </NavTransitionProvider>
          </NavTransitionProvider>
        </NavPanelIdContext.Provider>
      </NavViewIdContext.Provider>,
    );
    expect(screen.getByRole("status")).toHaveTextContent("v/p/true/true/undefined");
  });

  it("freezes the direction on mount and inherits the parent when undefined", () => {
    const ui = (isBack: boolean | undefined) => (
      <NavTransitionDirectionProvider isBack>
        <NavTransitionDirectionProvider isBack={isBack}>
          <Show />
        </NavTransitionDirectionProvider>
      </NavTransitionDirectionProvider>
    );
    const { rerender, unmount } = render(ui(false));
    expect(screen.getByRole("status")).toHaveTextContent("forwards");
    rerender(ui(true));
    expect(screen.getByRole("status")).toHaveTextContent("forwards");
    unmount();
    render(ui(undefined));
    expect(screen.getByRole("status")).toHaveTextContent("backwards");
  });
});

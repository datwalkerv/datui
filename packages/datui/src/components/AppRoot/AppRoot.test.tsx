import { render, screen } from "@testing-library/react";
import { Portal } from "../../lib/portal";
import { AdaptivityProvider, useAdaptivity } from "../AdaptivityProvider/AdaptivityProvider";
import { useColorScheme } from "../ColorSchemeProvider/ColorSchemeProvider";
import { ConfigProvider } from "../ConfigProvider/ConfigProvider";
import { useDirection } from "../DirectionProvider/DirectionProvider";
import { useLocale } from "../LocaleProvider/LocaleProvider";
import { AppRoot } from "./AppRoot";

function Probe() {
  const scheme = useColorScheme();
  const dir = useDirection();
  const locale = useLocale();
  const { sizeX, sizeY, isDesktop } = useAdaptivity();
  return <span data-testid="probe">{[scheme, dir, locale, sizeX, sizeY, String(isDesktop)].join(",")}</span>;
}

describe("AppRoot + providers", () => {
  it("applies config to the DOM and context", () => {
    render(
      <ConfigProvider colorScheme="dark" direction="rtl" locale="fr">
        <AdaptivityProvider sizeX="compact" sizeY="regular">
          <AppRoot data-testid="root">
            <Probe />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>,
    );
    const root = screen.getByTestId("root");
    expect(root).toHaveAttribute("data-theme", "dark");
    expect(root).toHaveAttribute("dir", "rtl");
    expect(root).toHaveAttribute("lang", "fr");
    expect(root).toHaveAttribute("data-density", "regular");
    expect(screen.getByTestId("probe")).toHaveTextContent("dark,rtl,fr,compact,regular,false");
  });

  it("resolves system scheme through matchMedia", () => {
    const original = window.matchMedia;
    window.matchMedia = ((q: string) => ({ ...original(q), matches: q.includes("dark") })) as typeof window.matchMedia;
    render(
      <ConfigProvider>
        <Probe />
      </ConfigProvider>,
    );
    expect(screen.getByTestId("probe").textContent?.startsWith("dark")).toBe(true);
    window.matchMedia = original;
  });

  it("lets density be forced and portals into the themed layer", () => {
    render(
      <ConfigProvider colorScheme="dark">
        <AppRoot density="compact" data-testid="root">
          <Portal>
            <span>overlay</span>
          </Portal>
        </AppRoot>
      </ConfigProvider>,
    );
    expect(screen.getByTestId("root")).toHaveAttribute("data-density", "compact");
    const layer = screen.getByText("overlay").closest("[data-datui-portal]");
    expect(layer).toHaveAttribute("data-theme", "dark");
  });

  it("nested ConfigProvider overrides only the keys it sets", () => {
    render(
      <ConfigProvider colorScheme="dark" direction="rtl">
        <ConfigProvider locale="de">
          <Probe />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(screen.getByTestId("probe").textContent?.startsWith("dark,rtl,de")).toBe(true);
  });

  it("nested AdaptivityProvider keeps parent overrides", () => {
    render(
      <AdaptivityProvider sizeX="compact">
        <AdaptivityProvider sizeY="compact">
          <Probe />
        </AdaptivityProvider>
      </AdaptivityProvider>,
    );
    expect(screen.getByTestId("probe")).toHaveTextContent("compact,compact");
  });
});

describe("AppRoot full mode", () => {
  it("mirrors the color scheme onto <html> and restores it on unmount", () => {
    const html = document.documentElement;
    const { rerender, unmount } = render(
      <ConfigProvider colorScheme="dark">
        <AppRoot />
      </ConfigProvider>,
    );
    expect(html).toHaveAttribute("data-theme", "dark");
    rerender(
      <ConfigProvider colorScheme="light">
        <AppRoot />
      </ConfigProvider>,
    );
    expect(html).toHaveAttribute("data-theme", "light");
    unmount();
    expect(html).not.toHaveAttribute("data-theme");
  });

  it("leaves <html> alone in embedded mode", () => {
    render(
      <ConfigProvider colorScheme="dark">
        <AppRoot mode="embedded" />
      </ConfigProvider>,
    );
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });
});

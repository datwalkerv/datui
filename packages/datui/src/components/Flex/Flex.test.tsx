import { render, screen } from "@testing-library/react";
import { Box } from "../Box/Box";
import { SimpleGrid } from "../SimpleGrid/SimpleGrid";
import { Spacing } from "../Spacing/Spacing";
import { Flex, FlexItem } from "./Flex";

describe("layout primitives", () => {
  it("Flex maps props to classes and gap tuple to style", () => {
    render(
      <Flex data-testid="f" direction="column" reverse align="center" justify="space-between" gap={["s", 20]}>
        <FlexItem flex="grow">a</FlexItem>
      </Flex>,
    );
    const f = screen.getByTestId("f");
    expect(f).toHaveClass("flex", "flex-col-reverse", "items-center", "justify-between", "flex-wrap");
    expect(f.style.gap).toBe("8px 20px");
    expect(screen.getByText("a")).toHaveClass("flex-1");
  });

  it("Box turns layout props into styles and supports as", () => {
    render(
      <Box as="section" data-testid="b" padding="l" maxWidth={320} display="flex">
        x
      </Box>,
    );
    const b = screen.getByTestId("b");
    expect(b.tagName).toBe("SECTION");
    expect(b.style.padding).toBe("16px");
    expect(b.style.maxWidth).toBe("320px");
    expect(b).toHaveClass("flex");
  });

  it("SimpleGrid builds column templates", () => {
    render(
      <>
        <SimpleGrid data-testid="g1" columns={3} gap="m" />
        <SimpleGrid data-testid="g2" minColWidth={120} />
      </>,
    );
    expect(screen.getByTestId("g1").style.gridTemplateColumns).toBe("repeat(3, minmax(0, 1fr))");
    expect(screen.getByTestId("g1").style.gap).toBe("12px");
    expect(screen.getByTestId("g2").style.gridTemplateColumns).toContain("auto-fill");
  });

  it("Spacing is a hidden spacer", () => {
    render(<Spacing data-testid="s" size={30} />);
    expect(screen.getByTestId("s")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTestId("s").style.height).toBe("30px");
  });
});

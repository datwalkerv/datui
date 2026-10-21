import { cn } from "./utils";

describe("cn", () => {
  it("keeps datui font sizes alongside colors", () => {
    expect(cn("text-title-1", "text-primary")).toBe("text-title-1 text-primary");
  });
  it("resolves conflicts in favor of later classes", () => {
    expect(cn("px-2 text-subhead", "px-4", false && "hidden", "text-footnote")).toBe("px-4 text-footnote");
  });
});

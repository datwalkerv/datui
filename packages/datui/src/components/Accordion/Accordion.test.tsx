import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Minus, Plus } from "lucide-react";
import type * as React from "react";
import { expectNoA11yViolations } from "../../../test/axe";
import { Accordion, AccordionContent, AccordionIcon, AccordionSummary } from "./Accordion";

function Basic(props: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props}>
      <Accordion.Summary>Details</Accordion.Summary>
      <Accordion.Content>Body text</Accordion.Content>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("wires summary and region ids", () => {
    render(<Basic defaultOpen />);
    const summary = screen.getByRole("button", { name: "Details" });
    const region = screen.getByRole("region", { name: "Details" });
    expect(summary).toHaveAttribute("aria-expanded", "true");
    expect(summary).toHaveAttribute("aria-controls", region.id);
    expect(region).toHaveAttribute("aria-labelledby", summary.id);
  });

  it("uncontrolled: click and keyboard toggle; collapsed content stays mounted but inert", async () => {
    render(<Basic />);
    const summary = screen.getByRole("button", { name: "Details" });
    const region = screen.getByText("Body text").closest("[role=region]") as HTMLElement;
    expect(region).toHaveAttribute("inert");
    expect(region).toHaveClass("invisible");
    await userEvent.click(summary);
    expect(summary).toHaveAttribute("aria-expanded", "true");
    expect(region).not.toHaveAttribute("inert");
    summary.focus();
    await userEvent.keyboard("{Enter}");
    expect(summary).toHaveAttribute("aria-expanded", "false");
    await userEvent.keyboard(" ");
    expect(summary).toHaveAttribute("aria-expanded", "true");
  });

  it("controlled: follows open and reports changes", async () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(<Basic open={false} onOpenChange={onOpenChange} />);
    const summary = screen.getByRole("button");
    await userEvent.click(summary);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(summary).toHaveAttribute("aria-expanded", "false");
    rerender(<Basic open onOpenChange={onOpenChange} />);
    expect(summary).toHaveAttribute("aria-expanded", "true");
  });

  it("unmountOnCollapse removes the content when closed", async () => {
    render(<Basic unmountOnCollapse />);
    expect(screen.queryByText("Body text")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Body text")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button"));
    expect(screen.queryByText("Body text")).not.toBeInTheDocument();
  });

  it("disabled ignores activation", async () => {
    render(<Basic disabled />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("summary calls its own onClick, swaps icons and honours iconPosition", async () => {
    const onClick = vi.fn();
    const { container } = render(
      <Accordion>
        <AccordionSummary onClick={onClick} expandIcon={Plus} collapseIcon={Minus} iconPosition="before">
          Title
        </AccordionSummary>
        <AccordionContent>Body</AccordionContent>
      </Accordion>,
    );
    const icon = () => container.querySelector("svg[data-state]") as SVGElement;
    expect(icon()).toHaveClass("lucide-plus");
    expect(icon().compareDocumentPosition(screen.getByText("Title")) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(icon()).toHaveClass("lucide-minus");
  });

  it("iconPosition none hides the icon; AccordionIcon works in custom summaries", () => {
    const { container } = render(
      <Accordion defaultOpen>
        <Accordion.Summary iconPosition="none">Plain</Accordion.Summary>
        <AccordionIcon />
        <Accordion.Icon />
      </Accordion>,
    );
    expect(screen.getByRole("button").querySelector("svg")).toBeNull();
    expect(container.querySelectorAll('svg[data-state="open"]')).toHaveLength(2);
  });

  it("is accessible", async () => {
    const { container } = render(
      <>
        <Basic defaultOpen />
        <Basic />
      </>,
    );
    await expectNoA11yViolations(container);
  });
});

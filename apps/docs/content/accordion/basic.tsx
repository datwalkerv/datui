"use client";

import { Accordion } from "datui";
import { Plus } from "lucide-react";

export default function Example() {
  return (
    <div className="max-w-md rounded-lg bg-card">
      <Accordion defaultOpen>
        <Accordion.Summary subtitle="Billing and delivery">What does the plan include?</Accordion.Summary>
        <Accordion.Content>
          <p className="m-0 px-4 pb-4 text-paragraph text-subtle-foreground">
            Unlimited projects, 100 GB of storage and priority support.
          </p>
        </Accordion.Content>
      </Accordion>
      <Accordion>
        <Accordion.Summary iconPosition="before" expandIcon={Plus}>
          Can I cancel anytime?
        </Accordion.Summary>
        <Accordion.Content>
          <p className="m-0 px-4 pb-4 text-paragraph text-subtle-foreground">Yes, from the billing page.</p>
        </Accordion.Content>
      </Accordion>
    </div>
  );
}

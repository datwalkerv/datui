"use client";

import {
  Avatar,
  Button,
  Counter,
  FormItem,
  Group,
  Header,
  Headline,
  Input,
  Paragraph,
  Progress,
  SegmentedControl,
  SimpleCell,
  SnackbarBasic,
  Switch,
} from "datui";
import { Bell, Check, Moon } from "lucide-react";
import { useState } from "react";

const card = "grid content-start gap-4 rounded-xl bg-card p-6 shadow-sm";

/** Live, interactive components on the landing page. */
export function LandingShowcase() {
  const [plan, setPlan] = useState("monthly");
  const [notify, setNotify] = useState(true);
  return (
    <section aria-label="Showcase" className="grid gap-4 tablet:grid-cols-2">
      <div className={card}>
        <div>
          <Headline level={1} as="h2" className="mb-1">
            Consistent actions
          </Headline>
          <Paragraph className="text-subtle-foreground">
            Variants, sizes and intents that share one token set.
          </Paragraph>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline" appearance="neutral">
            Outline
          </Button>
          <Button variant="tertiary" appearance="negative">
            Delete
          </Button>
        </div>
      </div>

      <div className={card}>
        <Headline level={1} as="h2">
          Forms that wire themselves up
        </Headline>
        <FormItem top="Email" bottom="We never share it" htmlFor="landing-email">
          <Input id="landing-email" type="email" placeholder="you@example.com" />
        </FormItem>
        <SegmentedControl
          aria-label="Billing period"
          value={plan}
          onChange={(v) => setPlan(String(v))}
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ]}
        />
      </div>

      {/* Group renders a trailing separator element, so it gets its own grid cell. */}
      <div>
        <Group mode="card" separator="hide" header={<Header>Settings</Header>} className="shadow-sm">
          <SimpleCell before={<Avatar size={40} initials="AM" gradientColor="light-blue" alt="" />} subtitle="Admin">
            Alex Morgan
          </SimpleCell>
          <SimpleCell
            before={<Bell className="size-icon-lg text-primary" aria-hidden />}
            after={<Switch checked={notify} onCheckedChange={setNotify} aria-label="Notifications" />}
          >
            Notifications
          </SimpleCell>
          <SimpleCell
            before={<Moon className="size-icon-lg text-primary" aria-hidden />}
            after={<Counter appearance="accent">3</Counter>}
            onClick={() => {}}
            chevron
          >
            Appearance
          </SimpleCell>
        </Group>
      </div>

      <div className={card}>
        <Headline level={1} as="h2">
          Feedback
        </Headline>
        <div className="grid gap-2">
          <Paragraph className="text-subtle-foreground">Uploading 3 of 5 files</Paragraph>
          <Progress value={60} aria-label="Upload progress" />
        </div>
        <SnackbarBasic before={<Check className="size-icon-md text-positive" aria-hidden />} action="Undo">
          Changes saved
        </SnackbarBasic>
      </div>
    </section>
  );
}

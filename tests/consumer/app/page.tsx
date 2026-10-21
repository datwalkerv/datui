// Server component: verifies datui can be imported and rendered from an RSC tree using only the published package.
import { Avatar, Button, Checkbox, Counter, FormItem, Group, Header, Input, SimpleCell, Tabs, TabsItem, Title } from "datui";

export default function Page() {
  return (
    <main className="mx-auto grid max-w-xl gap-4 p-6">
      <Title level={1}>datui consumer smoke test</Title>
      <Tabs defaultValue="one" aria-label="Sections">
        <TabsItem value="one">One</TabsItem>
        <TabsItem value="two" status={<Counter size="s">3</Counter>}>
          Two
        </TabsItem>
      </Tabs>
      <Group header={<Header>Profile</Header>}>
        <SimpleCell before={<Avatar size={40} initials="DT" alt="" />} subtitle="Signed in">
          datui user
        </SimpleCell>
        <FormItem top="Email" htmlFor="email">
          <Input id="email" type="email" placeholder="you@example.com" />
        </FormItem>
        <FormItem>
          <Checkbox>Keep me signed in</Checkbox>
        </FormItem>
      </Group>
      <Button size="l" stretched data-testid="primary-button">
        Continue
      </Button>
    </main>
  );
}

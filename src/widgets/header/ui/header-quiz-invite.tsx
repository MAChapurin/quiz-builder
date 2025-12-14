import { Container, Flex } from "@mantine/core";

import { ColorSchemesSwitcher } from "@/features";
import { Logo } from "@/shared/ui";

export function HeaderQuizInvite() {
  return (
    <Container size="lg" py={10}>
      <Flex h="100%" align="center" justify="space-between">
        <Logo />
        <ColorSchemesSwitcher />
      </Flex>
    </Container>
  );
}

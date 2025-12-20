import { DemoQuizContainer } from "@/features";
import { CTAModal } from "@/features/cta-modal";

import { LINKS_ID } from "@/shared/config";
import {
  Box,
  Center,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { HeroBG } from "./hero-bg";

export function Hero() {
  const t = useTranslations("widgets.hero");
  return (
    <Box py={80} id={LINKS_ID.HOME} pos={"relative"}>
      <Container size="lg" pos={"relative"} className="z-0">
        <HeroBG />
        <Center>
          <Stack align="center" maw={700}>
            <Title order={1} fw={800} ta="center">
              {t("title")}
            </Title>
            <Text fz="lg" c="dimmed" ta="center">
              {t("description")}
            </Text>
            <Group mt="md">
              <CTAModal buttonText={t("ctaButton")} />
              <DemoQuizContainer />
            </Group>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}

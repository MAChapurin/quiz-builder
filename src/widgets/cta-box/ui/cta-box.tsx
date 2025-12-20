import { CTAModal } from "@/features/cta-modal";
import { DotsLineBlock } from "@/shared/ui";
import { Container, Title, Text, Stack, Box, Center } from "@mantine/core";
import { useTranslations } from "next-intl";

export function CtaBox() {
  const t = useTranslations("widgets.ctaBox");
  return (
    <Box>
      <DotsLineBlock />
      <Container size="lg">
        <Center py={80}>
          <Stack align="center">
            <Title order={2} fw={800} ta="center">
              {t("title")}
            </Title>
            <Text fz="lg" c="dimmed" ta="center">
              {t("description")}
            </Text>
            <CTAModal buttonText={t("button")} variant="filled" />
          </Stack>
        </Center>
      </Container>
      <DotsLineBlock />
    </Box>
  );
}

import { LINKS_ID } from "@/shared/config";
import {
  Container,
  Title,
  Text,
  Card,
  SimpleGrid,
  Box,
  ThemeIcon,
  Stack,
} from "@mantine/core";
import { IconCheck, IconLink, IconPuzzle } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export function FeaturesBox() {
  const t = useTranslations("widgets.featuresBox");

  return (
    <Box py={100} id={LINKS_ID.FEATURES}>
      <Container size="lg">
        <Stack align="center" mb={60} gap={8}>
          <Title order={2} fw={800} ta="center">
            {t("title")}
          </Title>
          <Text c="dimmed" ta="center" maw={520}>
            {t("description")}
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
          <Card
            withBorder
            p="xl"
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Stack gap="sm">
              <ThemeIcon size={48} radius="md" variant="light">
                <IconPuzzle size={26} />
              </ThemeIcon>

              <Title order={4}>{t("items.questions.title")}</Title>

              <Text c="dimmed" size="sm">
                {t("items.questions.description")}
              </Text>
            </Stack>
          </Card>

          <Card
            withBorder
            p="xl"
            className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Stack gap="sm">
              <ThemeIcon size={48} radius="md" variant="light">
                <IconLink size={26} />
              </ThemeIcon>

              <Title order={4}>{t("items.sharing.title")}</Title>

              <Text c="dimmed" size="sm">
                {t("items.sharing.description")}
              </Text>
            </Stack>
          </Card>

          <Card
            withBorder
            p="xl"
            className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Stack gap="sm">
              <ThemeIcon size={48} radius="md" variant="light">
                <IconCheck size={26} />
              </ThemeIcon>

              <Title order={4}>{t("items.analytics.title")}</Title>

              <Text c="dimmed" size="sm">
                {t("items.analytics.description")}
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

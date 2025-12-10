import { CTAModal } from "@/features/cta-modal";
import { DotsLineBlock } from "@/shared/ui";
import { Container, Title, Text, Stack, Box, Center } from "@mantine/core";

export function CtaBox() {
  return (
    <Box>
      <DotsLineBlock />
      <Container size="lg">
        <Center py={80}>
          <Stack align="center">
            <Title order={2} fw={800} ta="center">
              Готовы создать свой первый тест?
            </Title>
            <Text fz="lg" c="dimmed" ta="center">
              Начните прямо сейчас — это бесплатно и занимает всего пару минут.
            </Text>
            <CTAModal btnText="Начать сейчас" variant="filled" />
          </Stack>
        </Center>
      </Container>
      <DotsLineBlock />
    </Box>
  );
}

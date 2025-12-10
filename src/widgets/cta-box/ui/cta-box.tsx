import { CTAModal } from "@/features/cta-modal";
import { Container, Title, Text, Stack, Box, Center } from "@mantine/core";

export function CtaBox() {
  return (
    <Box py={80}>
      <Container size="lg">
        <Center>
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
    </Box>
  );
}

"use client";

import { LINKS_ID } from "@/shared/config";
import { Accordion, Box, Container, Title } from "@mantine/core";
import { useTranslations } from "next-intl";

export function FAQ() {
  const t = useTranslations("widgets.faq");

  return (
    <Box py={80} id={LINKS_ID.FAQ}>
      <Container size="lg">
        <Title order={2} ta="center" mb={40} fw={700}>
          {t("title")}
        </Title>

        <Accordion radius="md" variant="separated">
          <Accordion.Item value="free">
            <Accordion.Control>{t("items.free.question")}</Accordion.Control>
            <Accordion.Panel>{t("items.free.answer")}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="registration">
            <Accordion.Control>
              {t("items.registration.question")}
            </Accordion.Control>
            <Accordion.Panel>{t("items.registration.answer")}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="editing">
            <Accordion.Control>{t("items.editing.question")}</Accordion.Control>
            <Accordion.Panel>{t("items.editing.answer")}</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="noAccount">
            <Accordion.Control>
              {t("items.noAccount.question")}
            </Accordion.Control>
            <Accordion.Panel>{t("items.noAccount.answer")}</Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </Box>
  );
}

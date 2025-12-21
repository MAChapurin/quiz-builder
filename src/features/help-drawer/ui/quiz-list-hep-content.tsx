"use client";

import { ActionIcon, Badge, Divider, Flex, Text, Title } from "@mantine/core";
import {
  IconPlayerPlay,
  IconShare,
  IconEdit,
  IconTrash,
  IconLineHeight,
  IconArticle,
  IconBorderAll,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

export function QuizHelpContent() {
  const t = useTranslations("features.helpQuizList");

  return (
    <div className="space-y-4">
      <section>
        <Title order={2} fz="lg" fw={700} mb={16}>
          {t("about.title")}
        </Title>
        <Text>{t("about.text")}</Text>
      </section>

      <Divider />

      <section>
        <Title order={2} fz="lg" fw={700} mb={16}>
          {t("viewMode.title")}
        </Title>
        <ul className="mt-3 list-none">
          <li className="mb-4">
            <ActionIcon variant="default" className="mr-4">
              <IconArticle size={16} />
            </ActionIcon>
            <b>{t("viewMode.table.label")}</b> —{" "}
            {t("viewMode.table.description")}
          </li>
          <li>
            <ActionIcon variant="default" className="mr-4">
              <IconBorderAll size={16} />
            </ActionIcon>
            <b>{t("viewMode.cards.label")}</b> —{" "}
            {t("viewMode.cards.description")}
          </li>
        </ul>
      </section>

      <Divider />

      <section>
        <Title order={2} fz="lg" fw={700} mb={16}>
          {t("publication.title")}
        </Title>
        <Text mb={8}>{t("publication.intro")}</Text>

        <Flex direction="column" gap={8}>
          <Flex align="center" gap={8}>
            <Badge color="green" variant="outline" size="xs">
              {t("publication.published")}
            </Badge>
            <IconCheck size={16} color="green" />
          </Flex>
          <Flex align="center" gap={8}>
            <Badge color="gray" variant="outline" size="xs">
              {t("publication.unpublished")}
            </Badge>
            <IconX size={16} color="gray" />
          </Flex>
        </Flex>

        <Text mt={12}>{t("publication.note")}</Text>
      </section>

      <Divider />

      <section>
        <Title order={2} fz="lg" fw={700} mb={16}>
          {t("info.title")}
        </Title>
        <ul className="list-disc ml-6">
          {t.raw("info.items").map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <Divider />

      <section>
        <Title order={2} fz="lg" fw={700} mb={16}>
          {t("actions.title")}
        </Title>
        <Text mb={12}>{t("actions.intro")}</Text>

        <div className="space-y-2">
          <Flex align="center" gap={10}>
            <ActionIcon size="md" variant="default">
              <IconPlayerPlay size={16} />
            </ActionIcon>
            <span>{t("actions.play")}</span>
          </Flex>
          <Flex align="center" gap={10}>
            <ActionIcon size="md" variant="default">
              <IconShare size={16} />
            </ActionIcon>
            <span>{t("actions.share")}</span>
          </Flex>
          <Flex align="center" gap={10}>
            <ActionIcon size="md" variant="default">
              <IconEdit size={16} />
            </ActionIcon>
            <span>{t("actions.edit")}</span>
          </Flex>
          <Flex align="center" gap={10}>
            <ActionIcon size="md" variant="default" color="red">
              <IconTrash size={16} />
            </ActionIcon>
            <span>{t("actions.delete")}</span>
          </Flex>
          <Flex align="center" gap={10}>
            <ActionIcon size="md" variant="default">
              <IconLineHeight size={16} />
            </ActionIcon>
            <span>{t("actions.open")}</span>
          </Flex>
        </div>
      </section>

      <Divider />

      <section>
        <Title order={2} fz="lg" fw={700} mb={16}>
          {t("mobile.title")}
        </Title>
        <Text>{t("mobile.text")}</Text>
      </section>
    </div>
  );
}

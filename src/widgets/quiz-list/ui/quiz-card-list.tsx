"use client";

import { useLocale, useTranslations } from "next-intl";

import {
  Flex,
  Text,
  Stack,
  ActionIcon,
  Card,
  Divider,
  Badge,
  SimpleGrid,
} from "@mantine/core";
import {
  IconEdit,
  IconLineHeight,
  IconPlayerPlay,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";

import { QuizWithQuestionsExtended } from "@/entities/quiz/domain";
import { SwitchPublicQuiz } from "@/features";
import { emitter, formatDate, pluralize } from "@/shared/lib";

export function QuizCardsList({
  quizzes,
}: {
  quizzes: QuizWithQuestionsExtended[];
}) {
  const t = useTranslations("widgets.quizList");
  const locale = useLocale();

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 3 }}
      spacing={{ base: 10, sm: 16 }}
      verticalSpacing={{ base: 10, sm: 16 }}
    >
      {quizzes.map((quiz) => (
        <Card withBorder key={quiz.id} p="lg" className="shadow-sm">
          <Flex justify="space-between" align="start" mb={14}>
            <Text className="font-semibold text-lg leading-tight max-w-3/4 truncate">
              {quiz.title}
            </Text>

            <Text opacity={0.5} fz="xs" className="shrink-0">
              {formatDate(quiz.createdAt, locale)}
            </Text>
          </Flex>

          {quiz.description && (
            <Text fz="sm" c="dimmed" className="truncate mb-auto">
              {quiz.description}
            </Text>
          )}

          <Flex gap={8} mt={14} wrap="wrap">
            <Badge size="xs" variant="outline" color="gray">
              {quiz.questionsCount}{" "}
              {pluralize(quiz.questionsCount, [
                t("badges.questions.one"),
                t("badges.questions.few"),
                t("badges.questions.many"),
              ])}
            </Badge>
            <Badge size="xs" variant="outline" color="gray">
              {quiz.attemptsCount}{" "}
              {pluralize(quiz.attemptsCount, [
                t("badges.attempts.one"),
                t("badges.attempts.few"),
                t("badges.attempts.many"),
              ])}
            </Badge>
          </Flex>

          <Divider my={16} />

          <Stack gap={6}>
            <Flex justify="space-between" align="center" gap="lg">
              <Text fz="sm">{t("cards.publicationLabel")}</Text>

              <Badge
                variant="outline"
                size="xs"
                color={quiz.isPublished ? "green" : "gray"}
              >
                {quiz.isPublished
                  ? t("publication.published")
                  : t("publication.unpublished")}
              </Badge>

              <div className="ml-auto" />

              <SwitchPublicQuiz
                quizId={quiz.id}
                initialValue={quiz.isPublished}
                disabled={quiz.questions.length === 0}
              />
            </Flex>
          </Stack>

          <Divider my={16} />

          <Flex
            justify="space-between"
            align="center"
            mt={16}
            wrap="wrap"
            gap={10}
          >
            <Flex gap={10}>
              <ActionIcon
                size="lg"
                variant="default"
                disabled={quiz.questions.length === 0}
                onClick={() =>
                  emitter.emit("quiz-practice-click", { id: quiz.id })
                }
                title={t("actions.practice")}
              >
                <IconPlayerPlay size={18} />
              </ActionIcon>
              <ActionIcon
                size="lg"
                variant="default"
                disabled={quiz.questions.length === 0 || !quiz.isPublished}
                title={t("actions.share")}
                onClick={() =>
                  emitter.emit("invite-token-click", { id: quiz.id })
                }
              >
                <IconShare size={18} />
              </ActionIcon>
              <ActionIcon
                size="lg"
                variant="default"
                title={t("actions.edit")}
                onClick={() => emitter.emit("quiz-edit-click", { id: quiz.id })}
              >
                <IconEdit size={18} />
              </ActionIcon>
            </Flex>

            <Flex gap={10}>
              <ActionIcon
                size="lg"
                color="red"
                variant="default"
                title={t("actions.delete")}
                onClick={() =>
                  emitter.emit("quiz-deleted-click", { id: quiz.id })
                }
              >
                <IconTrash size={18} />
              </ActionIcon>
              <ActionIcon
                size="lg"
                variant="default"
                title={t("actions.open")}
                onClick={() => emitter.emit("quiz-open-click", { id: quiz.id })}
              >
                <IconLineHeight size={18} />
              </ActionIcon>
            </Flex>
          </Flex>
        </Card>
      ))}
    </SimpleGrid>
  );
}

"use client";

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

import { emitter, formatDateRu, pluralize } from "@/shared/lib";
import { SwitchPublicQuiz } from "@/features";
import { QuizWithQuestionsExtended } from "@/entities/quiz/domain";

import {
  IconEdit,
  IconLineHeight,
  IconPlayerPlay,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";

export function QuizCardsList({
  quizzes,
}: {
  quizzes: QuizWithQuestionsExtended[];
}) {
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

            <Text opacity={0.5} fz={"xs"} className="shrink-0">
              {formatDateRu(quiz.createdAt)}
            </Text>
          </Flex>
          {quiz.description && (
            <Text fz="sm" c="dimmed" className="line-clamp-2 mb-auto">
              {quiz.description}
            </Text>
          )}
          <Flex gap={8} mt={14} wrap="wrap">
            <Badge size="xs" variant="outline" color="gray">
              {quiz.questionsCount}{" "}
              {pluralize(quiz.questionsCount, [
                "вопрос",
                "вопроса",
                "вопросов",
              ])}
            </Badge>

            <Badge size="xs" variant="outline" color="gray">
              {quiz.attemptsCount}{" "}
              {pluralize(quiz.attemptsCount, [
                "прохождение",
                "прохождения",
                "прохождений",
              ])}
            </Badge>
          </Flex>
          <Divider my={16} />
          <Stack gap={6}>
            <Flex justify="space-between" align="center" gap={"lg"}>
              <Text fz="sm">Публикация:</Text>
              <Badge
                variant="outline"
                size="xs"
                color={quiz.isPublished ? "green" : "gray"}
              >
                {" "}
                {quiz.isPublished ? "Опубликован" : "Не опубликован"}
              </Badge>
              <div className="ml-auto"></div>
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
                color="blue"
                disabled={quiz.questions.length === 0}
                onClick={() =>
                  emitter.emit("quiz-practice-click", { id: quiz.id })
                }
                title="Пройти"
              >
                <IconPlayerPlay size={18} />
              </ActionIcon>

              <ActionIcon
                size="lg"
                variant="default"
                disabled={quiz.questions.length === 0 || !quiz.isPublished}
                title="Поделиться"
                onClick={() =>
                  emitter.emit("invite-token-click", { id: quiz.id })
                }
              >
                <IconShare size={18} />
              </ActionIcon>

              <ActionIcon
                size="lg"
                variant="default"
                onClick={() => emitter.emit("quiz-edit-click", { id: quiz.id })}
                title="Редактировать"
              >
                <IconEdit size={18} />
              </ActionIcon>
            </Flex>

            <Flex gap={10}>
              <ActionIcon
                size="lg"
                color="red"
                variant="default"
                onClick={() =>
                  emitter.emit("quiz-deleted-click", { id: quiz.id })
                }
                title="Удалить"
              >
                <IconTrash size={18} />
              </ActionIcon>

              <ActionIcon
                size="lg"
                variant="default"
                onClick={() => emitter.emit("quiz-open-click", { id: quiz.id })}
                title="Открыть"
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

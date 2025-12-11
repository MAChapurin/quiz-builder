"use client";

import {
  Table,
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
  IconLineHeight,
  IconShare,
  IconTrash,
  IconEdit,
  IconPlayerPlay,
} from "@tabler/icons-react";

import { QuestionEntity } from "@/entities/question/domain";
import { QuizWithQuestions } from "@/entities/quiz/domain";

import {
  DeleteQuizModal,
  EditQuizModal,
  PracticeQuizModal,
  SwitchPublicQuiz,
  useOpenQuiz,
} from "@/features";
import { emitter, formatDateRu, pluralize } from "@/shared/lib";
import { useEffect, useState } from "react";

export function QuizTable({
  quizzes,
}: {
  quizzes: (QuizWithQuestions & { createdAtFormatted: string })[];
}) {
  const [questions, setQuestions] = useState<QuestionEntity[]>([]);

  useOpenQuiz();

  useEffect(() => {
    return emitter.subscribe("quiz-practice-click", ({ id }) => {
      const targetQuiz = quizzes.find((quiz) => quiz.id === id);
      if (targetQuiz) {
        setQuestions(targetQuiz.questions);
      }
    });
  }, [quizzes]);

  return (
    <div>
      <EditQuizModal quizzes={quizzes} />
      <DeleteQuizModal quizzes={quizzes} />
      <PracticeQuizModal questions={questions} />
      <SimpleGrid
        className="md:hidden"
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing={{ base: 10, sm: "xl" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        {quizzes.map((quiz) => (
          <Card
            withBorder
            key={quiz.id}
            radius="xl"
            p="lg"
            className="shadow-sm"
          >
            <Flex justify="space-between" align="start" mb={14}>
              <Text className="font-semibold text-lg leading-tight max-w-[75%]">
                {quiz.title}
              </Text>

              <Text className="text-[11px] text-gray-500 shrink-0">
                {formatDateRu(quiz.createdAtFormatted)}
              </Text>
            </Flex>
            {quiz.description && (
              <Text fz="sm" c="dimmed" className="line-clamp-2 mb-auto">
                {quiz.description}
              </Text>
            )}
            <Flex gap={8} mt={14} wrap="wrap">
              <Badge size="xs" variant="outline" color="gray">
                {quiz.questions.length}{" "}
                {pluralize(quiz.questions.length, [
                  "вопрос",
                  "вопроса",
                  "вопросов",
                ])}
              </Badge>

              <Badge size="xs" variant="outline" color="gray">
                0 {pluralize(0, ["прохождение", "прохождения", "прохождений"])}
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
                >
                  <IconShare size={18} />
                </ActionIcon>

                <ActionIcon
                  size="lg"
                  variant="default"
                  onClick={() =>
                    emitter.emit("quiz-edit-click", { id: quiz.id })
                  }
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
                  onClick={() =>
                    emitter.emit("quiz-open-click", { id: quiz.id })
                  }
                  title="Открыть"
                >
                  <IconLineHeight size={18} />
                </ActionIcon>
              </Flex>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>

      <Table className="hidden md:table" striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Название</Table.Th>
            <Table.Th className="text-center">Дата создания</Table.Th>
            <Table.Th className="text-center">Количество вопросов</Table.Th>
            <Table.Th className="text-center">Прохождения</Table.Th>
            <Table.Th className="text-center">Публикация</Table.Th>
            <Table.Th className="text-right">Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {quizzes.map((quiz) => (
            <Table.Tr key={quiz.id}>
              <Table.Td>{quiz.title}</Table.Td>
              <Table.Td className="text-center">
                {formatDateRu(quiz.createdAtFormatted)}
              </Table.Td>
              <Table.Td className="text-center">
                {quiz.questions.length}
              </Table.Td>
              <Table.Td className="text-center">0</Table.Td>
              <Table.Td className="text-center">
                <Flex justify={"center"}>
                  <SwitchPublicQuiz
                    quizId={quiz.id}
                    disabled={quiz.questions.length === 0}
                    initialValue={quiz.isPublished}
                  />
                </Flex>
              </Table.Td>
              <Table.Td>
                <Flex className="justify-end gap-2">
                  <ActionIcon
                    size={"md"}
                    variant="default"
                    disabled={quiz.questions.length === 0}
                    onClick={() => {
                      emitter.emit("quiz-practice-click", { id: quiz.id });
                    }}
                  >
                    <IconPlayerPlay size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size={"md"}
                    variant="default"
                    disabled={quiz.questions.length === 0 || !quiz.isPublished}
                  >
                    <IconShare size={16} />
                  </ActionIcon>
                  <ActionIcon
                    variant="default"
                    size={"md"}
                    onClick={() => {
                      emitter.emit("quiz-edit-click", { id: quiz.id });
                    }}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    color="red"
                    variant="default"
                    onClick={() => {
                      emitter.emit("quiz-deleted-click", { id: quiz.id });
                    }}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    variant="default"
                    onClick={() => {
                      emitter.emit("quiz-open-click", { id: quiz.id });
                    }}
                  >
                    <IconLineHeight size={16} />
                  </ActionIcon>
                </Flex>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}

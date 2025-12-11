"use client";

import {
  Table,
  Button,
  Flex,
  Menu,
  Text,
  Box,
  Stack,
  Tooltip,
  Chip,
  ActionIcon,
} from "@mantine/core";
import {
  IconLineHeight,
  IconShare,
  IconTrash,
  IconDotsVertical,
  IconEdit,
  IconPlayerPlay,
} from "@tabler/icons-react";

import { QuizWithQuestions } from "@/entities/quiz/domain";
import {
  DeleteQuizModal,
  EditQuizModal,
  PracticeQuizModal,
  useOpenQuiz,
} from "@/features";
import { emitter, formatDateRu, pluralize } from "@/shared/lib";
import { useEffect, useState } from "react";
import { QuestionEntity } from "@/entities/question/domain";

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
  }, []);

  return (
    <div>
      <EditQuizModal quizzes={quizzes} />
      <DeleteQuizModal quizzes={quizzes} />
      <PracticeQuizModal questions={questions} />
      <Stack className="block md:hidden" gap="sm">
        {quizzes.map((quiz) => (
          <Box key={quiz.id} className="p-4 border border-gray-300 rounded-md">
            <Flex className="justify-between items-start gap-2">
              <Stack gap={1}>
                <Text
                  component="span"
                  className="font-semibold flex items-center gap-2"
                >
                  {quiz.title}
                </Text>
                <Text className="text-xs text-gray-500">
                  {formatDateRu(quiz.createdAtFormatted)}
                </Text>
              </Stack>
              <Stack>
                <Tooltip label="Количество прохождений" refProp="rootRef">
                  <Chip size="xs" defaultChecked>
                    0{" "}
                    {pluralize(0, [
                      "прохождение",
                      "прохождения",
                      "прохождений",
                    ])}
                  </Chip>
                </Tooltip>
                <Tooltip label="Количество вопросов" refProp="rootRef">
                  <Chip size="xs" defaultChecked>
                    {quiz.questions.length}{" "}
                    {pluralize(quiz.questions.length, [
                      "вопрос",
                      "вопроса",
                      "вопросов",
                    ])}
                  </Chip>
                </Tooltip>
              </Stack>

              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Button size="xs" variant="light">
                    <IconDotsVertical size={16} />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconShare size={16} />}>
                    Поделиться
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      emitter.emit("quiz-edit-click", { id: quiz.id });
                    }}
                    leftSection={<IconEdit size={16} />}
                  >
                    Редактировать
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      emitter.emit("quiz-open-click", { id: quiz.id });
                    }}
                    leftSection={<IconLineHeight size={16} />}
                  >
                    Открыть
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      emitter.emit("quiz-deleted-click", { id: quiz.id });
                    }}
                    color="red"
                    leftSection={<IconTrash size={16} />}
                  >
                    Удалить
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Box>
        ))}
      </Stack>

      <Table className="hidden md:table" striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Название</Table.Th>
            <Table.Th className="text-center">Дата создания</Table.Th>
            <Table.Th className="text-center">Количество вопросов</Table.Th>
            <Table.Th className="text-center">Прохождения</Table.Th>
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
              <Table.Td>
                <Flex className="justify-end gap-2">
                  <ActionIcon
                    disabled={quiz.questions.length === 0}
                    size={"md"}
                    variant="outline"
                    onClick={() => {
                      emitter.emit("quiz-practice-click", { id: quiz.id });
                    }}
                  >
                    <IconPlayerPlay size={16} />
                  </ActionIcon>
                  <ActionIcon size={"md"} variant="outline">
                    <IconShare size={16} />
                  </ActionIcon>
                  <ActionIcon
                    variant="outline"
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
                    variant="outline"
                    onClick={() => {
                      emitter.emit("quiz-deleted-click", { id: quiz.id });
                    }}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    variant="outline"
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

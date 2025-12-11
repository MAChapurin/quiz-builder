"use client";

import {
  Table,
  Flex,
  Text,
  Stack,
  Chip,
  ActionIcon,
  Card,
} from "@mantine/core";
import {
  IconLineHeight,
  IconShare,
  IconTrash,
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
      <Stack className="flex md:hidden" gap="lg">
        {quizzes.map((quiz) => (
          <Card
            withBorder
            key={quiz.id}
            radius="xl"
            p="xl"
            className="p-4 shadow-sm"
          >
            <Stack gap={6}>
              <Text className="font-semibold text-base">{quiz.title}</Text>
              <Text className="text-[12px] text-gray-500">
                {formatDateRu(quiz.createdAtFormatted)}
              </Text>
              <Text fz="sm" c="dimmed" className="truncate">
                {quiz.description}
              </Text>
              <Flex gap={8}>
                <Chip size="xs" variant="outline" color="blue" checked={false}>
                  {quiz.questions.length}{" "}
                  {pluralize(quiz.questions.length, [
                    "вопрос",
                    "вопроса",
                    "вопросов",
                  ])}
                </Chip>

                <Chip size="xs" variant="outline" color="green" checked={false}>
                  0{" "}
                  {pluralize(0, ["прохождение", "прохождения", "прохождений"])}
                </Chip>
              </Flex>
            </Stack>
            <Flex justify="space-between" align="center" mt={16}>
              <Flex gap={6}>
                <ActionIcon
                  size="lg"
                  variant="default"
                  color="blue"
                  disabled={quiz.questions.length === 0}
                  onClick={() =>
                    emitter.emit("quiz-practice-click", { id: quiz.id })
                  }
                >
                  <IconPlayerPlay size={18} />
                </ActionIcon>

                <ActionIcon
                  size="lg"
                  variant="default"
                  disabled={quiz.questions.length === 0}
                >
                  <IconShare size={18} />
                </ActionIcon>

                <ActionIcon
                  variant="default"
                  size="lg"
                  onClick={() =>
                    emitter.emit("quiz-edit-click", { id: quiz.id })
                  }
                >
                  <IconEdit size={18} />
                </ActionIcon>
              </Flex>
              <Flex gap={6}>
                <ActionIcon
                  size="lg"
                  color="red"
                  variant="default"
                  onClick={() =>
                    emitter.emit("quiz-deleted-click", { id: quiz.id })
                  }
                >
                  <IconTrash size={18} />
                </ActionIcon>

                <ActionIcon
                  size="lg"
                  variant="default"
                  onClick={() =>
                    emitter.emit("quiz-open-click", { id: quiz.id })
                  }
                >
                  <IconLineHeight size={18} />
                </ActionIcon>
              </Flex>
            </Flex>
          </Card>
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
                    disabled={quiz.questions.length === 0}
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

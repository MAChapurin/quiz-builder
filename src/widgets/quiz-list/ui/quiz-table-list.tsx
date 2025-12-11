"use client";

import { Table, Flex, ActionIcon, Menu } from "@mantine/core";
import {
  IconLineHeight,
  IconShare,
  IconTrash,
  IconEdit,
  IconPlayerPlay,
  IconDotsVertical,
} from "@tabler/icons-react";

import { QuizWithQuestions } from "@/entities/quiz/domain";

import { SwitchPublicQuiz } from "@/features";
import { emitter, formatDateRu } from "@/shared/lib";

export function QuizTableList({
  quizzes,
}: {
  quizzes: (QuizWithQuestions & { createdAtFormatted: string })[];
}) {
  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Название</Table.Th>
          <Table.Th className="text-center hidden sm:table-cell">
            Дата создания
          </Table.Th>
          <Table.Th className="text-center hidden sm:table-cell">
            Количество вопросов
          </Table.Th>
          <Table.Th className="text-center hidden sm:table-cell">
            Прохождения
          </Table.Th>
          <Table.Th className="text-center">Публикация</Table.Th>
          <Table.Th className="text-right">Действия</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {quizzes.map((quiz) => (
          <Table.Tr key={quiz.id}>
            <Table.Td>{quiz.title}</Table.Td>
            <Table.Td className="text-center hidden sm:table-cell">
              {formatDateRu(quiz.createdAtFormatted)}
            </Table.Td>
            <Table.Td className="text-center hidden sm:table-cell">
              {quiz.questions.length}
            </Table.Td>
            <Table.Td className="text-center hidden sm:table-cell">0</Table.Td>
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
              <Flex justify="end" className="gap-2 items-center">
                <Flex className="hidden sm:flex gap-2">
                  <ActionIcon
                    size="md"
                    variant="default"
                    disabled={quiz.questions.length === 0}
                    onClick={() =>
                      emitter.emit("quiz-practice-click", { id: quiz.id })
                    }
                    title="Пройти"
                  >
                    <IconPlayerPlay size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    variant="default"
                    disabled={quiz.questions.length === 0 || !quiz.isPublished}
                    title="Поделиться"
                  >
                    <IconShare size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    variant="default"
                    onClick={() =>
                      emitter.emit("quiz-edit-click", { id: quiz.id })
                    }
                    title="Редактировать"
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    color="red"
                    variant="default"
                    onClick={() =>
                      emitter.emit("quiz-deleted-click", { id: quiz.id })
                    }
                    title="Удалить"
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    variant="default"
                    onClick={() =>
                      emitter.emit("quiz-open-click", { id: quiz.id })
                    }
                    title="Открыть"
                  >
                    <IconLineHeight size={16} />
                  </ActionIcon>
                </Flex>
                <div className="sm:hidden">
                  <Menu position="bottom-end" shadow="md">
                    <Menu.Target>
                      <ActionIcon variant="default" size="md">
                        <IconDotsVertical />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconPlayerPlay size={16} />}
                        disabled={quiz.questions.length === 0}
                        onClick={() =>
                          emitter.emit("quiz-practice-click", { id: quiz.id })
                        }
                      >
                        Пройти
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconShare size={16} />}
                        disabled={
                          quiz.questions.length === 0 || !quiz.isPublished
                        }
                      >
                        Поделиться
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconEdit size={16} />}
                        onClick={() =>
                          emitter.emit("quiz-edit-click", { id: quiz.id })
                        }
                      >
                        Редактировать
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<IconTrash size={16} />}
                        onClick={() =>
                          emitter.emit("quiz-deleted-click", { id: quiz.id })
                        }
                      >
                        Удалить
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconLineHeight size={16} />}
                        onClick={() =>
                          emitter.emit("quiz-open-click", { id: quiz.id })
                        }
                      >
                        Открыть
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              </Flex>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

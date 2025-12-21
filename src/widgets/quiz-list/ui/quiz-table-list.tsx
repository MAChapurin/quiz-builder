"use client";

import { useTranslations } from "next-intl";

import { Table, Flex, ActionIcon, Menu } from "@mantine/core";
import {
  IconLineHeight,
  IconShare,
  IconTrash,
  IconEdit,
  IconPlayerPlay,
  IconDotsVertical,
} from "@tabler/icons-react";

import { QuizWithQuestionsExtended } from "@/entities/quiz/domain";
import { SwitchPublicQuiz } from "@/features";
import { emitter, formatDateRu } from "@/shared/lib";

export function QuizTableList({
  quizzes,
}: {
  quizzes: QuizWithQuestionsExtended[];
}) {
  const t = useTranslations("widgets.quizList");

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{t("table.title")}</Table.Th>
          <Table.Th className="text-center hidden sm:table-cell">
            {t("table.createdAt")}
          </Table.Th>
          <Table.Th className="text-center hidden sm:table-cell">
            {t("table.questionsCount")}
          </Table.Th>
          <Table.Th className="text-center hidden sm:table-cell">
            {t("table.attempts")}
          </Table.Th>
          <Table.Th className="text-center">{t("table.publication")}</Table.Th>
          <Table.Th className="text-right">{t("table.actions")}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {quizzes.map((quiz) => (
          <Table.Tr key={quiz.id}>
            <Table.Td>{quiz.title}</Table.Td>

            <Table.Td className="text-center hidden sm:table-cell">
              {formatDateRu(quiz.createdAt)}
            </Table.Td>

            <Table.Td className="text-center hidden sm:table-cell">
              {quiz.questions.length}
            </Table.Td>

            <Table.Td className="text-center hidden sm:table-cell">
              {quiz.attemptsCount}
            </Table.Td>

            <Table.Td className="text-center">
              <Flex justify="center">
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
                    title={t("actions.practice")}
                    onClick={() =>
                      emitter.emit("quiz-practice-click", { id: quiz.id })
                    }
                  >
                    <IconPlayerPlay size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    variant="default"
                    disabled={quiz.questions.length === 0 || !quiz.isPublished}
                    title={t("actions.share")}
                    onClick={() =>
                      emitter.emit("invite-token-click", { id: quiz.id })
                    }
                  >
                    <IconShare size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    variant="default"
                    title={t("actions.edit")}
                    onClick={() =>
                      emitter.emit("quiz-edit-click", { id: quiz.id })
                    }
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    color="red"
                    variant="default"
                    title={t("actions.delete")}
                    onClick={() =>
                      emitter.emit("quiz-deleted-click", { id: quiz.id })
                    }
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="md"
                    variant="default"
                    title={t("actions.open")}
                    onClick={() =>
                      emitter.emit("quiz-open-click", { id: quiz.id })
                    }
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
                        {t("actions.practice")}
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconShare size={16} />}
                        disabled={
                          quiz.questions.length === 0 || !quiz.isPublished
                        }
                        onClick={() =>
                          emitter.emit("invite-token-click", { id: quiz.id })
                        }
                      >
                        {t("actions.share")}
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconEdit size={16} />}
                        onClick={() =>
                          emitter.emit("quiz-edit-click", { id: quiz.id })
                        }
                      >
                        {t("actions.edit")}
                      </Menu.Item>
                      <Menu.Item
                        color="red"
                        leftSection={<IconTrash size={16} />}
                        onClick={() =>
                          emitter.emit("quiz-deleted-click", { id: quiz.id })
                        }
                      >
                        {t("actions.delete")}
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconLineHeight size={16} />}
                        onClick={() =>
                          emitter.emit("quiz-open-click", { id: quiz.id })
                        }
                      >
                        {t("actions.open")}
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

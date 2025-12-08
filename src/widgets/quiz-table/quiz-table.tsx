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
} from "@tabler/icons-react";

import { QuizEntity } from "@/entities/quiz/domain";
import { DeleteQuizModal, EditQuizModal } from "@/features";
import { emitter, formatDateRu } from "@/shared/lib";

export function QuizTable({
  quizzes,
}: {
  quizzes: (QuizEntity & { createdAtFormatted: string })[];
}) {
  return (
    <div>
      <EditQuizModal quizzes={quizzes} />
      <DeleteQuizModal quizzes={quizzes} />
      <Stack className="block md:hidden" gap="sm">
        {quizzes.map((quiz) => (
          <Box key={quiz.id} className="p-4 border border-gray-300 rounded-md">
            <Flex className="justify-between items-start gap-2">
              <Stack gap={1}>
                <Text
                  component="span"
                  className="font-semibold flex items-center gap-2"
                >
                  <Tooltip label="Количество прохождений" refProp="rootRef">
                    <Chip size="xs" defaultChecked>
                      0
                    </Chip>
                  </Tooltip>
                  {quiz.title}
                </Text>
                <Text className="text-xs text-gray-500">
                  {formatDateRu(quiz.createdAtFormatted)}
                </Text>
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
                  <Menu.Item leftSection={<IconLineHeight size={16} />}>
                    Открыть
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    leftSection={
                      <IconTrash
                        size={16}
                        onClick={() => {
                          emitter.emit("quiz-deleted-click", { id: quiz.id });
                        }}
                      />
                    }
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
              <Table.Td className="text-center">0</Table.Td>
              <Table.Td>
                <Flex className="justify-end gap-2">
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
                  <ActionIcon size="md" variant="outline">
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

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
} from "@mantine/core";
import { QuizEntity } from "@/entities/quiz/domain";
import {
  IconLineHeight,
  IconPencil,
  IconShare,
  IconTrash,
  IconDotsVertical,
} from "@tabler/icons-react";
import { formatDateRu } from "@/shared/lib";
import { useMediaQuery } from "@mantine/hooks";

export function QuizTable({
  quizzes,
}: {
  quizzes: (QuizEntity & { createdAtFormatted: string })[];
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <Stack gap={"sm"}>
        {quizzes.map((quiz) => (
          <Box
            key={quiz.id}
            p="md"
            bd="1px solid var(--mantine-color-gray-3)"
            className="rounded"
          >
            <Flex justify="space-between" align="start" gap="sm">
              <Stack gap={4}>
                <Text fw={600} className="flex items-center gap-4">
                  <Tooltip label="Количество прохождений" refProp="rootRef">
                    <Chip size="xs" defaultChecked>
                      0
                    </Chip>
                  </Tooltip>
                  {quiz.title}{" "}
                </Text>
                <Text size="xs" c="dimmed">
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
                  <Menu.Item leftSection={<IconPencil size={16} />}>
                    Редактировать
                  </Menu.Item>
                  <Menu.Item leftSection={<IconLineHeight size={16} />}>
                    Открыть
                  </Menu.Item>
                  <Menu.Item color="red" leftSection={<IconTrash size={16} />}>
                    Удалить
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Box>
        ))}
      </Stack>
    );
  }

  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Название</Table.Th>
          <Table.Th ta="center">Дата создания</Table.Th>
          <Table.Th ta="center">Прохождения</Table.Th>
          <Table.Th ta="right">Действия</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {quizzes.map((quiz) => (
          <Table.Tr key={quiz.id}>
            <Table.Td>{quiz.title}</Table.Td>
            <Table.Td ta="center">
              {formatDateRu(quiz.createdAtFormatted)}
            </Table.Td>
            <Table.Td ta="center">0</Table.Td>
            <Table.Td>
              <Flex justify="end" gap="xs">
                <Button size="xs" variant="outline">
                  <IconShare size={16} />
                </Button>
                <Button size="xs" variant="outline">
                  <IconPencil size={16} />
                </Button>
                <Button size="xs" color="red" variant="outline">
                  <IconTrash size={16} />
                </Button>
                <Button size="xs" variant="filled">
                  <IconLineHeight size={16} />
                </Button>
              </Flex>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

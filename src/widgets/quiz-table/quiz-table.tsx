"use client";

import { Table, Button, Flex } from "@mantine/core";
import { QuizEntity } from "@/entities/quiz/domain";
import {
  IconLineHeight,
  IconPencil,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";

export function QuizTable({
  quizzes,
}: {
  quizzes: (QuizEntity & { createdAtFormatted: string })[];
}) {
  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Название</Table.Th>
          <Table.Th ta={"center"}>Дата создания</Table.Th>
          <Table.Th ta={"center"}>Прохождения</Table.Th>
          <Table.Th ta={"right"}>Действия</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {quizzes.map((quiz) => (
          <Table.Tr key={quiz.id}>
            <Table.Td>{quiz.title}</Table.Td>
            <Table.Td ta={"center"}>{quiz.createdAtFormatted}</Table.Td>
            <Table.Td ta={"center"}>{0}</Table.Td>
            <Table.Td>
              <Flex align={"center"} justify={"end"} gap="xs">
                <Button size="xs" variant="outline">
                  <IconShare />
                </Button>
                <Button size="xs" variant="outline">
                  <IconPencil />
                </Button>
                <Button size="xs" color="red" variant="outline">
                  <IconTrash />
                </Button>
                <Button size="xs" variant="filled">
                  <IconLineHeight />
                </Button>
              </Flex>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

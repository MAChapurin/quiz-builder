"use client";

import { Table, Badge } from "@mantine/core";
import { formatDateRu } from "@/shared/lib";
import { QuizAttemptEntity } from "@/entities/attempt/domain";

export function AttemptList({ attempts }: { attempts: QuizAttemptEntity[] }) {
  return (
    <Table striped highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Квиз</Table.Th>
          <Table.Th className="text-center hidden sm:table-cell">
            Дата прохождения
          </Table.Th>
          <Table.Th className="text-center">Результат</Table.Th>
          <Table.Th className="text-center">Метка</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {attempts.map((attempt) => (
          <Table.Tr key={attempt.id}>
            <Table.Td>{attempt.quizTitle}</Table.Td>
            <Table.Td className="text-center hidden sm:table-cell">
              {attempt.createdAt
                ? formatDateRu(new Date(attempt.createdAt), { withTime: true })
                : "-"}
            </Table.Td>
            <Table.Td className="text-center">
              <Badge variant="light">
                {attempt.score ?? 0} / {attempt.total ?? 0}
              </Badge>
            </Table.Td>
            <Table.Td className="text-center">{attempt.label}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}

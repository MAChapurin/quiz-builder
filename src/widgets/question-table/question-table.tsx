"use client";

import { QuestionEntity } from "@/entities/question/domain";
import { Table, Flex } from "@mantine/core";

export function QuestionTable({ questions }: { questions: QuestionEntity[] }) {
  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>Вопрос</th>
          <th className="text-center">Тип</th>
          <th className="text-right">Действия</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q) => (
          <tr key={q.id}>
            <td>{q.text}</td>
            <td className="text-center">{q.type}</td>
            <td>
              <Flex justify="end" gap="xs">
                {/* <EditQuestionModal question={q} /> */}
                {/* <DeleteQuestionModal question={q} /> */}
              </Flex>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

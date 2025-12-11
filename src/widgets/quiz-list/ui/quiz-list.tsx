"use client";

import { Divider, SegmentedControl } from "@mantine/core";
import { QuestionEntity } from "@/entities/question/domain";
import { QuizWithQuestions } from "@/entities/quiz/domain";

import {
  DeleteQuizModal,
  EditQuizModal,
  PracticeQuizModal,
  useOpenQuiz,
} from "@/features";
import { emitter } from "@/shared/lib";
import { useEffect, useState } from "react";
import { QuizTableList } from "./quiz-table-list";
import { QuizCardsList } from "./quiz-card-list";
import { IconArticle, IconBorderAll } from "@tabler/icons-react";

export function QuizList({
  quizzes,
}: {
  quizzes: (QuizWithQuestions & { createdAtFormatted: string })[];
}) {
  const [questions, setQuestions] = useState<QuestionEntity[]>([]);
  const [view, setView] = useState<"table" | "cards">("cards");

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
      <Divider my={16} />
      <SegmentedControl
        value={view}
        onChange={(v) => setView(v as "table" | "cards")}
        data={[
          { label: <IconArticle />, value: "table" },
          { label: <IconBorderAll />, value: "cards" },
        ]}
        size="sm"
      />
      <Divider my={16} />

      <EditQuizModal quizzes={quizzes} />
      <DeleteQuizModal quizzes={quizzes} />
      <PracticeQuizModal questions={questions} />

      {view === "table" ? (
        <QuizTableList quizzes={quizzes} />
      ) : (
        <QuizCardsList quizzes={quizzes} />
      )}

      <div className="h-10" />
    </div>
  );
}

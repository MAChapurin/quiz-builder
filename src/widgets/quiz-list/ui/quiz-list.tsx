"use client";

import { useEffect, useState } from "react";

import { Divider, Flex, SegmentedControl } from "@mantine/core";
import { IconArticle, IconBorderAll } from "@tabler/icons-react";

import { QuestionEntity } from "@/entities/question/domain";
import { QuizWithQuestionsExtended } from "@/entities/quiz/domain";
import {
  DeleteQuizModal,
  EditQuizModal,
  GenerateInviteModal,
  HelpDrawer,
  PracticeQuizModal,
  QuizHelpContent,
  useOpenQuiz,
} from "@/features";
import { COOKIE_KEYS } from "@/shared/config";
import { emitter, setCookie } from "@/shared/lib";

import { QuizTableList } from "./quiz-table-list";
import { QuizCardsList } from "./quiz-card-list";

export type QuizListViewType = "table" | "cards";

export function QuizList({
  quizzes,
  initialView,
}: {
  quizzes: QuizWithQuestionsExtended[];
  initialView: QuizListViewType;
}) {
  const [questions, setQuestions] = useState<QuestionEntity[]>([]);
  const [view, setView] = useState<QuizListViewType>(initialView);

  useOpenQuiz();

  useEffect(() => {
    setCookie(COOKIE_KEYS.QUIZ_LIST_VIEW, view, 365);
  }, [view]);

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
      <Flex align={"center"} justify={"space-between"}>
        <SegmentedControl
          value={view}
          onChange={(v) => setView(v as QuizListViewType)}
          data={[
            { label: <IconArticle />, value: "table" },
            { label: <IconBorderAll />, value: "cards" },
          ]}
          size="sm"
        />
        <HelpDrawer content={<QuizHelpContent />} />
      </Flex>
      <Divider my={16} />

      <EditQuizModal quizzes={quizzes} />
      <DeleteQuizModal quizzes={quizzes} />
      <PracticeQuizModal questions={questions} />
      <GenerateInviteModal quizzes={quizzes} />

      {view === "table" ? (
        <QuizTableList quizzes={quizzes} />
      ) : (
        <QuizCardsList quizzes={quizzes} />
      )}

      <div className="h-10" />
    </div>
  );
}

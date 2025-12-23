import { cookies } from "next/headers";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Center, Container, Stack, Text, Title } from "@mantine/core";

import { QuizList, QuizListViewType } from "@/widgets";
import { CreateQuizButton } from "@/features";
import { sessionService } from "@/entities/user/server";
import { quizService } from "@/entities/quiz/server";
import { matchEither } from "@/shared/lib";
import { COOKIE_KEYS } from "@/shared/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("app.quizzes.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function QuizzesPage() {
  const [{ session }, cookieStore, t] = await Promise.all([
    sessionService.verifySession(),
    cookies(),
    getTranslations("app.quizzes"),
  ]);

  const view = cookieStore.get(COOKIE_KEYS.QUIZ_LIST_VIEW)?.value ?? "cards";

  const quizzesResult = await quizService.getQuizzesWithQuestionsByUser(
    session.id,
  );

  const quizzes = matchEither(quizzesResult, {
    left: () => [],
    right: (q) => q,
  });

  console.log(quizzes);

  return (
    <>
      <Container size="lg">
        <div className="flex justify-between items-center my-4">
          <Title className="text-xl font-bold">{t("title")}</Title>
          <CreateQuizButton />
        </div>

        {quizzes.length === 0 ? (
          <Stack>
            <Center className="h-[50dvh]">
              <Text>{t("empty")}</Text>
            </Center>
          </Stack>
        ) : (
          <QuizList quizzes={quizzes} initialView={view as QuizListViewType} />
        )}
      </Container>
    </>
  );
}

import { Metadata } from "next";
import {
  Center,
  Container,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import { COOKIE_KEYS } from "@/shared/config";
import { getServerCookies, matchEither } from "@/shared/lib";
import { sessionService } from "@/entities/user/server";
import { attemptService } from "@/entities/attempt/server";

import { AttemptList } from "@/widgets/attempt-list";
import {
  AttemptsQuizFilterChips,
  AttemptsQuizFilterResetButton,
} from "@/features/attempt-filter";
import { IconFilterOff, IconListSearch } from "@tabler/icons-react";
import { quizService } from "@/entities/quiz/server";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("app.results.meta");
  return {
    title: t("title"),
    description: t("description"),
  };
};

type Props = { searchParams: Promise<{ quiz?: string }> };

export default async function ResultsPage({ searchParams }: Props) {
  const { session } = await sessionService.verifySession();

  const params = await searchParams;
  const cookies = await getServerCookies();

  const initialFilterIds =
    params.quiz?.split(",").filter(Boolean) ??
    cookies[COOKIE_KEYS.ATTEMPT]?.split(",").filter(Boolean) ??
    [];

  const [attemptsEither, titlesEither, t] = await Promise.all([
    attemptService.getAttemptsForAuthor(session.id, initialFilterIds),
    quizService.getQuizTitlesByUser(session.id),
    getTranslations("app.results.page"),
  ]);

  const attempts = matchEither(attemptsEither, {
    left: () => [],
    right: (a) => a,
  });

  const titles = matchEither(titlesEither, {
    left: () => [],
    right: (t) => t,
  });

  const noAttempts = attempts.length === 0;
  const filteredOut = initialFilterIds.length > 0 && noAttempts;
  const showFilters = initialFilterIds.length > 0 || attempts.length > 0;

  return (
    <Container size="lg">
      <div className="flex justify-between items-center my-4">
        <Title className="text-xl font-bold">{t("title")}</Title>
      </div>

      {showFilters && (
        <AttemptsQuizFilterChips
          titles={titles}
          initialValue={initialFilterIds}
        />
      )}

      {noAttempts ? (
        <Center mih="70vh" px="md">
          <Stack align="center" gap="sm" maw={420} ta="center">
            <ThemeIcon size={64} variant="light">
              {filteredOut ? (
                <IconFilterOff size={32} />
              ) : (
                <IconListSearch size={32} />
              )}
            </ThemeIcon>

            <Title order={3}>
              {filteredOut ? t("subtitleFilteredOut") : t("subtitleNoAttempts")}
            </Title>

            <Text c="dimmed">
              {filteredOut ? t("textNoResults") : t("textNoAttempts")}
            </Text>

            {filteredOut && <AttemptsQuizFilterResetButton />}
          </Stack>
        </Center>
      ) : (
        <AttemptList attempts={attempts} />
      )}
    </Container>
  );
}

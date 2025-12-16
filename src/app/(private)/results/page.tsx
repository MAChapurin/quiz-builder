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
import { getQuizTitlesByUserService } from "@/entities/quiz/services/quiz";

import { AttemptList } from "@/widgets/attempt-list";
import {
  AttemptsQuizFilterChips,
  AttemptsQuizFilterResetButton,
} from "@/features/attempt-filter";
import { IconFilterOff, IconListSearch } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Результаты квизов",
  description: "Результаты прохождений ваших квизов",
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

  const [attemptsEither, titlesEither] = await Promise.all([
    attemptService.getAttemptsForAuthor(session.id, initialFilterIds),
    getQuizTitlesByUserService(session.id),
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
        <Title className="text-xl font-bold">Результаты прохождений</Title>
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
              {filteredOut ? "Ничего не найдено" : "Пока нет результатов"}
            </Title>

            <Text c="dimmed">
              {filteredOut
                ? "Выбранные фильтры не дали результатов. Попробуйте снять их или выбрать другие квизы."
                : "Когда кто-нибудь пройдет ваши квизы, результаты появятся здесь."}
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

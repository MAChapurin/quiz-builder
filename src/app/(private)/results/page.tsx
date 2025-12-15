import Link from "next/link";
import { Metadata } from "next";
import { Button, Center, Container, Stack, Text, Title } from "@mantine/core";

import { routes } from "@/shared/config";
import { matchEither } from "@/shared/lib/either";
import { sessionService } from "@/entities/user/server";

import { AttemptList } from "@/widgets/attempt-list";
import { getAttemptsForAuthorService } from "@/entities/attempt/services/get-attempts-for-author";

export const metadata: Metadata = {
  title: "Результаты квизов",
  description: "Результаты прохождений ваших квизов",
};

export default async function ResultsPage() {
  const { session } = await sessionService.verifySession();
  if (!session) return <UserNotFound />;

  const attemptsEither = await getAttemptsForAuthorService(session.id);

  const attempts = matchEither(attemptsEither, {
    left: () => [],
    right: (a) => a,
  });

  return (
    <Container size="lg">
      <div className="flex justify-between items-center my-4">
        <Title className="text-xl font-bold">Результаты прохождений</Title>
      </div>

      {attempts.length === 0 ? (
        <Center mih="70vh" px="md">
          <Stack align="center">
            <Text>Пока нет результатов прохождений</Text>
            <Text>
              Отправльте несколько ссылок на прохождение ваших квизов, чтобы
              увидеть результаты здесь.
            </Text>
            <Button component={Link} href={routes.QUIZZES}>
              К квизам
            </Button>
          </Stack>
        </Center>
      ) : (
        <AttemptList attempts={attempts} />
      )}
    </Container>
  );
}

function UserNotFound() {
  return (
    <Center mih="70vh" px="md">
      <Title>Ошибка: пользователь не найден</Title>
      <Text>Пожалуйста, войдите в систему заново.</Text>
      <Button component={Link} href={routes.LOGIN}>
        Войти
      </Button>
    </Center>
  );
}

"use client";

import { LINKS_ID } from "@/shared/config";
import { Accordion, Box, Container, Title } from "@mantine/core";

export function FAQ() {
  return (
    <Box py={80} id={LINKS_ID.FAQ}>
      <Container size="lg">
        <Title order={2} ta="center" mb={40} fw={700}>
          Часто задаваемые вопросы
        </Title>
        <Accordion radius="md" variant="separated">
          <Accordion.Item value="q1">
            <Accordion.Control>Это бесплатно?</Accordion.Control>
            <Accordion.Panel>
              Да, сервис полностью бесплатный. Вы можете создавать любое
              количество тестов, делиться ими и получать ответы без ограничений.
              В будущем могут появиться расширенные функции, но базовый
              функционал всегда останется бесплатным.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="q2">
            <Accordion.Control>Нужно ли регистрироваться?</Accordion.Control>
            <Accordion.Panel>
              Для прохождения тестов регистрация не требуется — достаточно
              открыть ссылку. Однако, чтобы создавать тесты, сохранять их,
              просматривать результаты и управлять структурой вопросов,
              потребуется создать аккаунт.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="q3">
            <Accordion.Control>
              Можно ли редактировать тест после публикации?
            </Accordion.Control>
            <Accordion.Panel>
              Да, вы можете изменять вопросы, варианты ответов и настройки теста
              в любой момент. Изменения моментально вступают в силу, и
              пользователи увидят обновлённую версию теста при следующем
              открытии.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="q4">
            <Accordion.Control>
              Могут ли пользователи проходить тест без аккаунта?
            </Accordion.Control>
            <Accordion.Panel>
              Да, это одна из ключевых возможностей. Пользователь просто
              открывает ссылку и может сразу начинать прохождение. Это удобно
              для быстрых опросов, анкетирования и обратной связи.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </Box>
  );
}

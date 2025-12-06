'use client'

import { Header } from "@/widgets";
import {
  AppShell,
  Button,
  Container,
  Title,
  Text,
  Card,
  Group,
  Stack,
  SimpleGrid,
  Box,
  Center,
  Flex,
  Accordion,
  ActionIcon
} from "@mantine/core";
import { IconBrandGithub, IconCheck, IconLink, IconPuzzle } from "@tabler/icons-react";



function Footer() {
  return (
    <footer>
    <Box py={40}>
      <Container size="lg">
        <Flex h="100%" align="center" justify="space-between">
            <Text>© {new Date().getFullYear()} TestBuilder. Все права защищены.</Text>
          <ActionIcon component="a" href="https://github.com/MAChapurin" target="_blank" rel="noopener noreferrer">
              <IconBrandGithub size={24} className="text-white" />
            </ActionIcon>
        </Flex>
          
      </Container>
    </Box>
    </footer>
  );
}

function FAQ() {
  return (
    <Box py={80} id="faq">
      <Container size="lg">
        <Title order={2} ta="center" mb={40} fw={700}>Часто задаваемые вопросы</Title>
        <Accordion radius="md" variant="separated">
          <Accordion.Item value="q1">
            <Accordion.Control>Это бесплатно?</Accordion.Control>
            <Accordion.Panel>
              Да, сервис полностью бесплатный. Вы можете создавать любое количество тестов,
              делиться ими и получать ответы без ограничений. В будущем могут появиться
              расширенные функции, но базовый функционал всегда останется бесплатным.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="q2">
            <Accordion.Control>Нужно ли регистрироваться?</Accordion.Control>
            <Accordion.Panel>
              Для прохождения тестов регистрация не требуется — достаточно открыть ссылку.
              Однако, чтобы создавать тесты, сохранять их, просматривать результаты и управлять
              структурой вопросов, потребуется создать аккаунт.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="q3">
            <Accordion.Control>Можно ли редактировать тест после публикации?</Accordion.Control>
            <Accordion.Panel>
              Да, вы можете изменять вопросы, варианты ответов и настройки теста в любой момент.
              Изменения моментально вступают в силу, и пользователи увидят обновлённую версию
              теста при следующем открытии.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="q4">
            <Accordion.Control>Могут ли пользователи проходить тест без аккаунта?</Accordion.Control>
            <Accordion.Panel>
              Да, это одна из ключевых возможностей. Пользователь просто открывает ссылку
              и может сразу начинать прохождение. Это удобно для быстрых опросов,
              анкетирования и обратной связи.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </Box>
  );
}

export default function HomePage() {
  return (
    <AppShell header={{ height: 60 }} padding="0">
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Box id="home">
          <Box py={80}>
            <Container size="lg">
              <Center>
                <Stack align="center" maw={700}>
                  <Title order={1} fw={800} ta="center">Создавайте тесты быстро и удобно</Title>
                  <Text fz="lg" c="dimmed" ta="center">
                    Современный конструктор тестов с удобным интерфейсом, гибкими настройками и мгновенным сбором ответов.
                  </Text>
                  <Group mt="md">
                    <Button size="md" radius="md">Создать тест</Button>
                    <Button size="md" variant="outline" radius="md">Попробовать демо</Button>
                  </Group>
                </Stack>
              </Center>
            </Container>
          </Box>

          <Box py={80} id="features">
            <Container size="lg">
              <Title order={2} ta="center" mb={40} fw={700}>Возможности платформы</Title>
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
                <Card withBorder radius="lg" p="xl">
                  <Group mb="sm"><IconPuzzle size={32} /><Title order={3}>Разные типы вопросов</Title></Group>
                  <Text c="dimmed">Одиночный выбор, множественный выбор, длинные ответы, шкалы, списки и многое другое.</Text>
                </Card>

                <Card withBorder radius="lg" p="xl">
                  <Group mb="sm"><IconLink size={32} /><Title order={3}>Простое распространение</Title></Group>
                  <Text c="dimmed">Отправляйте ссылку — любой человек сможет открыть тест без регистрации.</Text>
                </Card>

                <Card withBorder radius="lg" p="xl">
                  <Group mb="sm"><IconCheck size={32} /><Title order={3}>Ответы и аналитика</Title></Group>
                  <Text c="dimmed">Просматривайте статистику и результаты в реальном времени, выгружайте данные при необходимости.</Text>
                </Card>
              </SimpleGrid>
            </Container>
          </Box>

          <Box py={80} id="how">
            <Container size="lg">
              <Title order={2} ta="center" mb={40} fw={700}>Как это работает</Title>
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={30}>
                <Card withBorder radius="lg" p="xl" ta="center">
                  <Title order={3} mb="sm">1. Создайте тест</Title>
                  <Text c="dimmed">Добавьте вопросы, выберите типы ответов, настройте дизайн и структуру теста.</Text>
                </Card>

                <Card withBorder radius="lg" p="xl" ta="center">
                  <Title order={3} mb="sm">2. Поделитесь ссылкой</Title>
                  <Text c="dimmed">Отправьте ссылку участникам, разместите её в соцсетях или на сайте.</Text>
                </Card>

                <Card withBorder radius="lg" p="xl" ta="center">
                  <Title order={3} mb="sm">3. Получите результаты</Title>
                  <Text c="dimmed">Следите за ответами, анализируйте данные и выгружайте их в нужном формате.</Text>
                </Card>
              </SimpleGrid>
            </Container>
          </Box>

          <FAQ />

          <Box py={80}>
            <Container size="lg">
              <Center>
                <Stack align="center">
                  <Title order={2} fw={800} ta="center">Готовы создать свой первый тест?</Title>
                  <Text fz="lg" c="dimmed" ta="center">
                    Начните прямо сейчас — это бесплатно и занимает всего пару минут.
                  </Text>
                  <Button size="lg" radius="md">Начать сейчас</Button>
                </Stack>
              </Center>
            </Container>
          </Box>

          <Footer />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

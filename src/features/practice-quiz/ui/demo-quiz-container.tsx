"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  Stack,
  Card,
  Text,
  Title,
  SimpleGrid,
} from "@mantine/core";
import {
  IconBrandReact,
  IconBrandTypescript,
  IconServer,
  IconBrandNodejs,
  IconDatabase,
  IconLayoutDashboard,
} from "@tabler/icons-react";

import { QuestionEntity } from "@/entities/question/domain";
import { demoQuestions } from "../mock";
import { emitter } from "@/shared/lib";
import { PracticeQuizModal } from "./practice-quiz-modal";

export function DemoQuizContainer() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [questions, setQuestions] = useState<QuestionEntity[]>([]);

  const handleSelectCategory = (key: keyof typeof demoQuestions) => {
    const list = demoQuestions[key];
    setQuestions(list);
    setCategoryOpen(false);
    setTimeout(() => {
      emitter.emit("quiz-practice-click", { id: list[0].id });
    }, 0);
  };

  return (
    <>
      <Button onClick={() => setCategoryOpen(true)}>Пройти демо-квиз</Button>

      <Modal
        opened={categoryOpen}
        onClose={() => setCategoryOpen(false)}
        title="Выберите категорию"
        centered
        size="lg"
      >
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <CategoryCard
            title="Frontend basics"
            description="HTML, CSS, SPA"
            icon={<IconLayoutDashboard size={28} />}
            onClick={() => handleSelectCategory("frontendBasics")}
          />

          <CategoryCard
            title="React"
            description="Hooks, Virtual DOM"
            icon={<IconBrandReact size={28} />}
            onClick={() => handleSelectCategory("react")}
          />

          <CategoryCard
            title="TypeScript"
            description="Типы, интерфейсы"
            icon={<IconBrandTypescript size={28} />}
            onClick={() => handleSelectCategory("typescript")}
          />

          <CategoryCard
            title="Backend basics"
            description="REST, API"
            icon={<IconServer size={28} />}
            onClick={() => handleSelectCategory("backendBasics")}
          />

          <CategoryCard
            title="Node.js"
            description="Event loop, V8"
            icon={<IconBrandNodejs size={28} />}
            onClick={() => handleSelectCategory("nodejs")}
          />

          <CategoryCard
            title="Databases"
            description="SQL, индексы"
            icon={<IconDatabase size={28} />}
            onClick={() => handleSelectCategory("databases")}
          />
        </SimpleGrid>
      </Modal>

      {questions.length > 0 && <PracticeQuizModal questions={questions} />}
    </>
  );
}

type CategoryCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
};

function CategoryCard({
  title,
  description,
  icon,
  onClick,
}: CategoryCardProps) {
  return (
    <Card
      pos={"relative"}
      withBorder
      radius="lg"
      p="lg"
      onClick={onClick}
      className="
        cursor-pointer
        active:scale-[0.98]
        transition-all
        hover:shadow-md
        hover:bg-gray-50
        dark:hover:bg-gray-700
      "
    >
      <Stack gap="xs">
        <div className="text-blue-500">{icon}</div>
        <Title order={4}>{title}</Title>
        <Text size="sm" c="dimmed">
          {description}
        </Text>
      </Stack>
    </Card>
  );
}

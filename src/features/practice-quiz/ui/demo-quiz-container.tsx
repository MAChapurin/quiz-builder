"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

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
import { emitter } from "@/shared/lib";

import { demoQuestions } from "../mock";
import { PracticeQuizModal } from "./practice-quiz-modal";

const categories: {
  key: keyof typeof demoQuestions;
  icon: React.ReactNode;
}[] = [
  { key: "frontendBasics", icon: <IconLayoutDashboard size={28} /> },
  { key: "react", icon: <IconBrandReact size={28} /> },
  { key: "typescript", icon: <IconBrandTypescript size={28} /> },
  { key: "backendBasics", icon: <IconServer size={28} /> },
  { key: "nodejs", icon: <IconBrandNodejs size={28} /> },
  { key: "databases", icon: <IconDatabase size={28} /> },
];

export function DemoQuizContainer() {
  const t = useTranslations("features.demoQuiz");
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
      <Button onClick={() => setCategoryOpen(true)}>
        {t("button.categorySelector")}
      </Button>

      <Modal
        opened={categoryOpen}
        onClose={() => setCategoryOpen(false)}
        title={t("modal.categorySelector.title")}
        centered
        size="lg"
      >
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {categories.map(({ key, icon }) => (
            <CategoryCard
              key={key}
              icon={icon}
              title={t(`modal.categorySelector.categories.${key}.title`)}
              description={t(
                `modal.categorySelector.categories.${key}.description`,
              )}
              onClick={() => handleSelectCategory(key)}
            />
          ))}
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
      pos="relative"
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

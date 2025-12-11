import { ActionIcon, Badge, Divider, Flex, Text, Title } from "@mantine/core";

import {
  IconPlayerPlay,
  IconShare,
  IconEdit,
  IconTrash,
  IconLineHeight,
  IconArticle,
  IconBorderAll,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

export function QuizHelpContent() {
  return (
    <div className="space-y-4">
      <section>
        <Title order={2} fz={"lg"} fw={700} mb={16}>
          О странице квизов
        </Title>
        <Text>
          Здесь отображаются все ваши квизы. Вы можете переключать режим
          отображения (таблица или карточки), проходить квизы, делиться ими,
          редактировать, удалять и управлять публикацией.
        </Text>
      </section>
      <Divider />
      <section>
        <Title order={2} fz={"lg"} fw={700} mb={16}>
          Режим отображения
        </Title>
        <ul className="mt-3 list-none">
          <li className="mb-4">
            <ActionIcon variant="default" className="mr-4">
              <IconArticle size={16} />
            </ActionIcon>
            <b>Таблица</b> — компактный, структурированный вид, подходит для ПК.
          </li>
          <li>
            <ActionIcon variant="default" className="mr-4">
              <IconBorderAll size={16} />
            </ActionIcon>
            <b>Карточки</b> — более визуальный режим, удобный на мобильных
            устройствах.
          </li>
        </ul>
      </section>
      <Divider />
      <section>
        <Title order={2} fz={"lg"} fw={700} mb={16}>
          Статус публикации
        </Title>
        <Text className="mb-2">Каждый квиз имеет статус публикации:</Text>
        <Flex direction="column" gap={8}>
          <Flex align="center" gap={8}>
            <Badge color="green" variant="outline" size="xs">
              Опубликован
            </Badge>
            <IconCheck size={16} color="green" />
          </Flex>
          <Flex align="center" gap={8}>
            <Badge color="gray" variant="outline" size="xs">
              Не опубликован
            </Badge>
            <IconX size={16} color="gray" />
          </Flex>
        </Flex>
        <Text className="mt-3">
          Квиз можно опубликовать только если в нём есть хотя бы один вопрос.
        </Text>
      </section>
      <Divider />
      <section>
        <Title order={2} fz={"lg"} fw={700} mb={16}>
          Информация о квизе
        </Title>
        <ul className="list-disc ml-6">
          <li>Количество вопросов — отображается в виде бейджа.</li>
          <li>Число прохождений — сколько раз пользователи прошли квиз.</li>
          <li>Дата создания — сортируется по умолчанию.</li>
        </ul>
      </section>
      <Divider />
      <section>
        <Title order={2} fz={"lg"} fw={700} mb={16}>
          Кнопки действий
        </Title>
        <Text className="mb-3">
          На странице используются кнопки с иконками. Ниже показано, что каждая
          значит:
        </Text>
        <div className="space-y-2">
          <Flex align="center" gap={10}>
            <ActionIcon size="md" variant="default">
              <IconPlayerPlay size={16} />
            </ActionIcon>
            <span>Пройти — начать прохождение квиза</span>
          </Flex>
          <Flex align="center" gap={10}>
            <ActionIcon size="md" variant="default">
              <IconShare size={16} />
            </ActionIcon>
            <span>Поделиться — получить ссылку на квиз</span>
          </Flex>
          <Flex align="center" gap={10}>
            <ActionIcon size="md" variant="default">
              <IconEdit size={16} />
            </ActionIcon>
            <span>Редактировать — изменить название, описание и вопросы</span>
          </Flex>
          <Flex align="center" gap={10}>
            <ActionIcon size="md" variant="default" color="red">
              <IconTrash size={16} />
            </ActionIcon>
            <span>Удалить — полностью удалить квиз</span>
          </Flex>
          <Flex align="center" gap={10}>
            <ActionIcon size="md" variant="default">
              <IconLineHeight size={16} />
            </ActionIcon>
            <span>Открыть — перейти к детальному просмотру квиза</span>
          </Flex>
        </div>
      </section>
      <Divider />
      <section>
        <Title order={2} fz={"lg"} fw={700} mb={16}>
          Мобильная версия
        </Title>
        <Text>
          На маленьких экранах часть действий может быть вынесена в меню для
          экономии места. Иконки остаются такими же, а подсказки доступны через
          тултипы.
        </Text>
      </section>
    </div>
  );
}

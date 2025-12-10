import {
  QuestionEntity,
  QuestionType,
  OptionEntity,
} from "@/entities/question/domain";

const makeOption = (
  questionId: string,
  id: string,
  text: string,
  isCorrect: boolean,
): OptionEntity => ({
  id,
  questionId,
  text,
  isCorrect,
});

export const demoQuestions: Record<string, QuestionEntity[]> = {
  frontendBasics: [
    {
      id: "q-fb-1",
      quizId: "frontendBasics",
      text: "Что такое HTML?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-fb-1", "o1", "Язык разметки", true),
        makeOption("q-fb-1", "o2", "Язык программирования", false),
        makeOption("q-fb-1", "o3", "CSS-фреймворк", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-fb-2",
      quizId: "frontendBasics",
      text: "Какие теги относятся к блочным элементам?",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-fb-2", "o1", "<div>", true),
        makeOption("q-fb-2", "o2", "<span>", false),
        makeOption("q-fb-2", "o3", "<p>", true),
        makeOption("q-fb-2", "o4", "<a>", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-fb-3",
      quizId: "frontendBasics",
      text: "CSS — это?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-fb-3", "o1", "Каскадные таблицы стилей", true),
        makeOption("q-fb-3", "o2", "Язык программирования", false),
        makeOption("q-fb-3", "o3", "Фреймворк", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-fb-4",
      quizId: "frontendBasics",
      text: "Выберите свойства, относящиеся к flexbox",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-fb-4", "o1", "justify-content", true),
        makeOption("q-fb-4", "o2", "align-items", true),
        makeOption("q-fb-4", "o3", "float", false),
        makeOption("q-fb-4", "o4", "grid-template", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-fb-5",
      quizId: "frontendBasics",
      text: "Что делает тег <a>?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-fb-5", "o1", "Ссылка", true),
        makeOption("q-fb-5", "o2", "Изображение", false),
        makeOption("q-fb-5", "o3", "Скрипт", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-fb-6",
      quizId: "frontendBasics",
      text: "Выберите свойства, которые можно анимировать через CSS",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-fb-6", "o1", "opacity", true),
        makeOption("q-fb-6", "o2", "transform", true),
        makeOption("q-fb-6", "o3", "color", true),
        makeOption("q-fb-6", "o4", "display", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-fb-7",
      quizId: "frontendBasics",
      text: "Что такое селектор CSS?",
      type: QuestionType.SINGLE,
      options: [
        makeOption(
          "q-fb-7",
          "o1",
          "Правило выбора элементов для стилизации",
          true,
        ),
        makeOption("q-fb-7", "o2", "Тег HTML", false),
        makeOption("q-fb-7", "o3", "Свойство JS", false),
      ],
      createdAt: new Date(),
    },
  ],

  react: [
    {
      id: "q-r-1",
      quizId: "react",
      text: "Что такое Virtual DOM?",
      type: QuestionType.SINGLE,
      options: [
        makeOption(
          "q-r-1",
          "o1",
          "Абстракция DOM для ускорения рендеринга",
          true,
        ),
        makeOption("q-r-1", "o2", "База данных", false),
        makeOption("q-r-1", "o3", "CSS-фреймворк", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-r-2",
      quizId: "react",
      text: "Выберите встроенные хуки React",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-r-2", "o1", "useState", true),
        makeOption("q-r-2", "o2", "useEffect", true),
        makeOption("q-r-2", "o3", "useAsync", false),
        makeOption("q-r-2", "o4", "useRouter", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-r-3",
      quizId: "react",
      text: "JSX — это?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-r-3", "o1", "Синтаксис для описания UI", true),
        makeOption("q-r-3", "o2", "Язык программирования", false),
        makeOption("q-r-3", "o3", "Библиотека для стилей", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-r-4",
      quizId: "react",
      text: "Выберите методы жизненного цикла",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-r-4", "o1", "componentDidMount", true),
        makeOption("q-r-4", "o2", "componentWillUnmount", true),
        makeOption("q-r-4", "o3", "renderDOM", false),
        makeOption("q-r-4", "o4", "useEffect", true),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-r-5",
      quizId: "react",
      text: "Что делает useState?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-r-5", "o1", "Хранит состояние компонента", true),
        makeOption("q-r-5", "o2", "Создаёт DOM элемент", false),
        makeOption("q-r-5", "o3", "Выполняет AJAX-запрос", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-r-6",
      quizId: "react",
      text: "Выберите синтаксис для передачи пропсов",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-r-6", "o1", "props.name", true),
        makeOption("q-r-6", "o2", "this.props.name", true),
        makeOption("q-r-6", "o3", "state.name", false),
      ],
      createdAt: new Date(),
    },
  ],

  typescript: [
    {
      id: "q-ts-1",
      quizId: "typescript",
      text: "Что такое типизация в TypeScript?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-ts-1", "o1", "Система типов", true),
        makeOption("q-ts-1", "o2", "Фреймворк", false),
        makeOption("q-ts-1", "o3", "Библиотека UI", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-ts-2",
      quizId: "typescript",
      text: "Выберите корректные типы в TypeScript",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-ts-2", "o1", "string", true),
        makeOption("q-ts-2", "o2", "number", true),
        makeOption("q-ts-2", "o3", "element", false),
        makeOption("q-ts-2", "o4", "boolean", true),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-ts-3",
      quizId: "typescript",
      text: "Интерфейсы используются для?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-ts-3", "o1", "Определения структуры объектов", true),
        makeOption("q-ts-3", "o2", "Создания классов", false),
        makeOption("q-ts-3", "o3", "Выполнения скриптов", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-ts-4",
      quizId: "typescript",
      text: "Выберите виды объединений типов",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-ts-4", "o1", "Union", true),
        makeOption("q-ts-4", "o2", "Intersection", true),
        makeOption("q-ts-4", "o3", "Difference", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-ts-5",
      quizId: "typescript",
      text: "Тип any — это?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-ts-5", "o1", "Любой тип", true),
        makeOption("q-ts-5", "o2", "Строгий тип", false),
        makeOption("q-ts-5", "o3", "Только числа", false),
      ],
      createdAt: new Date(),
    },
  ],

  backendBasics: [
    {
      id: "q-bb-1",
      quizId: "backendBasics",
      text: "Что такое REST API?",
      type: QuestionType.SINGLE,
      options: [
        makeOption(
          "q-bb-1",
          "o1",
          "Архитектурный стиль для веб-сервисов",
          true,
        ),
        makeOption("q-bb-1", "o2", "База данных", false),
        makeOption("q-bb-1", "o3", "Фронтенд библиотека", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-bb-2",
      quizId: "backendBasics",
      text: "Выберите HTTP методы",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-bb-2", "o1", "GET", true),
        makeOption("q-bb-2", "o2", "POST", true),
        makeOption("q-bb-2", "o3", "PUT", true),
        makeOption("q-bb-2", "o4", "DELETE", true),
        makeOption("q-bb-2", "o5", "CONNECT", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-bb-3",
      quizId: "backendBasics",
      text: "Что такое JSON?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-bb-3", "o1", "Формат обмена данными", true),
        makeOption("q-bb-3", "o2", "Язык программирования", false),
        makeOption("q-bb-3", "o3", "Фреймворк", false),
      ],
      createdAt: new Date(),
    },
  ],

  nodejs: [
    {
      id: "q-node-1",
      quizId: "nodejs",
      text: "Node.js основан на движке?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-node-1", "o1", "V8", true),
        makeOption("q-node-1", "o2", "SpiderMonkey", false),
        makeOption("q-node-1", "o3", "Chakra", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-node-2",
      quizId: "nodejs",
      text: "Выберите глобальные объекты Node.js",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-node-2", "o1", "process", true),
        makeOption("q-node-2", "o2", "Buffer", true),
        makeOption("q-node-2", "o3", "window", false),
        makeOption("q-node-2", "o4", "console", true),
      ],
      createdAt: new Date(),
    },
  ],

  databases: [
    {
      id: "q-db-1",
      quizId: "databases",
      text: "Что такое индекс в SQL?",
      type: QuestionType.SINGLE,
      options: [
        makeOption("q-db-1", "o1", "Структура для ускорения поиска", true),
        makeOption("q-db-1", "o2", "Тип данных", false),
        makeOption("q-db-1", "o3", "Запрос", false),
      ],
      createdAt: new Date(),
    },
    {
      id: "q-db-2",
      quizId: "databases",
      text: "Выберите виды JOIN",
      type: QuestionType.MULTIPLE,
      options: [
        makeOption("q-db-2", "o1", "INNER", true),
        makeOption("q-db-2", "o2", "LEFT", true),
        makeOption("q-db-2", "o3", "RIGHT", true),
        makeOption("q-db-2", "o4", "FULL", true),
        makeOption("q-db-2", "o5", "CROSS", true),
        makeOption("q-db-2", "o6", "UNION", false),
      ],
      createdAt: new Date(),
    },
  ],
};

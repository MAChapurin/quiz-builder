export const LINKS_ID = {
  HOME: "home",
  FEATURES: "features",
  HOW: "how",
  FAQ: "faq",
} as const;

export const headerLinks = [
  { label: "Главная", href: `#${LINKS_ID.HOME}` },
  { label: "Возможности", href: `#${LINKS_ID.FEATURES}` },
  { label: "Как работает", href: `#${LINKS_ID.HOW}` },
  { label: "FAQ", href: `#${LINKS_ID.FAQ}` },
] as const;

export const routes = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  QUIZZES: "/quizzes",
  QUIZ: "/quiz",
  NOT_FOUND: "/not-found",
  PUBLIC_QUIZ: "/public-quiz",
} as const;

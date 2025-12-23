export function formatDate(
  date: string | Date,
  locale?: string,
  options?: {
    withTime?: boolean;
  },
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const formatter = new Intl.DateTimeFormat(
    locale === "ru" ? "ru-RU" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...(options?.withTime
        ? {
            hour: "2-digit",
            minute: "2-digit",
          }
        : {}),
    },
  );

  return formatter.format(d);
}

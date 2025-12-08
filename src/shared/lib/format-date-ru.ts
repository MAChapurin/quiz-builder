export function formatDateRu(
  date: string | Date,
  options?: {
    withTime?: boolean;
  },
): string {
  const d = typeof date === "string" ? new Date(date) : date;

  const formatter = new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...(options?.withTime
      ? {
          hour: "2-digit",
          minute: "2-digit",
        }
      : {}),
  });

  return formatter.format(d);
}

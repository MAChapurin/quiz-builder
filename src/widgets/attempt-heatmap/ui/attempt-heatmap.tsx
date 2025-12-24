"use client";

import { Heatmap } from "@mantine/charts";
import { ScrollArea } from "@mantine/core";
import { useTranslations, useLocale } from "next-intl";
import { pluralize } from "@/shared/lib";
import { QuizAttemptEntity } from "@/entities/attempt/domain";

export function AttemptHeatmap({ data }: { data: QuizAttemptEntity[] }) {
  const t = useTranslations("widgets.attemptHeatmap");
  const locale = useLocale();

  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  return (
    <ScrollArea w="100%">
      <Heatmap
        data={attemptsToHeatmapData(data)}
        startDate={startDate}
        endDate={endDate}
        withMonthLabels
        withWeekdayLabels
        withTooltip
        rectSize={19}
        weekdayLabels={[
          t("weekdays.sun"),
          t("weekdays.mon"),
          t("weekdays.tue"),
          t("weekdays.wed"),
          t("weekdays.thu"),
          t("weekdays.fri"),
          t("weekdays.sat"),
        ]}
        monthLabels={[
          t("months.jan"),
          t("months.feb"),
          t("months.mar"),
          t("months.apr"),
          t("months.may"),
          t("months.jun"),
          t("months.jul"),
          t("months.aug"),
          t("months.sep"),
          t("months.oct"),
          t("months.nov"),
          t("months.dec"),
        ]}
        getTooltipLabel={({ date, value }) => {
          const count = value ?? 0;

          const formattedDate = new Date(date).toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return `${formattedDate} — ${count} ${pluralize(count, [
            t("attempt.one"),
            t("attempt.few"),
            t("attempt.many"),
          ])}`;
        }}
      />
    </ScrollArea>
  );
}

function attemptsToHeatmapData(
  attempts: QuizAttemptEntity[],
): Record<string, number> {
  return attempts.reduce<Record<string, number>>((acc, attempt) => {
    const dateKey = attempt.createdAt.toISOString().slice(0, 10);
    acc[dateKey] = (acc[dateKey] ?? 0) + 1;
    return acc;
  }, {});
}

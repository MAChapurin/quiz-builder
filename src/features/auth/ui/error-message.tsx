import { Alert } from "@mantine/core";
import { useTranslations } from "next-intl";

export function ErrorMessage({ error }: { error?: string }) {
  const t = useTranslations("features.auth.ui.common");
  if (!error) return null;
  return (
    <Alert color="red" title={t("errorTitle")} variant="light">
      {error}
    </Alert>
  );
}

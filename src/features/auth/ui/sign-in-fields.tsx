"use client";

import React from "react";
import { TextInput, PasswordInput } from "@mantine/core";
import { useTranslations } from "next-intl";

export function AuthFields({
  errors,
  formData,
}: {
  formData?: FormData;
  errors?: {
    email?: string;
    password?: string;
  };
}) {
  const t = useTranslations("features.auth.ui.login.fields");

  return (
    <>
      <TextInput
        label={t("email.label")}
        name="email"
        placeholder={t("email.placeholder")}
        required
        defaultValue={formData?.get("email")?.toString()}
        error={errors?.email}
      />

      <PasswordInput
        label={t("password.label")}
        name="password"
        placeholder={t("password.placeholder")}
        required
        defaultValue={formData?.get("password")?.toString()}
        error={errors?.password}
      />
    </>
  );
}

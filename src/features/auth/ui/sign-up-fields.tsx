"use client";

import React from "react";
import { TextInput, PasswordInput } from "@mantine/core";
import { useTranslations } from "next-intl";

export function AuthFieldsRegister({
  errors,
  formData,
}: {
  formData?: FormData;
  errors?: {
    password?: string;
    confirmPassword?: string;
    email?: string;
    name?: string;
  };
}) {
  const t = useTranslations("features.auth.ui.register.fields");

  return (
    <>
      <TextInput
        label={t("email.label")}
        placeholder={t("email.placeholder")}
        type="email"
        name="email"
        required
        defaultValue={formData?.get("email")?.toString()}
        error={errors?.email}
      />

      <TextInput
        label={t("name.label")}
        placeholder={t("name.placeholder")}
        name="name"
        required
        defaultValue={formData?.get("name")?.toString()}
        error={errors?.name}
      />

      <PasswordInput
        label={t("password.label")}
        placeholder={t("password.placeholder")}
        name="password"
        required
        defaultValue={formData?.get("password")?.toString()}
        error={errors?.password}
      />

      <PasswordInput
        label={t("confirmPassword.label")}
        placeholder={t("confirmPassword.placeholder")}
        name="confirmPassword"
        required
        defaultValue={formData?.get("confirmPassword")?.toString()}
        error={errors?.confirmPassword}
      />
    </>
  );
}

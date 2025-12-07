"use client";

import React from "react";
import { TextInput, PasswordInput } from "@mantine/core";

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
  return (
    <>
      <TextInput
        label="Почта"
        type="email"
        name="email"
        required
        defaultValue={formData?.get("email")?.toString()}
        error={errors?.email}
      />

      <TextInput
        label="Имя"
        name="name"
        required
        defaultValue={formData?.get("name")?.toString()}
        error={errors?.name}
      />

      <PasswordInput
        label="Пароль"
        name="password"
        required
        defaultValue={formData?.get("password")?.toString()}
        error={errors?.password}
      />

      <PasswordInput
        label="Повторите пароль"
        name="confirmPassword"
        required
        defaultValue={formData?.get("confirmPassword")?.toString()}
        error={errors?.confirmPassword}
      />
    </>
  );
}

"use client";

import React from "react";
import { Alert } from "@mantine/core";

export function ErrorMessage({ error }: { error?: string }) {
  if (!error) return null;

  return (
    <Alert color="red" title="Ошибка" variant="light">
      {error}
    </Alert>
  );
}

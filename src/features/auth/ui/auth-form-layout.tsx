"use client";

import { Paper, Title, Text, Box, Stack } from "@mantine/core";
import { ReactNode } from "react";

export function AuthFormLayout({
  actions,
  description,
  fields,
  link,
  title,
  error,
  action,
}: {
  title: string;
  description: string;
  fields: ReactNode;
  actions: ReactNode;
  link: ReactNode;
  error: ReactNode;
  action: (formData: FormData) => void;
}) {
  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      style={{ width: "100%", maxWidth: 420 }}
    >
      <Stack gap="sm" align="center">
        <Title order={2} ta="center">
          {title}
        </Title>

        <Text c="dimmed" ta="center">
          {description}
        </Text>
      </Stack>

      <form action={action} className="space-y-4">
        <Stack gap="md">
          {fields}
          {error}
          {actions}
        </Stack>
      </form>

      <Box mt="xl" ta="center">
        {link}
      </Box>
    </Paper>
  );
}

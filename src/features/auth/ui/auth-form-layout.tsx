"use client";

import { Paper, Title, Text, Box, Stack } from "@mantine/core";
import React from "react";

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
  fields: React.ReactNode;
  actions: React.ReactNode;
  link: React.ReactNode;
  error: React.ReactNode;
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

// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from '@/shared/ui/card';

// import React from 'react';

// export function AuthFormLayout({
//   actions,
//   description,
//   fields,
//   link,
//   title,
//   error,
//   action,
// }: {
//   title: string;
//   description: string;
//   fields: React.ReactNode;
//   actions: React.ReactNode;
//   link: React.ReactNode;
//   error: React.ReactNode;
//   action: (formData: FormData) => void;
// }) {
//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
//         <CardDescription className="text-center">{description}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form action={action} className="space-y-4">
//           {fields}
//           {error}
//           {actions}
//         </form>
//       </CardContent>
//       <CardFooter className="flex justify-center">{link}</CardFooter>
//     </Card>
//   );
// }
